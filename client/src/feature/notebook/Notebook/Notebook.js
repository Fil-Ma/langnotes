import "./Notebook.css";

export default function Notebook({ notebook, children }) {

  return (
    <main className="notebook">
      <h1 className="notebook-name">{ notebook.name }</h1>
      <div className="notebook-container">
        { children }
      </div>
    </main>
  )
}
