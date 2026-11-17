import { createServer } from "node:http";
import { fileURLToPath } from "node:url";

export function buildServer() {
  return createServer((req, res) => {
    if (req.url === "/healthz") {
      res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ status: "ok" }));
      return;
    }
    if (req.url === "/" || req.url?.startsWith("/?")) {
      res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
      res.end(
        "<!doctype html><html lang=\"en\"><head><meta charset=\"utf-8\"><title>production-starter</title></head><body><main><h1>production-starter</h1><p>Reference service running.</p></main></body></html>"
      );
      return;
    }
    res.writeHead(404, { "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ error: "not_found" }));
  });
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const port = Number(process.env.PORT || 3000);
  const host = process.env.HOST || "127.0.0.1";
  const server = buildServer();
  server.listen(port, host, () => {
    console.log(`listening on http://${host}:${port}`);
  });
}
