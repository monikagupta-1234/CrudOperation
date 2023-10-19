import React from "react";
import Modal from "react-modal";
import { RxCross2 } from "react-icons/rx";
export default function EditProductModal({
  modalIsOpen,
  closeModal,
  editProduct,
  setProduct,
  errors,
  register,
  handleSubmit,
  product,
}) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <button onClick={closeModal}>
        <RxCross2 />
      </button>
      <h5>Edit Product</h5>
      <form onSubmit={handleSubmit(editProduct)}>
        <p>Title</p>
        <input
          type="text"
          name="title"
          {...register("title", {
            onChange: (e) => {
              setProduct({ ...product, [e.target.name]: e.target.value });
            },
          })}
        />
        {errors?.title && <p className="error-msg">{errors?.title?.message}</p>}
        <p>Description</p>
        <input
          type="text"
          name="description"
          {...register("description", {
            onChange: (e) => {
              setProduct({ ...product, [e.target.name]: e.target.value });
            },
          })}
        />
        {errors?.description && (
          <p className="error-msg">{errors?.description?.message}</p>
        )}
        <br />
        <button type="submit">Edit Product</button>
      </form>
    </Modal>
  );
}
