// 사내 다른 컴퓨터에서도 이 앱을 웹 브라우저로 열어보고, 데이터도 자동으로
// 함께 볼 수 있게 해주는 아주 단순한 서버입니다.
//
// index.html을 file://로 직접 열면(특히 네트워크 공유 폴더 안에서) 크롬이
// 보안상 스크립트 로드를 막아 흰 화면만 뜨는 경우가 있습니다. 이 서버를
// 켜두고 http://주소로 접속하면 이 문제가 생기지 않습니다.
//
// 또한 이 서버는 조직 데이터를 이 폴더의 data.json 파일에 저장해두고
// GET/POST /api/data로 내어주기 때문에, 이 서버를 통해(http://로) 접속한
// 컴퓨터들끼리는 데이터가 자동으로 동기화됩니다 (앱이 5초마다 최신 데이터를
// 확인합니다). index.html을 file://로 직접 열면(서버 없이) 이 동기화 없이
// 예전처럼 이 컴퓨터의 브라우저에만 데이터가 저장됩니다.
//
// 실행: node server.js  (또는 start-server.bat 더블클릭)
// 종료: 이 창에서 Ctrl+C 를 누르거나 창을 닫으면 서버가 꺼집니다 (그 순간부터
//       다른 컴퓨터는 접속도, 데이터 동기화도 안 됩니다).
const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");

const PORT = Number(process.env.PORT) || 8080;
const ROOT = __dirname;
const DATA_FILE = path.join(ROOT, "data.json");
const DATA_TMP_FILE = path.join(ROOT, "data.json.tmp");
const MAX_BODY_BYTES = 20 * 1024 * 1024; // 사진 등을 포함해도 넉넉하도록 20MB

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
};

function localLanAddresses() {
  const nets = os.networkInterfaces();
  const addresses = [];
  for (const entries of Object.values(nets)) {
    for (const net of entries || []) {
      if (net.family === "IPv4" && !net.internal) addresses.push(net.address);
    }
  }
  return addresses;
}

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
}

function readRequestBody(req, callback) {
  const chunks = [];
  let size = 0;
  let aborted = false;
  req.on("data", (chunk) => {
    if (aborted) return;
    size += chunk.length;
    if (size > MAX_BODY_BYTES) {
      aborted = true;
      callback(new Error("too_large"));
      req.destroy();
      return;
    }
    chunks.push(chunk);
  });
  req.on("end", () => {
    if (aborted) return;
    callback(null, Buffer.concat(chunks).toString("utf8"));
  });
  req.on("error", (err) => {
    if (aborted) return;
    aborted = true;
    callback(err);
  });
}

// GET: 저장된 조직 데이터를 그대로 돌려준다. 아직 아무도 저장한 적이
// 없으면(파일 없음) 404를 돌려주고, 그때는 접속한 컴퓨터가 자기가 갖고
// 있던 데이터로 서버를 초기화(POST)한다.
function handleGetData(req, res) {
  fs.readFile(DATA_FILE, "utf8", (err, raw) => {
    if (err) {
      if (err.code === "ENOENT") return sendJson(res, 404, { error: "no_data" });
      return sendJson(res, 500, { error: "read_failed" });
    }
    try {
      const parsed = JSON.parse(raw);
      sendJson(res, 200, parsed);
    } catch {
      sendJson(res, 500, { error: "corrupt_data" });
    }
  });
}

// POST: 받은 조직 데이터를 파일로 저장한다. 임시 파일에 먼저 쓰고
// 이름을 바꿔치기(rename)해서, 저장 도중 서버가 꺼져도 기존 파일이
// 깨지지 않게 한다.
function handlePostData(req, res) {
  readRequestBody(req, (err, text) => {
    if (err) {
      sendJson(res, err.message === "too_large" ? 413 : 400, { error: "bad_request" });
      return;
    }
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      sendJson(res, 400, { error: "invalid_json" });
      return;
    }
    if (!parsed || typeof parsed !== "object" || !parsed.org) {
      sendJson(res, 400, { error: "invalid_shape" });
      return;
    }
    fs.writeFile(DATA_TMP_FILE, JSON.stringify(parsed), (writeErr) => {
      if (writeErr) return sendJson(res, 500, { error: "write_failed" });
      fs.rename(DATA_TMP_FILE, DATA_FILE, (renameErr) => {
        if (renameErr) return sendJson(res, 500, { error: "write_failed" });
        sendJson(res, 200, { ok: true });
      });
    });
  });
}

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);

  if (urlPath === "/api/data") {
    if (req.method === "GET") return handleGetData(req, res);
    if (req.method === "POST") return handlePostData(req, res);
    res.writeHead(405, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("허용되지 않는 메서드입니다.");
    return;
  }

  let staticPath = urlPath;
  if (staticPath === "/") staticPath = "/index.html";

  // 요청 경로가 상위 폴더(../)로 빠져나가지 못하도록 정리한다.
  const safePath = path.normalize(staticPath).replace(/^([.][.][/\\])+/, "");
  const filePath = path.join(ROOT, safePath);

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("접근할 수 없는 경로입니다.");
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("파일을 찾을 수 없습니다: " + urlPath);
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "application/octet-stream" });
    res.end(data);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  const addresses = localLanAddresses();
  console.log("품질부서 인력 현황 포털 서버가 시작되었습니다.\n");
  console.log(`이 컴퓨터에서 접속: http://localhost:${PORT}`);
  if (addresses.length > 0) {
    console.log("\n사내 다른 컴퓨터에서 접속 (같은 네트워크에서만 가능):");
    addresses.forEach((ip) => console.log(`  http://${ip}:${PORT}`));
  } else {
    console.log("\n(사내 네트워크 IP를 찾지 못했습니다. ipconfig 명령으로 IPv4 주소를 확인해 http://그주소:" + PORT + " 로 접속하세요.)");
  }
  console.log("\n이 컴퓨터와 http://로 접속한 다른 컴퓨터들끼리는 데이터가 5초마다 자동으로 동기화됩니다.");
  console.log("이 창을 닫거나 Ctrl+C를 누르면 서버가 종료되어 다른 컴퓨터에서 접속과 동기화가 모두 끊깁니다. 계속 켜두세요.");
});
