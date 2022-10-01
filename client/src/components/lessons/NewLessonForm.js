import "./lessons.css";
import Button from "../button/Button";

export default function NewLessonForm({
  onSubmit,
  handleCloseWindow,
  setLessonTitle,
  setLessonDescription,
  setLessonContent
}) {

  return (
    <>
      <Button
        onClick={handleCloseWindow}
        className="close-window-new-lessson white-background"><i className="fa-regular fa-x"></i></Button>

      <form onSubmit={onSubmit} >
        <div>
          <label htmlFor="lessonTitle">Title:</label><br />
          <input
            type="text"
            id="lessonTitle"
            name="lessonTitle"
            maxLength="30"
            required
            onChange={(e) => setLessonTitle(e.target.value)} />
        </div>

        <div>
          <label htmlFor="lessonDescription">Description:</label><br />
          <textarea
            name="lessonDescription"
            id="lessonDescription"
            required
            rows="2"
            onChange={(e) => setLessonDescription(e.target.value)} ></textarea>
        </div>

        <div>
          <label htmlFor="lessonContent">Content:</label><br />
          <textarea
            name="lessonContent"
            id="lessonContent"
            rows="12"
            required
            onChange={(e) => setLessonContent(e.target.value)} ></textarea>
        </div>

        <div>
          <input type="submit" value="Add Lesson to the current notebook" />
        </div>
      </form>
    </>
  )
}
