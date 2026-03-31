// Verb – platshållarfrågor

export const VERB_CATEGORIES = ["Verbböjning"];

export const BUILT_IN_TESTS_VERB = [
  {
    id: "verb-1",
    title: "Verb – grupp 1 & 2 (grundtest)",
    category: "Verbböjning",
    locked: true,
    questions: [
      {
        id: "v1",
        text: "Igår ___ jag hela dagen.",
        options: { A: "jobbar", B: "jobbade", C: "jobbat", D: "jobba" },
        correct: "B",
      },
      {
        id: "v2",
        text: "Han har ___ brev hela veckan.",
        options: { A: "skriver", B: "skrev", C: "skrivit", D: "skriva" },
        correct: "C",
      },
    ],
  },
];
