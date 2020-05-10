import React from 'react';

const Modal = ({showModal, children}) => {
  // const closeModal
  return (
    showModal && (
      <article className="modalBackground">
        <section className="modalContainer">
          {children}
        </section>
      </article>
    )
  );
}

export default Modal;
