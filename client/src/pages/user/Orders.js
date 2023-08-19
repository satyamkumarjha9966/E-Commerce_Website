import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "./../../components/Layout/UserMenu";

function Orders() {
  return (
    <Layout title={"MenVerse Dashboard - Your Orders"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-2">
              <h4 className="text-center">All Orders</h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Orders;
