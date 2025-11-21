import { useEffect, useState } from "react";

const API = import.meta?.env?.VITE_BACKEND_URL || "";

export default function GuestBook() {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      const res = await fetch(`${API}/guestbook`);
      const data = await res.json();
      setEntries(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const optimistic = {
      _id: `temp-${Date.now()}`,
      name,
      message,
      created_at: new Date().toISOString(),
      pending: true,
    };
    setEntries((prev) => [optimistic, ...prev]);
    setLoading(true);

    try {
      const res = await fetch(`${API}/guestbook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });
      const saved = await res.json();
      setEntries((prev) => [saved, ...prev.filter((e) => e._id !== optimistic._id)]);
      setName("");
      setMessage("");
    } catch (err) {
      setEntries((prev) => prev.filter((e) => e._id !== optimistic._id));
      alert("Failed to post. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="guestbook" className="mx-auto max-w-3xl px-6 py-24">
      <h2 className="text-3xl md:text-5xl font-semibold">Guest Book</h2>
      <p className="mt-2 text-white/70">
        Leave a message for Ayan — thoughts, feedback, or a hello. Emojis supported.
      </p>

      <form onSubmit={submit} className="mt-6 space-y-3">
        <div className="flex gap-3 flex-col sm:flex-row">
          <input
            aria-label="Your name"
            placeholder="Your name"
            className="flex-1 rounded border border-white/10 bg-white/5 px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={80}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="shrink-0 rounded px-4 py-2 bg-violet-500 hover:bg-violet-400 disabled:opacity-60"
          >
            {loading ? "Posting…" : "Sign"}
          </button>
        </div>
        <textarea
          aria-label="Your message"
          placeholder="Write something nice… 😊✨"
          className="w-full rounded border border-white/10 bg-white/5 px-3 py-2"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={500}
          required
        />
        {/* Honeypot for bots */}
        <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />
      </form>

      <ul className="mt-8 space-y-4">
        {entries.map((e) => (
          <li
            key={e._id}
            className={`rounded border border-white/10 bg-white/5 p-4 ${e.pending ? "opacity-70" : ""}`}
          >
            <div className="flex items-center justify-between">
              <strong>{e.name}</strong>
              <time className="text-xs text-white/60">
                {new Date(e.created_at).toLocaleString()}
              </time>
            </div>
            <p className="mt-2 text-white/80 whitespace-pre-wrap break-words">{e.message}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
