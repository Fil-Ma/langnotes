import "./modal.css";
import Button from "../button/Button";

export default function Modal({
  id,
  handleClose,
  handleClickOutside,
  isFormVisible,
  children
}) {
  const modalContainerClass = isFormVisible
    ? "modal-container display-block"
    : "modal-container display-none";

  return (
    <div
      id={id}
      className={modalContainerClass}
      onClick={handleClickOutside} >
        <div className="modal-content white-background">
          <Button
            onClick={handleClose}
            className="close-window-new-lessson white-background">
              <i className="fa-regular fa-x"></i>
          </Button>
          { children }
      </div>
    </div>
  );
}
