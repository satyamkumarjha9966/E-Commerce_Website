import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div>
      <Header />
      <main style={{ marginTop: "40px" }}>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
