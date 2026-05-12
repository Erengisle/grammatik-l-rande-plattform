import { useState } from "react";
import { VERB_GRUPPER, type VerbGrupp } from "@/data/verb_grupper";
import { ArrowLeft, ArrowRight, RotateCcw, Trophy } from "lucide-react";

const QUESTIONS_PER_ROUND = 20;

const GROUP_COLORS: Record<string, { idle: string; active: string }> = {
  "1":  { idle: "hover:border-blue-500   hover:bg-blue-500/10   hover:text-blue-600",  active: "border-blue-500   bg-blue-500/15   text-blue-700   dark:text-blue-300" },
  "2a": { idle: "hover:border-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-600", active: "border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" },
  "2b": { idle: "hover:border-cyan-500   hover:bg-cyan-500/10   hover:text-cyan-600",  active: "border-cyan-500   bg-cyan-500/15   text-cyan-700   dark:text-cyan-300" },
  "3":  { idle: "hover:border-violet-500 hover:bg-violet-500/10 hover:text-violet-600", active: "border-violet-500 bg-violet-500/15 text-violet-700 dark:text-violet-300" },
  "4":  { idle: "hover:border-amber-500  hover:bg-amber-500/10  hover:text-amber-600",  active: "border-amber-500  bg-amber-500/15  text-amber-700  dark:text-amber-300" },
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function resultMessage(pct: number) {
  if (pct === 100) return "Perfekt – alla rätt!";
  if (pct >= 80)  return "Riktigt bra jobbat!";
  if (pct >= 60)  return "Bra, fortsätt öva!";
  return "Läs igenom grupperna och försök igen.";
}

interface Props {
  onBack: () => void;
}

export default function VerbGruppSpel({ onBack }: Props) {
  const [queue, setQueue] = useState<VerbGrupp[]>(() =>
    shuffle(VERB_GRUPPER).slice(0, QUESTIONS_PER_ROUND)
  );
  const [index, setIndex]   = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore]   = useState(0);
  const [streak, setStreak] = useState(0);
  const [best, setBest]     = useState(0);

  const current    = queue[index];
  const isAnswered = selected !== null;
  const isDone     = index >= queue.length;
  const isCorrect  = selected === current?.grupp;

  function handleSelect(g: string) {
    if (isAnswered) return;
    setSelected(g);
    if (g === current.grupp) {
      setScore(s => s + 1);
      setStreak(s => {
        const ns = s + 1;
        setBest(b => Math.max(b, ns));
        return ns;
      });
    } else {
      setStreak(0);
    }
  }

  function handleNext() {
    setIndex(i => i + 1);
    setSelected(null);
  }

  function handleRestart() {
    setQueue(shuffle(VERB_GRUPPER).slice(0, QUESTIONS_PER_ROUND));
    setIndex(0);
    setSelected(null);
    setScore(0);
    setStreak(0);
    setBest(0);
  }

  const groups = ["1", "2a", "2b", "3", "4"];

  // ── RESULT SCREEN ──────────────────────────────────────────────
  if (isDone) {
    const pct = Math.round((score / queue.length) * 100);
    const ringColor =
      pct === 100 ? "text-emerald-500" :
      pct >= 80   ? "text-blue-500" :
      pct >= 60   ? "text-amber-500" : "text-rose-500";

    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-sm space-y-6 text-center">
          <Trophy className={`w-12 h-12 mx-auto ${ringColor}`} />
          <div>
            <p className={`text-7xl font-black ${ringColor}`}>{pct}%</p>
            <p className="text-xl font-semibold text-foreground mt-1">{score} av {queue.length} rätt</p>
          </div>
          <p className="text-muted-foreground">{resultMessage(pct)}</p>
          {best >= 3 && (
            <p className="text-sm text-muted-foreground">Bästa streak: 🔥 {best}</p>
          )}
          <div className="flex gap-3 justify-center pt-2">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl border-2 border-border font-semibold text-foreground hover:bg-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />Tillbaka
            </button>
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold hover:opacity-90 active:scale-95 transition-all"
            >
              <RotateCcw className="w-4 h-4" />Ny omgång
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── GAME SCREEN ────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 -ml-1"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-4 text-sm font-medium">
            {streak >= 3 && (
              <span className="text-amber-500 font-bold animate-bounce">🔥 {streak}</span>
            )}
            <span className="text-muted-foreground">{score}/{index} rätt</span>
            <span className="text-muted-foreground">{index + 1}/{queue.length}</span>
          </div>
        </div>
        <div className="max-w-lg mx-auto px-4 pb-3">
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${(index / queue.length) * 100}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 gap-10">

        {/* Verb */}
        <div className="text-center space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Imperativ</p>
          <p
            key={current.imperativ}
            className="text-6xl sm:text-7xl font-black text-primary tracking-tight"
            style={{ animation: "fadeSlideIn 0.2s ease-out" }}
          >
            {current.imperativ}!
          </p>
        </div>

        {/* Feedback banner */}
        {isAnswered && (
          <div
            className={`w-full max-w-md rounded-2xl px-6 py-4 text-center font-semibold text-base transition-all ${
              isCorrect
                ? "bg-emerald-500/15 border-2 border-emerald-500 text-emerald-700 dark:text-emerald-300"
                : "bg-rose-500/15 border-2 border-rose-500 text-rose-700 dark:text-rose-300"
            }`}
          >
            {isCorrect
              ? "✓ Rätt!"
              : `✗ Fel – rätt svar: Grupp ${current.grupp}`}
          </div>
        )}

        {/* Group buttons */}
        <div className="w-full max-w-md grid grid-cols-5 gap-3">
          {groups.map(g => {
            const colors = GROUP_COLORS[g];
            let cls: string;

            if (!isAnswered) {
              cls = `border-2 border-border bg-card rounded-2xl py-5 text-center font-bold text-lg transition-all duration-150 cursor-pointer active:scale-95 ${colors.idle}`;
            } else if (g === current.grupp) {
              cls = `border-2 rounded-2xl py-5 text-center font-bold text-lg ${colors.active}`;
            } else if (g === selected) {
              cls = "border-2 border-rose-500 bg-rose-500/15 rounded-2xl py-5 text-center font-bold text-lg text-rose-700 dark:text-rose-400 opacity-90";
            } else {
              cls = "border-2 border-border rounded-2xl py-5 text-center font-bold text-lg text-muted-foreground opacity-30";
            }

            return (
              <button key={g} onClick={() => handleSelect(g)} disabled={isAnswered} className={cls}>
                {g}
              </button>
            );
          })}
        </div>

        {/* Next button */}
        {isAnswered && (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-2xl font-semibold text-lg hover:opacity-90 active:scale-95 transition-all"
          >
            {index + 1 < queue.length ? "Nästa" : "Se resultat"}
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </main>
    </div>
  );
}
