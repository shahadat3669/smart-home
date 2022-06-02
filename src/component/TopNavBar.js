import React, { Component } from "react";

export default class TopNavBar extends Component {
  render() {
    return (
      <div className="smart-nav my-3">
        <div className="text-box d-inline-block" style={{ width: "100%" }}>
          <div className="nav-form-box " style={{ width: "100%" }}>
            <i className="fas fa-search nav-icon"></i>
            <input
              type="text"
              placeholder="Search"
              className="nav-form"
              aria-label="Default select example"
              style={{ width: "90%" }}
            />
          </div>
        </div>
      </div>
    );
  }
}
