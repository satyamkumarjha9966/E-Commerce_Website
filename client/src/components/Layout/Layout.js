import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

function Layout({ children, title, description, keywords, author, canonical }) {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <Header />
      <main style={{ marginTop: "40px", marginBottom: "40px" }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "Menverse - Shop Now",
  description: "Menverse is india most affordable mens cloths brand",
  author: "Menverse",
  keywords: "mens cloths, shirt, cloths",
};

export default Layout;
