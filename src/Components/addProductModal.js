import React from "react";
import Modal from "react-modal";
import { RxCross2 } from "react-icons/rx";
export default function AddProductModal({
  addIsOpen,
  closeModalForProducts,
  setProducts,
  addProducts,
  register1,
  error,
  addProductData,
  handleSubmit1
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
      isOpen={addIsOpen}
      onRequestClose={closeModalForProducts}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <button onClick={closeModalForProducts}>
        <RxCross2 />
      </button>
      <h5>Add Product</h5>
      <form onSubmit={handleSubmit1(addProductData)}>
        <p>Title</p>
        <input
          type="text"
          name="titleData"
          {...register1("titleData", {
            onChange: (e) => {
              setProducts({
                ...addProducts,
                [e.target.name]: e.target.value,
              });
            },
          })}
        />
        {error?.titleData && (
          <p className="error-msg">{error?.titleData?.message}</p>
        )}
        <p>Description</p>
        <input
          type="text"
          name="descriptionData"
          {...register1("descriptionData", {
            onChange: (e) => {
              setProducts({
                ...addProducts,
                [e.target.name]: e.target.value,
              });
            },
          })}
        />
        {error?.descriptionData && (
          <p className="error-msg">{error?.descriptionData?.message}</p>
        )}
        <br />
        <button type="submit">Add Product</button>
      </form>
    </Modal>
  );
}
