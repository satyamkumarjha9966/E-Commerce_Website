import React from "react";
import Layout from "../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

function ContactPage() {
  return (
    <Layout
      title={"Contact - Menverse"}
      description={"Menverse is india most affordable mens cloths brand"}
      author={"Menverse"}
      keywords={"mens cloths, shirt"}
      canonical={"http://menverse.com/contact"}
    >
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="https://cdn.pixabay.com/photo/2017/12/02/14/38/contact-us-2993000_640.jpg"
            alt="contactus"
            style={{ width: "80%" }}
            className="shadow p-3 mb-5 bg-white rounded"
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            any query and info about prodduct feel free to call anytime we 24X7
            vaialible
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.help@ecommerceapp.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 012-3456789
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default ContactPage;
