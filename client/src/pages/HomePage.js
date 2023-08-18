import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";

function HomePage() {
  const [auth, setAuth] = useAuth();
  return (
    <Layout
      title={"Menverse - Get Best Deal Here"}
      description={"Menverse is india most affordable mens cloths brand"}
      author={"Menverse"}
      keywords={"mens cloths, shirt"}
      canonical={"http://menverse.com/"}
    >
      <h1>HomePage</h1>
      <pre>{JSON.stringify(auth)}</pre>
    </Layout>
  );
}

export default HomePage;
