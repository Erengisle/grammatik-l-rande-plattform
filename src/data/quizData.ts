// Determiners for each group and gender
export const determiners = {
  A: {
    en: ["en", "någon", "ingen", "annan", "varje", "varenda", "vilken", "sådan"],
    ett: ["ett", "något", "inget", "annat", "varje", "vartenda", "vilket", "sådant"],
    plural: ["många", "några", "inga", "andra", "vilka", "sådana"],
  },
  B: {
    en: ["den", "den här", "den där"],
    ett: ["det", "det här", "det där"],
    plural: ["de", "de här", "de där"],
  },
  C: {
    en: ["min", "din", "Evas", "denna", "samma", "nästa", "följande"],
    ett: ["mitt", "ditt", "Evas", "detta", "samma", "nästa", "följande"],
    plural: ["mina", "dina", "Evas", "dessa", "samma", "följande"],
  },
};

export type Gender = "en" | "ett" | "plural";
export type Group = "A" | "B" | "C";

export interface WordEntry {
  adjBase: string;       // base adjective (en-form)
  adjT: string;          // ett-form
  adjA: string;          // plural/bestämd form
  nounEn: string;        // en-word indefinite
  nounEnDef: string;     // en-word definite
  nounEtt: string;       // ett-word indefinite
  nounEttDef: string;    // ett-word definite
  nounPlural: string;    // plural indefinite
  nounPluralDef: string; // plural definite
}

export const words: WordEntry[] = [
  { adjBase: "fin", adjT: "fint", adjA: "fina", nounEn: "bil", nounEnDef: "bilen", nounEtt: "hus", nounEttDef: "huset", nounPlural: "bilar", nounPluralDef: "bilarna" },
  { adjBase: "stor", adjT: "stort", adjA: "stora", nounEn: "stad", nounEnDef: "staden", nounEtt: "land", nounEttDef: "landet", nounPlural: "städer", nounPluralDef: "städerna" },
  { adjBase: "liten", adjT: "litet", adjA: "lilla", nounEn: "katt", nounEnDef: "katten", nounEtt: "barn", nounEttDef: "barnet", nounPlural: "katter", nounPluralDef: "katterna" },
  { adjBase: "ny", adjT: "nytt", adjA: "nya", nounEn: "bok", nounEnDef: "boken", nounEtt: "bord", nounEttDef: "bordet", nounPlural: "böcker", nounPluralDef: "böckerna" },
  { adjBase: "gammal", adjT: "gammalt", adjA: "gamla", nounEn: "man", nounEnDef: "mannen", nounEtt: "träd", nounEttDef: "trädet", nounPlural: "män", nounPluralDef: "männen" },
  { adjBase: "vacker", adjT: "vackert", adjA: "vackra", nounEn: "kvinna", nounEnDef: "kvinnan", nounEtt: "landskap", nounEttDef: "landskapet", nounPlural: "kvinnor", nounPluralDef: "kvinnorna" },
  { adjBase: "snabb", adjT: "snabbt", adjA: "snabba", nounEn: "häst", nounEnDef: "hästen", nounEtt: "tåg", nounEttDef: "tåget", nounPlural: "hästar", nounPluralDef: "hästarna" },
  { adjBase: "glad", adjT: "glatt", adjA: "glada", nounEn: "pojke", nounEnDef: "pojken", nounEtt: "barn", nounEttDef: "barnet", nounPlural: "pojkar", nounPluralDef: "pojkarna" },
  { adjBase: "röd", adjT: "rött", adjA: "röda", nounEn: "blomma", nounEnDef: "blomman", nounEtt: "äpple", nounEttDef: "äpplet", nounPlural: "blommor", nounPluralDef: "blommorna" },
  { adjBase: "blå", adjT: "blått", adjA: "blåa", nounEn: "sjö", nounEnDef: "sjön", nounEtt: "hav", nounEttDef: "havet", nounPlural: "sjöar", nounPluralDef: "sjöarna" },
  { adjBase: "grön", adjT: "grönt", adjA: "gröna", nounEn: "skog", nounEnDef: "skogen", nounEtt: "fält", nounEttDef: "fältet", nounPlural: "skogar", nounPluralDef: "skogarna" },
  { adjBase: "svart", adjT: "svart", adjA: "svarta", nounEn: "hund", nounEnDef: "hunden", nounEtt: "moln", nounEttDef: "molnet", nounPlural: "hundar", nounPluralDef: "hundarna" },
  { adjBase: "vit", adjT: "vitt", adjA: "vita", nounEn: "vägg", nounEnDef: "väggen", nounEtt: "tak", nounEttDef: "taket", nounPlural: "väggar", nounPluralDef: "väggarna" },
  { adjBase: "lång", adjT: "långt", adjA: "långa", nounEn: "väg", nounEnDef: "vägen", nounEtt: "rep", nounEttDef: "repet", nounPlural: "vägar", nounPluralDef: "vägarna" },
  { adjBase: "kort", adjT: "kort", adjA: "korta", nounEn: "paus", nounEnDef: "pausen", nounEtt: "brev", nounEttDef: "brevet", nounPlural: "pauser", nounPluralDef: "pauserna" },
  { adjBase: "ung", adjT: "ungt", adjA: "unga", nounEn: "flicka", nounEnDef: "flickan", nounEtt: "par", nounEttDef: "paret", nounPlural: "flickor", nounPluralDef: "flickorna" },
  { adjBase: "kall", adjT: "kallt", adjA: "kalla", nounEn: "vind", nounEnDef: "vinden", nounEtt: "vatten", nounEttDef: "vattnet", nounPlural: "vindar", nounPluralDef: "vindarna" },
  { adjBase: "varm", adjT: "varmt", adjA: "varma", nounEn: "sommar", nounEnDef: "sommaren", nounEtt: "bad", nounEttDef: "badet", nounPlural: "somrar", nounPluralDef: "somrarna" },
  { adjBase: "stark", adjT: "starkt", adjA: "starka", nounEn: "arm", nounEnDef: "armen", nounEtt: "kaffe", nounEttDef: "kaffet", nounPlural: "armar", nounPluralDef: "armarna" },
  { adjBase: "tung", adjT: "tungt", adjA: "tunga", nounEn: "väska", nounEnDef: "väskan", nounEtt: "paket", nounEttDef: "paketet", nounPlural: "väskor", nounPluralDef: "väskorna" },
];

// Generate a quiz question
export interface QuizQuestion {
  determiner: string;
  adjBase: string;
  nounBase: string;
  correctGroup: Group;
  gender: Gender;
  options: { text: string; group: Group }[];
  correctAnswer: string;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getInflections(word: WordEntry, gender: Gender) {
  let adjGroupA: string, adjGroupBC: string;
  let nounIndef: string, nounDef: string;

  if (gender === "en") {
    adjGroupA = word.adjBase;
    adjGroupBC = word.adjA;
    nounIndef = word.nounEn;
    nounDef = word.nounEnDef;
  } else if (gender === "ett") {
    adjGroupA = word.adjT;
    adjGroupBC = word.adjA;
    nounIndef = word.nounEtt;
    nounDef = word.nounEttDef;
  } else {
    adjGroupA = word.adjA;
    adjGroupBC = word.adjA;
    nounIndef = word.nounPlural;
    nounDef = word.nounPluralDef;
  }

  return {
    A: `${adjGroupA} ${nounIndef}`,
    B: `${adjGroupBC} ${nounDef}`,
    C: `${adjGroupBC} ${nounIndef}`,
  };
}

export function generateQuestion(): QuizQuestion {
  const groups: Group[] = ["A", "B", "C"];
  const group = pickRandom(groups);
  const genders: Gender[] = ["en", "ett", "plural"];
  const gender = pickRandom(genders);

  const det = pickRandom(determiners[group][gender]);
  const word = pickRandom(words);

  const inflections = getInflections(word, gender);

  const options = shuffle(
    groups.map((g) => ({ text: inflections[g], group: g }))
  );

  const seen = new Set<string>();
  const uniqueOptions = options.filter((o) => {
    if (seen.has(o.text)) return false;
    seen.add(o.text);
    return true;
  });

  return {
    determiner: det,
    adjBase: word.adjBase,
    nounBase: gender === "en" ? word.nounEn : gender === "ett" ? word.nounEtt : word.nounPlural,
    correctGroup: group,
    gender,
    options: uniqueOptions,
    correctAnswer: inflections[group],
  };
}
