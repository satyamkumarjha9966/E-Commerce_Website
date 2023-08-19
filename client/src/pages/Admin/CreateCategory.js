import React from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

function CreateCategory() {
  return (
    <Layout title={"MenVerse Admin Dashboard - Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-2">
              <h4 className="text-center">Create Category</h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateCategory;
