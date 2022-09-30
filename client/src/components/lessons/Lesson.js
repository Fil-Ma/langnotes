import "./lessons.css";

function Lesson({ title, description }) {

  return (
    <div className="lesson">
      <div className="lesson-title">
        <h3>{title}</h3>
      </div>

      <div className="lesson-tools">
        <i className="fa-solid fa-pencil fa-sm"></i>
        <div className="hover-text">Edit Lesson</div>
      </div>

      <div className="lesson-description">
        <p>{description}</p>
      </div>
    </div>
  );
}

export default Lesson;

// function LessonPreview({ lessonData }) {

  // return (
  //   <div className="lesson">
  //     <div className="lesson-title">
  //       <h3>{ lessonData.title }</h3>
  //     </div>
  //
  //     <div className="lesson-tools">
  //       <i className="fa-solid fa-pencil fa-sm"></i>
  //       <div className="hover-text">Edit Lesson</div>
  //     </div>
  //
  //     <div className="lesson-description">
  //       <p>{ lessonData.description }</p>
  //     </div>
  //   </div>
  // );
// }
