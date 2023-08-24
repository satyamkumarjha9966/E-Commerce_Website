import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function CategoryProduct() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  // Get Product By Category
  const getProductByCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log("Error Come in Getting Category" + error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProductByCategory();
  }, [params?.slug]);
  return (
    <Layout>
      <div className="container">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} Result Found</h6>
        <div className="row mt-4">
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
                  <button class="btn btn-warning ms-1">Add To Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Have to Do  */}
        {/* <div className="m-2 p-3">
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
          </div> */}
      </div>
    </Layout>
  );
}

export default CategoryProduct;
