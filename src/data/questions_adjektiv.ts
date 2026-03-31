// Adjektiv – platshållarfrågor

export const ADJ_CATEGORIES = ["Adjektivböjning"];

export const BUILT_IN_TESTS_ADJ = [
  {
    id: "adj-1",
    title: "Adjektiv – böjning (grundtest)",
    category: "Adjektivböjning",
    locked: true,
    questions: [
      {
        id: "a1",
        text: "Huset är ___.",
        options: { A: "stor", B: "stort", C: "stora", D: "store" },
        correct: "B",
      },
      {
        id: "a2",
        text: "Den ___ bilen är min.",
        options: { A: "röd", B: "röda", C: "rött", D: "röde" },
        correct: "B",
      },
    ],
  },
];
