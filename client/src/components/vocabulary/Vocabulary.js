import "./vocabulary.css";
import VocabularyTerm from "./VocabularyTerm";

function Vocabulary() {

  return (
    <section className="vocabulary-container">
      <h2>Your vocabulary</h2>

      <div className="vocabulary-utils">
        <p>(+) Add New</p>

        <div className="search-term">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            name="term-search"
            placeholder="Search in vocabulary.." />
        </div>

      </div>

      <VocabularyTerm content="First" />
      <VocabularyTerm content="Second" />
      <VocabularyTerm content="Third" />
      <VocabularyTerm content="Fourth" />
      <VocabularyTerm content="Fifth" />
      <VocabularyTerm content="Sixth" />

    </section>
  );
}

export default Vocabulary;
