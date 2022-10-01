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
        className="close-window-new-lessson"><i class="fa-regular fa-x"></i></Button>

      <form onSubmit={onSubmit} >
        <input
          type="text"
          name="lessonTitle"
          maxLength="30"
          required
          onChange={(e) => setLessonTitle(e.target.value)} />

        <input
          type="text"
          name="lessonDescription"
          maxLength="50"
          required
          onChange={(e) => setLessonDescription(e.target.value)} />

        <input
          type="text"
          name="lessonContent"
          maxLength="200"
          required
          onChange={(e) => setLessonContent(e.target.value)} />

        <input type="submit" value="Add Lesson" />
      </form>
    </>
  )
}
