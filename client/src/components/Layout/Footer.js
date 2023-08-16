import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <h5 className="text-center">All Right Reserved &copy; MenVerse</h5>
      <p className="text-center mt-3">
        <Link to="/">Home</Link>|<Link to="/about">About Us</Link>|
        <Link to="/contact">Contact Us</Link>|
        <Link to="/policy">Privacy & Policy</Link>|
      </p>
    </div>
  );
}

export default Footer;
