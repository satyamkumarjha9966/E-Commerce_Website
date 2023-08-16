import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div>
      <Header />
      <main>
        <div>{children}</div>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
