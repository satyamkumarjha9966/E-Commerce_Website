import React from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

function AdminDashboard() {
  const [auth] = useAuth();
  return (
    <Layout title={"MenVerse Admin Dashboard"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-4 shadow">
              <h3 className="text-center text-success fw-bold">DashBoard</h3>
              <hr />
              <h5>
                Admin Name :{" "}
                <span className="fw-bold text-danger">{auth?.user?.name}</span>
              </h5>
              <h5>
                Admin Email :{" "}
                <span className="fw-bold text-danger">{auth?.user?.email}</span>
              </h5>
              <h5>
                Admin Contact :{" "}
                <span className="fw-bold text-danger">{auth?.user?.phone}</span>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
