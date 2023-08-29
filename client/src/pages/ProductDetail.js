import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";

function ProductDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [cart, setCart] = useCart();

  // Get All Products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProducts(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log("Error Coming While Fetching Products" + error);
      toast.error("Error Coming While Fetching Products, Please Try Again");
    }
  };

  useEffect(() => {
    if (params?.slug) getAllProducts();
  }, [params?.slug]);

  // Get Similar Products
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/similar-product/${pid}/${cid}`
      );
      setSimilarProducts(data?.products);
    } catch (error) {
      console.log("Error Coming While Fetching Similar Products" + error);
      toast.error(
        "Error Coming While Fetching Similar Products, Please Try Again"
      );
    }
  };

  return (
    <Layout title={`${params.slug} - Product Deatil`}>
      <div className="row container p-3">
        <div className="col-md-6  mt-2">
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
            className="card-img-top p-2"
            alt={product.name}
            height={"450px"}
            width={"80%"}
          />
        </div>
        <div className="col-md-6">
          <h2 className="text-center mb-5">Product Details</h2>
          <h4>{product.name}</h4>
          <p>{product.description}</p>
          <h4>₹ {product.price}</h4>
          <p>Category: {product?.category?.name}</p>
          <button
            class="btn btn-warning ms-1"
            onClick={(e) => {
              e.preventDefault();
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("Item Added To Cart");
            }}
          >
            Add To Cart
          </button>
        </div>
        <hr className="mt-4" />
        <div className="row mt-2">
          <h3>Similar Products</h3>
          {similarProducts.length < 1 && (
            <h4 className="text-center">No Similar Products Found</h4>
          )}
          <div className="d-flex flex-wrap">
            {similarProducts?.map((p) => (
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
                      setCart([...cart, product]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, product])
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
        </div>
      </div>
    </Layout>
  );
}

export default ProductDetail;
