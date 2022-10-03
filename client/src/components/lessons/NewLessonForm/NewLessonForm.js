import "./newLessonForm.css";

export default function NewLessonForm({
  onSubmit,
  setLessonTitle,
  setLessonDescription,
  setLessonContent
}) {

  return (
    <form onSubmit={onSubmit} >
      <div>
        <label htmlFor="lessonTitle">Title:</label><br />
        <input
          type="text"
          id="lessonTitle"
          name="lessonTitle"
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
        <input
          className="link orange-background orange-border white-text"
          type="submit"
          value="Add Lesson to the current notebook" />
      </div>
    </form>
  )
}
