const expect = require("chai").expect;
const request = require("supertest");

const app = require("../index.js");

// Test TERM
describe('/api/term routes', function() {

  describe('GET /api/term/:termId', function() {

    it('returns a single term object', function() {
      return request(app)
        .get(`/api/term/276be446-1602-498d-9d63-f44577a32fa4`)
        .expect(200)
        .then((response) => {
          const term = response.body;
          expect(term).to.be.an.instanceOf(Object);
          expect(term).to.not.be.an.instanceOf(Array);
        });
    });

    it ('returns a full term object', function() {
      return request(app)
        .get(`/api/term/276be446-1602-498d-9d63-f44577a32fa4`)
        .expect(200)
        .then((response) => {
          const { term } = response.body;
          expect(term).to.have.ownProperty('id');
          expect(term).to.have.ownProperty('content');
          expect(term).to.have.ownProperty('definition');
          expect(term).to.have.ownProperty('vocabulary_id');
        });
    });

    it ('returned minion has the correct id', function() {
      return request(app)
        .get(`/api/term/276be446-1602-498d-9d63-f44577a32fa4`)
        .expect(200)
        .then((response) => {
          const { term } = response.body;
          expect(term.id).to.be.an.equal("276be446-1602-498d-9d63-f44577a32fa4");
        });
    });

    it ('called with an invalid ID returns a 404 error', function() {
      return request(app)
        .get('/api/term/notAnId')
        .expect(500);
    });

  });

  /*
  describe('PUT /api/term', function() {

    it('updates the correct term and returns it', function() {
      let initialTerm;
      let updatedTerm;
      return request(app)
        // need to implement get single term
        .get('/api/term/abc')
        .then((response) => {
          initialTerm = response.body
        })
        .then(() => {
          updatedTerm = Object.assign({}, initialTerm, { content: 'Test'});
          return request(app)
            .put('/api/term/')
            .send(updatedTerm)
        })
        .then((response) => {
          expect(response.body).to.be.deep.equal(updatedTerm);
        });
    });

    it('updates the correct term and persists to the database', function() {
      let initialTerm;
      let updatedTerm;
      return request(app)
        // need to implement get single term
        .get('/api/term/abc')
        .then((response) => {
          initialTerm = response.body
        })
        .then(() => {
          updatedTerm = Object.assign({}, initialTerm, { content: 'Persistance Test'});
          return request(app)
            .put('/api/term/')
            .send(updatedTerm)
        })
        .then(() => {
          return request(app)
            .get('/api/term/abc');
        })
        .then((response) => response.body)
        .then(responseTerm => {
          expect(responseTerm.content).to.equal('Persistance Test');
        });
    });

    it('called with a non-uuid returns a 404 error', function() {
      return request(app)
        .put('/api/term/notAnId')
        .expect(404);
    });
  });*/

})
