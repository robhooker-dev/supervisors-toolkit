/**
 * Vercel serverless function -- the equivalent of server/index.js's
 * /api/anthropic-chat route, for when this app is deployed on Vercel
 * rather than run locally with `npm run dev`.
 *
 * Vercel deploys any file under /api as its own endpoint automatically
 * (zero config): this file becomes https://<your-app>.vercel.app/api/anthropic-chat.
 * It runs as a real server-side function, so ANTHROPIC_API_KEY (set in the
 * Vercel project's Environment Variables, never committed) stays off the
 * client exactly like the local proxy -- this is not duplicated logic by
 * accident, it's the same job done the way each host actually runs code:
 * Express keeps a process alive locally, Vercel invokes a function per
 * request and has no equivalent of a long-running `npm run dev` process.
 */
module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_API_KEY) {
    res.status(503).json({ error: "ANTHROPIC_API_KEY is not set in this Vercel project's Environment Variables." });
    return;
  }

  try {
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(req.body),
    });
    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch (err) {
    res.status(502).json({ error: "Could not reach Anthropic.", detail: err.message });
  }
};
