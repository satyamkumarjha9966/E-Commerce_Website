import React from "react";
import Layout from "./../components/Layout/Layout";

function PolicyPage() {
  return (
    <Layout>
      <div className="row contactus">
        <div className="col-md-6 ">
          <img
            src="https://cdn.pixabay.com/photo/2017/03/26/11/33/binary-2175285_640.jpg"
            alt="contactus"
            style={{ width: "85%" }}
            className="shadow p-3 mb-5 bg-white rounded"
          />
        </div>
        <div className="col-md-4">
          <p>add privacy policy</p>
          <p>add privacy policy</p>
          <p>add privacy policy</p>
          <p>add privacy policy</p>
          <p>add privacy policy</p>
          <p>add privacy policy</p>
          <p>add privacy policy</p>
        </div>
      </div>
    </Layout>
  );
}

export default PolicyPage;
