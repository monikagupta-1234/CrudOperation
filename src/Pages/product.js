import React, { useEffect, useState } from "react";
import {
  getAllProducts,
  deleteProduct,
  getSingleProduct,
  updateProduct,
  addProduct,
} from "../apiServices/products";
import "react-toastify/dist/ReactToastify.css";

import { AiOutlineDelete, AiFillEdit } from "react-icons/ai";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import EditProductModal from "../Components/editProductModal";
import AddProductModal from "../Components/addProductModal";
export default function Products() {
  const validation = yup.object({
    title: yup
      .string()
      .min(3, "Title must be more than or equal to 3 characters")
      .required("Title is Required"),
    description: yup
      .string()
      .min(3, "Description must be more than or equal to 3 characters")
      .required("Description is Required"),
  });
  const addProductValidation = yup.object({
    titleData: yup
      .string()
      .min(3, "Title must be more than or equal to 3 characters")
      .required("Title is Required"),
    descriptionData: yup
      .string()
      .min(3, "Description must be more than or equal to 3 characters")
      .required("Description is Required"),
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validation),
  });
  const {
    register: register1,
    handleSubmit: handleSubmit1,
    setValue: setValue1,
    formState: { errors: error },
  } = useForm({
    resolver: yupResolver(addProductValidation),
  });
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [addIsOpen, setIsaddOpen] = React.useState(false);
  const [id, setId] = useState();
  const [product, setProduct] = useState({
    title: "",
    description: "",
  });
  const [addProducts, setProducts] = useState({
    titleData: "",
    descriptionData: "",
  });
  useEffect(() => {
    getAllProducts(setAllProducts, setLoading);
  }, []);

  function openModal(idData) {
    getSingleProduct(setProduct, setLoading, idData, setValue, setIsOpen);
  }
  function openModalforProducts() {
    setProducts({
      titleData: "",
      descriptionData: "",
    });
    setValue1("titleData", "");
    setValue1("descriptionData", "");
    setIsaddOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  function closeModalForProducts() {
    setIsaddOpen(false);
  }
  const editProduct = () => {
    updateProduct(setAllProducts, product, setLoading, id, setIsOpen);
  };
  const addProductData = () => {
    addProduct(setAllProducts, addProducts, setLoading, setIsaddOpen);
  };
  return (
    <>
      {isLoading === true ? (
        <div className="loader-box">
          <div className="loader"></div>
        </div>
      ) : (
        ""
      )}
      <button
        type="button"
        onClick={() => {
          openModalforProducts();
        }}
      >
        Add Products
      </button>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">CreatorName</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allProducts?.length > 0 &&
            allProducts?.map((product) => {
              return (
                <tr>
                  <th scope="row">{product?.title ? product?.title : ""}</th>
                  <td>{product?.description ? product?.description : ""}</td>
                  <td>
                    {product?.creator?.name ? product?.creator?.name : ""}
                  </td>

                  <button
                    type="button"
                    onClick={() => {
                      deleteProduct(setAllProducts, setLoading, product?._id);
                    }}
                  >
                    <AiOutlineDelete />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setId(product?._id);
                      openModal(product?._id);
                    }}
                  >
                    <AiFillEdit />
                  </button>
                </tr>
              );
            })}
        </tbody>
      </table>
      <EditProductModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        editProduct={editProduct}
        setProduct={setProduct}
        errors={errors}
        register={register}
        handleSubmit={handleSubmit}
        product={product}
      />

      <AddProductModal
        addIsOpen={addIsOpen}
        closeModalForProducts={closeModalForProducts}
        setProducts={setProducts}
        addProducts={addProducts}
        register1={register1}
        error={error}
        addProductData={addProductData}
        handleSubmit1={handleSubmit1}
      />
    </>
  );
}
