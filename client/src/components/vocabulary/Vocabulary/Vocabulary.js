import "./vocabulary.css";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../../modal/Modal";
import Button from "../../button/Button";
import VocabularyTerm from "../VocabularyTerm/VocabularyTerm";
import NewTermForm from "../NewTermForm/NewTermForm";
import { loadVocabulary, addNewTerm } from "../../../store/notebook/vocabulary/vocabulary.actions";

export default function Vocabulary({ notebookId }) {

  const [isTermFormOpen, setIsTermFormOpen] = useState(false);
  const [content, setContent] = useState("");
  const [definition, setDefinition] = useState("");

  const dispatch = useDispatch();
  const { id, terms } = useSelector((state) => state.notebook.vocabulary);
  const termForm = document.getElementById("new-term-form");

  useEffect(() => {
    dispatch(loadVocabulary(notebookId));
  }, [notebookId]);

  // Handles opening of window to add a new term
  const openTermForm = (e) => {
    e.preventDefault();
    setIsTermFormOpen(true);
    console.log("Closed term form");
  };

  // Handles closing of window to add a new term
  const closeTermForm = (e) => {
    e.preventDefault();
    setIsTermFormOpen(false);
    console.log("Opened form to add vocabulary term");
  };

  // Handles if user click outside the window of the form
  const clickOutsideForm = (e) => {
    if (e.target === termForm) {
      closeTermForm(e);
    }
  };

  // Search term function
  const handleSearchTerm = (e) => {

  };

  // Handles submission of the new term form
  const handleSubmitNewTerm = async (e) => {
    try {
      e.preventDefault();
      await dispatch(addNewTerm({
        vocabularyId: id,
        content,
        definition
      }))
      closeTermForm(e);
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <section className="vocabulary-container">
      <h2>Vocabulary</h2>

      <div className="vocabulary-utils">
        <Button
          onClick={openTermForm}
          className="add-new add-term white-text orange-background orange-border link">
            (+) Add New
        </Button>

        <div className="search-term">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            name="term-search"
            placeholder="Search in vocabulary.."
            onChange={handleSearchTerm} />
        </div>

      </div>

      <Modal
        id="new-term-form"
        handleClose={closeTermForm}
        handleClickOuside={clickOutsideForm}
        isFormVisible={isTermFormOpen}>
          <NewTermForm
            onSubmit={handleSubmitNewTerm}
            setContent={setContent}
            setDefinition={setDefinition} />
      </Modal>

      {
        terms.length < 1
          ? <p className="no-terms-text">There are no terms in this vocabulary</p>
          : terms.map(term => {
              return (
                <VocabularyTerm
                  key={term.id}
                  content={term.content}
                  definition={term.definition} />
              )
            })
      }

    </section>
  );
}
