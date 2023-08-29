import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Checkbox, Radio, Badge } from "antd";
import { Prices } from "./../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";

function HomePage() {
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Get Total Count of Product
  const getTotalProductNumber = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log("Error Coming While Fetching Products Total Count" + error);
    }
  };

  // Load More Product
  const loadMoreProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log("Error Coming While Fetching More Products" + error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMoreProduct();
  }, [page]);

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
    getTotalProductNumber();
  }, []);

  // Get All Products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data?.products);
    } catch (error) {
      setLoading(false);
      console.log("Error Coming While Fetching Products" + error);
      toast.error("Error Coming While Fetching Products, Please Try Again");
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  // Get Filterd Products
  const getFilterdProducts = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filter`,
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log("Error Coming While Fetching Filterd Products" + error);
      toast.error(
        "Error Coming While Fetching Filterd Products, Please Try Again"
      );
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) getFilterdProducts();
  }, [checked, radio]);

  // Handle Filter By Category Function
  const handleCategoryFilter = (value, id) => {
    let all = [...checked];

    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  return (
    <Layout
      title={"Man verse - Get Best Deal Here"}
      description={"Menverse is india most affordable mens cloths brand"}
      author={"Menverse"}
      keywords={"mens cloths, shirt"}
      canonical={"http://menverse.com/"}
    >
      <div className="row mt-3">
        <div className="col-md-3 p-5">
          {/* Filter By Category */}
          <h4 className="text-left mt-3">Filter By Category</h4>
          <div className="d-flex flex-column mt-3">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleCategoryFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          {/* Filter By Price */}
          <h4 className="text-left mt-3">Filter By Price</h4>
          <div className="d-flex flex-column mt-3">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column mt-4">
            <button
              class="btn btn-danger w-80%"
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h2 className="text-center">All Products</h2>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top p-2"
                  alt={p.name}
                  height={"200px"}
                  width={"80%"}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 50)}....
                  </p>
                  <h5 className="card-text"> ₹ {p.price}</h5>
                  <button
                    class="btn btn-primary ms-1"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/product/${p.slug}`);
                    }}
                  >
                    More Details
                  </button>
                  <button
                    class="btn btn-warning ms-1"
                    onClick={(e) => {
                      e.preventDefault();
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added To Cart");
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading...." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
