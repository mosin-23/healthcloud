import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6 ">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact</h3>
          <p>Email: health@cloud.com</p>
          <p>Phone: +1 234 567 890</p>
          <p>Address: 123 California Street, City</p>
        </div>

        {/* About Us */}
        <div>
          <h3 className="text-xl font-semibold mb-3">About Us</h3>
          <p>
            We are passionate developers focused on creating awesome web
            experiences with modern tech like Cloud and Full Stack.
          </p>
        </div>

        {/* Details */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Details</h3>
          <ul className="space-y-1">
            <li>Our Services</li>
            <li>FAQs</li>
          </ul>
        </div>

        {/* Privacy Policy */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Privacy Policy</h3>
          <p>
            We respect your privacy. Read our policy to understand how we
            handle your data and protect your information.
          </p>
        </div>
      </div>

      <div className="text-center text-gray-400 mt-10">
        &copy; {new Date().getFullYear()} Health & Cloud. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
