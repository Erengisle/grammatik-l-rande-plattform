import { useState } from "react";
import TopicMenu, { type Topic } from "@/components/TopicMenu";
import Quiz from "@/components/Quiz";
import KomparationQuiz from "@/components/KomparationQuiz";
import VerbQuiz from "@/components/VerbQuiz";
import FillBlankQuiz from "@/components/FillBlankQuiz";
import AdjBankQuiz from "@/components/AdjBankQuiz";
import { FIB_KONJ, FIB_SUBJ, FIC_BLANDAT } from "@/data/questions";
import { ADJ_BANK_TESTS } from "@/data/questions_adj_bank";
import { BUILT_IN_TESTS_ADJ } from "@/data/questions_adjektiv";
import { BUILT_IN_TESTS_VERB } from "@/data/questions_verb";
import { VERB_BANK_TESTS } from "@/data/questions_verb_bank";

const Index = () => {
  const [topic, setTopic] = useState<Topic | null>(null);

  const goBack = () => setTopic(null);

  if (topic === "adjektiv-bojning") return <Quiz onBack={goBack} />;
  if (topic === "komparation") return <KomparationQuiz onBack={goBack} />;
  if (topic === "verb") return <VerbQuiz onBack={goBack} />;
  if (topic === "konjunktioner") return <FillBlankQuiz title="Konjunktioner" questions={FIB_KONJ} onBack={goBack} />;
  if (topic === "subjunktioner") return <FillBlankQuiz title="Subjunktioner" questions={FIB_SUBJ} onBack={goBack} />;
  if (topic === "blandat") return <FillBlankQuiz title="Blandat (konj. & subj.)" questions={FIC_BLANDAT} onBack={goBack} />;
  if (topic === "adjektiv-bank") return <AdjBankQuiz tests={ADJ_BANK_TESTS} onBack={goBack} />;
  if (topic === "adj-grupp-abc") return <AdjBankQuiz tests={[BUILT_IN_TESTS_ADJ[0]]} onBack={goBack} singleTest />;
  if (topic === "adj-komp-1234") return <AdjBankQuiz tests={[BUILT_IN_TESTS_ADJ[1]]} onBack={goBack} singleTest groupLabels={["1","2","3","4"]} />;
  if (topic === "verb-grupp") return <AdjBankQuiz tests={BUILT_IN_TESTS_VERB} onBack={goBack} groupLabels={["1","2a","2b","3","4"]} />;
  if (topic === "verb-bank") return <AdjBankQuiz tests={VERB_BANK_TESTS} onBack={goBack} groupLabels={["1","2a","2b","3","4"]} />;

  return <TopicMenu onSelect={setTopic} />;
};

export default Index;
