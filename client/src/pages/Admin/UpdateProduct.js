import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;

function UpdateProduct() {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");

  // Get Single Product From DB
  const GetSingleProduct = async () => {
    try {
      const { slug } = params;
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${slug}`
      );
      setId(data.product._id);
      setName(data.product.name);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setPhoto(data.product.photo);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log("Error Come in Getting Single Product" + error);
      toast.error("Can't Get Single Product, Pls Try Again");
    }
  };

  useEffect(() => {
    GetSingleProduct();
  }, []);

  // Get All Categories From DB
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log("Error Come in Getting Category" + error);
      toast.error("Can't Get Category, Pls Try Again");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Handle Create Product Submit Button
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("category", category);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("shipping", shipping);

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log("Error Come in While Updating Product" + error);
      toast.error("Can't Update Product, Pls Try Again");
    }
  };

  // Handle Delete Product Button
  const handleDeleteProduct = async () => {
    try {
      // Handleing Accecidentely Situation
      let answer = window.prompt(
        "Are You Sure Want To Delete This Product? Type Y"
      );
      if (!answer) return;

      // Method For deleting Product
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
      );
      if (data?.success) {
        toast.success("Product Deleted Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log("Error Come in While Deleting Product" + error);
      toast.error("Can't Delete Product, Pls Try Again");
    }
  };

  return (
    <div>
      <Layout title={"MenVerse Admin Dashboard - Create Product"}>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <div className="card w-75 p-2">
                <h4 className="text-center">Update Product</h4>
                <div className="m-1">
                  <Select
                    bordered={false}
                    placeholder="Select a Category"
                    size="large"
                    showSearch
                    className="form-select mb-3"
                    onChange={(value) => {
                      setCategory(value);
                    }}
                    value={category}
                  >
                    {categories?.map((c) => (
                      <Option key={c._id} value={c._id}>
                        {c.name}
                      </Option>
                    ))}
                  </Select>
                  <div className="mb-3">
                    <lable className="btn btn-outline-secondary col-md-12">
                      {photo ? photo.name : "Upload Photo"}
                      <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        // hidden
                        value={photo}
                      />
                    </lable>
                  </div>
                  <div className="mb-3">
                    {photo ? (
                      <div className="text-center">
                        {/* Showing Img by Using Browser Show its not affect Website */}
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={photo}
                          height={"200px"}
                          width={"80%"}
                          className="img img-responsive"
                        />
                      </div>
                    ) : (
                      <div className="text-center">
                        <img
                          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
                          alt={photo}
                          height={"200px"}
                          width={"80%"}
                          className="img img-responsive"
                        />
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={name}
                      placeholder="Write Product Name"
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      type="text"
                      value={description}
                      placeholder="Write Product Description"
                      className="form-control"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="number"
                      value={price}
                      placeholder="Write Product Price"
                      className="form-control"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="number"
                      value={quantity}
                      placeholder="Write Product Quantity"
                      className="form-control"
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <Select
                      bordered={false}
                      placeholder="Select Shipping"
                      size="large"
                      className="form-select mb-3"
                      onChange={(value) => {
                        setShipping(value);
                      }}
                      value={shipping ? "Yes" : "No"}
                    >
                      <Option value="0">Yes</Option>
                      <Option value="1">No</Option>
                    </Select>
                  </div>
                  <div className="mb-3">
                    <button
                      className="btn btn-primary ms-2"
                      onClick={handleUpdateProduct}
                    >
                      Update Product
                    </button>
                    <button
                      className="btn btn-danger ms-2"
                      onClick={handleDeleteProduct}
                    >
                      Delete Product
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default UpdateProduct;
