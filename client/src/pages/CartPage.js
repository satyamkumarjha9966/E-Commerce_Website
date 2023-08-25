import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

function CartPage() {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setinstance] = useState("");
  const [loading, setLoading] = useState(false);

  // Remove Cart Item Function
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(myCart));
      setCart(myCart);
    } catch (error) {
      console.log("Error on Removing Cart Item" + error);
    }
  };

  // Total Cart Price | Value
  const totalCartPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total;
    } catch (error) {
      console.log("Error Come in Getting Total Price of Cart" + error);
    }
  };

  // Get Payment Gateway Token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log("Error in Getting Token" + error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // Handeling Payment Button
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
        { cart, nonce }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log("Error in Handle Payment" + error);
      setLoading(false);
    }
  };

  return (
    <Layout title={"Cart Page - MenVerse"}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="text-center bg-light p-2">
              {/* {`Hello ${auth?.token && auth?.user?.name}`} */}
              {auth?.token ? `Hello ${auth?.user?.name}` : "Hello Guest"}
            </h2>
            <h4 className="text-center mt-2">
              {auth?.token
                ? cart?.length
                  ? `You Have ${cart.length} Items In Your Cart`
                  : "Your Cart Is Empty"
                : `You Have ${cart.length} Items In Your Cart, Please Login To Checkout`}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7 mt-2">
            {cart?.map((p) => (
              <div className="row p-2 mt-4 card flex-row" key={p._id}>
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
                  <p>{p?.description.substring(0, 40)}</p>
                  <h5>₹ {p.price}</h5>
                  <button
                    className="btn btn-danger w-50"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-5 mt-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total: ₹ {totalCartPrice()}</h4>
            <hr />
            {auth?.user?.address ? (
              <div className="mb-3">
                <h4>Current Address: </h4>
                <h5>{auth?.user?.address}</h5>
                <button
                  className="btn btn-warning"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>
              </div>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please Login To Checkout
                  </button>
                )}
              </div>
            )}
            <hr />
            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setinstance(instance)}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CartPage;
