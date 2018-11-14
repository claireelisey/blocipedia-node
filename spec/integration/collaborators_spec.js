const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/collaborators/";

describe("routes : collaborators", () => {

  describe("GET /collaborators", () => {

    it("should return a status code 200", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });

  });
});