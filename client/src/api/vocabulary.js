const baseVocabularyURL = '/api/vocabulary';

export const loadVocabularyData = async (notebookId) => {
  console.log("API - Contacting server to load vocabulary data");

  try {
    const urlToFetch = baseVocabularyURL + '/' + notebookId;

    const response = await fetch(urlToFetch);

    const jsonResponse = await response.json();

    return jsonResponse;

  } catch(err) {
    throw new Error(err);
  }
};
