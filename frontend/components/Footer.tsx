import React from "react";

const Footer = () => {
  return (
    <footer className="footer text-center p-4 mt-8 w-full bg-[#0a0a0f] cyber-grid ">
      <div className="flex items-center justify-center space-x-4">
        <h1 className="text-xl text-white">
          Build with ❤️ by{" "}
          <strong>
            <a
              rel="noopener noreferrer"
              className="text-teal-300 no-underline hover:underline hover:text-teal-700 "
            >
              Bean
            </a>
          </strong>
          , Follow us on{" "}
          <a
            className="text-teal-300 no-underline hover:underline  hover:text-teal-700"
            href="https://x.com/moluoyingxiong"
            target="_blank"
            rel="noopener noreferrer"
          >
            X
          </a>
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
