import { useState, useEffect } from "react";
import { BUILT_IN_TESTS, CATEGORIES, KONJ_GROUPS, SUBJ_GROUPS } from "@/data/questions";
import { BUILT_IN_TESTS_ADJ, ADJ_CATEGORIES } from "@/data/questions_adjektiv";
import { BUILT_IN_TESTS_VERB, VERB_CATEGORIES } from "@/data/questions_verb";
import { VERB_BANK_TESTS } from "@/data/questions_verb_bank";
import { ADJ_BANK_TESTS } from "@/data/questions_adj_bank";
import { NOUN_BANK_TESTS, NOUN_BANK_CATEGORIES } from "@/data/questions_nouns";
import "@/styles/grammar.css";

const ALL_BUILT_IN = [...BUILT_IN_TESTS_VERB, ...VERB_BANK_TESTS, ...BUILT_IN_TESTS_ADJ, ...ADJ_BANK_TESTS, ...NOUN_BANK_TESTS, ...BUILT_IN_TESTS];

function load(k: string) { try { const r = localStorage.getItem(k); return r ? JSON.parse(r) : null } catch { return null } }
function save(k: string, v: any) { try { localStorage.setItem(k, JSON.stringify(v)) } catch {} }
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 5) }
function pct(s: number, t: number) { return Math.round(s / t * 100) }
function fmtDate(d: string) { return new Date(d).toLocaleDateString("sv-SE", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) }
function gradeClass(s: number, t: number) { const p = pct(s, t); return p >= 80 ? "badge-success" : p >= 50 ? "badge-warning" : "badge-danger" }
function scoreMsg(p: number) { return p === 100 ? "Perfekt – alla rätt!" : p >= 80 ? "Mycket bra jobbat!" : p >= 60 ? "Bra, fortsätt öva!" : p >= 40 ? "Läs igenom och försök igen!" : "Läs teorin och försök igen!" }

function QText({ text }: { text: string }) {
  const parts = text.split("___");
  return (
    <span className="q-text-el">
      {parts.map((p, i) => (
        <span key={i}>{p}{i < parts.length - 1 && <span className="q-blank">&nbsp;</span>}</span>
      ))}
    </span>
  );
}

const GROUP_INFO: Record<string, { label: string; desc: string }> = {
  "A":  { label: "Grupp A",   desc: "en, ett, någon/något, ingen/inget/inga, vilken, varje, annan…" },
  "B":  { label: "Grupp B",   desc: "den, det, de — den här/där, det här/där, de här/där…" },
  "C":  { label: "Grupp C",   desc: "min/mitt/mina, Evas (genitiv), samma, nästa, följande…" },
  "1":  { label: "Grupp 1",   desc: "–are, –ast  (de flesta adjektiv: rolig→roligare)" },
  "2":  { label: "Grupp 2",   desc: "–re, –st med omljud  (hög, ung, tung, låg, lång, stor, grov)" },
  "3":  { label: "Grupp 3",   desc: "oregelbundna  (gammal, liten, bra, dålig)" },
  "4":  { label: "Grupp 4",   desc: "mer / mest  (–isk adjektiv, perfekt och presens particip)" },
  "1v": { label: "Grupp 1",   desc: "–ar i presens · –ade i preteritum · –at i supinum" },
  "2a": { label: "Grupp 2a",  desc: "–er i presens · –de i preteritum · –t i supinum" },
  "2b": { label: "Grupp 2b",  desc: "–er i presens · –te i preteritum · –t i supinum (p/t/k/s/x)" },
  "3v": { label: "Grupp 3",   desc: "lång vokal · –r i presens · –dde i preteritum · –tt i supinum" },
  "4v": { label: "Grupp 4",   desc: "stark eller oregelbunden böjning – byter vokal i preteritum" },
  "n1": { label: "Dekl 1",    desc: "en-ord · plural -or  (flicka → flickan, flickor, flickorna)" },
  "n2": { label: "Dekl 2",    desc: "en-ord · plural -ar  (bil → bilen, bilar, bilarna)" },
  "n3": { label: "Dekl 3",    desc: "en-ord · plural -er  (hand → handen, händer, händerna)" },
  "n4": { label: "Dekl 4",    desc: "ett-ord · plural -n  (äpple → äpplet, äpplen, äpplena)" },
  "n5": { label: "Dekl 5",    desc: "ett-ord · plural = sg  (hus → huset, hus, husen)" },
};

// icon: emoji shown on colored square; iconBg/subColor used in CSS
const SUBJECTS = [
  { key: "Adjektiv",                     label: "Adjektiv",                     icon: "✦",  iconBg: "icon-blue",   subColor: "sub-blue",   sub: "Adjektivböjning och komparering",      categories: ["Adjektiv – grupper", "Adjektiv – komparering"] },
  { key: "Verb",                          label: "Verb",                          icon: "▶",  iconBg: "icon-green",  subColor: "sub-green",  sub: "Verbgrupper och böjning",              categories: ["Verb – grupper"] },
  { key: "Substantiv",                    label: "Substantiv",                    icon: "◈",  iconBg: "icon-orange", subColor: "sub-orange", sub: "Substantivdeklination 1–5",            categories: ["Substantiv – deklination"] },
  { key: "Konjunktioner & Subjunktioner", label: "Konjunktioner & Subjunktioner", icon: "⇌",  iconBg: "icon-red",    subColor: "sub-red",    sub: "Konjunktioner, subjunktioner, blandat", categories: ["Konjunktioner", "Subjunktioner", "Blandat"] },
];

function SubjectIcon({ icon, bg }: { icon: string; bg: string }) {
  return <div className={`item-icon ${bg}`}><span className="icon-sym">{icon}</span></div>;
}

// ── STUDENT TEST LIST ──
function StudentTests({ allTests, results, onSelect }: any) {
  const [subject, setSubject] = useState<string | null>(null);

  function last(id: string) {
    const r = [...results].filter((r: any) => r.testId === id)
      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    return r ? `${r.score}/${r.total}` : null;
  }

  // Level 1: subject picker
  if (!subject) {
    return (
      <div>
        <div className="topbar">
          <div className="topbar-icon">Sv</div>
          <span className="topbar-title">Svensk grammatik</span>
        </div>
        <div className="section-header">
          <div className="section-label">Välj ämne</div>
          <div className="section-sub">Vad vill du träna på idag?</div>
        </div>
        <div className="wrap">
          {SUBJECTS.map(s => {
            const count = allTests.filter((t: any) => s.categories.includes(t.category)).length;
            if (count === 0) return null;
            return (
              <button key={s.key} onClick={() => setSubject(s.key)} className="item-card">
                <SubjectIcon icon={s.icon} bg={s.iconBg} />
                <div style={{ flex: 1 }}>
                  <div className="item-title">{s.label}</div>
                  <div className={`item-sub ${s.subColor}`}>{s.sub}</div>
                </div>
                <span className="chevron">›</span>
              </button>
            );
          })}
          {results.length > 0 && (
            <div className="card g3">
              <div className="st" style={{ marginBottom: 10 }}>Senaste resultat</div>
              {[...results].sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5).map((r: any) => (
                <div className="row" key={r.id}>
                  <div style={{ flex: 1 }}>
                    <div className="rt">{r.testTitle}</div>
                    <div className="rm">{fmtDate(r.date)}</div>
                  </div>
                  <span className={`badge ${gradeClass(r.score, r.total)}`}>{r.score}/{r.total} · {pct(r.score, r.total)}%</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Level 2: test list within subject
  const s = SUBJECTS.find(x => x.key === subject)!;
  const testsInSubject = allTests.filter((t: any) => s.categories.includes(t.category));
  const usedCats = [...new Set(testsInSubject.map((t: any) => t.category as string))];

  return (
    <div>
      <div className="topbar">
        <button className="topbar-back" onClick={() => setSubject(null)}>‹</button>
        <span className="topbar-title">{s.label}</span>
      </div>
      <div className="section-header">
        <div className="section-label">Välj test</div>
        <div className="section-sub">{s.sub}</div>
      </div>
      <div className="wrap">
        {usedCats.map(cat => (
          <div key={cat}>
            {usedCats.length > 1 && (
              <div className="cat-label">{cat}</div>
            )}
            {testsInSubject.filter((t: any) => t.category === cat).map((t: any) => {
              const score = last(t.id);
              return (
                <button key={t.id} onClick={() => onSelect(t)} className="item-card">
                  <SubjectIcon icon={s.icon} bg={s.iconBg} />
                  <div style={{ flex: 1 }}>
                    <div className="item-title">{t.title}</div>
                    <div className={`item-sub ${s.subColor}`}>
                      {t.questions.length} frågor{score ? ` · Senaste: ${score}` : ""}
                    </div>
                  </div>
                  <span className="chevron">›</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── QUIZ ──
function Quiz({ test, onFinish, onBack }: any) {
  const [cur, setCur] = useState(0);
  const [ans, setAns] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [saved, setSaved] = useState(false);
  const [phase, setPhase] = useState(() => test.questions[0]?.type === "two_stage" ? "group" : "form");
  const [groupErr, setGroupErr] = useState(false);

  const total = test.questions.length;
  const q = test.questions[cur];
  const isTwoStage = q?.type === "two_stage";
  const sel = ans[q?.id];
  const keys = Object.keys(q?.options || {});

  useEffect(() => {
    setPhase(test.questions[cur]?.type === "two_stage" ? "group" : "form");
    setGroupErr(false);
  }, [cur, test.questions]);

  function pick(k: string) { if (!ans[q.id]) setAns(p => ({ ...p, [q.id]: k })) }
  function next() { cur < total - 1 ? setCur(c => c + 1) : setDone(true) }

  useEffect(() => {
    if (done && !saved) {
      const score = test.questions.filter((q: any) => ans[q.id] === q.correct).length;
      onFinish(score, total, ans);
      setSaved(true);
    }
  }, [done, saved, test.questions, ans, total, onFinish]);

  if (done) {
    const score = test.questions.filter((q: any) => ans[q.id] === q.correct).length;
    const p = pct(score, total);
    return (
      <div className="wrap" style={{ textAlign: "center", paddingTop: "2.5rem" }}>
        <div className="ring g3">
          <span style={{ fontSize: 32, fontWeight: 700, color: "#2563eb" }}>{score}</span>
          <span className="muted" style={{ fontSize: 12 }}>av {total}</span>
        </div>
        <div className="st g1">{p}% rätt</div>
        <div className="muted g1">{scoreMsg(p)}</div>
        <div className="fr g3" style={{ justifyContent: "center" }}>
          <button className="btn" onClick={onBack}>← Tillbaka</button>
          <button className="btn btn-p" onClick={() => { setCur(0); setAns({}); setDone(false); setSaved(false) }}>Gör om</button>
        </div>
      </div>
    );
  }

  const progBar = (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span className="muted">{test.title}</span>
        <span className="muted">{cur + 1} / {total}</span>
      </div>
      <div className="prog"><div className="prog-fill" style={{ width: `${((cur + 1) / total) * 100}%` }} /></div>
    </div>
  );

  // GROUP STAGE
  if (phase === "group" && isTwoStage) {
    const isVerbGroup = q.groupType === "verb_1234";
    const isKonj = q.groupType === "konj_type";
    const isSubj = q.groupType === "subj_type";
    const isNoun = q.groupType === "noun_dekl";

    const groupChoices =
      q.groupType === "adj_abc"   ? ["A", "B", "C"] :
      q.groupType === "comp_1234" ? ["1", "2", "3", "4"] :
      q.groupType === "verb_1234" ? ["1v", "2a", "2b", "3v", "4v"] :
      q.groupType === "konj_type" ? Object.keys(KONJ_GROUPS) :
      q.groupType === "subj_type" ? Object.keys(SUBJ_GROUPS) :
      q.groupType === "noun_dekl" ? ["1", "2", "3", "4", "5"] :
      ["A", "B", "C"];

    const displayToValue: Record<string, string> = { "1v": "1", "2a": "2a", "2b": "2b", "3v": "3", "4v": "4" };

    function handleGroupPick(displayKey: string) {
      const val = isVerbGroup ? (displayToValue[displayKey] || displayKey) : displayKey;
      if (val === q.correctGroup) { setPhase("form"); setGroupErr(false); }
      else setGroupErr(true);
    }

    function groupLabel(g: string) {
      if (isKonj) return { label: g.charAt(0).toUpperCase() + g.slice(1), desc: KONJ_GROUPS[g] };
      if (isSubj) return { label: g.charAt(0).toUpperCase() + g.slice(1), desc: SUBJ_GROUPS[g] };
      if (isNoun) return { label: GROUP_INFO[`n${g}`]?.label || `Dekl ${g}`, desc: GROUP_INFO[`n${g}`]?.desc || "" };
      return { label: GROUP_INFO[g]?.label || g, desc: GROUP_INFO[g]?.desc || "" };
    }

    return (
      <div className="wrap">
        <button className="back" onClick={onBack}>← Avbryt</button>
        {progBar}
        <div className="card" style={{ textAlign: "center", marginBottom: 16 }}>
          {isVerbGroup && <div className="muted" style={{ marginBottom: 4 }}>Imperativ</div>}
          <div className="quiz-word">{isVerbGroup ? `${q.word}!` : q.word}</div>
          {!isKonj && !isSubj && q.context && <div className="muted g1">{q.context}</div>}
          {(isKonj || isSubj) && q.context && <div className="g1"><QText text={q.context} /></div>}
        </div>
        <div className="muted" style={{ marginBottom: 10 }}>
          {q.groupType === "adj_abc"   ? "Vilken böjningsgrupp (A, B eller C) gäller?" :
           q.groupType === "noun_dekl" ? "Vilken deklination tillhör substantivet?" :
           q.groupType === "comp_1234" ? "Vilken komparationsgrupp (1–4) tillhör adjektivet?" :
           isVerbGroup ? "Vilken grupp tillhör verbet?" :
           isKonj ? "Vilken typ av konjunktion?" : "Vilken typ av subjunktion?"}
        </div>
        {groupErr && <div className="err" style={{ marginBottom: 10 }}>Fel – försök igen!</div>}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {groupChoices.map(g => {
            const { label, desc } = groupLabel(g);
            return (
              <button key={g} className="ans" onClick={() => handleGroupPick(g)}>
                <strong>{label}</strong>
                {(isKonj || isSubj || isNoun) && <span className="muted" style={{ marginLeft: 8 }}>{desc}</span>}
                {!isKonj && !isSubj && !isVerbGroup && !isNoun && cur === 0 && <span className="muted" style={{ marginLeft: 8 }}>{desc}</span>}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // FORM STAGE
  return (
    <div className="wrap">
      <button className="back" onClick={onBack}>← Avbryt</button>
      {progBar}
      {isTwoStage && (
        <div style={{ marginBottom: 12 }}>
          {(() => {
            const verbDisplayKey: Record<string, string> = { "1": "1v", "2a": "2a", "2b": "2b", "3": "3v", "4": "4v" };
            const isKonj2 = q.groupType === "konj_type";
            const isSubj2 = q.groupType === "subj_type";
            const isNoun2 = q.groupType === "noun_dekl";
            let label: string;
            if (isKonj2) label = q.correctGroup.charAt(0).toUpperCase() + q.correctGroup.slice(1);
            else if (isSubj2) label = q.correctGroup.charAt(0).toUpperCase() + q.correctGroup.slice(1);
            else if (isNoun2) label = GROUP_INFO[`n${q.correctGroup}`]?.label || `Dekl ${q.correctGroup}`;
            else {
              const key = q.groupType === "verb_1234" ? (verbDisplayKey[q.correctGroup] || q.correctGroup) : q.correctGroup;
              label = GROUP_INFO[key]?.label || key;
            }
            return <span className="badge badge-success">{label} ✓</span>;
          })()}
        </div>
      )}
      <div className="card" style={{ marginBottom: 16 }}>
        {isTwoStage
          ? <>
              <div className="quiz-word">{q.word}</div>
              {q.context && <div className="muted g1">{q.context}</div>}
            </>
          : <QText text={q.text} />
        }
      </div>
      {q.stageQ && <div className="muted" style={{ marginBottom: 12 }}>{q.stageQ}</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {keys.map(k => {
          let cls = "ans";
          if (sel) { if (k === q.correct) cls += " ok"; else if (k === sel) cls += " no"; }
          return (
            <button key={k} className={cls} data-locked={sel ? true : undefined} onClick={() => pick(k)}>
              <strong>{k}</strong>
              <span>{q.options[k]}</span>
            </button>
          );
        })}
      </div>
      {sel && (
        <div className="g2">
          <button className="btn btn-p btn-w" onClick={next}>
            {cur < total - 1 ? "Nästa →" : "Se resultat"}
          </button>
        </div>
      )}
    </div>
  );
}

// ── ROOT ──
export default function GrammarApp() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState("tests");
  const [activeTest, setActiveTest] = useState<any>(null);

  useEffect(() => {
    const r = load("quiz_results");
    setResults(r || []);
    setLoading(false);
  }, []);

  function handleFinish(score: number, total: number, answers: Record<string, string>) {
    const r = { id: uid(), testId: activeTest.id, testTitle: activeTest.title, score, total, date: new Date().toISOString(), answers };
    const u = [...results, r];
    setResults(u);
    save("quiz_results", u);
  }

  if (loading) return <div className="app"><div className="wrap"><div className="empty">Laddar…</div></div></div>;

  return (
    <div className="app">
      {step === "tests" && <StudentTests allTests={ALL_BUILT_IN} results={results} onSelect={(t: any) => { setActiveTest(t); setStep("quiz") }} />}
      {step === "quiz" && <Quiz test={activeTest} onFinish={handleFinish} onBack={() => setStep("tests")} />}
    </div>
  );
}
