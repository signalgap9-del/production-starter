import assert from "node:assert/strict";
import test from "node:test";
import { buildServer } from "../src/server.mjs";

test("serves / and /healthz with expected status and payload", async () => {
  const server = buildServer();
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const addr = server.address();
  assert(addr && typeof addr === "object");
  const base = `http://127.0.0.1:${addr.port}`;

  try {
    const home = await fetch(`${base}/`);
    assert.equal(home.status, 200);
    assert.match(await home.text(), /<title>production-starter<\/title>/);

    const health = await fetch(`${base}/healthz`);
    assert.equal(health.status, 200);
    assert.deepEqual(await health.json(), { status: "ok" });

    const missing = await fetch(`${base}/does-not-exist`);
    assert.equal(missing.status, 404);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
