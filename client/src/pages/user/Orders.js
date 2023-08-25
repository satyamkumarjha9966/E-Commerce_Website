import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "./../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

function Orders() {
  const [orders, setOrders] = useState();
  const [auth] = useAuth();

  // Fatching Order Details
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`
      );
      setOrders(data);
    } catch (error) {
      console.log("Error While Fetching Orders" + error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout title={"MenVerse Dashboard - Your Orders"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="container">
              <h3 className="text-center">All Orders</h3>
              {orders?.map((o, i) => {
                return (
                  <div className="border shadow">
                    <table className="table">
                      <thead>
                        <tr>
                          <td scope="col">#</td>
                          <td scope="col">Status</td>
                          <td scope="col">Buyer</td>
                          <td scope="col">Payment</td>
                          <td scope="col">Quantity</td>
                          <td scope="col">Order Date</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>{i + 1}</th>
                          <th>{o?.status}</th>
                          <th>{o?.buyer?.name}</th>
                          <th>{o?.payment?.success ? "Success" : "Failed"}</th>
                          <th>{o?.products?.length}</th>
                          <th>{moment(o?.createAt).fromNow()}</th>
                        </tr>
                      </tbody>
                    </table>
                    <div className="d-flex flex-row flex-wrap align-items-center justify-content-center">
                      {o?.products?.map((p) => (
                        <div
                          className="row p-2 m-2 card flex-row shadow"
                          style={{ width: "28rem" }}
                          key={p._id}
                        >
                          <div className="col-md-4">
                            <img
                              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                              className="card-img-top p-2"
                              alt={p.name}
                              height={"100%"}
                              width={"100%"}
                            />
                          </div>
                          <div className="col-md-8 d-flex flex-column justify-content-center gap-1">
                            <h4>{p.name}</h4>
                            <p>{p?.description.substring(0, 40)}....</p>
                            <h5>₹ {p.price}</h5>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Orders;
