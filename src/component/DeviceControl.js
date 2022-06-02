import React, { Component } from 'react';
class DeviceControl extends Component {
  constructor(props) {
    super(props);

    if (props.status === 'ON') {
      this.state = {
        status: props.status,
        idled: props.idled,
        className: props.classname,
        check: true,
      };
    } else {
      this.state = {
        status: props.status,
        idled: props.idled,
        className: props.classname,
        check: false,
      };
    }
  }

  // statContentUpdate() {
  //     if (this.props.status !== this.state.status) {
  //         if (this.props.status === "ON") {
  //             this.setState({
  //                 status: this.props.status,
  //                 idled: this.props.idled,
  //                 check: true,
  //                 className: this.rops.classname,
  //             })
  //         } else {
  //             this.setState({
  //                 status: this.props.status,
  //                 idled: this.props.idled,
  //                 check: false,
  //                 className: this.props.classname,
  //             })
  //         }
  //     }

  // }

  DeviceControlSwitch = event => {
    // const url = "http://192.168.1.5:8000/led/update";
    const url = 'http://localhost:8000/device';
    var check = event.target.checked;
    var newState = this.state;
    if (check === true) {
      newState.status = 'ON';
      newState.className = 'lightOn';
      newState.check = true;
    } else {
      newState.status = 'OFF';
      newState.className = 'lightOff';
      newState.check = false;
    }
    this.props.ledChanged(newState);

    const requestMetadata = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    };
    fetch(url, requestMetadata)
      .then(res => res.json())
      .then(recipes => {
        this.setState({ recipes });
      });
  };

  render() {
    return (
      <div className={this.state.className + ' card device-card'}>
        <div className="card-body">
          <div className="device-switch-box">
            <label className=" device-switch-label" htmlFor={this.state.idled}>
              {this.state.status}
            </label>

            <label className="switch  device-switch float-end">
              <input
                type="checkbox"
                id={this.state.idled}
                value={this.state.status}
                onClick={this.DeviceControlSwitch}
                onChange={this.DeviceControlSwitch}
                checked={this.state.check}></input>
              <span className="slider round"></span>
            </label>
          </div>

          <i className={this.props.className}></i>

          <h2 className="device-name">{this.props.deviceName}</h2>
        </div>
      </div>
    );
  }
}

export default DeviceControl;
