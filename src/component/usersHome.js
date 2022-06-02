import React, { Component } from "react";
import DeviceControl from "./DeviceControl";
import NavItem from "./NavItem";

export default class usersHome extends Component {
  render() {
    var user = "User";

    return (
      <>
        <div className="smart-nav pb-3 clearfix">
          <div className="text-box d-inline-block">
            <h3 className="text-1">
              {this.props.title ? this.props.title : `${user}'s Home`}
            </h3>
          </div>
          <div className="nav-item-box float-lg-end">
            <div className="row">
              <div className="col">
                <NavItem text="35%" className="fas fa-tint" />
              </div>
              <div className="col">
                <NavItem text="25ºC" className="fas fa-thermometer-quarter" />
              </div>
              <div className="col">
                <div className="nav-form-box">
                  <select
                    className="nav-form"
                    aria-label="Default select example"
                  >
                    <option>Select Room</option>
                    <option>Living Room</option>
                    <option>Kitchen Room</option>
                    <option>Dining Room</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {this.props.ledData.map((led, key) => (
            <div key={key} className="col-sm-6 col-md-6">
              <DeviceControl
                ID={"light_" + led.idled}
                idled={led.idled}
                status={led.status}
                classname={led.className}
                deviceName={"light " + led.idled}
                className="far fa-lightbulb device-icon"
                ledChanged={this.props.onLedDataChange}
              />
            </div>
          ))}
        </div>
      </>
    );
  }
}

// import React, { Component } from "react";

// import DeviceControl from "./DeviceControl";
// export default class usersHome extends Component {
//     constructor(props) {
//         super(props);
//         console.log("props : ", this.props);
//         this.state = {
//             led: this.props.led,
//             fan: [],
//         };
//         console.log("cons state: ", this.state);
//     }

//     componentDidMount() {
//         this.setState({ led: this.props.led });

//         this.ledDevice = this.state.led.map((value, key) => {
//             console.log("in component did mount value: ", value);
//             return (
//                 <div key={key} className="col-sm-6 col-md-6">
//                     <DeviceControl
//                         ID={"light_" + value.idled}
//                         idled={value.idled}
//                         status={value.status}
//                         classname={value.className}
//                         deviceName={"light " + value.idled}
//                         className="far fa-lightbulb device-icon"
//                     />
//                 </div>
//             );
//         });
//     }

//     render() {
//         return <>
//             <div className="row mb-4 gx-4 gy-md-0 gy-4">{this.ledDevice}
//             </div></>

//     }
// }
