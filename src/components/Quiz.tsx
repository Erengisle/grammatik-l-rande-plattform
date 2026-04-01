import { useState, useCallback } from "react";
import { generateQuestion, type QuizQuestion, type Group } from "@/data/quizData";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowRight, RotateCcw, Sparkles } from "lucide-react";

const groupDescriptions: Record<Group, string> = {
  A: "Obestämd form",
  B: "Bestämd form",
  C: "Bestämd adj. + obestämd subst.",
};

const groupColors: Record<Group, string> = {
  A: "bg-group-a",
  B: "bg-group-b",
  C: "bg-group-c",
};

const groupBorders: Record<Group, string> = {
  A: "border-group-a",
  B: "border-group-b",
  C: "border-group-c",
};

type Phase = "group" | "inflection" | "feedback";

export default function Quiz() {
  const [question, setQuestion] = useState<QuizQuestion>(generateQuestion);
  const [phase, setPhase] = useState<Phase>("group");
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [groupCorrect, setGroupCorrect] = useState<boolean | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerCorrect, setAnswerCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [streak, setStreak] = useState(0);

  const nextQuestion = useCallback(() => {
    setQuestion(generateQuestion());
    setPhase("group");
    setSelectedGroup(null);
    setGroupCorrect(null);
    setSelectedAnswer(null);
    setAnswerCorrect(null);
  }, []);

  const handleGroupSelect = (group: Group) => {
    if (groupCorrect !== null) return;
    setSelectedGroup(group);
    const correct = group === question.correctGroup;
    setGroupCorrect(correct);
    if (correct) {
      setTimeout(() => setPhase("inflection"), 600);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    if (answerCorrect !== null) return;
    setSelectedAnswer(answer);
    const correct = answer === question.correctAnswer;
    setAnswerCorrect(correct);
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setStreak((s) => (correct ? s + 1 : 0));
    setPhase("feedback");
  };

  const resetScore = () => {
    setScore({ correct: 0, total: 0 });
    setStreak(0);
    nextQuestion();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground tracking-tight">Adjektivträning</h1>
          </div>
          <div className="flex items-center gap-4 text-sm">
            {streak >= 3 && (
              <span className="bg-warning text-warning-foreground px-2 py-1 rounded-full text-xs font-bold animate-bounce">
                🔥 {streak}
              </span>
            )}
            <span className="text-muted-foreground">
              {score.correct}/{score.total}
            </span>
            <button onClick={resetScore} className="text-muted-foreground hover:text-foreground transition-colors">
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-start justify-center pt-8 sm:pt-16 px-4">
        <div className="w-full max-w-lg space-y-8">
          {/* Word display */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground uppercase tracking-widest">Böj rätt</p>
            <div className="flex items-baseline justify-center gap-3 flex-wrap">
              <span className="text-2xl sm:text-3xl font-bold text-primary">
                {question.determiner}
              </span>
              <span className="text-2xl sm:text-3xl font-medium text-foreground">
                {question.adjBase}
              </span>
              <span className="text-2xl sm:text-3xl font-medium text-foreground">
                {question.nounBase}
              </span>
            </div>
          </div>

          {/* Phase: Group selection */}
          {phase === "group" && (
            <div className="space-y-4">
              <p className="text-center text-sm text-muted-foreground">
                Vilken grupp tillhör böjningen?
              </p>
              <div className="grid grid-cols-3 gap-3">
                {(["A", "B", "C"] as Group[]).map((g) => {
                  const isSelected = selectedGroup === g;
                  const isCorrectGroup = g === question.correctGroup;
                  let variant = "";
                  if (groupCorrect !== null) {
                    if (isSelected && groupCorrect) variant = "ring-2 ring-success bg-success/10";
                    else if (isSelected && !groupCorrect) variant = "ring-2 ring-destructive bg-destructive/10";
                    else if (isCorrectGroup && !groupCorrect) variant = "ring-2 ring-success bg-success/10";
                  }

                  return (
                    <button
                      key={g}
                      onClick={() => handleGroupSelect(g)}
                      disabled={groupCorrect !== null}
                      className={`
                        relative rounded-xl border-2 p-4 transition-all duration-200
                        ${groupCorrect === null ? `border-border hover:${groupBorders[g]} hover:shadow-md active:scale-95` : "border-border"}
                        ${variant}
                      `}
                    >
                      <div className={`w-8 h-8 rounded-full ${groupColors[g]} mx-auto mb-2 flex items-center justify-center`}>
                        <span className="text-sm font-bold text-white">{g}</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-tight">
                        {groupDescriptions[g]}
                      </p>
                      {groupCorrect !== null && isSelected && (
                        <div className="absolute -top-2 -right-2">
                          {groupCorrect ? (
                            <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center">
                              <Check className="w-4 h-4 text-success-foreground" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-destructive flex items-center justify-center">
                              <X className="w-4 h-4 text-destructive-foreground" />
                            </div>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              {groupCorrect === false && (
                <div className="text-center space-y-2">
                  <p className="text-destructive text-sm font-medium">
                    Fel! Rätt grupp är <strong>{question.correctGroup}</strong> ({groupDescriptions[question.correctGroup]})
                  </p>
                  <Button onClick={nextQuestion} variant="outline" size="sm">
                    Nästa fråga <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Phase: Inflection selection */}
          {phase === "inflection" && (
            <div className="space-y-4">
              <p className="text-center text-sm text-muted-foreground">
                ✅ Rätt grupp! Välj rätt böjning:
              </p>
              <p className="text-center text-lg font-medium text-primary">
                {question.determiner} ___
              </p>
              <div className="space-y-3">
                {question.options.map((opt) => (
                  <button
                    key={opt.text}
                    onClick={() => handleAnswerSelect(opt.text)}
                    className="w-full text-left px-5 py-4 rounded-xl border-2 border-border
                      hover:border-primary hover:shadow-md transition-all duration-200
                      active:scale-[0.98] text-foreground font-medium text-lg"
                  >
                    {question.determiner} {opt.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Phase: Feedback */}
          {phase === "feedback" && (
            <div className="space-y-4">
              <div
                className={`rounded-xl p-6 text-center space-y-2 ${
                  answerCorrect
                    ? "bg-success/10 border-2 border-success"
                    : "bg-destructive/10 border-2 border-destructive"
                }`}
              >
                {answerCorrect ? (
                  <>
                    <div className="text-4xl">🎉</div>
                    <p className="text-lg font-bold text-success">Rätt!</p>
                    <p className="text-foreground text-xl font-medium">
                      {question.determiner} {question.correctAnswer}
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-4xl">😬</div>
                    <p className="text-lg font-bold text-destructive">Fel!</p>
                    <p className="text-muted-foreground text-sm">Du valde:</p>
                    <p className="text-foreground line-through opacity-60">
                      {question.determiner} {selectedAnswer}
                    </p>
                    <p className="text-muted-foreground text-sm mt-2">Rätt svar:</p>
                    <p className="text-foreground text-xl font-medium">
                      {question.determiner} {question.correctAnswer}
                    </p>
                  </>
                )}
              </div>
              <Button onClick={nextQuestion} className="w-full" size="lg">
                Nästa fråga <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
