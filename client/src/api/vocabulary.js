const baseVocabularyURL = '/api/vocabulary';

export const loadVocabularyData = async (notebookId) => {
  console.log("API - Contacting server to load vocabulary data");

  try {
    const urlToFetch = baseVocabularyURL + '/' + notebookId;

    console.log(`API - Contacting server at URL ${urlToFetch}`);

    const response = await fetch(urlToFetch);

    const jsonResponse = await response.json();

    // console.log("API - Received server response");
    return jsonResponse;

  } catch(err) {
    throw new Error(err);
  }
};

export const addTermToVocabulary = async (data) => {
  console.log("API - Contacting server to add new term to vocabulary");

  try {
    const urlToFetch = baseVocabularyURL + '/add';

    console.log(`API - Contacting server at URL ${urlToFetch}`);

    const response = await fetch(urlToFetch, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const jsonResponse = await response.json();

    // console.log("API - Received server response");
    return jsonResponse;

  } catch(err) {
    throw new Error(err);
  }
};
