import { useState, useCallback } from "react";
import { BUILT_IN_TESTS_VERB } from "@/data/questions_verb";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowRight, RotateCcw, ArrowLeft } from "lucide-react";

type VerbQuestion = (typeof BUILT_IN_TESTS_VERB)[0]["questions"][0];

const groupLabels: Record<string, string> = {
  "1": "Grupp 1 (-ade)",
  "2a": "Grupp 2a (-de)",
  "2b": "Grupp 2b (-te)",
  "3": "Grupp 3 (-dde)",
  "4": "Grupp 4 (stark/oregelbunden)",
};

const allQuestions = BUILT_IN_TESTS_VERB.flatMap((t) => t.questions);

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

type Phase = "group" | "answer" | "feedback";

interface Props {
  onBack: () => void;
}

export default function VerbQuiz({ onBack }: Props) {
  const [question, setQuestion] = useState<VerbQuestion>(() => pickRandom(allQuestions));
  const [phase, setPhase] = useState<Phase>("group");
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [groupCorrect, setGroupCorrect] = useState<boolean | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerCorrect, setAnswerCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [streak, setStreak] = useState(0);

  const nextQuestion = useCallback(() => {
    setQuestion(pickRandom(allQuestions));
    setPhase("group");
    setSelectedGroup(null);
    setGroupCorrect(null);
    setSelectedAnswer(null);
    setAnswerCorrect(null);
  }, []);

  const handleGroupSelect = (group: string) => {
    if (groupCorrect !== null) return;
    setSelectedGroup(group);
    const correct = group === question.correctGroup;
    setGroupCorrect(correct);
    if (correct) {
      setTimeout(() => setPhase("answer"), 600);
    }
  };

  const handleAnswerSelect = (key: string) => {
    if (answerCorrect !== null) return;
    setSelectedAnswer(key);
    const correct = key === question.correct;
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

  const groups = ["1", "2a", "2b", "3", "4"];
  const optionKeys = Object.keys(question.options) as (keyof typeof question.options)[];
  const correctAnswerText = question.options[question.correct as keyof typeof question.options];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-foreground tracking-tight">Verbböjning</h1>
          </div>
          <div className="flex items-center gap-4 text-sm">
            {streak >= 3 && (
              <span className="bg-warning text-warning-foreground px-2 py-1 rounded-full text-xs font-bold animate-bounce">
                🔥 {streak}
              </span>
            )}
            <span className="text-muted-foreground">{score.correct}/{score.total}</span>
            <button onClick={resetScore} className="text-muted-foreground hover:text-foreground transition-colors">
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-start justify-center pt-8 sm:pt-16 px-4">
        <div className="w-full max-w-lg space-y-8">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground uppercase tracking-widest">Imperativ</p>
            <p className="text-2xl sm:text-3xl font-bold text-primary">{question.word}!</p>
            <p className="text-muted-foreground text-sm italic">{question.context}</p>
          </div>

          {phase === "group" && (
            <div className="space-y-4">
              <p className="text-center text-sm text-muted-foreground">Vilken verbgrupp?</p>
              <div className="grid grid-cols-2 gap-3">
                {groups.map((g) => {
                  const isSelected = selectedGroup === g;
                  const isCorrectG = g === question.correctGroup;
                  let variant = "";
                  if (groupCorrect !== null) {
                    if (isSelected && groupCorrect) variant = "ring-2 ring-success bg-success/10";
                    else if (isSelected && !groupCorrect) variant = "ring-2 ring-destructive bg-destructive/10";
                    else if (isCorrectG && !groupCorrect) variant = "ring-2 ring-success bg-success/10";
                  }
                  return (
                    <button
                      key={g}
                      onClick={() => handleGroupSelect(g)}
                      disabled={groupCorrect !== null}
                      className={`rounded-xl border-2 border-border p-4 transition-all duration-200 hover:shadow-md active:scale-95 ${variant}`}
                    >
                      <p className="font-semibold text-foreground">{g}</p>
                      <p className="text-xs text-muted-foreground">{groupLabels[g]}</p>
                      {groupCorrect !== null && isSelected && (
                        <div className="absolute -top-2 -right-2">
                          {groupCorrect ? (
                            <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center"><Check className="w-4 h-4 text-success-foreground" /></div>
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-destructive flex items-center justify-center"><X className="w-4 h-4 text-destructive-foreground" /></div>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              {groupCorrect === false && (
                <div className="text-center space-y-2">
                  <p className="text-destructive text-sm font-medium">Fel! Rätt grupp är <strong>{question.correctGroup}</strong></p>
                  <Button onClick={nextQuestion} variant="outline" size="sm">Nästa fråga <ArrowRight className="w-4 h-4 ml-1" /></Button>
                </div>
              )}
            </div>
          )}

          {phase === "answer" && (
            <div className="space-y-4">
              <p className="text-center text-sm text-muted-foreground">✅ Rätt grupp! {question.stageQ}</p>
              <div className="space-y-3">
                {optionKeys.map((key) => (
                  <button
                    key={key}
                    onClick={() => handleAnswerSelect(key)}
                    className="w-full text-left px-5 py-4 rounded-xl border-2 border-border hover:border-primary hover:shadow-md transition-all duration-200 active:scale-[0.98] text-foreground font-medium text-lg"
                  >
                    {key}) {question.options[key]}
                  </button>
                ))}
              </div>
            </div>
          )}

          {phase === "feedback" && (
            <div className="space-y-4">
              <div className={`rounded-xl p-6 text-center space-y-2 ${answerCorrect ? "bg-success/10 border-2 border-success" : "bg-destructive/10 border-2 border-destructive"}`}>
                {answerCorrect ? (
                  <>
                    <div className="text-4xl">🎉</div>
                    <p className="text-lg font-bold text-success">Rätt!</p>
                    <p className="text-foreground text-xl font-medium">{correctAnswerText}</p>
                  </>
                ) : (
                  <>
                    <div className="text-4xl">😬</div>
                    <p className="text-lg font-bold text-destructive">Fel!</p>
                    <p className="text-muted-foreground text-sm">Du valde:</p>
                    <p className="text-foreground line-through opacity-60">{selectedAnswer && question.options[selectedAnswer as keyof typeof question.options]}</p>
                    <p className="text-muted-foreground text-sm mt-2">Rätt svar:</p>
                    <p className="text-foreground text-xl font-medium">{correctAnswerText}</p>
                  </>
                )}
              </div>
              <Button onClick={nextQuestion} className="w-full" size="lg">Nästa fråga <ArrowRight className="w-4 h-4 ml-2" /></Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
