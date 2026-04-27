#!/usr/bin/env node
/**
 * import-kelly.mjs
 * Genererar frågabankerna från Kelly-korpusen.
 * Output: questions_verb_bank.ts, questions_adj_bank.ts, questions_nouns.ts
 *
 * Användning:
 *   node scripts/import-kelly.mjs
 */

import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createRequire } from 'module';
import { classifyVerb } from './classify-verbs.mjs';

const require = createRequire(import.meta.url);
const XLSX = require('xlsx');
const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA = join(__dirname, '../src/data');

// ── Hjälpfunktioner ───────────────────────────────────────────────────────────

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function readSheet(file) {
  const wb = XLSX.readFile(join(DATA, file));
  return XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1 }).slice(1);
}

function pickOptions(correct, wrongs) {
  const pool = shuffle([
    { v: correct, ok: true },
    ...wrongs.filter(w => w !== correct).slice(0, 3).map(v => ({ v, ok: false })),
  ]);
  // Pad to 4 if duplicates reduced pool
  while (pool.length < 4) pool.push({ v: correct + pool.length, ok: false });
  const letters = ['A', 'B', 'C', 'D'];
  const options = {};
  let correctLetter = '';
  pool.slice(0, 4).forEach(({ v, ok }, i) => {
    options[letters[i]] = v;
    if (ok) correctLetter = letters[i];
  });
  return { options, correct: correctLetter };
}

function cleanWord(raw) {
  return String(raw).toLowerCase().trim()
    .replace(/\s*\(.*?\)/g, '')   // ta bort (...)
    .replace(/\s+.*$/, '')         // första ord
    .trim();
}

// ══════════════════════════════════════════════════════════════════════════════
// VERB
// ══════════════════════════════════════════════════════════════════════════════

const PRET_G4 = {
  // a/å → o/e
  'fall': 'föll',  'håll': 'höll',  'gå': 'gick',   'slå': 'slog',
  'stå': 'stod',   'få': 'fick',    'ta': 'tog',     'tag': 'tog',
  'kom': 'kom',
  // i → e → i
  'bit': 'bet',    'driv': 'drev',  'glid': 'gled',  'gnid': 'gned',
  'grip': 'grep',  'kliv': 'klev',  'knip': 'knep',  'lid': 'led',
  'pip': 'pep',    'rid': 'red',    'riv': 'rev',    'skriv': 'skrev',
  'skrik': 'skrek','skjut': 'sköt', 'slit': 'slet',  'smit': 'smet',
  'stig': 'steg',  'strid': 'stred','stryk': 'strök','svid': 'sved',
  'svik': 'svek',  'tig': 'teg',    'vrid': 'vred',
  // u → ö → u
  'bjud': 'bjöd',  'hugg': 'högg',  'ljug': 'ljög',  'njut': 'njöt',
  'sjud': 'sjöd',  'sjung': 'sjöng','sjunk': 'sjönk','sug': 'sög',
  'sup': 'söp',    'tjut': 'tjöt',
  // y → ö → u
  'bryt': 'bröt',  'flyg': 'flög',  'flyt': 'flöt',  'frys': 'frös',
  'klyv': 'klöv',  'knyt': 'knöt',  'kryp': 'kröp',  'ryt': 'röt',
  'skryt': 'skröt','smyg': 'smög',  'snyt': 'snöt',
  // i/u → a → u
  'bind': 'band',  'brinn': 'brann','brist': 'brast','drick': 'drack',
  'finn': 'fanns', 'försvinn': 'försvann','hinn': 'hann','rinn': 'rann',
  'slipp': 'slapp','spinn': 'spann','sprick': 'sprack','spring': 'sprang',
  'stick': 'stack','sting': 'stack','stink': 'stank','vinn': 'vann',
  // a → o → a
  'far': 'for',    'dra': 'drog',   'drag': 'drog',
  // ä → a → u
  'bär': 'bar',    'skär': 'skar',  'stjäl': 'stal', 'svär': 'svor',
  // övriga starka
  'gråt': 'grät',  'le': 'log',     'låt': 'lät',    'se': 'såg',
  'ge': 'gav',     'giv': 'gav',    'skin': 'sken',  'ät': 'åt',
  // oregelbundna
  'be': 'bad',     'bli': 'blev',   'delta': 'deltog','dö': 'dog',
  'ha': 'hade',    'innebär': 'innebar','ligg': 'låg','sov': 'sov',
  'svält': 'svalt','säg': 'sa',     'sätt': 'satte', 'var': 'var',
  'vet': 'visste',
};

const VERB_PREFIXES = [
  'smaksätt','smak','under','åter','över','fram','bort','efter','utan','kring',
  'genom','inne','halv','miss','mot','fore','före','till','ihop','hem','van',
  'sam','ned','upp','vid','med','ute','an','av','be','bi','er','ge','in','om',
  're','ut','dit','hit',
];

const VOWELS_RE = /[aeiouyåäö]/gi;

function infinitiveToImperative(rawInf) {
  const inf = cleanWord(rawInf);
  if (!inf || /[^a-zåäö]/.test(inf)) return null;

  if (!inf.endsWith('a')) return inf;

  const stem = inf.slice(0, -1);

  // Direkt G4-träff
  if (PRET_G4[stem]) return stem;

  // G4 via prefix
  for (const p of VERB_PREFIXES) {
    if (stem.startsWith(p) && stem.length > p.length + 1) {
      const root = stem.slice(p.length);
      if (PRET_G4[root]) return stem;
    }
  }

  // Flerstamsigt → grupp 1, behåll infinitiv
  const vowelCount = (stem.match(VOWELS_RE) || []).length;
  if (vowelCount >= 2) return inf;

  // Enstavig: kolla avslutande konsonanter
  const norm = stem.replace(/ck$/, 'k').replace(/ng$/, 'ŋ');
  const trailing = (norm.match(/[^aeiouyåäö]+$/i) || [''])[0];
  if (trailing.length > 1) return inf; // dubbel/kluster → grupp 1

  return stem; // enkelt konsonant → grupp 2
}

function verbPreteritumOptions(word, group) {
  switch (group) {
    case '1': {
      const s = word.endsWith('a') ? word.slice(0, -1) : word;
      return { correct: s + 'ade', wrongs: [word + 'ade', s + 'adde', word + 'te'] };
    }
    case '2a':
      return { correct: word + 'de', wrongs: [word + 'ade', word + 'te', word + 'dde'] };
    case '2b':
      return { correct: word + 'te', wrongs: [word + 'de', word + 'ade', word + 'dde'] };
    case '3':
      return { correct: word + 'dde', wrongs: [word + 'de', word + 'te', word + 'ade'] };
    case '4': {
      const direct = PRET_G4[word];
      if (direct) return { correct: direct, wrongs: [word + 'ade', word + 'de', word + 'te'] };
      // Prefix-sammansatt
      for (const p of VERB_PREFIXES) {
        if (word.startsWith(p) && word.length > p.length + 1) {
          const root = word.slice(p.length);
          if (PRET_G4[root]) {
            return {
              correct: p + PRET_G4[root],
              wrongs: [word + 'ade', word + 'de', word + 'te'],
            };
          }
        }
      }
      return null; // okänt grupp 4-verb → hoppa över
    }
  }
}

function makeVerbQuestion(rawInf, id) {
  const imp = infinitiveToImperative(rawInf);
  if (!imp) return null;

  const group = classifyVerb(imp);
  const opts = verbPreteritumOptions(imp, group);
  if (!opts) return null;

  const { options, correct } = pickOptions(opts.correct, opts.wrongs);
  return {
    id: `kv${String(id).padStart(4, '0')}`,
    type: 'two_stage', word: imp, context: '',
    groupType: 'verb_1234', correctGroup: group,
    stageQ: 'Välj rätt preteritumform:', options, correct,
  };
}

// ══════════════════════════════════════════════════════════════════════════════
// ADJEKTIV
// ══════════════════════════════════════════════════════════════════════════════

function adjInflect(base) {
  const b = base.toLowerCase();

  // Slutar på -t (men inte -tt): trött → trött/trötta
  if (b.endsWith('t') && !b.endsWith('tt'))
    return { en: b, ett: b, pl: b + 'a' };

  // Slutar på -tt: latt → latt/latta (ovanlig)
  if (b.endsWith('tt'))
    return { en: b, ett: b, pl: b + 'a' };

  // Slutar på -nn: tunn → tunt/tunna
  if (b.endsWith('nn'))
    return { en: b, ett: b.slice(0, -1) + 't', pl: b + 'a' };

  // Slutar på -el: enkel → enkelt/enkla, gammal → gammalt/gamla
  if (b.endsWith('el') || b.endsWith('al'))
    return { en: b, ett: b + 't', pl: b.slice(0, -2) + 'la' };

  // Slutar på -er: vacker → vackert/vackra
  if (b.endsWith('er') && b.length > 3)
    return { en: b, ett: b + 't', pl: b.slice(0, -2) + 'ra' };

  // Slutar på -en: öppen → öppet/öppna
  if (b.endsWith('en') && b.length > 3)
    return { en: b, ett: b.slice(0, -2) + 'et', pl: b.slice(0, -2) + 'na' };

  // Slutar på -ad (participial): älskad → älskat/älskade
  if (b.endsWith('ad'))
    return { en: b, ett: b.slice(0, -2) + 'at', pl: b + 'e' };

  // Lång vokal + d: röd → rött/röda
  if (b.endsWith('d') && !b.endsWith('nd') && !b.endsWith('ld')) {
    if ('aeiouyåäö'.includes(b.slice(-2, -1)))
      return { en: b, ett: b.slice(0, -1) + 'tt', pl: b + 'a' };
  }

  // Slutar på betonad vokal (ej -a): ny → nytt/nya
  if ('eiouåäöy'.includes(b.slice(-1)))
    return { en: b, ett: b + 'tt', pl: b + 'a' };

  // Standard: + t / + a
  return { en: b, ett: b + 't', pl: b + 'a' };
}

function adjWrongForm(base, en, ett, pl) {
  // Generera en trovärdig men felaktig form
  const last = base.slice(-1);
  const cons = 'bcdfghjklmnpqrstvwxz';
  if (cons.includes(last)) {
    const doubled = base + last + 'a'; // dubbel slutkonsonant
    if (doubled !== en && doubled !== ett && doubled !== pl) return doubled;
  }
  const withE = base + 'e';
  if (withE !== en && withE !== ett && withE !== pl) return withE;
  return base + 'ig'; // sista utväg
}

// Kontexter per grupp – roteras round-robin
const CTX_A_EN = [
  'en ___ dag', 'en ___ fråga', 'en ___ plan', 'ingen ___ tanke',
  'en ___ bok', 'varje ___ person', 'en ___ tid', 'en ___ plats',
];
const CTX_A_ETT = [
  'ett ___ barn', 'ett ___ år', 'ett ___ hus', 'varje ___ beslut',
  'ett ___ möte', 'vilket ___ jobb', 'ett ___ val', 'ett ___ problem',
];
const CTX_A_PL = [
  'några ___ dagar', 'inga ___ barn', 'alla ___ frågor',
  'många ___ år', 'flera ___ planer',
];
const CTX_B = [
  'den ___ dagen', 'det ___ huset', 'de ___ dagarna',
  'den här ___ frågan', 'det där ___ barnet', 'den ___ planen',
  'det ___ beslutet', 'de ___ åren',
];
const CTX_C = [
  'min ___ dag', 'mitt ___ barn', 'mina ___ dagar',
  'Evas ___ beslut', 'samma ___ problem', 'nästa ___ år',
  'hans ___ tanke', 'vår ___ plan',
];

let ctxCounters = { AEN: 0, AETT: 0, APL: 0, B: 0, C: 0 };

function makeAdjQuestion(base, type, id) {
  const { en, ett, pl } = adjInflect(base);
  const wrong = adjWrongForm(base, en, ett, pl);

  const qBase = {
    id: `ka${String(id).padStart(4, '0')}`,
    type: 'two_stage', word: base,
    groupType: 'adj_abc',
    stageQ: 'Välj rätt form av adjektivet:',
  };

  if (type === 'A-en') {
    const ctx = CTX_A_EN[(ctxCounters.AEN++) % CTX_A_EN.length];
    const { options, correct } = pickOptions(en, [ett, pl, wrong]);
    return { ...qBase, context: ctx, correctGroup: 'A', options, correct };
  }
  if (type === 'A-ett') {
    const ctx = CTX_A_ETT[(ctxCounters.AETT++) % CTX_A_ETT.length];
    const { options, correct } = pickOptions(ett, [en, pl, wrong]);
    return { ...qBase, context: ctx, correctGroup: 'A', options, correct };
  }
  if (type === 'A-pl') {
    const ctx = CTX_A_PL[(ctxCounters.APL++) % CTX_A_PL.length];
    const { options, correct } = pickOptions(pl, [en, ett, wrong]);
    return { ...qBase, context: ctx, correctGroup: 'A', options, correct };
  }
  if (type === 'B') {
    const ctx = CTX_B[(ctxCounters.B++) % CTX_B.length];
    const { options, correct } = pickOptions(pl, [en, ett, wrong]);
    return { ...qBase, context: ctx, correctGroup: 'B', options, correct };
  }
  if (type === 'C') {
    const ctx = CTX_C[(ctxCounters.C++) % CTX_C.length];
    const { options, correct } = pickOptions(pl, [en, ett, wrong]);
    return { ...qBase, context: ctx, correctGroup: 'C', options, correct };
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// SUBSTANTIV
// ══════════════════════════════════════════════════════════════════════════════

// Grupp 3-suffix enligt Fasth-Kannermark (betonade ändelser och lånordsuffix)
const G3_SUFFIXES = [
  // Betonade svenska suffix
  'het', 'nad', 'skap',
  // Betonade låneordsuffix
  'ör', 'eur', 'ion', 'itet', 'else',
  // Vokaliska suffix → grupp 3
  'eri', 'ori', 'é',
  // ett-ord: -eum, -ium
  'eum', 'ium',
  // -tor/-sor (motor, traktor, professor, reaktor)
  'tor', 'sor',
  // Undantag från grupp 2 (Fasth-Kannermark p.10)
  'muskel', 'möbel', 'fiber',
];

function classifyNoun(word, genus) {
  const w = word.toLowerCase().trim();
  const isEn = genus === 'en';
  const isEtt = genus === 'ett';

  // ── Grupp 1: en-ord på -a ─────────────────────────────────────────────────
  if (isEn && w.endsWith('a')) return 1;

  // ── Grupp 5: nollplural ──────────────────────────────────────────────────
  // En-ord: agentsubstantiv på -are, -ande, -ende
  if (isEn && (w.endsWith('are') || w.endsWith('ande') || w.endsWith('ende'))) return 5;

  // ── Grupp 3 (kontrolleras före grupp 4/5 så att -eri/-eum/-ium fångas) ──
  for (const s of G3_SUFFIXES) {
    if (w.endsWith(s)) return 3;
  }

  // ── Grupp 4: ett-ord på vokal ────────────────────────────────────────────
  if (isEtt && /[aeiouyåäö]$/.test(w)) return 4;

  // ── Grupp 5: ett-ord på konsonant ────────────────────────────────────────
  if (isEtt) return 5;

  // ── Grupp 2: övriga en-ord ───────────────────────────────────────────────
  // Specificerade obetonade ändelser (Fasth-Kannermark p.10 punkt 2–3)
  if (isEn && (w.endsWith('ing') || w.endsWith('dom') || w.endsWith('lek'))) return 2;
  // Obetonat -e, -el, -en, -er, -ar, -on
  if (isEn && /(?:el|en|er|ar|on)$/.test(w)) return 2;
  if (isEn && w.endsWith('e')) return 2;
  // Default: en-ord på konsonant → grupp 2
  if (isEn) return 2;

  return null;
}

function nounForms(word, group, genus) {
  const w = word.toLowerCase().trim();
  switch (group) {
    case 1: {
      const s = w.endsWith('a') ? w.slice(0, -1) : w;
      return { sg: s + 'an', pli: s + 'or', pld: s + 'orna' };
    }
    case 2: {
      // Obetonade ändelser: -el, -er, -en, -ar, -on → speciell hantering
      if (w.endsWith('el')) {
        const r = w.slice(0, -2); // nyckel → nyck
        return { sg: w + 'n', pli: r + 'lar', pld: r + 'larna' };
      }
      if (w.endsWith('er') && w.length > 4) {
        const r = w.slice(0, -2); // vinter → vint
        return { sg: w + 'n', pli: r + 'rar', pld: r + 'rarna' };
      }
      if (w.endsWith('en') && w.length > 3) {
        const r = w.slice(0, -2); // öken → ök
        return { sg: r + 'nen', pli: r + 'nar', pld: r + 'narna' };
      }
      if (w.endsWith('on') && w.length > 3) {
        const r = w.slice(0, -2); // morgon → morg
        return { sg: w + 'en', pli: r + 'nar', pld: r + 'narna' };
      }
      if (w.endsWith('ar') && w.length > 3) {
        const r = w.slice(0, -2); // sommar → somm
        return { sg: w + 'en', pli: r + 'rar', pld: r + 'rarna' };
      }
      // Obetonat -e: pojke → pojken/pojkar/pojkarna
      if (w.endsWith('e')) {
        const s = w.slice(0, -1);
        return { sg: w + 'n', pli: s + 'ar', pld: s + 'arna' };
      }
      // Standard: konsonantslutande (arm, dag, bil)
      return { sg: w + 'en', pli: w + 'ar', pld: w + 'arna' };
    }
    case 3: {
      // Obetonat -el (regel, möbel, muskel)
      if (w.endsWith('el')) {
        const r = w.slice(0, -2);
        return { sg: w + 'n', pli: r + 'ler', pld: r + 'lerna' };
      }
      // Obetonat -er (fiber)
      if (w.endsWith('er') && w.length > 4) {
        const r = w.slice(0, -2);
        return { sg: w + 'n', pli: r + 'rer', pld: r + 'rerna' };
      }
      // -tor/-sor (motor, traktor, professor): obetonat, tar bara -n
      if (w.endsWith('tor') || w.endsWith('sor')) {
        return { sg: w + 'n', pli: w + 'er', pld: w + 'erna' };
      }
      // Vokalslutande (idé, kategori): tar bara -n
      if (/[aeiouyåäö]$/.test(w)) {
        return { sg: w + 'n', pli: w + 'er', pld: w + 'erna' };
      }
      // Standard grupp 3 (film, polis, instruktör, möjlighet)
      return { sg: w + 'en', pli: w + 'er', pld: w + 'erna' };
    }
    case 4:
      return { sg: w + 't', pli: w + 'n', pld: w + 'na' };
    case 5: {
      const sg = genus === 'en' ? w + 'en' : w + 'et';
      const pld = genus === 'en' ? w + 'na' : w + 'en';
      return { sg, pli: w, pld };
    }
  }
}

function fmtForms(f) { return `${f.sg} – ${f.pli} – ${f.pld}`; }

function makeNounQuestion(word, group, genus, id) {
  const correct = nounForms(word, group, genus);
  if (!correct) return null;
  const correctStr = fmtForms(correct);

  // Generera 3 felaktiga alternativ från andra grupper
  const altGroups = [1, 2, 3, 4, 5].filter(g => g !== group);
  const wrongs = [];
  for (const g of altGroups) {
    const f = nounForms(word, g, genus);
    if (!f) continue;
    const s = fmtForms(f);
    if (s !== correctStr && !wrongs.includes(s)) wrongs.push(s);
    if (wrongs.length === 3) break;
  }

  const { options, correct: correctLetter } = pickOptions(correctStr, wrongs);
  return {
    id: `kn${String(id).padStart(4, '0')}`,
    type: 'two_stage', word, context: '',
    groupType: 'noun_dekl', correctGroup: String(group),
    stageQ: 'Välj rätt former (sg def – pl indef – pl def):',
    options, correct: correctLetter,
  };
}

// ══════════════════════════════════════════════════════════════════════════════
// GENERERA FILER
// ══════════════════════════════════════════════════════════════════════════════

function makeTests(questions, idPrefix, titlePrefix, category, testsPerBatch = 20) {
  const shuffled = shuffle(questions);
  const tests = [];
  for (let i = 0; i < shuffled.length; i += testsPerBatch) {
    const batch = shuffled.slice(i, i + testsPerBatch);
    if (batch.length < testsPerBatch) break; // hoppa över ofullständigt sista test
    tests.push({
      id: `${idPrefix}${tests.length + 1}`,
      title: `${titlePrefix} ${tests.length + 1}`,
      category, source: '', locked: true,
      questions: batch,
    });
  }
  return tests;
}

// ── Verb ─────────────────────────────────────────────────────────────────────
console.log('Importerar verb...');
const verbRows = readSheet('Kellys_Verb.xlsx').filter(r => r[1] === 'verb');
let vId = 1;
const verbQuestions = verbRows.map(r => makeVerbQuestion(r[0], vId++)).filter(Boolean);
const verbTests = makeTests(verbQuestions, 'vbank-', 'Verb, slumpat test', 'Verb – grupper');

writeFileSync(join(DATA, 'questions_verb_bank.ts'),
  `// Verbbank från Kelly-korpusen – ${verbQuestions.length} verb\n\n` +
  `export const VERB_BANK_TESTS = ${JSON.stringify(verbTests, null, 2)};\n`
);
console.log(`✓ Verb: ${verbQuestions.length} frågor → ${verbTests.length} test`);

// ── Adjektiv ─────────────────────────────────────────────────────────────────
console.log('Importerar adjektiv...');
const adjRows = readSheet('Kellys_Adj.xlsx').filter(r => r[1] === 'adjective');
let aId = 1;
const adjQuestions = [];
for (const r of adjRows) {
  const base = cleanWord(r[0]);
  if (!base || base.length < 2) continue;
  const types = shuffle(['A-en', 'A-ett', 'A-pl', 'B', 'C']);
  for (const t of types.slice(0, 3)) {
    const q = makeAdjQuestion(base, t, aId++);
    if (q) adjQuestions.push(q);
  }
}
const adjTests = makeTests(adjQuestions, 'adjbank-', 'Adjektiv, slumpat test', 'Adjektiv – grupper');

writeFileSync(join(DATA, 'questions_adj_bank.ts'),
  `// Adjektivbank från Kelly-korpusen – ${adjRows.length} adjektiv\n\n` +
  `export const ADJ_BANK_TESTS = ${JSON.stringify(adjTests, null, 2)};\n`
);
console.log(`✓ Adjektiv: ${adjQuestions.length} frågor → ${adjTests.length} test`);

// ── Substantiv ───────────────────────────────────────────────────────────────
console.log('Importerar substantiv...');
const substRows = readSheet('Kellys_Subst.xlsx').filter(r => r[2] && r[2].startsWith('noun'));
let nId = 1;
const nounQuestions = [];
for (const r of substRows) {
  const word = cleanWord(r[1]);
  if (!word || word.length < 2) continue;
  const rawGenus = r[0] ? String(r[0]).toLowerCase().trim() : '';
  const genus = rawGenus === 'ett' ? 'ett' : (r[2] === 'noun-ett' ? 'ett' : 'en');
  const group = classifyNoun(word, genus);
  if (!group) continue;
  const q = makeNounQuestion(word, group, genus, nId++);
  if (q) nounQuestions.push(q);
}
const nounTests = makeTests(nounQuestions, 'nbank-', 'Substantiv, test', 'Substantiv – deklination');

writeFileSync(join(DATA, 'questions_nouns.ts'),
  `// Substantivbank från Kelly-korpusen – ${nounQuestions.length} substantiv\n\n` +
  `export const NOUN_BANK_TESTS = ${JSON.stringify(nounTests, null, 2)};\n` +
  `\nexport const NOUN_BANK_CATEGORIES = ["Substantiv – deklination"];\n`
);
console.log(`✓ Substantiv: ${nounQuestions.length} frågor → ${nounTests.length} test`);

console.log('\nKlar!');
