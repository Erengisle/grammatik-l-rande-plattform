// Konjunktioner & Subjunktioner – platshållarfrågor
// Ersätt med riktiga frågor

export const CATEGORIES = ["Konjunktioner & Subjunktioner"];

export const BUILT_IN_TESTS = [
  {
    id: "konj-1",
    title: "Konjunktioner – grundtest",
    category: "Konjunktioner & Subjunktioner",
    locked: true,
    questions: [
      {
        id: "k1",
        text: "Hon gick hem ___ hon var trött.",
        options: { A: "och", B: "men", C: "eftersom", D: "eller" },
        correct: "C",
      },
      {
        id: "k2",
        text: "Jag vill ha kaffe ___ te.",
        options: { A: "men", B: "eller", C: "att", D: "om" },
        correct: "B",
      },
      {
        id: "k3",
        text: "Vi stannade hemma ___ det regnade.",
        options: { A: "men", B: "eller", C: "för att", D: "och" },
        correct: "C",
      },
    ],
  },
];
