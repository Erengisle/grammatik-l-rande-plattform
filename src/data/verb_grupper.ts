// Verbdata för VerbGruppSpelet.
// Lägg till fler verb längst ner i respektive grupp – bara en rad per verb.
// Format: { imperativ: "verbform", grupp: "1" | "2a" | "2b" | "3" | "4" }

export interface VerbGrupp {
  imperativ: string;
  grupp: "1" | "2a" | "2b" | "3" | "4";
}

export const VERB_GRUPPER: VerbGrupp[] = [

  // ── GRUPP 1 ──────────────────────────────────────────────────────
  // Imperativ = infinitiv (slutar på -a). Preteritum: -ade
  { imperativ: "måla",   grupp: "1" },
  { imperativ: "jobba",  grupp: "1" },
  { imperativ: "starta", grupp: "1" },
  { imperativ: "titta",  grupp: "1" },
  { imperativ: "hoppas", grupp: "1" },
  { imperativ: "laga",   grupp: "1" },
  { imperativ: "städa",  grupp: "1" },
  { imperativ: "hoppa",  grupp: "1" },
  { imperativ: "cykla",  grupp: "1" },
  { imperativ: "simma",  grupp: "1" },
  { imperativ: "vänta",  grupp: "1" },
  { imperativ: "öppna",  grupp: "1" },
  { imperativ: "lyssna", grupp: "1" },
  { imperativ: "fråga",  grupp: "1" },
  { imperativ: "svara",  grupp: "1" },
  { imperativ: "spela",  grupp: "1" },
  { imperativ: "dansa",  grupp: "1" },
  { imperativ: "träna",  grupp: "1" },
  { imperativ: "baka",   grupp: "1" },
  { imperativ: "tvätta", grupp: "1" },
  { imperativ: "plugga", grupp: "1" },

  // ── GRUPP 2a ─────────────────────────────────────────────────────
  // Imperativ = stam (≠ infinitiv). Preteritum: -de
  { imperativ: "bygg",  grupp: "2a" },
  { imperativ: "kör",   grupp: "2a" },
  { imperativ: "lägg",  grupp: "2a" },
  { imperativ: "sälj",  grupp: "2a" },
  { imperativ: "gör",   grupp: "2a" },
  { imperativ: "sätt",  grupp: "2a" },
  { imperativ: "ring",  grupp: "2a" },
  { imperativ: "stäng", grupp: "2a" },
  { imperativ: "vänd",  grupp: "2a" },
  { imperativ: "fyll",  grupp: "2a" },
  { imperativ: "hör",   grupp: "2a" },
  { imperativ: "lär",   grupp: "2a" },
  { imperativ: "nämn",  grupp: "2a" },
  { imperativ: "rör",   grupp: "2a" },
  { imperativ: "häng",  grupp: "2a" },

  // ── GRUPP 2b ─────────────────────────────────────────────────────
  // Imperativ = stam. Preteritum: -te  (stam slutar på p / t / k / s / x)
  { imperativ: "sök",   grupp: "2b" },
  { imperativ: "hjälp", grupp: "2b" },
  { imperativ: "sköt",  grupp: "2b" },
  { imperativ: "lås",   grupp: "2b" },
  { imperativ: "väx",   grupp: "2b" },
  { imperativ: "köp",   grupp: "2b" },
  { imperativ: "läs",   grupp: "2b" },
  { imperativ: "res",   grupp: "2b" },
  { imperativ: "åk",    grupp: "2b" },
  { imperativ: "lyft",  grupp: "2b" },
  { imperativ: "tänk",  grupp: "2b" },
  { imperativ: "klipp", grupp: "2b" },
  { imperativ: "märk",  grupp: "2b" },

  // ── GRUPP 3 ──────────────────────────────────────────────────────
  // Kort ord med lång betonad vokal. Preteritum: -dde
  { imperativ: "tro",  grupp: "3" },
  { imperativ: "bo",   grupp: "3" },
  { imperativ: "sy",   grupp: "3" },
  { imperativ: "klä",  grupp: "3" },
  { imperativ: "nå",   grupp: "3" },
  { imperativ: "spy",  grupp: "3" },
  { imperativ: "ro",   grupp: "3" },
  { imperativ: "må",   grupp: "3" },
  { imperativ: "spå",  grupp: "3" },

  // ── GRUPP 4 ──────────────────────────────────────────────────────
  // Stark eller oregelbunden böjning – byter vokal i preteritum
  { imperativ: "bind",  grupp: "4" },
  { imperativ: "drick", grupp: "4" },
  { imperativ: "spring",grupp: "4" },
  { imperativ: "sitt",  grupp: "4" },
  { imperativ: "vinn",  grupp: "4" },
  { imperativ: "skriv", grupp: "4" },
  { imperativ: "stig",  grupp: "4" },
  { imperativ: "bit",   grupp: "4" },
  { imperativ: "bli",   grupp: "4" },
  { imperativ: "driv",  grupp: "4" },
  { imperativ: "bjud",  grupp: "4" },
  { imperativ: "ljug",  grupp: "4" },
  { imperativ: "bryt",  grupp: "4" },
  { imperativ: "flyg",  grupp: "4" },
  { imperativ: "frys",  grupp: "4" },
  { imperativ: "stryk", grupp: "4" },
  { imperativ: "dra",   grupp: "4" },
  { imperativ: "ta",    grupp: "4" },
  { imperativ: "slå",   grupp: "4" },
  { imperativ: "bär",   grupp: "4" },
  { imperativ: "skär",  grupp: "4" },
  { imperativ: "stjäl", grupp: "4" },
  { imperativ: "gråt",  grupp: "4" },
  { imperativ: "låt",   grupp: "4" },
  { imperativ: "fall",  grupp: "4" },
  { imperativ: "håll",  grupp: "4" },
  { imperativ: "kom",   grupp: "4" },
  { imperativ: "var",   grupp: "4" },
  { imperativ: "se",    grupp: "4" },
  { imperativ: "gå",    grupp: "4" },
  { imperativ: "få",    grupp: "4" },
  { imperativ: "ha",    grupp: "4" },
  { imperativ: "vet",   grupp: "4" },
  { imperativ: "stå",   grupp: "4" },
  { imperativ: "ge",    grupp: "4" },
  { imperativ: "sjung", grupp: "4" },
  { imperativ: "sjunk", grupp: "4" },
  { imperativ: "skjut", grupp: "4" },
  { imperativ: "knyt",  grupp: "4" },
  { imperativ: "ät",    grupp: "4" },
  { imperativ: "smit",  grupp: "4" },
  { imperativ: "rid",   grupp: "4" },
];
