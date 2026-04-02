import { useState } from "react";
import TopicMenu, { type Topic } from "@/components/TopicMenu";
import Quiz from "@/components/Quiz";
import KomparationQuiz from "@/components/KomparationQuiz";

const Index = () => {
  const [topic, setTopic] = useState<Topic | null>(null);

  if (topic === "adjektiv-bojning") {
    return <Quiz onBack={() => setTopic(null)} />;
  }

  if (topic === "komparation") {
    return <KomparationQuiz onBack={() => setTopic(null)} />;
  }

  // TODO: verb, konjunktioner, subjunktioner quizzes
  if (topic) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Kommer snart!</p>
          <button
            onClick={() => setTopic(null)}
            className="text-primary underline"
          >
            ← Tillbaka
          </button>
        </div>
      </div>
    );
  }

  return <TopicMenu onSelect={setTopic} />;
};

export default Index;
