// 사내 다른 컴퓨터에서도 이 앱을 웹 브라우저로 열어볼 수 있게 해주는
// 아주 단순한 정적 파일 서버입니다.
//
// index.html을 file://로 직접 열면(특히 네트워크 공유 폴더 안에서) 크롬이
// 보안상 스크립트 로드를 막아 흰 화면만 뜨는 경우가 있습니다. 이 서버를
// 켜두고 http://주소로 접속하면 이 문제가 생기지 않습니다.
//
// 실행: node server.js  (또는 start-server.bat 더블클릭)
// 종료: 이 창에서 Ctrl+C 를 누르거나 창을 닫으면 서버가 꺼집니다.
const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");

const PORT = Number(process.env.PORT) || 8080;
const ROOT = __dirname;

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

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  if (urlPath === "/") urlPath = "/index.html";

  // 요청 경로가 상위 폴더(../)로 빠져나가지 못하도록 정리한다.
  const safePath = path.normalize(urlPath).replace(/^([.][.][/\\])+/, "");
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
  console.log("\n이 창을 닫거나 Ctrl+C를 누르면 서버가 종료되어 다른 컴퓨터에서 접속할 수 없게 됩니다. 계속 켜두세요.");
});
