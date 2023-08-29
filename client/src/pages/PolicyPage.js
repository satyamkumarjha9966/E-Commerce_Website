import React from "react";
import Layout from "./../components/Layout/Layout";

function PolicyPage() {
  return (
    <Layout
      title={"Privacy & Policy - Menverse"}
      description={"Menverse is india most affordable mens cloths brand"}
      author={"Menverse"}
      keywords={"mens cloths, shirt"}
      canonical={"http://menverse.com/policy"}
    >
      <div className="row px-4 py-1">
        <p className="text-justify mt-2">
          Thank you for visiting Manverse. We are committed to protecting your
          privacy and ensuring the security of your personal information. This
          Privacy Policy outlines the types of information we collect, how we
          use it, and the choices you have regarding your data. By accessing or
          using our website, you agree to the terms of this Privacy Policy.
        </p>
        <h4 className="text-justify mt-2">Personal Information : </h4>
        <p className="text-justify mt-2">
          When you make a purchase, create an account, or subscribe to our
          newsletter, we may collect information such as your name, email
          address, shipping address, billing information, and contact details.
        </p>
        <h4 className="text-justify mt-2">Transaction Information : </h4>
        <p className="text-justify mt-2">
          When you make a purchase, we collect information about the products
          you buy, payment methods, and transaction details.
        </p>
        <h4 className="text-justify mt-2">Customer Support :</h4>
        <p className="text-justify mt-2">
          We may use your information to respond to your inquiries, requests, or
          comments.
        </p>
        <h4 className="text-justify mt-2">Legal Compliance: </h4>
        <p className="text-justify mt-2">
          We may use your information to comply with applicable laws,
          regulations, or legal processes.
        </p>
        <h4 className="text-justify mt-2">Data Security :</h4>
        <p className="text-justify mt-2">
          We implement industry-standard security measures to protect your
          personal information from unauthorized access, alteration, disclosure,
          or destruction. However, no data transmission over the internet or
          electronic storage is entirely secure, so we cannot guarantee absolute
          security.
        </p>
        <h4 className="text-justify mt-2">Sharing Your Information :</h4>
        <p className="text-justify mt-2">
          We do not sell, trade, or rent your personal information to third
          parties. However, we may share your information with trusted service
          providers who assist us in operating our website, conducting business
          activities, and serving you better (e.g., payment processors, shipping
          companies).
        </p>
        <h4 className="text-justify mt-2">
          Cookies and Tracking Technologies :
        </h4>
        <p className="text-justify mt-2">
          Our website uses cookies and similar tracking technologies to enhance
          your browsing experience, analyze website usage, and provide
          personalized content. You can manage your cookie preferences through
          your browser settings.
        </p>
        <h4 className="text-justify mt-2">Your Choices :</h4>
        <p className="text-justify mt-2">
          You have the right to access, update, or delete your personal
          information. You can manage your account settings and preferences by
          logging into your account on our website. If you wish to unsubscribe
          from our marketing communications, you can use the "unsubscribe" link
          provided in our emails.
        </p>
        <h4 className="text-justify mt-2">Children's Privacy :</h4>
        <p className="text-justify mt-2">
          Our website is not intended for individuals under the age of 18. We do
          not knowingly collect personal information from children. If you
          believe we have inadvertently collected such information, please
          contact us to have it removed.
        </p>
        <h4 className="text-justify mt-2">Changes to the Privacy Policy :</h4>
        <p className="text-justify mt-2">
          We may update this Privacy Policy from time to time to reflect changes
          in our practices or for other operational, legal, or regulatory
          reasons. We encourage you to review this page periodically for the
          latest information on our privacy practices.
        </p>
      </div>
    </Layout>
  );
}

export default PolicyPage;
