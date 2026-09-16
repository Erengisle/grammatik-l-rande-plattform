import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase, signInWithGoogle, signOut, APP_TAG } from "@/lib/supabase";
import { Link } from "react-router-dom";

const TEACHER_EMAIL = "hakan.hildingsson@edu.huddinge.se";

interface OverviewRow {
  email: string;
  full_name: string | null;
  session_id: string;
  app_tag: string | null;
  quiz_name: string;
  score: number;
  max_score: number;
  percent: number;
  completed_at: string;
}

interface SessionRow {
  session_id: string;
  email: string;
  full_name: string | null;
  quiz_name: string;
  score: number;
  max_score: number;
  percent: number;
  completed_at: string;
}

function toSessions(rows: OverviewRow[]): SessionRow[] {
  const bySession = new Map<string, SessionRow>();
  for (const r of rows) {
    if (!bySession.has(r.session_id)) {
      bySession.set(r.session_id, {
        session_id: r.session_id,
        email: r.email,
        full_name: r.full_name,
        quiz_name: r.quiz_name,
        score: r.score,
        max_score: r.max_score,
        percent: r.percent,
        completed_at: r.completed_at,
      });
    }
  }
  return [...bySession.values()].sort(
    (a, b) => new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime()
  );
}

function toCsv(sessions: SessionRow[]): string {
  const header = ["Elev", "E-post", "Test", "Poäng", "Max", "Procent", "Datum"];
  const lines = sessions.map((s) =>
    [s.full_name ?? "", s.email, s.quiz_name, s.score, s.max_score, s.percent, s.completed_at]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(",")
  );
  return [header.join(","), ...lines].join("\n");
}

function downloadCsv(csv: string) {
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `grammatik-resultat-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function Larare() {
  const { user, loading: authLoading } = useAuth();
  const [rows, setRows] = useState<OverviewRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [quizFilter, setQuizFilter] = useState("Alla");

  useEffect(() => {
    if (!user) return;
    supabase
      .from("teacher_overview")
      .select("*")
      .eq("app_tag", APP_TAG)
      .then(({ data, error }) => {
        if (!error && data) setRows(data as OverviewRow[]);
        setLoading(false);
      });
  }, [user]);

  const sessions = useMemo(() => toSessions(rows), [rows]);
  const quizNames = useMemo(() => ["Alla", ...new Set(sessions.map((s) => s.quiz_name))], [sessions]);
  const filtered = sessions.filter((s) => {
    const matchesSearch =
      !search ||
      (s.full_name ?? "").toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    const matchesQuiz = quizFilter === "Alla" || s.quiz_name === quizFilter;
    return matchesSearch && matchesQuiz;
  });

  if (authLoading) return <div className="wrap"><div className="empty">Laddar…</div></div>;

  if (!user) {
    return (
      <div className="wrap" style={{ textAlign: "center", paddingTop: "4rem" }}>
        <div className="st g1">Lärarpanel</div>
        <div className="muted g2" style={{ marginBottom: 24 }}>Logga in för att se resultat.</div>
        <button className="btn btn-p" onClick={() => signInWithGoogle()}>Logga in med Google</button>
      </div>
    );
  }

  if (user.email !== TEACHER_EMAIL) {
    return (
      <div className="wrap" style={{ textAlign: "center", paddingTop: "4rem" }}>
        <div className="st g1">Ingen åtkomst</div>
        <div className="muted g2">Den här sidan är bara till för läraren.</div>
        <Link to="/" className="muted">← Tillbaka till appen</Link>
      </div>
    );
  }

  return (
    <div className="wrap">
      <div className="topbar" style={{ justifyContent: "space-between" }}>
        <span className="topbar-title">Lärarpanel</span>
        <div style={{ display: "flex", gap: 12 }}>
          <Link to="/" className="muted" style={{ fontSize: 13 }}>← Till appen</Link>
          <button className="muted" style={{ fontSize: 13, background: "none", border: "none", cursor: "pointer" }} onClick={() => signOut()}>Logga ut</button>
        </div>
      </div>

      <div className="g2" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <input
          placeholder="Sök elev eller e-post…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: 8, borderRadius: 8, border: "1px solid var(--border, #ddd)", flex: 1, minWidth: 200 }}
        />
        <select value={quizFilter} onChange={(e) => setQuizFilter(e.target.value)} style={{ padding: 8, borderRadius: 8 }}>
          {quizNames.map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
        <button className="btn" onClick={() => downloadCsv(toCsv(filtered))}>Exportera CSV</button>
      </div>

      {loading ? (
        <div className="empty g2">Laddar resultat…</div>
      ) : filtered.length === 0 ? (
        <div className="empty g2">Inga resultat än.</div>
      ) : (
        <div className="g2" style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "2px solid #ddd" }}>
                <th style={{ padding: 8 }}>Elev</th>
                <th style={{ padding: 8 }}>Test</th>
                <th style={{ padding: 8 }}>Resultat</th>
                <th style={{ padding: 8 }}>Datum</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.session_id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: 8 }}>
                    <div>{s.full_name || "(okänt namn)"}</div>
                    <div className="muted" style={{ fontSize: 12 }}>{s.email}</div>
                  </td>
                  <td style={{ padding: 8 }}>{s.quiz_name}</td>
                  <td style={{ padding: 8 }}>{s.score}/{s.max_score} · {s.percent}%</td>
                  <td style={{ padding: 8 }}>{new Date(s.completed_at).toLocaleString("sv-SE")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
