import React from "react";

export default function NavItem(props) {
  return (
    <div>
      <div
        className="nav-item-box-content mx-auto"
        style={{ minWidht: "100px" }}
      >
        <i className={props.className + " nav-icon d-inline-block"}></i>
        <p className="nav-icon-text d-inline-block">{props.text}</p>
      </div>
    </div>
  );
}

