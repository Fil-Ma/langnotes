const expect = require("chai").expect;
const request = require("supertest");

const app = require("../index.js");

// Test TERM
describe('/api/terms routes', function() {

  describe('GET /api/terms/:termId', function() {

    it('returns a single term object', function() {
      return request(app)
        .get(`/api/terms/276be446-1602-498d-9d63-f44577a32fa4`)
        .expect(200)
        .then((response) => {
          const term = response.body;
          expect(term).to.be.an.instanceOf(Object);
          expect(term).to.not.be.an.instanceOf(Array);
        });
    });

    it ('returns a full term object', function() {
      return request(app)
        .get(`/api/terms/276be446-1602-498d-9d63-f44577a32fa4`)
        .expect(200)
        .then((response) => {
          const { term } = response.body;
          expect(term).to.have.ownProperty('id');
          expect(term).to.have.ownProperty('content');
          expect(term).to.have.ownProperty('definition');
          expect(term).to.have.ownProperty('vocabularyId');
        });
    });

    it ('returned minion has the correct id', function() {
      return request(app)
        .get(`/api/terms/276be446-1602-498d-9d63-f44577a32fa4`)
        .expect(200)
        .then((response) => {
          const { term } = response.body;
          expect(term.id).to.be.an.equal("276be446-1602-498d-9d63-f44577a32fa4");
        });
    });

    it ('called with an invalid ID returns a 500 error', function() {
      return request(app)
        .get('/api/terms/notAnId')
        .expect(500);
    });

  });

  describe('PUT /api/terms/:termId', function() {

    it('updates the correct term and returns it', function() {
      let initialTerm;
      let updatedTerm;

      return request(app)
        .get('/api/terms/5edfbf85-6317-4bd6-99e9-70034cf8cee2')
        .then((response) => {
          const { term } = response.body;
          initialTerm = term;
        })
        .then(() => {
          updatedTerm = Object.assign({}, initialTerm, { content: 'Test'});

          return request(app)
            .put('/api/terms/5edfbf85-6317-4bd6-99e9-70034cf8cee2')
            .send(updatedTerm)
            .expect(200)
            .then((response) => {
              const { term } = response.body;
              expect(term).to.be.deep.equal(updatedTerm)
            })
        });
    });

    it('updates the correct term and persists to the database', function() {
      let initialTerm;
      let updatedTerm;

      return request(app)
        .get('/api/terms/5edfbf85-6317-4bd6-99e9-70034cf8cee2')
        .then((response) => {
          const { term } = response.body;
          initialTerm = term;
        })
        .then(() => {
          updatedTerm = Object.assign({}, initialTerm, { content: 'Persistance Test'});

          return request(app)
            .put('/api/terms/5edfbf85-6317-4bd6-99e9-70034cf8cee2')
            .send(updatedTerm)
            .expect(200)
        })
        .then(() => {
          return request(app)
            .get('/api/terms/5edfbf85-6317-4bd6-99e9-70034cf8cee2')
            .then((response) => {
              const { term } = response.body;
              return term;
            })
            .then((responseTerm) => {
              expect(responseTerm.content).to.equal('Persistance Test');
            });
        });
    });

    it('called with a non-uuid returns a 500 error', function() {
      return request(app)
        .put('/api/terms/notAnId')
        .expect(500);
    });
  });

  describe('POST /api/terms', function() {

    it('returns a single term object', function() {
      const initialTerm = {
        content: "Post test term",
        definition: "Testing if route returns full object",
        vocabularyId: "8ce2cdd1-0a52-489e-a097-970fe3ef122f"
      };

      return request(app)
        .post(`/api/terms`)
        .send(initialTerm)
        .expect(201)
        .then((response) => {
          const { term } = response.body;
          
          expect(term).to.be.an.instanceOf(Object);
          expect(term).to.not.be.an.instanceOf(Array);
        });
    });

    it ('returns a full term object', function() {
      const initialTerm = {
        content: "Post test2 term",
        definition: "Testing if route returns full object",
        vocabularyId: "8ce2cdd1-0a52-489e-a097-970fe3ef122f"
      };

      return request(app)
        .post(`/api/terms`)
        .send(initialTerm)
        .expect(201)
        .then((response) => {
          const { term } = response.body;

          expect(term).to.have.ownProperty('id');
          expect(term).to.have.ownProperty('content');
          expect(term).to.have.ownProperty('definition');
          expect(term).to.have.ownProperty('vocabularyId');
        });
    });
  });

  describe('DELETE /api/terms', function() {

    it('returns id of the deleted term', function() {
      const initialTerm = {
        content: "delete test term",
        definition: "This term exists for only delete route purpose test",
        vocabularyId: "8ce2cdd1-0a52-489e-a097-970fe3ef122f"
      };

      return request(app)
      .post(`/api/terms`)
      .send(initialTerm)
      .expect(201)
      .then((response) => {
        const { term } = response.body;

        return request(app)
          .delete(`/api/terms/${term.id}`)
          .expect(200)
          .then((response) => {
            const { id } = response.body;
            expect(id).to.be.deep.equal(term.id);
          })
      });
    });

    it('called with a non-uuid ID returns a 500 error', function() {
      return request(app)
        .delete('/api/terms/notAnId')
        .expect(500);
    });

  });

});
