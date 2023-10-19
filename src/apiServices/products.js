import axios from "axios";
import { toast } from "react-toastify";

//getAllProducts
export const getAllProducts = async (setAllProducts, setLoading) => {
  try {
    setLoading(true);
    const allProducts = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/allpost`
    );
    setAllProducts(allProducts?.data?.details);

    setLoading(false);
  } catch (err) {
    setLoading(false);
    if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

//addProduct

export const addProduct = async (
  setAllProducts,
  newProduct,
  setLoading,
  setIsaddOpen
) => {
  try {
    setLoading(true);
    const allProducts = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/addpost`,

      {
        title: newProduct?.titleData,
        description: newProduct?.descriptionData,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
        },
      }
    );

    getAllProducts(setAllProducts, setLoading);
    setIsaddOpen(false);
    setLoading(false);
  } catch (err) {
    setLoading(false);
    if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

//getSingleProduct
export const getSingleProduct = async (
  setSingleProduct,
  setLoading,
  id,
  setValue,
  setIsOpen
) => {
  try {
    setLoading(true);
    const singleProduct = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/getpost/${id}`,

      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
        },
      }
    );
    setSingleProduct({
      title: singleProduct?.data?.details?.title,
      description: singleProduct?.data?.details?.description,
    });
    setValue("title", singleProduct?.data?.details?.title);
    setValue("description", singleProduct?.data?.details?.description);

    setIsOpen(true);

    setLoading(false);
  } catch (err) {
    setLoading(false);
    if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

//deleteProduct
export const deleteProduct = async (setAllProducts, setLoading, id) => {
  try {
    setLoading(true);
    const deleteProductData = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/deletepost/${id}`,

      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
        },
      }
    );
    getAllProducts(setAllProducts, setLoading);
    toast.success("Product Deleted Successfully");
    setLoading(false);
  } catch (err) {
    setLoading(false);
    if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

//updateProduct
export const updateProduct = async (
  setAllProducts,
  productValue,
  setLoading,
  id,
  setIsOpen
) => {
  try {
    setLoading(true);
    const updatePost = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/updatepost/${id}`,
      productValue,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
        },
      }
    );
    getAllProducts(setAllProducts, setLoading);
    setIsOpen(false);
    toast.success("Product Updated Successfully");
    setLoading(false);
  } catch (err) {
    setLoading(false);
    if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};
