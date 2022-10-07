const baseVocabularyURL = '/api/term';

export const updateVocabularyTerm = async (data) => {
  console.log("API - Contacting server to update term in vocabulary");

  try {
    const urlToFetch = baseVocabularyURL + '/';

    console.log(`API - Contacting server at URL ${urlToFetch}`);

    const response = await fetch(urlToFetch, {
      method: 'PUT',
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

export const deleteVocabularyTerm = async (termId) => {
  console.log("API - Contacting server to delete term in vocabulary");

  try {
    const urlToFetch = baseVocabularyURL + '/' + termId;

    console.log(`API - Contacting server at URL ${urlToFetch}`);

    const response = await fetch(urlToFetch, { method: 'DELETE' });

    const jsonResponse = await response.json();

    // console.log("API - Received server response");
    return jsonResponse;

  } catch(err) {
    throw new Error(err);
  }
};
