/**
 * Tiny Anthropic proxy. The React app has no other backend, so this is the
 * only place the API key ever exists -- it never ships in the browser
 * bundle. In dev, CRA's "proxy" field in package.json forwards unmatched
 * requests (e.g. /api/anthropic-chat) here automatically.
 *
 * Deploying this app anywhere public later must include this server --
 * pointing the frontend straight at api.anthropic.com again would put the
 * key back in every visitor's browser.
 */
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const PORT = process.env.PROXY_PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", anthropic_configured: Boolean(ANTHROPIC_API_KEY) });
});

app.post("/api/anthropic-chat", async (req, res) => {
  if (!ANTHROPIC_API_KEY) {
    return res.status(503).json({ error: "ANTHROPIC_API_KEY is not configured on the server. See .env.example." });
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
});

app.listen(PORT, () => {
  console.log(`Anthropic proxy listening on http://localhost:${PORT}`);
  console.log(`ANTHROPIC_API_KEY configured: ${Boolean(ANTHROPIC_API_KEY)}`);
});
