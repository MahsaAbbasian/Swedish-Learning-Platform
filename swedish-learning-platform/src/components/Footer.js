import React from "react";

function Footer() {
  return (
    <footer>
      <p>Page created by Mahsa Abbasian. All rights reserved © 2024</p>
      <div className="footer-links">
        <a href="mailto:mahsa.abbasian@outlook.com">Contact Email</a> |
        <a href="https://www.linkedin.com/in/mahsa-abbasian-a893b44b/">
          LinkedIn Account
        </a>{" "}
        |<a href="https://github.com/MahsaAbbasian">GitHub Account</a>
      </div>
      <div className="footer-links">
        <a href="/privacy">Privacy Policy</a> |<a href="/terms">Terms of Use</a>
      </div>
    </footer>
  );
}

export default Footer;
