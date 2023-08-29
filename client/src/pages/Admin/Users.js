import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
import toast from "react-hot-toast";
const { Option } = Select;

function Users() {
  const [users, setUsers] = useState();
  const [auth] = useAuth();
  const [role, setRole] = useState([0, 1]);

  // Handle Change Role
  const changeRole = async (value, userId) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/update-role/${userId}`,
        { role: value }
      );
      toast.success("User Role Updated");
    } catch (error) {
      console.log("Error While Update Role", error);
    }
  };

  // Get all Users
  const getUsers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/get-all-users`
      );
      console.log(data);
      setUsers(data);
    } catch (error) {
      console.log("Error While Fetching All Users Details");
    }
  };

  useEffect(() => {
    if (auth?.token) getUsers();
  }, [auth?.token]);
  return (
    <Layout title={"MenVerse Admin Dashboard - All Users"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="w-100 p-2">
              <h3 className="text-center">All Users</h3>
              <hr />
              <div className="border shadow">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">E-Mail</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Address</th>
                      <th scope="col">Role</th>
                      <th scope="col">Security Answer</th>
                      <th scope="col">Register Time</th>
                    </tr>
                  </thead>
                  {users?.map((u, i) => {
                    return (
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>{u?.name}</td>
                          <td>{u?.email}</td>
                          <td>{u?.phone}</td>
                          <td>{u?.address}</td>
                          <Select
                            bordered={false}
                            onChange={(value) => changeRole(value, u._id)}
                            defaultValue={u?.role}
                          >
                            {role.map((r, i) => (
                              <Option key={i} value={r}>
                                {r}
                              </Option>
                            ))}
                          </Select>
                          <td>{u?.answer}</td>
                          <td>{moment(u?.createdAt).fromNow()}</td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Users;
