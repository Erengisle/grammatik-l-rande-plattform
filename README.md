# Grammatik-lärande plattform

En webbapp för att träna svensk grammatik: adjektivböjning, komparation, verbgrupper, substantivdeklination samt konjunktioner/subjunktioner. Byggd med React, TypeScript och Vite, ursprungligen skapad via [Lovable](https://lovable.dev).

Live: **https://erengisle.github.io/grammatik-l-rande-plattform/**

## Funktioner

Appen har en tvånivå-navigation: eleven väljer först ämne, sedan ett specifikt test inom ämnet. Fyra ämnen finns just nu:

| Ämne | Innehåll | Ungefärligt antal frågor |
|---|---|---|
| **Adjektiv** | Böjningsgrupper A/B/C + komparationsgrupper 1–4 | ~4 300 (adjektivbank) |
| **Verb** | Verbgrupper 1–4 (imperativ → presens/preteritum/supinum) | ~1 600 (verbbank) |
| **Substantiv** | Deklination 1–5 | ~4 800 |
| **Konjunktioner & Subjunktioner** | Typ/funktion → rätt ord, samt en blandad övning | 136 |

De flesta övningarna använder ett **tvåstegsformat**: eleven identifierar först vilken grammatisk kategori/typ en mening eller ett ord tillhör, och väljer sedan rätt form/ord. Se avsnittet [Så fungerar konjunktion/subjunktion-övningen](#så-fungerar-konjunktionsubjunktion-övningen) för en detaljerad genomgång.

Resultat (poäng, datum, svar) sparas i `localStorage` i webbläsaren, så eleven kan se sin senaste träningshistorik. Det finns ingen inloggning eller server — all data ligger lokalt hos eleven.

## Kom igång

Kräver [Bun](https://bun.sh) (repo använder `bun.lock`; `npm`/`package-lock.json` finns också med och fungerar som fallback).

```sh
bun install        # installera beroenden
bun run dev         # starta utvecklingsserver (http://localhost:8080)
bun run build        # produktionsbygge till dist/
bun run preview      # förhandsgranska produktionsbygget
bun run test         # kör vitest
bun run lint          # kör eslint
```

## Projektstruktur

```
src/
  components/
    GrammarApp.tsx     # Appens rot: ämnes-/testval + den faktiska quiz-logiken
    ui/                 # shadcn/ui-komponenter (generella byggstenar)
  data/
    questions.ts         # Konjunktioner & subjunktioner (tvåstegsformat)
    questions_adjektiv.ts # Adjektiv – grupper A/B/C + komparation
    questions_adj_bank.ts  # Stor adjektivbank (importerad)
    questions_verb.ts       # Legacy/oanvänd verb-datafil
    questions_verb_bank.ts   # Stor verbbank (importerad)
    questions_nouns.ts        # Substantivdeklination (importerad)
    Kellys_*.xlsx               # Källdata (Kelly-korpus) för importscripten
  pages/Index.tsx          # Enda sidan, renderar <GrammarApp />
scripts/
  import-kelly.mjs   # Genererar fråge-banker från Kellys_*.xlsx
  classify-verbs.mjs  # Klassificerar verb i grupp 1–4 enligt Fasth–Kannermark-reglerna
skärmdumpar/           # Skärmdumpar av UI:t under utveckling
```

> **Obs:** `src/components/Quiz.tsx`, `AdjBankQuiz.tsx`, `KomparationQuiz.tsx`, `VerbQuiz.tsx`, `FillBlankQuiz.tsx` och `TopicMenu.tsx` är tidigare versioner av quiz-UI:t som **inte längre används** av appen (`GrammarApp.tsx` har sin egen inbyggda `Quiz`-komponent). De ligger kvar i repot men är dödkod. Detsamma gäller `questions_verb.ts`, vars `BUILT_IN_TESTS_VERB` är en tom array.

## Datakällor

Fråge-bankerna för verb, substantiv och adjektiv är genererade från Kelly-korpusen (`src/data/Kellys_*.xlsx`) via `scripts/import-kelly.mjs`. Verbens grupptillhörighet (1–4) klassificeras enligt Fasth–Kannermark-reglerna i `scripts/classify-verbs.mjs`, med en manuell override-tabell för oregelbundna ord och undantag som klassificeraren inte klarar automatiskt.

Konjunktions-/subjunktionsfrågorna i `questions.ts` samt adjektivets grupp A/B/C-frågor i `questions_adjektiv.ts` är handskrivna, inte importerade.

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`) bygger och publicerar appen till GitHub Pages vid varje push till `main`.

## Status / kända luckor

- **Tester:** Vitest och Playwright är konfigurerade, men det finns bara ett tomt exempeltest (`src/test/example.test.ts`). Ingen av quiz-logiken eller frågedatan är testad automatiskt.
- **Dödkod:** Se listan under [Projektstruktur](#projektstruktur) ovan – flera komponenter och en datafil används inte längre och kan städas bort.
- **Ämnen som saknas:** Pronomen, prepositioner, ordföljd m.m. finns inte som egna övningar ännu.

## Så fungerar konjunktion/subjunktion-övningen

Övningen använder ett tvåstegsformat i `src/components/GrammarApp.tsx` (funktionen `Quiz`), driven av data i `src/data/questions.ts`:

- **Steg 1 – identifiera funktionen:** Eleven ser meningen med en lucka (`___`) och väljer vilken logisk funktion bisatsen har i förhållande till huvudsatsen — för subjunktioner t.ex. *tid, orsak, villkor, motsats, avsikt, sätt, jämförande, påstående* eller *fråga* (10 kategorier, `SUBJ_GROUPS`), för konjunktioner *tillägg, alternativ, motsats, orsak* eller *konsekvens* (5 kategorier, `KONJ_GROUPS`). Ett felaktigt val ger bara "Fel – försök igen!" utan att visa rätt svar — eleven måste fortsätta resonera tills de klickar rätt kategori, och kan alltså inte gå vidare genom att chansa.
- **Steg 2 – välj rätt ord:** När rätt funktion är vald visas en bekräftande badge (t.ex. "Villkor ✓"), och eleven väljer bland 3–4 ordalternativ (t.ex. "ifall / som / medan / för att") som är distraktorer hämtade från andra kategorier. Detta svar avgör poängen för frågan.
- **Poängsättning:** Endast steg 2 räknas i slutresultatet; steg 1-felförsök kostar bara tid, inte poäng. Resultat sparas i `localStorage` och visas i testlistan.

Tre färdiga test finns: **Konjunktioner** (`fib-konj`), **Subjunktioner** (`fib-subj`) och **Blandat** (`fic-blandat`, båda typerna om varandra).

Tanken är att eleven tvingas resonera om *varför* bisatsen hänger ihop med huvudsatsen på ett visst sätt innan de ens ser vilka ord som är tänkbara — förstå kopplingen, sedan hitta rätt ord.
