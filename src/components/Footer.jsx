import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto">
      <div className="container mx-auto text-center">
        <div className="mb-2">
          <p>Contact Us: UrbanWood@gmail.com</p>
          <p>Phone: +91 9072276965</p>
        </div>
        <div className="mb-2">
          <p>&copy; 2025 UrbanWood. All Rights Reserved.</p>
        </div>
        <div className="flex justify-center space-x-4 text-gray-400">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            Facebook
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
