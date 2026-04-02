import { Sparkles, BookOpen, Languages, Link2, GitBranch, ArrowUpDown } from "lucide-react";

export type Topic = "adjektiv-bojning" | "komparation" | "verb" | "konjunktioner" | "subjunktioner";

interface TopicOption {
  id: Topic;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const topics: TopicOption[] = [
  {
    id: "adjektiv-bojning",
    title: "Adjektivböjning",
    description: "Grupp A, B, C – välj rätt böjning av adjektivet",
    icon: <Sparkles className="w-6 h-6" />,
    color: "bg-primary",
  },
  {
    id: "komparation",
    title: "Komparation",
    description: "Grupp I–IV – komparativ och superlativ",
    icon: <ArrowUpDown className="w-6 h-6" />,
    color: "bg-secondary",
  },
  {
    id: "verb",
    title: "Verb",
    description: "Verbböjning – grupp 1–4",
    icon: <BookOpen className="w-6 h-6" />,
    color: "bg-accent",
  },
  {
    id: "konjunktioner",
    title: "Konjunktioner",
    description: "Välj rätt konjunktion i meningar",
    icon: <Link2 className="w-6 h-6" />,
    color: "bg-destructive",
  },
  {
    id: "subjunktioner",
    title: "Subjunktioner",
    description: "Välj rätt subjunktion i meningar",
    icon: <GitBranch className="w-6 h-6" />,
    color: "bg-primary",
  },
];

interface Props {
  onSelect: (topic: Topic) => void;
}

export default function TopicMenu({ onSelect }: Props) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-2">
          <Languages className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-bold text-foreground tracking-tight">Svensk grammatik</h1>
        </div>
      </header>

      <main className="flex-1 flex items-start justify-center pt-8 sm:pt-16 px-4">
        <div className="w-full max-w-lg space-y-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground uppercase tracking-widest">Välj ämne</p>
            <p className="text-muted-foreground text-sm">Vad vill du träna på idag?</p>
          </div>

          <div className="space-y-3">
            {topics.map((t) => (
              <button
                key={t.id}
                onClick={() => onSelect(t.id)}
                className="w-full flex items-center gap-4 p-5 rounded-xl border-2 border-border bg-card
                  hover:border-primary hover:shadow-md transition-all duration-200 active:scale-[0.98] text-left"
              >
                <div className={`w-12 h-12 rounded-xl ${t.color} flex items-center justify-center text-primary-foreground shrink-0`}>
                  {t.icon}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{t.title}</p>
                  <p className="text-sm text-muted-foreground">{t.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
