import React from "react";
import styles from "./Modal.module.css";
import closeIcon from "../../assets/cerrarIcon.png";

const Modal = ({ setIsOpen, confirmDelete  }) => {

  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Eliminar Evento ?</h5>
          </div>
          <button className={styles.closeBtn} >
            <img className={styles.modalImage} src={closeIcon} alt={closeIcon} 
            />
          </button>
          <div className={styles.modalContent}>
            Estas seguro que deseas eliminar el evento de la aplicación 
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button
                className={styles.deleteBtn}
                onClick={confirmDelete }
              >
                Eliminar
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
