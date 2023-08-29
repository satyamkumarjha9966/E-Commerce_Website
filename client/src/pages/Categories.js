import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../components/hooks/useCategory";
import { Link } from "react-router-dom";

function Categories() {
  const categories = useCategory();
  return (
    <Layout title={"All Category"}>
      <div className="container d-flex justify-content-center align-items-center flex-row flex-wrap">
        {categories?.map((c) => (
          <div
            className="col-md-4 mt-4 mb-4 gx-2 gy-2 d-flex justify-content-center align-items-center h-25 w-25"
            key={c._id}
          >
            <Link to={`/category/${c.slug}`} className="btn btn-primary p-5">
              {c.name}
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Categories;
