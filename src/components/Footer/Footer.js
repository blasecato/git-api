import React from "react";
import logoPng from "../../assets/images/logo.png";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="container">
        <div className="icon">
          <img src={logoPng} className="logo" alt="logo" />
          <p>© 2022 GitHub, Inc.</p>
        </div>
        <div className="links">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://docs.github.com/en/site-policy/github-terms/github-terms-of-service"
          >
            Terms
          </a>
          <a
            rel="noreferrer"
            href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
          >
            Privacy
          </a>
          <a rel="noreferrer" href="https://docs.github.com/es">
            API
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
