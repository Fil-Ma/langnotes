const baseVocabularyURL = '/api/terms';

export const addTermToVocabulary = async (data) => {
  console.log("API - Contacting server to add term to db");

  try {
    const urlToFetch = baseVocabularyURL;

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

export const updateVocabularyTerm = async (data) => {
  console.log("API - Contacting server to update term in vocabulary");
  const { termId, content, definition } = data;

  try {
    const urlToFetch = baseVocabularyURL + '/' + termId;

    const response = await fetch(urlToFetch, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content,
        definition
      })
    });

    const jsonResponse = await response.json();

    return jsonResponse;

  } catch(err) {
    throw new Error(err);
  }
};

export const deleteVocabularyTerm = async (termId) => {
  console.log("API - Contacting server to delete term in vocabulary");

  try {
    const urlToFetch = baseVocabularyURL + '/' + termId;

    const response = await fetch(urlToFetch, { method: 'DELETE' });

    const jsonResponse = await response.json();

    return jsonResponse;

  } catch(err) {
    throw new Error(err);
  }
};
