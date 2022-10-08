const baseLessonURL = '/api/lessons';

export const loadAllLessonsByNotebookId = async (notebookId) => {
  console.log("API - Contacting server to load all lesson");
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
  console.log("API - Contacting server to update lesson");
  const { lessonId, title, content, description, notebookId } = data;
  try {
    const urlToFetch = baseLessonURL + '/' + lessonId;

    const response = await fetch(urlToFetch, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        content,
        description,
        notebookId
      })
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
    const urlToFetch = baseLessonURL + '/';

    const response = await fetch(urlToFetch, {
      method: 'POST',
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

export const deleteLessonById = async (lessonId) => {
  console.log("API - Contacting server to delete lesson");
  try {
    const urlToFetch = baseLessonURL + '/' + lessonId;

    const response = await fetch(urlToFetch, { method: 'DELETE' });

    const jsonResponse = await response.json();

    return jsonResponse;

  } catch(err) {
    throw new Error(err);
  }
};
