import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout/Layout";
import UserMenu from "./../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";

function Profile() {
  // Context
  const [auth, setAuth] = useAuth();

  // States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  // Get User Data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  // Function To Hnadle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/update-profile`,
        { name, email, password, phone, address }
      );

      if (data?.error) {
        toast.error(data.message);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success(data.message);
      }
    } catch (error) {
      console.log("Error in User Registration F > " + error);
      toast.error("Something Went Wrong");
    }
  };
  return (
    <Layout title={"MenVerse Dashboard - Your Profile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="w-75">
              <div className="bg-primary-subtle p-4 shadow mb-5 rounded">
                <h1 className="mb-3 text-center">User Profile</h1>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputName"
                      placeholder="Enter Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail"
                      placeholder="Enter Your E-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="exampleInputPhone"
                      placeholder="Enter Your Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputAddress"
                      placeholder="Enter Your Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword"
                      placeholder="Enter Your New Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
