import { useState, useCallback } from "react";
import {
  generateKomparationQuestion,
  type KomparationQuestion,
  type KompGroup,
  type KompFormType,
  groupDescriptionsKomp,
  groupRulesKomp,
} from "@/data/questions_komparation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, X, ArrowRight, RotateCcw, ArrowLeft } from "lucide-react";

const groupColors: Record<KompGroup, string> = {
  1: "bg-primary",
  2: "bg-secondary",
  3: "bg-destructive",
  4: "bg-accent",
};

type Phase = "group" | "form-type" | "write-answer" | "feedback";

interface Props {
  onBack: () => void;
}

export default function KomparationQuiz({ onBack }: Props) {
  const [question, setQuestion] = useState<KomparationQuestion>(generateKomparationQuestion);
  const [phase, setPhase] = useState<Phase>("group");
  const [selectedGroup, setSelectedGroup] = useState<KompGroup | null>(null);
  const [groupCorrect, setGroupCorrect] = useState<boolean | null>(null);
  const [selectedFormType, setSelectedFormType] = useState<KompFormType | null>(null);
  const [formTypeCorrect, setFormTypeCorrect] = useState<boolean | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [answerCorrect, setAnswerCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [streak, setStreak] = useState(0);

  const nextQuestion = useCallback(() => {
    setQuestion(generateKomparationQuestion());
    setPhase("group");
    setSelectedGroup(null);
    setGroupCorrect(null);
    setSelectedFormType(null);
    setFormTypeCorrect(null);
    setUserAnswer("");
    setAnswerCorrect(null);
  }, []);

  const handleGroupSelect = (group: KompGroup) => {
    if (groupCorrect !== null) return;
    setSelectedGroup(group);
    const correct = group === question.correctGroup;
    setGroupCorrect(correct);
    if (correct) {
      setTimeout(() => setPhase("form-type"), 600);
    }
  };

  const handleFormTypeSelect = (ft: KompFormType) => {
    if (formTypeCorrect !== null) return;
    setSelectedFormType(ft);
    const correct = ft === question.formType;
    setFormTypeCorrect(correct);
    if (correct) {
      setTimeout(() => setPhase("write-answer"), 600);
    }
  };

  const handleSubmitAnswer = () => {
    if (!userAnswer.trim()) return;
    const correct = userAnswer.trim().toLowerCase() === question.correctAnswer.toLowerCase();
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
      <header className="border-b border-border bg-card">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-foreground tracking-tight">Komparation</h1>
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
          {/* Word display */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground uppercase tracking-widest">Komparera adjektivet</p>
            <p className="text-2xl sm:text-3xl font-bold text-primary">{question.positiv}</p>
            <p className="text-sm text-muted-foreground">
              Skriv <strong>{question.formType === "komparativ" ? "komparativ" : "superlativ"}</strong>-formen
            </p>
          </div>

          {/* Phase: Group selection */}
          {phase === "group" && (
            <div className="space-y-4">
              <p className="text-center text-sm text-muted-foreground">Vilken grupp tillhör adjektivet?</p>
              <div className="grid grid-cols-2 gap-3">
                {([1, 2, 3, 4] as KompGroup[]).map((g) => {
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
                      className={`relative rounded-xl border-2 p-4 transition-all duration-200 border-border hover:shadow-md active:scale-95 ${variant}`}
                    >
                      <div className={`w-8 h-8 rounded-full ${groupColors[g]} mx-auto mb-2 flex items-center justify-center`}>
                        <span className="text-sm font-bold text-primary-foreground">{g}</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-tight">{groupDescriptionsKomp[g]}</p>
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
              {groupCorrect !== null && (
                <p className="text-center text-xs text-muted-foreground italic">
                  {groupRulesKomp[question.correctGroup]}
                </p>
              )}
              {groupCorrect === false && (
                <div className="text-center space-y-2">
                  <p className="text-destructive text-sm font-medium">
                    Fel! Rätt grupp är <strong>{question.correctGroup}</strong>
                  </p>
                  <Button onClick={nextQuestion} variant="outline" size="sm">
                    Nästa fråga <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Phase: Form type (komparativ eller superlativ?) */}
          {phase === "form-type" && (
            <div className="space-y-4">
              <p className="text-center text-sm text-muted-foreground">
                ✅ Rätt grupp! Ska det vara komparativ eller superlativ?
              </p>
              <div className="grid grid-cols-2 gap-3">
                {(["komparativ", "superlativ"] as KompFormType[]).map((ft) => {
                  const isSelected = selectedFormType === ft;
                  const isCorrect = ft === question.formType;
                  let variant = "";
                  if (formTypeCorrect !== null) {
                    if (isSelected && formTypeCorrect) variant = "ring-2 ring-success bg-success/10";
                    else if (isSelected && !formTypeCorrect) variant = "ring-2 ring-destructive bg-destructive/10";
                    else if (isCorrect && !formTypeCorrect) variant = "ring-2 ring-success bg-success/10";
                  }

                  return (
                    <button
                      key={ft}
                      onClick={() => handleFormTypeSelect(ft)}
                      disabled={formTypeCorrect !== null}
                      className={`rounded-xl border-2 border-border p-4 transition-all duration-200 hover:shadow-md active:scale-95 ${variant}`}
                    >
                      <p className="font-semibold text-foreground capitalize">{ft}</p>
                      <p className="text-xs text-muted-foreground">
                        {ft === "komparativ" ? "Jämförande form" : "Högsta graden"}
                      </p>
                    </button>
                  );
                })}
              </div>
              {formTypeCorrect === false && (
                <div className="text-center space-y-2">
                  <p className="text-destructive text-sm font-medium">
                    Fel! Det ska vara <strong>{question.formType}</strong>.
                  </p>
                  <Button onClick={nextQuestion} variant="outline" size="sm">
                    Nästa fråga <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Phase: Write answer */}
          {phase === "write-answer" && (
            <div className="space-y-4">
              <p className="text-center text-sm text-muted-foreground">
                ✅ Rätt! Skriv {question.formType}formen av <strong>{question.positiv}</strong>:
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmitAnswer();
                }}
                className="flex gap-3"
              >
                <Input
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder={`Skriv ${question.formType}...`}
                  className="text-lg"
                  autoFocus
                />
                <Button type="submit" disabled={!userAnswer.trim()}>
                  Svara
                </Button>
              </form>
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
                    <p className="text-foreground text-xl font-medium">{question.correctAnswer}</p>
                  </>
                ) : (
                  <>
                    <div className="text-4xl">😬</div>
                    <p className="text-lg font-bold text-destructive">Fel!</p>
                    <p className="text-muted-foreground text-sm">Du skrev:</p>
                    <p className="text-foreground line-through opacity-60">{userAnswer}</p>
                    <p className="text-muted-foreground text-sm mt-2">Rätt svar:</p>
                    <p className="text-foreground text-xl font-medium">{question.correctAnswer}</p>
                  </>
                )}
              </div>
              <div className="text-center text-xs text-muted-foreground space-y-1">
                <p>
                  <strong>Grupp {question.correctGroup}:</strong> {groupDescriptionsKomp[question.correctGroup]}
                </p>
                <p>
                  {question.entry.positiv} → {question.entry.komparativ} → {question.entry.superlativ} ({question.entry.superlativBest})
                </p>
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
