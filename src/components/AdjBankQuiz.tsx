import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, RotateCcw, ArrowLeft } from "lucide-react";
import { KONJ_GROUPS, SUBJ_GROUPS } from "@/data/questions";

interface AdjQuestion {
  id: string;
  type: string;
  word: string;
  context: string;
  groupType: string;
  correctGroup: string;
  stageQ: string;
  options: Record<string, string>;
  correct: string;
}

interface TestSet {
  id: string;
  title: string;
  questions: AdjQuestion[];
}

type Phase = "pick-test" | "group" | "answer" | "feedback";

interface Props {
  tests: TestSet[];
  onBack: () => void;
  singleTest?: boolean;
  groupLabels?: string[];
}

export default function AdjBankQuiz({ tests, onBack, singleTest, groupLabels }: Props) {
  // Determine groups from the first question's groupType, or use provided labels
  const firstQ = tests[0]?.questions[0];
  const isKonj = firstQ?.groupType === "konj_type";
  const isSubj = firstQ?.groupType === "subj_type";
  const groups = isKonj ? Object.keys(KONJ_GROUPS) : isSubj ? Object.keys(SUBJ_GROUPS) : (groupLabels || ["A", "B", "C"]);
  const [selectedTest, setSelectedTest] = useState<TestSet | null>(singleTest ? tests[0] : null);
  const [qIndex, setQIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>(singleTest ? "group" : "pick-test");
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [groupCorrect, setGroupCorrect] = useState<boolean | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerCorrect, setAnswerCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [streak, setStreak] = useState(0);

  const question = selectedTest?.questions[qIndex] ?? null;

  const handleTestSelect = (test: TestSet) => {
    setSelectedTest(test);
    setQIndex(0);
    setPhase("group");
    setScore({ correct: 0, total: 0 });
    setStreak(0);
  };

  const handleGroupSelect = (group: string) => {
    if (groupCorrect !== null) return;
    setSelectedGroup(group);
    const correct = group === question!.correctGroup;
    setGroupCorrect(correct);
    // Auto-advance to answer phase after short delay
    setTimeout(() => setPhase("answer"), 800);
  };

  const handleAnswerSelect = (key: string) => {
    if (answerCorrect !== null) return;
    setSelectedAnswer(key);
    const correct = key === question!.correct;
    setAnswerCorrect(correct);
    const bothCorrect = correct && groupCorrect === true;
    setScore(s => ({ correct: s.correct + (bothCorrect ? 1 : 0), total: s.total + 1 }));
    setStreak(s => bothCorrect ? s + 1 : 0);
    setPhase("feedback");
  };

  const nextQuestion = useCallback(() => {
    if (!selectedTest) return;
    const next = qIndex + 1;
    if (next >= selectedTest.questions.length) {
      if (singleTest) { onBack(); return; }
      setPhase("pick-test");
      setSelectedTest(null);
      return;
    }
    setQIndex(next);
    setPhase("group");
    setSelectedGroup(null);
    setGroupCorrect(null);
    setSelectedAnswer(null);
    setAnswerCorrect(null);
  }, [qIndex, selectedTest]);

  const goBackToTests = () => {
    if (singleTest) { onBack(); return; }
    setSelectedTest(null);
    setPhase("pick-test");
  };

  // --- Pick test screen ---
  if (phase === "pick-test") {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="border-b border-border bg-card">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-2">
            <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-foreground tracking-tight">Adjektivbank</h1>
          </div>
        </header>
        <main className="flex-1 flex items-start justify-center pt-8 px-4">
          <div className="w-full max-w-lg space-y-4">
            <p className="text-sm text-muted-foreground uppercase tracking-widest text-center">Välj test</p>
            <div className="grid grid-cols-2 gap-3">
              {tests.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => handleTestSelect(t)}
                  className="p-4 rounded-xl border-2 border-border bg-card hover:border-primary hover:shadow-md transition-all text-left"
                >
                  <p className="font-semibold text-foreground text-sm">Test {i + 1}</p>
                  <p className="text-xs text-muted-foreground">{t.questions.length} frågor</p>
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!question) return null;

  const contextParts = question.context.split("___");
  const correctAnswerText = question.options[question.correct];
  const isKonjQ = question.groupType === "konj_type";
  const isSubjQ = question.groupType === "subj_type";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={goBackToTests} className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-foreground tracking-tight">
              Adjektiv: <span className="text-primary">{question.word}</span>
            </h1>
          </div>
          <div className="flex items-center gap-4 text-sm">
            {streak >= 3 && (
              <span className="bg-warning text-warning-foreground px-2 py-1 rounded-full text-xs font-bold animate-bounce">
                🔥 {streak}
              </span>
            )}
            <span className="text-muted-foreground">{score.correct}/{score.total}</span>
            <span className="text-muted-foreground text-xs">{qIndex + 1}/{selectedTest!.questions.length}</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-start justify-center pt-8 sm:pt-16 px-4">
        <div className="w-full max-w-lg space-y-8">
          {/* Context sentence */}
          <div className="text-center space-y-2">
            <p className="text-lg sm:text-xl font-medium text-foreground leading-relaxed">
              {contextParts[0]}
              <span className="inline-block min-w-[4rem] border-b-2 border-primary mx-1 text-primary font-bold">
                {phase === "feedback" ? correctAnswerText : "___"}
              </span>
              {contextParts[1]}
            </p>
            <p className="text-sm text-muted-foreground">
              Grundform: <span className="font-semibold text-foreground">{question.word}</span>
            </p>
          </div>

          {/* Stage 1: Group selection */}
          {phase === "group" && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground uppercase tracking-widest text-center">
                {isKonjQ || isSubjQ ? (isKonjQ ? "Vilken typ av konjunktion?" : "Vilken typ av subjunktion?") : "Steg 1: Vilken grupp?"}
              </p>
              <div className={`${isKonjQ || isSubjQ ? "flex flex-col gap-2" : `grid gap-3 ${groups.length <= 3 ? "grid-cols-3" : "grid-cols-4"}`}`}>
                {groups.map(g => {
                  const isKonjSubj = isKonjQ || isSubjQ;
                  const displayLabel = isKonjQ
                    ? KONJ_GROUPS[g]
                    : isSubjQ
                    ? SUBJ_GROUPS[g]
                    : `Grupp ${g}`;
                  return (
                    <button
                      key={g}
                      onClick={() => handleGroupSelect(g)}
                      disabled={groupCorrect !== null}
                      className={`${isKonjSubj ? "py-3 px-4 text-left text-sm" : "py-4 text-lg"} rounded-xl border-2 font-bold transition-all duration-200
                        ${selectedGroup === g
                          ? groupCorrect
                            ? "border-green-500 bg-green-500/10 text-green-700"
                            : "border-destructive bg-destructive/10 text-destructive"
                          : selectedGroup && g === question.correctGroup
                            ? "border-green-500 bg-green-500/10 text-green-700"
                            : "border-border hover:border-primary text-foreground"
                        }`}
                    >
                      {displayLabel}
                    </button>
                  );
                })}
              </div>
              {groupCorrect === false && (
                <p className="text-center text-sm text-destructive">Rätt typ: {isKonjQ ? KONJ_GROUPS[question.correctGroup] : isSubjQ ? SUBJ_GROUPS[question.correctGroup] : question.correctGroup}</p>
              )}
            </div>
          )}

          {/* Stage 2: Answer selection */}
          {phase === "answer" && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground uppercase tracking-widest text-center">Steg 2: Välj rätt form</p>
              {groupCorrect !== null && (
                <p className={`text-center text-sm ${groupCorrect ? "text-green-600" : "text-destructive"}`}>
                  Grupp: {groupCorrect ? "✅ Rätt" : `❌ Fel (rätt: ${question.correctGroup})`}
                </p>
              )}
              <div className="space-y-3">
                {Object.entries(question.options).map(([key, val]) => (
                  <button
                    key={key}
                    onClick={() => handleAnswerSelect(key)}
                    className="w-full text-left px-5 py-4 rounded-xl border-2 border-border hover:border-primary hover:shadow-md transition-all duration-200 active:scale-[0.98] text-foreground font-medium text-lg"
                  >
                    {key}) {val}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Feedback */}
          {phase === "feedback" && (
            <div className="space-y-4">
              <div className={`rounded-xl p-6 text-center space-y-2 ${
                answerCorrect && groupCorrect
                  ? "bg-green-500/10 border-2 border-green-500"
                  : "bg-destructive/10 border-2 border-destructive"
              }`}>
                {answerCorrect && groupCorrect ? (
                  <>
                    <div className="text-4xl">🎉</div>
                    <p className="text-lg font-bold text-green-600">Helt rätt!</p>
                    <p className="text-foreground text-xl font-medium">{correctAnswerText}</p>
                  </>
                ) : (
                  <>
                    <div className="text-4xl">😬</div>
                    {!groupCorrect && (
                      <p className="text-sm text-muted-foreground">Grupp: <span className="text-destructive font-bold">{selectedGroup}</span> → Rätt: <span className="font-bold text-foreground">{question.correctGroup}</span></p>
                    )}
                    {!answerCorrect && (
                      <>
                        <p className="text-sm text-muted-foreground">Du valde: <span className="line-through opacity-60">{selectedAnswer && question.options[selectedAnswer]}</span></p>
                      </>
                    )}
                    <p className="text-muted-foreground text-sm mt-2">Rätt svar:</p>
                    <p className="text-foreground text-xl font-medium">{correctAnswerText}</p>
                  </>
                )}
              </div>
              <Button onClick={nextQuestion} className="w-full" size="lg">
                {qIndex + 1 >= selectedTest!.questions.length ? "Avsluta test" : "Nästa fråga"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
