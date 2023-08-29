import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
import toast from "react-hot-toast";
const { Option } = Select;

function AdminOrder() {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Deliverd",
    "Cancel",
  ]);
  const [orders, setOrders] = useState();
  const [auth] = useAuth();

  // Fatching Order Details
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-orders`
      );
      console.log(data);
      console.log(data?.products);
      console.log(data?.map((p) => console.log(p.products)));
      setOrders(data);
    } catch (error) {
      console.log("Error While Fetching Orders" + error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  // Handle Order Status Change
  const handleChange = async (value, orderId) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,
        { status: value }
      );
      getOrders();
      toast.success("Order Status Updated");
    } catch (error) {
      console.log("Error While Updating Order Status" + error);
    }
  };
  return (
    <Layout title={"All Orders Data"}>
      <div className="row p-4">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h3 className="text-center">All Orders</h3>
          {orders?.map((o, i) => {
            return (
              <div className="border shadow">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Order Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(value, o._id)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>{o?.buyer?.name}</td>
                      <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      <td>{o?.products?.length}</td>
                      <td>{moment(o?.createdAt).fromNow()}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {o?.products?.map((p, i) => (
                    <div className="row mb-2 p-3 card flex-row" key={p._id}>
                      <div className="col-md-4">
                        <img
                          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                          width="100px"
                          height={"100px"}
                        />
                      </div>
                      <div className="col-md-8">
                        <p>{p.name}</p>
                        <p>{p.description.substring(0, 100)}</p>
                        <p>Price : {p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export default AdminOrder;
