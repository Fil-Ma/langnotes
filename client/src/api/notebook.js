const baseNotebookURL = '/api/notebook';

export const createNotebook = async (notebook) => {
  console.log("API - Contacting server to add new notebook");

  try {
    const urlToFetch = baseNotebookURL + '/';

    const response = await fetch(urlToFetch, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(notebook)
    });

    const jsonResponse = await response.json();

    return jsonResponse;

  } catch(err) {
    throw new Error(err);
  }
};
