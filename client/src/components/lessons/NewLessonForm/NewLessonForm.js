import "./newLessonForm.css";

export default function NewLessonForm({
  onSubmit,
  title,
  description,
  content,
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
          value={title}
          maxLength="50"
          onChange={(e) => setLessonTitle(e.target.value)} />
      </div>

      <div>
        <label htmlFor="lessonDescription">Description:</label><br />
        <textarea
          name="lessonDescription"
          id="lessonDescription"
          required
          rows="2"
          value={description}
          maxLength="100"
          onChange={(e) => setLessonDescription(e.target.value)} ></textarea>
      </div>

      <div>
        <label htmlFor="lessonContent">Content:</label><br />
        <textarea
          name="lessonContent"
          id="lessonContent"
          rows="12"
          required
          value={content}
          maxLength="200"
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
