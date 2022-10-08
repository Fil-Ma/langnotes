const expect = require("chai").expect;
const request = require("supertest");

const LessonQueries = require("../queries/lessons");
const LessonQueriesInstance = new LessonQueries();

const app = require("../index.js");

// Test LESSONS
describe('/api/lessons routes', function() {

  describe('GET /api/lessons/notebook/:notebookId', function() {

    it('returns an array', function() {
      return request(app)
        .get(`/api/lessons/notebook/b84061b8-1283-48c1-a791-507095a29ebe`)
        .expect(200)
        .then((response) => {
          const { lessons } = response.body;
          expect(lessons).to.be.an.instanceOf(Array);
        });
    });

    it('returns an array of all lessons', function() {
      return request(app)
        .get('/api/lessons/notebook/b84061b8-1283-48c1-a791-507095a29ebe')
        .expect(200)
        .then(async (response) => {
          const dbLessons = await LessonQueriesInstance.getLessonsByNotebookId('b84061b8-1283-48c1-a791-507095a29ebe');
          const { lessons } = response.body;
          expect(lessons.length).to.be.equal(dbLessons.length);

          lessons.forEach((lesson) => {
            expect(lesson).to.have.ownProperty('id');
            expect(lesson).to.have.ownProperty('title');
            expect(lesson).to.have.ownProperty('content');
            expect(lesson).to.have.ownProperty('description');
            expect(lesson).to.have.ownProperty('notebookId');
          });
        });
    });
  });

  describe('GET /api/lessons/:lessonId', function() {

    it('returns a single lesson object', function() {
      return request(app)
        .get('/api/lessons/3a14afd1-7f0a-4af5-8d00-11bff7531e7b')
        .expect(200)
        .then((response) => {
          const { lesson } = response.body;
          expect(lesson).to.be.an.instanceOf(Object);
          expect(lesson).to.not.be.an.instanceOf(Array);
        })
    });

    it('returns a full lesson object', function() {
      return request(app)
        .get('/api/lessons/3a14afd1-7f0a-4af5-8d00-11bff7531e7b')
        .expect(200)
        .then((response) => {
          const { lesson } = response.body;
          expect(lesson).to.have.ownProperty('id');
          expect(lesson).to.have.ownProperty('title');
          expect(lesson).to.have.ownProperty('content');
          expect(lesson).to.have.ownProperty('description');
          expect(lesson).to.have.ownProperty('notebookId');
        })
    });

    it('returned minion has the correct id', function() {
      return request(app)
        .get('/api/lessons/3a14afd1-7f0a-4af5-8d00-11bff7531e7b')
        .expect(200)
        .then((response) => {
          const { lesson } = response.body;
          expect(lesson.id).to.be.an.equal('3a14afd1-7f0a-4af5-8d00-11bff7531e7b');
        })
    });

    it('called with non-uuid ID returns 500 error', function() {
      return request(app)
        .get('/api/lessons/notAnId')
        .expect(500);
    });
  });

  describe('PUT /api/lessons/:lessonId', function() {

    it('updates the correct lesson and returns it', function() {
      let initialLesson;
      let updatedLesson;
      return request(app)
        .get('/api/lessons/3a14afd1-7f0a-4af5-8d00-11bff7531e7b')
        .then((response) => {
          const { lesson } = response.body;
          initialLesson = lesson;
          updatedLesson = Object.assign({}, initialLesson, { title: 'Test'});
          return request(app)
            .put('/api/lessons/3a14afd1-7f0a-4af5-8d00-11bff7531e7b')
            .send(updatedLesson)
            .expect(200)
        })
        .then((response) => {
          const { lesson } = response.body;
          expect(lesson).to.be.deep.equal(updatedLesson);
        });
    });

    it('updates the correct lesson and persists to the database', function() {
      let initialLesson;
      let updatedLesson;
      return request(app)
        .get('/api/lessons/3a14afd1-7f0a-4af5-8d00-11bff7531e7b')
        .then((response) => {
          const { lesson } = response.body;
          initialLesson = lesson;
          updatedLesson = Object.assign({}, initialLesson, { title: 'Persistance Test'});
          return request(app)
            .put('/api/lessons/3a14afd1-7f0a-4af5-8d00-11bff7531e7b')
            .send(updatedLesson)
            .expect(200)
        })
        .then(() => {
          return request(app)
            .get('/api/lessons/3a14afd1-7f0a-4af5-8d00-11bff7531e7b')
        })
        .then((response) => {
          const { lesson } = response.body;
          expect(lesson.title).to.equal('Persistance Test');
        });
    });

    it('called with a non-uuid ID returns a 500 error', function() {
      return request(app)
        .put('/api/lessons/notAnId')
        .expect(500);
    });

    it('called with an invalid ID does not change the database array', function() {
      let initialLessonArray;
      return request(app)
        .get(`/api/lessons/notebook/b84061b8-1283-48c1-a791-507095a29ebe`)
        .then((response) => {
          const { lessons } = response.body;
          initialLessonArray = lessons;
        })
        .then(() => {
          return request(app)
            .put('/api/lessons/notAnId')
            .send({ key: 'value'});
        })
        .then(() => {
          return request(app)
            .get(`/api/lessons/notebook/b84061b8-1283-48c1-a791-507095a29ebe`);
        })
        .then((response) => {
          const { lessons } = response.body;
          expect(lessons).to.be.deep.equal(initialLessonArray);
        });
    });
  });

  describe('POST /api/lessons', function() {

    it('returns a single lesson object', function() {
      const initialLesson = {
        title: "testing again",
        content: "Post test term",
        description: "Testing if route returns full object",
        notebookId: "b84061b8-1283-48c1-a791-507095a29ebe"
      };
      return request(app)
        .post('/api/lessons')
        .send(initialLesson)
        .expect(201)
        .then((response) => {
          const { lesson } = response.body;
          expect(lesson).to.be.an.instanceOf(Object);
          expect(lesson).to.not.be.an.instanceOf(Array);
        })
    });

    it('returns a full lesson object', function() {
      const initialLesson = {
        title: "testing again",
        content: "Post test term2",
        description: "Testing if route returns full object",
        notebookId: "b84061b8-1283-48c1-a791-507095a29ebe"
      };
      return request(app)
        .post('/api/lessons')
        .send(initialLesson)
        .expect(201)
        .then((response) => {
          const { lesson } = response.body;
          expect(lesson).to.have.ownProperty('id');
          expect(lesson).to.have.ownProperty('title');
          expect(lesson).to.have.ownProperty('content');
          expect(lesson).to.have.ownProperty('description');
          expect(lesson).to.have.ownProperty('notebookId');
        })
    });
  });

  describe('DELETE /api/lessons/:lessonId', function() {

    it('returns id of the deleted lesson', function() {
      const initialLesson = {
        title: "delete again",
        content: "Post test term",
        description: "Testing if route returns full object",
        notebookId: "b84061b8-1283-48c1-a791-507095a29ebe"
      };

      return request(app)
        .post(`/api/lessons`)
        .send(initialLesson)
        .then((response) => {
          const { lesson } = response.body;

          return request(app)
            .delete(`/api/lessons/${lesson.id}`)
            .expect(200)
            .then((response) => {
              const { id } = response.body;
              expect(id).to.be.deep.equal(lesson.id);
            });
        });
    });

    it('deletes the correct lesson by id', function() {
      let initialLessonArray;
      let lessonIdToDelete;
      const initialLesson = {
        title: "delete again",
        content: "Post test term",
        description: "Testing if route returns full object",
        notebookId: "b84061b8-1283-48c1-a791-507095a29ebe"
      };

      return request(app)
        .post(`/api/lessons`)
        .send(initialLesson)
        .then((response) => {
          const { lesson } = response.body;
          lessonIdToDelete = lesson.id;
        })
        .then(() => {
          return request(app)
            .get('/api/lessons/notebook/b84061b8-1283-48c1-a791-507095a29ebe')
            .then((response) => {
              const { lessons } = response.body;
              initialLessonArray = lessons;
            });
        })
        .then(() => {
          return request(app)
            .delete(`/api/lessons/${lessonIdToDelete}`)
            .expect(200);
        })
        .then(() => {
          return request(app)
            .get('/api/lessons/notebook/b84061b8-1283-48c1-a791-507095a29ebe')
            .then((response) => {
              const { lessons } = response.body;
              expect(lessons).to.not.be.deep.equal(initialLessonArray);
              const deletedLesson = lessons.find(element => element.id === lessonIdToDelete);
              expect(deletedLesson).to.be.undefined;
            });
        });
    });

    it('called with a non-uuid ID returns a 500 error', function() {
      return request(app)
        .delete('/api/lessons/notAnId')
        .expect(500);
    });
  });

});

// Test TERMS
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
