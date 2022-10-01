const baseLessonURL = '/api/lesson';

export const loadAllLessonsByNotebookId = async (notebookId) => {
  try {
    const urlToFetch = baseLessonURL + '/notebook/'+ notebookId;

    const response = await fetch(urlToFetch);

    const jsonResponse = await response.json();

    return jsonResponse;

  } catch(err) {
    throw new Error(err);
  }
};

export const updateLessonData = async (data) => {
  try {
    const urlToFetch = baseLessonURL + '/';

    const response = await fetch(urlToFetch, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const jsonResponse = await response.json();

    return jsonResponse;

  } catch(err) {
    throw new Error(err);
  }
};

export const addNewLesson = async (data) => {

  console.log("API - Contacting server to add lesson");
  try {
    const urlToFetch = baseLessonURL + '/new';

    console.log(`API - Contacting server at URL ${urlToFetch}`);
    const response = await fetch(urlToFetch, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const jsonResponse = await response.json();

    console.log("API - Received server response");
    return jsonResponse;

  } catch(err) {
    throw new Error(err);
  }
};

export const deleteLessonById = async (lessonId) => {
  try {
    const urlToFetch = baseLessonURL + '/' + lessonId;

    const response = await fetch(urlToFetch, { method: 'DELETE' });

    const jsonResponse = await response.json();

    return jsonResponse;

  } catch(err) {
    throw new Error(err);
  }
};
