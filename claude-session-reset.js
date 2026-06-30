const body = JSON.stringify({
  type: "error",
  error: {
    type: "session_expired",
    message: "Session expired"
  }
});

let headers = Object.assign({}, $response.headers || {});

delete headers["Content-Length"];
delete headers["content-length"];
delete headers["Content-Encoding"];
delete headers["content-encoding"];

headers["Content-Type"] = "application/json; charset=utf-8";
headers["Cache-Control"] = "no-store";

$done({
  status: 401,
  headers,
  body
});