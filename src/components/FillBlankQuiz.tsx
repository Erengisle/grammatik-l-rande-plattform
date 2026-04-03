import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowRight, RotateCcw, ArrowLeft } from "lucide-react";

interface QuestionData {
  id: string;
  text: string;
  options: Record<string, string>;
  correct: string;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

type Phase = "answer" | "feedback";

interface Props {
  title: string;
  questions: QuestionData[];
  onBack: () => void;
}

export default function FillBlankQuiz({ title, questions, onBack }: Props) {
  const [question, setQuestion] = useState<QuestionData>(() => pickRandom(questions));
  const [phase, setPhase] = useState<Phase>("answer");
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerCorrect, setAnswerCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [streak, setStreak] = useState(0);

  const nextQuestion = useCallback(() => {
    setQuestion(pickRandom(questions));
    setPhase("answer");
    setSelectedAnswer(null);
    setAnswerCorrect(null);
  }, [questions]);

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

  const optionKeys = Object.keys(question.options);
  const correctAnswerText = question.options[question.correct];

  // Split the sentence at ___ to highlight the blank
  const parts = question.text.split("___");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-foreground tracking-tight">{title}</h1>
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
            <p className="text-sm text-muted-foreground uppercase tracking-widest">Fyll i rätt ord</p>
            <p className="text-lg sm:text-xl font-medium text-foreground leading-relaxed">
              {parts[0]}
              <span className="inline-block min-w-[4rem] border-b-2 border-primary mx-1 text-primary font-bold">
                {phase === "feedback" ? correctAnswerText : "___"}
              </span>
              {parts[1]}
            </p>
          </div>

          {phase === "answer" && (
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
                    <p className="text-foreground line-through opacity-60">{selectedAnswer && question.options[selectedAnswer]}</p>
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
