
const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ status: "healthy" }));
  }

  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    return res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>DevOps CI/CD Project</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #eef4fa;
            text-align: center;
            padding: 70px 20px;
          }
          .card {
            background: white;
            max-width: 650px;
            margin: auto;
            padding: 35px;
            border-radius: 15px;
          }
          h1 { color: #1769aa; }
          .success { color: green; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>CI/CD Pipeline Successful!</h1>
          <p>Application deployed using Docker.</p>
          <p>CI/CD: GitHub Actions</p>
          <p>Containerization: Docker</p>
          <p class="success">Application Status: Running</p>
        </div>
      </body>
      </html>
    `);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

if (require.main === module) {
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`App running on port ${PORT}`);
  });
}

module.exports = server;
