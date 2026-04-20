import { useState, useEffect } from "react";
import { BUILT_IN_TESTS, CATEGORIES, KONJ_GROUPS, SUBJ_GROUPS } from "@/data/questions";
import { BUILT_IN_TESTS_ADJ, ADJ_CATEGORIES } from "@/data/questions_adjektiv";
import { BUILT_IN_TESTS_VERB, VERB_CATEGORIES } from "@/data/questions_verb";
import { VERB_BANK_TESTS } from "@/data/questions_verb_bank";
import { ADJ_BANK_TESTS } from "@/data/questions_adj_bank";
import { NOUN_BANK_TESTS, NOUN_BANK_CATEGORIES } from "@/data/questions_nouns";
import "@/styles/grammar.css";

const ALL_BUILT_IN = [...BUILT_IN_TESTS_VERB, ...VERB_BANK_TESTS, ...BUILT_IN_TESTS_ADJ, ...ADJ_BANK_TESTS, ...NOUN_BANK_TESTS, ...BUILT_IN_TESTS];
const ALL_CATEGORIES = [...CATEGORIES, ...ADJ_CATEGORIES, ...VERB_CATEGORIES, ...NOUN_BANK_CATEGORIES];

const ADMIN_PIN = "6498";

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

// ── GROUP INFO ──
const GROUP_INFO: Record<string, { label: string; desc: string }> = {
  "A": { label: "Grupp A", desc: "en, ett, någon/något, ingen/inget/inga, vilken, varje, annan…" },
  "B": { label: "Grupp B", desc: "den, det, de — den här/där, det här/där, de här/där…" },
  "C": { label: "Grupp C", desc: "min/mitt/mina, Evas (genitiv), samma, nästa, följande…" },
  "1": { label: "Grupp 1", desc: "–are, –ast  (de flesta adjektiv: rolig→roligare)" },
  "2": { label: "Grupp 2", desc: "–re, –st med omljud  (hög, ung, tung, låg, lång, stor, grov)" },
  "3": { label: "Grupp 3", desc: "oregelbundna  (gammal, liten, bra, dålig)" },
  "4": { label: "Grupp 4", desc: "mer / mest  (–isk adjektiv, perfekt och presens particip)" },
  "1v": { label: "Grupp 1", desc: "–ar i presens · –ade i preteritum · –at i supinum" },
  "2a": { label: "Grupp 2a", desc: "–er i presens · –de i preteritum · –t i supinum" },
  "2b": { label: "Grupp 2b", desc: "–er i presens · –te i preteritum · –t i supinum (p/t/k/s/x i stammen)" },
  "3v": { label: "Grupp 3", desc: "lång vokal i stammen · –r i presens · –dde i preteritum · –tt i supinum" },
  "4v": { label: "Grupp 4", desc: "stark eller oregelbunden böjning – byter vokal i preteritum, ingen ändelse" },
  "n1": { label: "Dekl 1", desc: "en-ord · plural -or  (flicka → flickan, flickor, flickorna)" },
  "n2": { label: "Dekl 2", desc: "en-ord · plural -ar  (bil → bilen, bilar, bilarna)" },
  "n3": { label: "Dekl 3", desc: "en-ord · plural -er  (hand → handen, händer, händerna)" },
  "n4": { label: "Dekl 4", desc: "ett-ord · plural -n  (äpple → äpplet, äpplen, äpplena)" },
  "n5": { label: "Dekl 5", desc: "ett-ord · plural = sg  (hus → huset, hus, husen)" },
};

// ── HOME ──
function Home({ onStudent, onAdmin }: { onStudent: () => void; onAdmin: () => void }) {
  return (
    <div>
      <div className="logo">
        <div className="logo-title">Självtestplattform</div>
        <div className="logo-sub">Svensk grammatik: test på verb, adjektiv, substantiv och konjunktioner & subjunktioner</div>
      </div>
      <button className="hcard" onClick={onStudent}>
        <div style={{ fontSize: 24, marginBottom: 6 }}>📖</div>
        <div className="rt">Jag är elev</div>
        <div className="rm">Välj ett test och träna på egen hand</div>
      </button>
      <button className="hcard" onClick={onAdmin}>
        <div style={{ fontSize: 24, marginBottom: 6 }}>🔐</div>
        <div className="rt">Lärarpanel</div>
        <div className="rm">Skapa tester och se elevresultat</div>
      </button>
    </div>
  );
}

// ── ADMIN LOGIN ──
function AdminLogin({ onAuth, onBack }: { onAuth: () => void; onBack: () => void }) {
  const [pin, setPin] = useState("");
  const [err, setErr] = useState("");
  function go() { if (pin === ADMIN_PIN) onAuth(); else setErr("Fel PIN-kod.") }
  return (
    <div>
      <button className="back" onClick={onBack}>← Tillbaka</button>
      <div className="card">
        <div className="st">Lärarpanel</div>
        <label className="lbl g1">PIN-kod</label>
        <input className="inp" type="password" value={pin}
          onChange={e => { setPin(e.target.value); setErr("") }}
          onKeyDown={e => e.key === "Enter" && go()} autoFocus />
        {err && <div className="err">{err}</div>}
        <div className="g2">
          <button className="btn btn-p btn-w" onClick={go}>Logga in</button>
        </div>
        <div className="muted g1">Standard PIN: 6498 · Ändra ADMIN_PIN i koden</div>
      </div>
    </div>
  );
}

// ── QUESTION EDITOR ──
function QEditor({ q, index, onChange, onRemove }: any) {
  return (
    <div className="qed">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span className="lbl" style={{ margin: 0 }}>Fråga {index + 1}</span>
        <button className="btn btn-sm btn-d" onClick={onRemove}>Ta bort</button>
      </div>
      <input className="inp" placeholder="Frågetext (använd ___ för lucka)" value={q.text}
        onChange={e => onChange({ ...q, text: e.target.value })} style={{ marginBottom: 8 }} />
      {["A", "B", "C", "D"].map((k: string) => (
        <div key={k} className="fr g1" style={{ alignItems: "center" }}>
          <span className="lbl" style={{ margin: 0, width: 16 }}>{k}</span>
          <input className="inp f1" value={q.options[k]}
            onChange={e => onChange({ ...q, options: { ...q.options, [k]: e.target.value } })} />
          <input type="radio" name={`correct-${q.id}`} checked={q.correct === k}
            onChange={() => onChange({ ...q, correct: k })}
            style={{ cursor: "pointer", accentColor: "hsl(var(--color-text-primary))" }} />
        </div>
      ))}
      <div className="muted g1">Markera rätt svar med radioknappen →</div>
    </div>
  );
}

// ── CREATE / EDIT TEST ──
function CreateTest({ existing, onSave, onBack }: any) {
  const [title, setTitle] = useState(existing?.title || "");
  const [cat, setCat] = useState(existing?.category || CATEGORIES[0]);
  const [qs, setQs] = useState(existing?.questions || []);
  const [err, setErr] = useState("");

  function add() { setQs([...qs, { id: uid(), text: "", options: { A: "", B: "", C: "", D: "" }, correct: "A" }]) }
  function go() {
    if (!title.trim()) { setErr("Ange en titel."); return }
    if (qs.length === 0) { setErr("Lägg till minst en fråga."); return }
    for (const q of qs) {
      if (!q.text.trim()) { setErr("Alla frågor behöver text."); return }
      if (!q.options.A || !q.options.B || !q.options.C || !q.options.D) { setErr("Alla frågor behöver fyra alternativ."); return }
    }
    onSave({ id: existing?.id || uid(), title: title.trim(), category: cat, questions: qs });
  }

  return (
    <div>
      <button className="back" onClick={onBack}>← Tillbaka</button>
      <div className="st">{existing ? "Redigera test" : "Skapa nytt test"}</div>
      <div className="card g2">
        <label className="lbl">Titel</label>
        <input className="inp" value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div className="card">
        <label className="lbl">Kategori</label>
        <select className="sel" value={cat} onChange={e => setCat(e.target.value)}>
          {ALL_CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>
      {qs.map((q: any, i: number) => (
        <QEditor key={q.id} q={q} index={i}
          onChange={(u: any) => { const a = [...qs]; a[i] = u; setQs(a) }}
          onRemove={() => setQs(qs.filter((_: any, j: number) => j !== i))} />
      ))}
      <button className="btn btn-w g2" onClick={add}>+ Lägg till fråga</button>
      {err && <div className="err g1">{err}</div>}
      <button className="btn btn-p btn-w g2" onClick={go}>Spara test</button>
    </div>
  );
}

// ── ADMIN TESTS ──
function AdminTests({ custom, onEdit, onCreate, onDelete }: any) {
  const all = [...ALL_BUILT_IN, ...custom];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <span className="st">Tester ({all.length})</span>
        <button className="btn btn-p" onClick={onCreate}>+ Nytt test</button>
      </div>
      <div className="card">
        {all.length === 0 ? <div className="empty">Inga tester ännu.</div>
          : all.map((t: any) => (
            <div className="row" key={t.id}>
              <div style={{ flex: 1 }}>
                <div className="rt">{t.title}</div>
                <div className="rm">
                  {t.questions.length} frågor · {t.category}
                  {t.locked && <span className="badge badge-lock" style={{ marginLeft: 8 }}>inbyggt</span>}
                </div>
              </div>
              {!t.locked && (
                <div className="fr">
                  <button className="btn btn-sm" onClick={() => onEdit(t)}>Redigera</button>
                  <button className="btn btn-sm btn-d" onClick={() => { if (confirm(`Ta bort "${t.title}"?`)) onDelete(t.id) }}>Ta bort</button>
                </div>
              )}
            </div>
          ))
        }
      </div>
    </div>
  );
}

// ── RESULT DETAIL ──
function ResultDetail({ result, allTests, onBack }: any) {
  const test = allTests.find((t: any) => t.id === result.testId);
  const qs = test?.questions || [];
  return (
    <div>
      <button className="back" onClick={onBack}>← Tillbaka</button>
      <div className="st">{result.studentName}</div>
      <div className="muted">{result.testTitle}</div>
      <div className="muted g1">
        {fmtDate(result.date)} · {result.score}/{result.total} – {pct(result.score, result.total)}%
      </div>
      <div className="card g2">
        <table className="tbl">
          <thead><tr><th>#</th><th>Fråga</th><th>Elevens svar</th><th>Rätt svar</th></tr></thead>
          <tbody>
            {qs.map((q: any, i: number) => {
              const a = result.answers?.[q.id]; const ok = a === q.correct;
              return (
                <tr key={q.id}>
                  <td>{i + 1}</td>
                  <td>{q.text.length > 55 ? q.text.slice(0, 55) + "…" : q.text}</td>
                  <td>
                    <span className={`badge ${ok ? "badge-success" : "badge-danger"}`}>
                      {a || "–"}{a && ` (${q.options[a]})`}
                    </span>
                  </td>
                  <td>{q.correct} ({q.options[q.correct]})</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── ADMIN RESULTS LIST ──
function AdminResults({ results, allTests }: any) {
  const [filter, setFilter] = useState("all");
  const [detail, setDetail] = useState<any>(null);
  if (detail) return <ResultDetail result={detail} allTests={allTests} onBack={() => setDetail(null)} />;
  const shown = [...(filter === "all" ? results : results.filter((r: any) => r.testId === filter))].sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <span className="st">Resultat ({shown.length})</span>
        <select className="sel" value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">Alla tester</option>
          {allTests.map((t: any) => <option key={t.id} value={t.id}>{t.title}</option>)}
        </select>
      </div>
      <div className="card">
        {shown.length === 0 ? <div className="empty">Inga resultat ännu.</div>
          : <table className="tbl">
            <thead><tr><th>Elev</th><th>Test</th><th>Poäng</th><th>Datum</th><th></th></tr></thead>
            <tbody>
              {shown.map((r: any) => (
                <tr key={r.id}>
                  <td>{r.studentName}</td>
                  <td>{r.testTitle}</td>
                  <td><span className={`badge ${gradeClass(r.score, r.total)}`}>{r.score}/{r.total} · {pct(r.score, r.total)}%</span></td>
                  <td>{fmtDate(r.date)}</td>
                  <td><button className="btn btn-sm" onClick={() => setDetail(r)}>Visa svar</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </div>
    </div>
  );
}

// ── ADMIN PANEL ──
function AdminPanel({ custom, results, allTests, onSave, onDelete, onBack }: any) {
  const [tab, setTab] = useState("tests");
  const [mode, setMode] = useState<any>(null);
  if (mode !== null) return <CreateTest existing={mode === "new" ? null : mode} onSave={(t: any) => { onSave(t); setMode(null) }} onBack={() => setMode(null)} />;
  return (
    <div>
      <button className="back" onClick={onBack}>← Hem</button>
      <div className="tabs">
        <button className={`tab ${tab === "tests" ? "on" : ""}`} onClick={() => setTab("tests")}>Tester</button>
        <button className={`tab ${tab === "results" ? "on" : ""}`} onClick={() => setTab("results")}>
          Resultat{results.length > 0 && ` (${results.length})`}
        </button>
      </div>
      {tab === "tests" && <AdminTests custom={custom} allTests={allTests} onEdit={(t: any) => setMode(t)} onCreate={() => setMode("new")} onDelete={onDelete} />}
      {tab === "results" && <AdminResults results={results} allTests={allTests} />}
    </div>
  );
}

// ── STUDENT NAME ──
function StudentName({ onStart, onBack }: { onStart: (name: string) => void; onBack: () => void }) {
  const [name, setName] = useState("");
  return (
    <div>
      <button className="back" onClick={onBack}>← Hem</button>
      <div className="card">
        <div className="st">Vad heter du?</div>
        <input className="inp g2" placeholder="Ditt namn" value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === "Enter" && name.trim() && onStart(name.trim())} autoFocus />
        <div className="g2">
          <button className="btn btn-p btn-w" disabled={!name.trim()} onClick={() => onStart(name.trim())}>Fortsätt</button>
        </div>
      </div>
    </div>
  );
}

// ── SUBJECT MAP ──
const SUBJECTS = [
  { key: "Adjektiv",                       label: "Adjektiv",                       icon: "📝", categories: ["Adjektiv – grupper", "Adjektiv – komparering"] },
  { key: "Verb",                            label: "Verb",                            icon: "🔤", categories: ["Verb – grupper"] },
  { key: "Substantiv",                      label: "Substantiv",                      icon: "🏷️", categories: ["Substantiv – deklination"] },
  { key: "Konjunktioner & Subjunktioner",   label: "Konjunktioner & Subjunktioner",   icon: "🔗", categories: ["Konjunktioner", "Subjunktioner", "Blandat"] },
];

// ── STUDENT TEST LIST ──
function StudentTests({ name, allTests, results, onSelect, onBack }: any) {
  const [subject, setSubject] = useState<string | null>(null);
  const mine = results.filter((r: any) => r.studentName.toLowerCase() === name.toLowerCase());

  function last(id: string) {
    const r = [...mine].filter((r: any) => r.testId === id).sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    return r ? `${r.score}/${r.total}` : null;
  }

  // ── Level 1: subject picker ──
  if (!subject) {
    return (
      <div>
        <button className="back" onClick={onBack}>← Ändra namn</button>
        <div className="muted" style={{ marginBottom: 16 }}>Hej {name}! Välj ett ämne.</div>
        <div className="card">
          {SUBJECTS.map(s => {
            const count = allTests.filter((t: any) => s.categories.includes(t.category)).length;
            if (count === 0) return null;
            return (
              <button key={s.key} onClick={() => setSubject(s.key)} className="test-list-item">
                <div style={{ flex: 1 }}>
                  <div className="rt">{s.icon} {s.label}</div>
                  <div className="rm">{count} test{count !== 1 ? "er" : ""}</div>
                </div>
                <span style={{ color: "hsl(var(--color-text-secondary))" }}>→</span>
              </button>
            );
          })}
        </div>
        {mine.length > 0 && (
          <div className="card g2">
            <div className="st" style={{ marginBottom: 12 }}>Din historik</div>
            <div>
              {[...mine].sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 8).map((r: any) => (
                <div className="row" key={r.id}>
                  <div style={{ flex: 1 }}>
                    <div className="rt">{r.testTitle}</div>
                    <div className="rm">{fmtDate(r.date)}</div>
                  </div>
                  <span className={`badge ${gradeClass(r.score, r.total)}`}>{r.score}/{r.total} · {pct(r.score, r.total)}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── Level 2: test list within subject ──
  const s = SUBJECTS.find(x => x.key === subject)!;
  const testsInSubject = allTests.filter((t: any) => s.categories.includes(t.category));

  // Group by category if more than one category in this subject
  const usedCats = [...new Set(testsInSubject.map((t: any) => t.category as string))];

  return (
    <div>
      <button className="back" onClick={() => setSubject(null)}>← {s.icon} {s.label}</button>
      <div className="muted" style={{ marginBottom: 16 }}>Välj ett test.</div>
      {usedCats.map(cat => (
        <div key={cat}>
          {usedCats.length > 1 && <div className="muted" style={{ marginBottom: 6, marginTop: 12, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{cat}</div>}
          <div className="card">
            {testsInSubject.filter((t: any) => t.category === cat).map((t: any) => (
              <button key={t.id} onClick={() => onSelect(t)} className="test-list-item">
                <div style={{ flex: 1 }}>
                  <div className="rt">{t.title}</div>
                  <div className="rm">{t.questions.length} frågor{last(t.id) ? ` · Senaste: ${last(t.id)}` : ""}</div>
                </div>
                <span style={{ color: "hsl(var(--color-text-secondary))" }}>→</span>
              </button>
            ))}
          </div>
        </div>
      ))}
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
      <div style={{ textAlign: "center" }}>
        <div className="st">{test.title}</div>
        <div className="ring g3">
          <span style={{ fontSize: 28, fontWeight: 700 }}>{score}</span>
          <span className="muted" style={{ fontSize: 12 }}>av {total}</span>
        </div>
        <div className="st">{p}% rätt</div>
        <div className="muted g1">{scoreMsg(p)}</div>
        <div className="muted g1">Du hade {total - score} fel av {total} frågor.</div>
        <div className="fr g3" style={{ justifyContent: "center" }}>
          <button className="btn" onClick={onBack}>← Tillbaka</button>
          <button className="btn btn-p" onClick={() => { setCur(0); setAns({}); setDone(false); setSaved(false) }}>Gör om</button>
        </div>
      </div>
    );
  }

  const progBar = (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span className="muted">{test.title}</span>
        <span className="muted">Fråga {cur + 1} av {total}</span>
      </div>
      <div className="prog">
        <div className="prog-fill" style={{ width: `${((cur + 1) / total) * 100}%` }} />
      </div>
    </div>
  );

  // GROUP STAGE (two_stage questions)
  if (phase === "group" && isTwoStage) {
    const isVerbGroup = q.groupType === "verb_1234";
    const isKonj = q.groupType === "konj_type";
    const isSubj = q.groupType === "subj_type";
    const isNoun = q.groupType === "noun_dekl";

    const groupChoices =
      q.groupType === "adj_abc" ? ["A", "B", "C"] :
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
      <div>
        <button className="back" onClick={onBack}>← Avbryt</button>
        {progBar}
        <div className="card" style={{ textAlign: "center", marginBottom: 16 }}>
          {isVerbGroup && <div className="muted">Imperativ</div>}
          <div className="st g1">{isVerbGroup ? `${q.word}!` : q.word}</div>
          {!isKonj && !isSubj && q.context && <div className="muted g1">{q.context}</div>}
          {(isKonj || isSubj) && q.context && <QText text={q.context} />}
        </div>
        {!isVerbGroup && !isKonj && !isSubj && (
          <div className="muted" style={{ marginBottom: 12 }}>
            {q.groupType === "adj_abc"
              ? "Vilken böjningsgrupp (A, B eller C) gäller för adjektivet i frasen?"
              : q.groupType === "noun_dekl"
              ? "Vilken deklination tillhör substantivet?"
              : "Vilken komparationsgrupp (1–4) tillhör adjektivet?"}
          </div>
        )}
        <div className="muted" style={{ marginBottom: 8 }}>
          {isVerbGroup ? "Vilken grupp tillhör verbet?" : isKonj ? "Vilken typ av konjunktion?" : isSubj ? "Vilken typ av subjunktion?" : ""}
        </div>
        {groupErr && <div className="err" style={{ marginBottom: 8 }}>Fel typ – försök igen!</div>}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {groupChoices.map(g => {
            const { label, desc } = groupLabel(g);
            return (
              <button key={g} className="ans" onClick={() => handleGroupPick(g)}>
                <strong>{label}</strong>
                {(isKonj || isSubj) && <span className="muted" style={{ marginLeft: 8 }}>{desc}</span>}
                {isNoun && <span className="muted" style={{ marginLeft: 8 }}>{desc}</span>}
                {!isKonj && !isSubj && !isVerbGroup && !isNoun && cur === 0 && <span className="muted" style={{ marginLeft: 8 }}>{desc}</span>}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // FORM STAGE (answer the question)
  return (
    <div>
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
              const key = q.groupType === "verb_1234"
                ? (verbDisplayKey[q.correctGroup] || q.correctGroup)
                : q.correctGroup;
              label = GROUP_INFO[key]?.label || key;
            }
            return <span className="badge badge-success">{label} ✓</span>;
          })()}
        </div>
      )}
      <div className="card" style={{ marginBottom: 16 }}>
        {isTwoStage
          ? <>
            <div className="st">{q.word}</div>
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
      {sel && <div className="g2"><button className="btn btn-p btn-w" onClick={next}>{cur < total - 1 ? "Nästa →" : "Se resultat"}</button></div>}
    </div>
  );
}

// ── ROOT ──
export default function GrammarApp() {
  const [custom, setCustom] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("home");
  const [adminAuth, setAdminAuth] = useState(false);
  const [name, setName] = useState("");
  const [step, setStep] = useState("name");
  const [activeTest, setActiveTest] = useState<any>(null);

  const allTests = [...ALL_BUILT_IN, ...custom];

  useEffect(() => {
    const c = load("quiz_custom"); const r = load("quiz_results");
    setCustom(c || []); setResults(r || []); setLoading(false);
  }, []);

  function saveTest(t: any) {
    const u = custom.some((x: any) => x.id === t.id) ? custom.map((x: any) => x.id === t.id ? t : x) : [...custom, t];
    setCustom(u); save("quiz_custom", u);
  }
  function deleteTest(id: string) {
    const u = custom.filter((t: any) => t.id !== id); setCustom(u); save("quiz_custom", u);
  }
  function handleFinish(score: number, total: number, answers: Record<string, string>) {
    const r = { id: uid(), studentName: name, testId: activeTest.id, testTitle: activeTest.title, score, total, date: new Date().toISOString(), answers };
    const u = [...results, r]; setResults(u); save("quiz_results", u);
  }

  if (loading) return <div className="app"><div className="wrap"><div className="empty">Laddar...</div></div></div>;

  return (
    <div className="app">
      <div className="wrap">
        {view === "home" && <Home onStudent={() => { setView("student"); setStep("name") }} onAdmin={() => setView("admin")} />}

        {view === "student" && step === "name" && <StudentName onStart={n => { setName(n); setStep("tests") }} onBack={() => setView("home")} />}
        {view === "student" && step === "tests" && <StudentTests name={name} allTests={allTests} results={results} onSelect={(t: any) => { setActiveTest(t); setStep("quiz") }} onBack={() => setStep("name")} />}
        {view === "student" && step === "quiz" && <Quiz test={activeTest} onFinish={handleFinish} onBack={() => setStep("tests")} />}

        {view === "admin" && !adminAuth && <AdminLogin onAuth={() => setAdminAuth(true)} onBack={() => setView("home")} />}
        {view === "admin" && adminAuth && <AdminPanel custom={custom} results={results} allTests={allTests} onSave={saveTest} onDelete={deleteTest} onBack={() => { setView("home"); setAdminAuth(false) }} />}
      </div>
    </div>
  );
}
