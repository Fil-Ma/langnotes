import "./vocabulary.css";

// import react hooks
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// import components
import Modal from "../../modal/Modal";
import Button from "../../button/Button";
import VocabularyTerm from "../VocabularyTerm/VocabularyTerm";
import TermEditWindow from "../TermEditWindow/TermEditWindow";
import NewTermForm from "../NewTermForm/NewTermForm";

// import actions to dispatch
import { loadVocabulary, addNewTerm, updateTerm, deleteTerm } from "../../../store/notebook/vocabulary/vocabulary.actions";

// FUNCTION COMPONENT DECLARATION
export default function Vocabulary({
  notebookId
}) {

  // visibility status of add term window modal
  const [isTermFormOpen, setIsTermFormOpen] = useState(false);
  // visibility status of edit term window modal
  const [isEditTermOpen, setIsEditTermOpen] = useState(false);
  // value of search input field to filter terms
  const [searchValue, setSearchValue] = useState("");

  // set status variables
  const [content, setContent] = useState("");
  const [definition, setDefinition] = useState("");
  const [currentTermId, setCurrentTermId] = useState("");

  // declare dispatch function to dispatch actions to the store
  const dispatch = useDispatch();

  // get from store: id of the vocabulary, terms in the current vocabulary
  const { id, terms } = useSelector((state) => state.notebook.vocabulary);

  // get modal of new term form, to perform actions on modal visibility
  const termForm = document.getElementById("new-term-form");
  // get modal of edit term window, to perfoem actions on modal visibility
  const editWindow = document.getElementById("edit-term-window");

  // update terms of current vocabulary on notebook id changes
  useEffect(() => {
    dispatch(loadVocabulary(notebookId));
  }, [notebookId]);


  /*
    ADD TERM FORM functions
  */

  // Handles opening of window to add a new term
  const openNewTermForm = (e) => {
    e.preventDefault();
    setIsTermFormOpen(true);
  };

  // Handles closing of window to add a new term
  const closeNewTermForm = (e) => {
    e.preventDefault();
    setIsTermFormOpen(false);

    // reset states
    setContent("");
    setDefinition("");
  };

  // Handles if user click outside the window of the form
  const clickOutsideForm = (e) => {
    console.log(termForm)
    console.log(e.target)
    if (e.target === termForm) {
      closeNewTermForm(e);
    }
  };

  // Handles submission of the new term form
  const handleSubmitNewTerm = async (e) => {
    try {
      e.preventDefault();
      await dispatch(addNewTerm({
        vocabularyId: id,
        content,
        definition
      }));

      // close form window after dispatching the action
      closeNewTermForm(e);
    } catch(err) {
      console.log(err);
    }
  };


  /*
    EDIT TERM MODAL functions
  */

  // handle opening of edit term window
  const openEditTermWindow = (termId, e) => {
    e.preventDefault();
    setCurrentTermId(termId);
    // get term data from state array (terms)
    const currentTerm = terms.find(element => element.id === termId);
    setContent(currentTerm.content);
    setDefinition(currentTerm.definition);
    setIsEditTermOpen(true);
  };

  // handle closing of edit term window
  const closeEditTermWindow = (e) => {
    e.preventDefault();
    // reset states
    setDefinition("");
    setContent("");
    setCurrentTermId("");
    // close modal
    setIsEditTermOpen(false);
  };

  // handle when user clicks outside of modal content, and close modal window
  const handleClickOutsideTermEdit = (e) => {
    // check if target is the modal container (not the content)
    if (e.target === editWindow) {
      closeEditTermWindow(e);
    }
  };

  // handle update term
  const handleUpdateTerm = async (termId, e) => {
    try {
      e.preventDefault();
      await dispatch(updateTerm({
        termId,
        content,
        definition
      }));
      closeEditTermWindow(e);
    } catch(err) {
      console.log(err);
    }
  };

  // handle deletion of term in vocabulary
  const handleDeleteTerm = async (termId, e) => {
    try {
      e.preventDefault();
      await dispatch(deleteTerm(termId));
      closeEditTermWindow(e);
    } catch(err) {
      console.log(err);
    }
  };



  /*
    FUNCTIONS TO HANDLE TERMS FILTERING
  */

  // Search term function
  const handleSearchTerm = (e) => {
    e.preventDefault();
    const lowerCaseInput = e.target.value.toLowerCase();
    setSearchValue(lowerCaseInput);
  };

  // filtered array of terms
  const filteredTerms = terms.filter((term) => {
    if (searchValue === "") {
      return term;
    } else {
      return term.content.toLowerCase().includes(searchValue) || term.definition.toLowerCase().includes(searchValue);
    }
  })

  return (
    <section className="vocabulary-container">
      <h2>Vocabulary</h2>

      <div className="vocabulary-utils">
        <Button
          onClick={openNewTermForm}
          className="add-new add-term white-text orange-background orange-border link">
            (+) Add New
        </Button>

        <div className="search-term">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            name="term-search"
            placeholder="Search in vocabulary.."
            value={searchValue}
            onChange={handleSearchTerm} />
        </div>

      </div>

      <Modal
        id="new-term-form"
        handleClose={closeNewTermForm}
        handleClickOutside={clickOutsideForm}
        isFormVisible={isTermFormOpen}>
          <NewTermForm
            onSubmit={handleSubmitNewTerm}
            content={content}
            definition={definition}
            setContent={setContent}
            setDefinition={setDefinition} />
      </Modal>

      <Modal
        id="edit-term-window"
        handleClose={closeEditTermWindow}
        handleClickOutside={handleClickOutsideTermEdit}
        isFormVisible={isEditTermOpen}>
          <TermEditWindow
            termId={currentTermId}
            content={content}
            definition={definition}
            setContent={setContent}
            setDefinition={setDefinition}
            handleUpdate={handleUpdateTerm} />
      </Modal>

      {
        filteredTerms.length < 1
          ? <p className="no-terms-text">There are no terms in this vocabulary</p>
          : filteredTerms.map(term => {
              return (
                <VocabularyTerm
                  key={term.id}
                  termId={term.id}
                  content={term.content}
                  definition={term.definition}
                  handleEdit={openEditTermWindow}
                  handleDelete={handleDeleteTerm} />
              )
            })
      }

    </section>
  );
}
