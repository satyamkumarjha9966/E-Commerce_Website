import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";

function SearchPage() {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search Results"}>
      <div className="container d-flex justify-content-center">
        <div className="text-center d-flex flex-column justify-content-around">
          <h2>Search Results</h2>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `${values?.results.length} Products Found`}
          </h6>
          <div className="d-flex flex-wrap mt-4 justify-content-center">
            {values?.results?.map((p) => (
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
                  <p className="card-text">{p.description}....</p>
                  <h5 className="card-text"> ₹ {p.price}</h5>
                  <button class="btn btn-primary ms-1">More Details</button>
                  <button class="btn btn-warning ms-1">Add To Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SearchPage;
