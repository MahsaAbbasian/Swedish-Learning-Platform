import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/grammar">Grammar</Link>
        </li>
        <li>
          <Link to="/writing">Writing</Link>
        </li>
        <li>
          <Link to="/reading">Reading</Link>
        </li>
        <li>
          <Link to="/listening">Listening</Link>
        </li>
        <li>
          <Link to="/pods">Pods</Link>
        </li>
        <li>
          <Link to="/news">News</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
