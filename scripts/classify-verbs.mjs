#!/usr/bin/env node
/**
 * Klassificerar svenska verb i grupp 1, 2a, 2b, 3 eller 4.
 * Indata: verbets IMPERATIVFORM (som lagras i `word`-fältet i verbbanken).
 *
 * Regler (tillämpas i ordning):
 *   0. Direkt träff i grupp 4-listan → grupp 4
 *   1. Imperativ slutar på -as           → grupp 1  (deponenter: lyckas, andas)
 *   2. Imperativ slutar på -a            → grupp 1  (arbeta, starta, kvittra)
 *   3. Imperativ slutar på vokal (ej -a) → grupp 3  (bo, tro, sy, nå)
 *   4. Imperativ slutar på p/t/k/s/x     → grupp 2b (sök, lyft, hjälp)
 *   5. Annars                            → grupp 2a (ring, bygg, kör)
 *
 * Grupp 4-listan innehåller alla starka och oregelbundna verb.
 * Prefix-strippning används för sammansatta verb (anse→se, bortse→se, bestå→stå).
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Kända starka/oregelbundna verb (imperativform) ──────────────────────────
const GROUP4_ROOTS = new Set([
  // a → a (vokalskifte a→a)
  'fall',   // faller → föll → fallit
  'håll',   // håller → höll → hållit
  'gå',     // går → gick → gått
  'slå',    // slår → slog → slagit
  'stå',    // står → stod → stått
  'få',     // får → fick → fått
  'ta', 'tag', // tar → tog → tagit
  'kom',    // kommer → kom → kommit

  // i → e → i (skriv-typen)
  'bit',    // biter → bet → bitit
  'driv',   // driver → drev → drivit
  'glid',   // glider → gled → glidit
  'gnid',   // gnider → gned → gnidit
  'grip',   // griper → grep → gripit
  'kliv',   // kliver → klev → klivit
  'knip',   // kniper → knep → knipit
  'lid',    // lider → led → lidit
  'pip',    // piper → pep → pipit
  'rid',    // rider → red → ridit
  'riv',    // river → rev → rivit
  'sit', 'sitt', // sitter → satt → suttit
  'skär',   // skär → skar → skurit
  'skjut',  // skjuter → sköt → skjutit
  'skriv',  // skriver → skrev → skrivit
  'skrik',  // skriker → skrek → skrikit
  'slit',   // sliter → slet → slitit
  'smit',   // smiter → smet → smitit
  'stig',   // stiger → steg → stigit
  'strid',  // strider → stred → stridit
  'stryk',  // stryker → strök → strukit
  'svid',   // svider → sved → svidit
  'svik',   // sviker → svek → svikit
  'tig',    // tiger → teg → tigit
  'vrid',   // vrider → vred → vridit

  // u → ö → u (bjud-typen)
  'bjud',   // bjuder → bjöd → bjudit
  'hugg',   // hugger → högg → huggit
  'ljug',   // ljuger → ljög → ljugit
  'njut',   // njuter → njöt → njutit
  'sjud',   // sjuder → sjöd → sjudit
  'sjung',  // sjunger → sjöng → sjungit
  'sjunk',  // sjunker → sjönk → sjunkit
  'skjut',
  'sug',    // suger → sög → sugit
  'sup',    // super → söp → supit
  'tjut',   // tjuter → tjöt → tjutit

  // y → ö → u (bryt-typen)
  'bryt',   // bryter → bröt → brutit
  'flyg',   // flyger → flög → flugit
  'flyt',   // flyter → flöt → flutit
  'frys',   // fryser → frös → frusit
  'klyv',   // klyver → klöv → kluvit
  'knyt',   // knyter → knöt → knutit
  'kryp',   // kryper → kröp → krupit
  'ryt',    // ryter → röt → rutit
  'skryt',  // skryter → skröt → skrutit
  'smyg',   // smyger → smög → smugit
  'snyt',   // snyter → snöt → snutit

  // i/u → a → u (bind-typen)
  'bind',   // binder → band → bundit
  'brinn',  // brinner → brann → brunnit
  'brist',  // brister → brast → brustit
  'drick',  // dricker → drack → druckit
  'finn',   // finns/finner → fanns → funnit
  'försvinn', // försvinner → försvann → försvunnit
  'hinn',   // hinner → hann → hunnit
  'rinn',   // rinner → rann → runnit
  'slipp',  // slipper → slapp → sluppit
  'spinn',  // spinner → spann → spunnit
  'sprick', // spricker → sprack → spruckit
  'spring', // springer → sprang → sprungit
  'stick',  // sticker → stack → stuckit
  'sting',  // stinger → stack → stungit
  'stink',  // stinker → stank → stunkit
  'vinn',   // vinner → vann → vunnit

  // a → o → a (far-typen)
  'far',    // far → for → farit (fara)

  // ä → a → u
  'bär',    // bär → bar → burit
  'skär',   // skär → skar → skurit  (dubblett av ovan)
  'stjäl',  // stjäl → stal → stulit
  'svär',   // svär → svor → svurit

  // Övriga starka
  'dra', 'drag', // drar → drog → dragit
  'gråt',   // gråter → grät → gråtit
  'le',     // ler → log → lett
  'låt',    // låter → lät → låtit
  'se',     // ser → såg → sett
  'ge', 'giv', // ger → gav → gett
  'skin',   // skiner → sken → skinit
  'slå',    // slår → slog → slagit
  'ät',     // äter → åt → ätit

  // Oregelbundna
  'be',     // ber → bad → bett
  'bli',    // blir → blev → blivit
  'delta',  // deltar → deltog → deltagit
  'dö',     // dör → dog → dött
  'fall',   // faller → föll → fallit
  'få',     // får → fick → fått
  'gå',     // går → gick → gått
  'ha',     // har → hade → haft
  'håll',   // håller → höll → hållit
  'innebär',// innebär → innebar → inneburit
  'kom',    // kommer → kom → kommit
  'ligg',   // ligger → låg → legat
  'sov',    // sover → sov → sovit
  'stå',    // står → stod → stått
  'svält',  // svälter → svalt → svultit
  'säg',    // säger → sa/sade → sagt
  'sätt',   // sätter → satte → satt
  'ta', 'tag', // tar → tog → tagit
  'var',    // är → var → varit
  'vet',    // vet → visste → vetat
]);

// ── Prefix – längst först ────────────────────────────────────────────────────
const PREFIXES = [
  'smaksätt', 'smak',
  'under', 'åter', 'över', 'fram', 'bort', 'efter', 'utan', 'kring',
  'genom', 'inne', 'halv', 'miss', 'mot', 'fore', 'före',
  'till', 'ihop', 'hem', 'van', 'sam', 'ned', 'upp', 'vid', 'med',
  'ute', 'an', 'av', 'be', 'bi', 'er', 'ge', 'in', 'om', 're', 'ut',
  'dit', 'hit',
];

function stripPrefix(word) {
  for (const prefix of PREFIXES) {
    if (word.startsWith(prefix) && word.length > prefix.length + 1) {
      return word.slice(prefix.length);
    }
  }
  return word;
}

// ── Klassificeringsfunktion ──────────────────────────────────────────────────
export function classifyVerb(imperative) {
  const imp = imperative.toLowerCase().trim();

  // Regel 0: Direkt träff i grupp 4
  if (GROUP4_ROOTS.has(imp)) return '4';

  // Regel 0b: Testa prefix-strippning och kolla grupp 4
  const stem = stripPrefix(imp);
  if (stem !== imp && GROUP4_ROOTS.has(stem)) return '4';

  // Regel 1: Deponenter (slutar på -as, t.ex. lyckas, andas, hoppas)
  if (imp.endsWith('as')) return '1';

  // Regel 2: Slutar på -a → Grupp 1
  if (imp.endsWith('a')) return '1';

  // Regel 3: Slutar på vokal (ej -a) → Grupp 3
  const vowels = new Set(['e', 'o', 'i', 'u', 'å', 'ä', 'ö', 'y']);
  if (vowels.has(imp[imp.length - 1])) return '3';

  // Regel 4: Slutar på tonlös konsonant → Grupp 2b
  const voiceless = new Set(['p', 't', 'k', 's', 'x']);
  if (voiceless.has(imp[imp.length - 1])) return '2b';

  // Regel 5: Annars → Grupp 2a
  return '2a';
}

// ── Läs verbbanken och hitta avvikelser ─────────────────────────────────────
const bankPath = join(__dirname, '../src/data/questions_verb_bank.ts');
const content = readFileSync(bankPath, 'utf8');

const pattern = /"word":\s*"([^"]+)"(?:[^}](?!"word"))*?"correctGroup":\s*"([^"]+)"/gs;

const changes = [];
const seen = new Set();
let match;

while ((match = pattern.exec(content)) !== null) {
  const word = match[1];
  const currentGroup = match[2];
  const expectedGroup = classifyVerb(word);
  const key = `${word}|${currentGroup}`;

  if (expectedGroup !== currentGroup && !seen.has(key)) {
    seen.add(key);
    changes.push({ word, currentGroup, expectedGroup });
  }
}

// ── Rapport ──────────────────────────────────────────────────────────────────
if (changes.length === 0) {
  console.log('✓ Inga avvikelser – alla verb verkar korrekt klassificerade.');
} else {
  console.log(`Hittade ${changes.length} möjlig(a) avvikelse(r):\n`);
  console.log('  Verb                 Nuvarande  Föreslagen');
  console.log('  ' + '─'.repeat(45));
  for (const c of changes) {
    console.log(`  ${c.word.padEnd(20)} ${c.currentGroup.padEnd(10)} → ${c.expectedGroup}`);
  }

  if (process.argv.includes('--fix')) {
    let fixed = content;
    for (const { word, currentGroup, expectedGroup } of changes) {
      const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(
        `("word":\\s*"${escaped}"(?:[^}](?!"word"))*?"correctGroup":\\s*)"${currentGroup}"`,
        'gs'
      );
      fixed = fixed.replace(re, `$1"${expectedGroup}"`);
    }
    writeFileSync(bankPath, fixed);
    console.log('\n✓ questions_verb_bank.ts uppdaterad.');
  } else {
    console.log('\nKör med --fix för att tillämpa ändringarna automatiskt.');
  }
}
