
const server = require("./server");

let baseUrl;

beforeAll(async () => {
  await new Promise((resolve) => {
    server.listen(0, "127.0.0.1", resolve);
  });

  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

afterAll(async () => {
  await new Promise((resolve, reject) => {
    server.close((err) => err ? reject(err) : resolve());
  });
});

test("homepage returns HTTP 200", async () => {
  const response = await fetch(baseUrl);
  expect(response.status).toBe(200);

  const body = await response.text();
  expect(body).toContain("CI/CD Pipeline Successful!");
});

test("health endpoint returns healthy status", async () => {
  const response = await fetch(`${baseUrl}/health`);
  expect(response.status).toBe(200);

  await expect(response.json()).resolves.toEqual({
    status: "healthy"
  });
});

test("unknown route returns 404", async () => {
  const response = await fetch(`${baseUrl}/unknown`);
  expect(response.status).toBe(404);
});
