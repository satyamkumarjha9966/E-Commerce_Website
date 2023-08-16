import React from "react";
import Layout from "../components/Layout/Layout";

function AboutPage() {
  return (
    <Layout>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="https://cdn.pixabay.com/photo/2018/09/19/18/32/heart-3689233_640.jpg"
            alt="contactus"
            style={{ width: "80%" }}
            className="shadow p-3 mb-5 bg-white rounded"
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            officiis obcaecati esse tempore unde ratione, eveniet mollitia,
            perferendis eius temporibus dicta blanditiis doloremque explicabo
            quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
            accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
            commodi illum quidem neque tempora nam.
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default AboutPage;
