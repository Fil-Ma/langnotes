import "./vocabulary.css";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "../button/Button";
import VocabularyTerm from "./VocabularyTerm";
import { loadVocabulary } from "../../store/notebook/vocabulary/vocabulary.actions";

function Vocabulary({ notebookId }) {

  const dispatch = useDispatch();
  const terms = useSelector((state) => state.notebook.vocabulary.terms);

  useEffect(() => {
    dispatch(loadVocabulary(notebookId));
  }, [notebookId]);

  const handleShowNewTermForm = (e) => {
    e.preventDefault();
    // newTermForm.style.display = "block";
    // setIsTermFormVisible(true);
  };

  return (
    <section className="vocabulary-container">
      <h2>Your vocabulary</h2>

      <div className="vocabulary-utils">
        <Button
          onClick={handleShowNewTermForm}
          className="add-new add-term">(+) Add New</Button>

        <div className="search-term">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            name="term-search"
            placeholder="Search in vocabulary.." />
        </div>

      </div>

      {
        terms.length < 1
          ? <p className="no-terms-text">There are no terms in this vocabulary</p>
          : terms.forEach(term => {
              return (
                <VocabularyTerm
                  termId={term.id}
                  content={term.content}
                  definition={term.definition} />
              )
            })
      }

    </section>
  );
}

export default Vocabulary;
