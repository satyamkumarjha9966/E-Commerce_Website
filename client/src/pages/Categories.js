import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../components/hooks/useCategory";
import { Link } from "react-router-dom";

function Categories() {
  const categories = useCategory();
  return (
    <Layout title={"All Category"}>
      <div className="container">
        <div className="row">
          {categories?.map((c) => (
            <div className="col-md-6 mt-4 mb-2 gx-2 gy-2" key={c._id}>
              <Link to={`/category/${c.slug}`} className="btn btn-primary">
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Categories;
