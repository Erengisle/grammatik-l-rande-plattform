export type KompGroup = 1 | 2 | 3 | 4;

export interface KomparationEntry {
  positiv: string;
  komparativ: string;
  superlativ: string;
  superlativBest: string;
  group: KompGroup;
}

// Group 1: Regular -are/-ast/-aste
// Group 2: Umlaut (u→y, å→ä, o→ö) + -re/-st/-sta
// Group 3: Irregular
// Group 4: mer/mest + adjective

export const komparationData: KomparationEntry[] = [
  // === GROUP 1 ===
  { positiv: "rolig", komparativ: "roligare", superlativ: "roligast", superlativBest: "roligaste", group: 1 },
  { positiv: "tråkig", komparativ: "tråkigare", superlativ: "tråkigast", superlativBest: "tråkigaste", group: 1 },
  { positiv: "snygg", komparativ: "snyggare", superlativ: "snyggast", superlativBest: "snyggaste", group: 1 },
  { positiv: "ful", komparativ: "fulare", superlativ: "fulast", superlativBest: "fulaste", group: 1 },
  { positiv: "enkel", komparativ: "enklare", superlativ: "enklast", superlativBest: "enklaste", group: 1 },
  { positiv: "nyfiken", komparativ: "nyfiknare", superlativ: "nyfiknast", superlativBest: "nyfiknaste", group: 1 },
  { positiv: "vacker", komparativ: "vackrare", superlativ: "vackrast", superlativBest: "vackraste", group: 1 },
  { positiv: "dum", komparativ: "dummare", superlativ: "dummast", superlativBest: "dummaste", group: 1 },
  { positiv: "lugn", komparativ: "lugnare", superlativ: "lugnast", superlativBest: "lugnaste", group: 1 },
  { positiv: "ny", komparativ: "nyare", superlativ: "nyast", superlativBest: "nyaste", group: 1 },
  { positiv: "farlig", komparativ: "farligare", superlativ: "farligast", superlativBest: "farligaste", group: 1 },
  { positiv: "snabb", komparativ: "snabbare", superlativ: "snabbast", superlativBest: "snabbaste", group: 1 },
  { positiv: "kort", komparativ: "kortare", superlativ: "kortast", superlativBest: "kortaste", group: 1 },
  { positiv: "säker", komparativ: "säkrare", superlativ: "säkrast", superlativBest: "säkraste", group: 1 },
  { positiv: "kraftig", komparativ: "kraftigare", superlativ: "kraftigast", superlativBest: "kraftigaste", group: 1 },
  { positiv: "lätt", komparativ: "lättare", superlativ: "lättast", superlativBest: "lättaste", group: 1 },
  { positiv: "viktig", komparativ: "viktigare", superlativ: "viktigast", superlativBest: "viktigaste", group: 1 },
  { positiv: "modern", komparativ: "modernare", superlativ: "modernast", superlativBest: "modernaste", group: 1 },
  { positiv: "svag", komparativ: "svagare", superlativ: "svagast", superlativBest: "svagaste", group: 1 },
  { positiv: "full", komparativ: "fullare", superlativ: "fullast", superlativBest: "fullaste", group: 1 },
  { positiv: "allvarlig", komparativ: "allvarligare", superlativ: "allvarligast", superlativBest: "allvarligaste", group: 1 },
  { positiv: "intressant", komparativ: "intressantare", superlativ: "intressantast", superlativBest: "intressantaste", group: 1 },
  { positiv: "hård", komparativ: "hårdare", superlativ: "hårdast", superlativBest: "hårdaste", group: 1 },
  { positiv: "glad", komparativ: "gladare", superlativ: "gladast", superlativBest: "gladaste", group: 1 },
  { positiv: "duktig", komparativ: "duktigare", superlativ: "duktigast", superlativBest: "duktigaste", group: 1 },
  { positiv: "försiktig", komparativ: "försiktigare", superlativ: "försiktigast", superlativBest: "försiktigaste", group: 1 },
  { positiv: "belåten", komparativ: "belåtnare", superlativ: "belåtnast", superlativBest: "belåtnaste", group: 1 },
  { positiv: "klok", komparativ: "klokare", superlativ: "klokast", superlativBest: "klokaste", group: 1 },
  { positiv: "grym", komparativ: "grymmare", superlativ: "grymmast", superlativBest: "grymmaste", group: 1 },
  { positiv: "mager", komparativ: "magrare", superlativ: "magrast", superlativBest: "magraste", group: 1 },
  { positiv: "grann", komparativ: "grannare", superlativ: "grannast", superlativBest: "grannaste", group: 1 },
  { positiv: "fet", komparativ: "fetare", superlativ: "fetast", superlativBest: "fetaste", group: 1 },
  { positiv: "mild", komparativ: "mildare", superlativ: "mildast", superlativBest: "mildaste", group: 1 },
  { positiv: "flott", komparativ: "flottare", superlativ: "flottast", superlativBest: "flottaste", group: 1 },
  { positiv: "kall", komparativ: "kallare", superlativ: "kallast", superlativBest: "kallaste", group: 1 },
  { positiv: "svår", komparativ: "svårare", superlativ: "svårast", superlativBest: "svåraste", group: 1 },
  { positiv: "mörk", komparativ: "mörkare", superlativ: "mörkast", superlativBest: "mörkaste", group: 1 },
  { positiv: "billig", komparativ: "billigare", superlativ: "billigast", superlativBest: "billigaste", group: 1 },
  { positiv: "fin", komparativ: "finare", superlativ: "finast", superlativBest: "finaste", group: 1 },
  { positiv: "bekväm", komparativ: "bekvämmare", superlativ: "bekvämast", superlativBest: "bekvämaste", group: 1 },
  { positiv: "vanlig", komparativ: "vanligare", superlativ: "vanligast", superlativBest: "vanligaste", group: 1 },
  { positiv: "sen", komparativ: "senare", superlativ: "senast", superlativBest: "senaste", group: 1 },
  { positiv: "trygg", komparativ: "tryggare", superlativ: "tryggast", superlativBest: "tryggaste", group: 1 },
  { positiv: "skicklig", komparativ: "skickligare", superlativ: "skickligast", superlativBest: "skickligaste", group: 1 },

  // === GROUP 2 (umlaut) ===
  { positiv: "hög", komparativ: "högre", superlativ: "högst", superlativBest: "högsta", group: 2 },
  { positiv: "ung", komparativ: "yngre", superlativ: "yngst", superlativBest: "yngsta", group: 2 },
  { positiv: "tung", komparativ: "tyngre", superlativ: "tyngst", superlativBest: "tyngsta", group: 2 },
  { positiv: "låg", komparativ: "lägre", superlativ: "lägst", superlativBest: "lägsta", group: 2 },
  { positiv: "lång", komparativ: "längre", superlativ: "längst", superlativBest: "längsta", group: 2 },
  { positiv: "stor", komparativ: "större", superlativ: "störst", superlativBest: "största", group: 2 },
  { positiv: "grov", komparativ: "grövre", superlativ: "grövst", superlativBest: "grövsta", group: 2 },

  // === GROUP 3 (irregular) ===
  { positiv: "gammal", komparativ: "äldre", superlativ: "äldst", superlativBest: "äldsta", group: 3 },
  { positiv: "liten", komparativ: "mindre", superlativ: "minst", superlativBest: "minsta", group: 3 },
  { positiv: "bra", komparativ: "bättre", superlativ: "bäst", superlativBest: "bästa", group: 3 },
  { positiv: "dålig", komparativ: "sämre", superlativ: "sämst", superlativBest: "sämsta", group: 3 },

  // === GROUP 4 (mer/mest) ===
  { positiv: "praktisk", komparativ: "mer praktisk", superlativ: "mest praktisk", superlativBest: "mest praktiska", group: 4 },
  { positiv: "musikalisk", komparativ: "mer musikalisk", superlativ: "mest musikalisk", superlativBest: "mest musikaliska", group: 4 },
  { positiv: "teknisk", komparativ: "mer teknisk", superlativ: "mest teknisk", superlativBest: "mest tekniska", group: 4 },
  { positiv: "intresserad", komparativ: "mer intresserad", superlativ: "mest intresserad", superlativBest: "mest intresserade", group: 4 },
  { positiv: "känd", komparativ: "mer känd", superlativ: "mest känd", superlativBest: "mest kända", group: 4 },
  { positiv: "läst", komparativ: "mer läst", superlativ: "mest läst", superlativBest: "mest lästa", group: 4 },
  { positiv: "omväxlande", komparativ: "mer omväxlande", superlativ: "mest omväxlande", superlativBest: "mest omväxlande", group: 4 },
  { positiv: "förstående", komparativ: "mer förstående", superlativ: "mest förstående", superlativBest: "mest förstående", group: 4 },
  { positiv: "systematisk", komparativ: "mer systematisk", superlativ: "mest systematisk", superlativBest: "mest systematiska", group: 4 },
  { positiv: "optimistisk", komparativ: "mer optimistisk", superlativ: "mest optimistisk", superlativBest: "mest optimistiska", group: 4 },
  { positiv: "chockad", komparativ: "mer chockad", superlativ: "mest chockad", superlativBest: "mest chockade", group: 4 },
  { positiv: "spännande", komparativ: "mer spännande", superlativ: "mest spännande", superlativBest: "mest spännande", group: 4 },
  { positiv: "beroende", komparativ: "mer beroende", superlativ: "mest beroende", superlativBest: "mest beroende", group: 4 },
  { positiv: "komplicerad", komparativ: "mer komplicerad", superlativ: "mest komplicerad", superlativBest: "mest komplicerade", group: 4 },
  { positiv: "förvånad", komparativ: "mer förvånad", superlativ: "mest förvånad", superlativBest: "mest förvånade", group: 4 },
  { positiv: "skadad", komparativ: "mer skadad", superlativ: "mest skadad", superlativBest: "mest skadade", group: 4 },
  { positiv: "utvecklad", komparativ: "mer utvecklad", superlativ: "mest utvecklad", superlativBest: "mest utvecklade", group: 4 },
  { positiv: "skrämmande", komparativ: "mer skrämmande", superlativ: "mest skrämmande", superlativBest: "mest skrämmande", group: 4 },
  { positiv: "övertygad", komparativ: "mer övertygad", superlativ: "mest övertygad", superlativBest: "mest övertygade", group: 4 },
  { positiv: "typisk", komparativ: "mer typisk", superlativ: "mest typisk", superlativBest: "mest typiska", group: 4 },
  { positiv: "pedantisk", komparativ: "mer pedantisk", superlativ: "mest pedantisk", superlativBest: "mest pedantiska", group: 4 },
  { positiv: "romantisk", komparativ: "mer romantisk", superlativ: "mest romantisk", superlativBest: "mest romantiska", group: 4 },
  { positiv: "givande", komparativ: "mer givande", superlativ: "mest givande", superlativBest: "mest givande", group: 4 },
  { positiv: "omtyckt", komparativ: "mer omtyckt", superlativ: "mest omtyckt", superlativBest: "mest omtyckta", group: 4 },
  { positiv: "avancerad", komparativ: "mer avancerad", superlativ: "mest avancerad", superlativBest: "mest avancerade", group: 4 },
  { positiv: "krävande", komparativ: "mer krävande", superlativ: "mest krävande", superlativBest: "mest krävande", group: 4 },
  { positiv: "betydande", komparativ: "mer betydande", superlativ: "mest betydande", superlativBest: "mest betydande", group: 4 },
];

export const groupDescriptionsKomp: Record<KompGroup, string> = {
  1: "Regelbunden: -are / -ast",
  2: "Omljud: -re / -st",
  3: "Oregelbunden",
  4: "mer / mest",
};

export const groupRulesKomp: Record<KompGroup, string> = {
  1: "De flesta adjektiv. Lägg till -are (komparativ) och -ast (superlativ). Adjektiv på -el, -en, -er tappar -e.",
  2: "Omljud: u→y, å→ä, o→ö. Ändelser: -re (komparativ), -st (superlativ).",
  3: "Helt oregelbundna former som måste läras utantill.",
  4: "Adjektiv på -isk, perfekt particip och presens particip. Använd mer/mest framför adjektivet.",
};

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export type KompFormType = "komparativ" | "superlativ";

export interface KomparationQuestion {
  positiv: string;
  correctGroup: KompGroup;
  formType: KompFormType;
  correctAnswer: string;
  contextSentence: string;
  entry: KomparationEntry;
}

const komparativTemplates = [
  (adj: string) => `Den här boken är ___ den andra.`,
  (adj: string) => `Lisa är ___ sin syster.`,
  (adj: string) => `Idag är det ___ igår.`,
  (adj: string) => `Det nya huset är ___ det gamla.`,
  (adj: string) => `Min väska är ___ din.`,
  (adj: string) => `Den röda bilen är ___ den blå.`,
];

const superlativTemplates = [
  (adj: string) => `Det här är den ___ filmen jag har sett.`,
  (adj: string) => `Hon är ___ av alla i klassen.`,
  (adj: string) => `Det var det ___ jag har upplevt.`,
  (adj: string) => `Sverige har den ___ sommaren i Norden.`,
  (adj: string) => `Han sprang ___ av alla deltagare.`,
  (adj: string) => `Det här är den ___ uppgiften på provet.`,
];

function generateContextSentence(formType: KompFormType, positiv: string): string {
  const templates = formType === "komparativ" ? komparativTemplates : superlativTemplates;
  return pickRandom(templates)(positiv);
}

export function generateKomparationQuestion(formType?: KompFormType): KomparationQuestion {
  const entry = pickRandom(komparationData);
  const type = formType ?? pickRandom<KompFormType>(["komparativ", "superlativ"]);
  return {
    positiv: entry.positiv,
    correctGroup: entry.group,
    formType: type,
    correctAnswer: type === "komparativ" ? entry.komparativ : entry.superlativ,
    contextSentence: generateContextSentence(type, entry.positiv),
    entry,
  };
}
