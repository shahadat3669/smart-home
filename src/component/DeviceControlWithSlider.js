import React, { Component } from 'react';
import RoundSlider from './roundSlider';
import Navitem from './NavItem';

class DeviceControlWithSlider extends Component {
  constructor(props) {
    super(props);
    if (this.props.status === 'ON')
      this.state = {
        fan_id: this.props.fan_id,
        status: this.props.status,
        check: true,
        speed: this.props.speed,
      };
    else {
      this.state = {
        fan_id: this.props.fan_id,
        status: this.props.status,
        check: false,
        speed: this.props.speed,
      };
    }
    // console.log("props: ", this.props);
    // console.log("check: ", this.state.check);
  }
  DeviceControlSwitch = event => {
    var check = event.target.checked;

    if (check === true) {
      this.setState({
        status: 'ON',
        check: true,
      });
    } else {
      this.setState({
        status: 'OFF',
        check: false,
      });
    }

    setTimeout(() => {
      const url = 'http://localhost:8000/device';
      // const tempfan = {
      //   load: {
      //     fan: [
      //       {
      //         fan_id: this.state.fan_id,
      //         status: this.state.status,
      //         speed: this.state.speed,
      //       },
      //     ],
      //   },
      // };
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
    }, 500);
  };
  incrementspeed = () => {
    var nwspeed = this.state.speed + 20;
    if (nwspeed <= 100) {
      this.setState({
        speed: nwspeed,
      });
    } else {
      this.setState({
        speed: 0,
      });
    }
  };
  decrementspeed = () => {
    const nwspeed = this.state.speed - 20;
    if (nwspeed >= 0) {
      this.setState({
        speed: nwspeed,
      });
    } else {
      this.setState({
        speed: 100,
      });
    }
  };
  getspeed = speed => {
    this.setState({
      speed,
    });
    const url = 'http://localhost:8000/device';
    // const tempfan = {
    //   load: {
    //     fan: [
    //       {
    //         fan_id: this.state.fan_id,
    //         status: this.state.status,
    //         speed: this.state.speed,
    //       },
    //     ],
    //   },
    // };
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
      <div className="card device-card-with-slider">
        <div className="card-body">
          <div className="device-switch-box">
            <label className=" device-switch-label" htmlFor={this.props.ID}>
              <Navitem
                className={this.props.className}
                text={this.props.text}
              />
            </label>

            <label className="switch  device-switch float-end">
              <input
                type="checkbox"
                id={this.props.ID}
                speed={this.state.status}
                onClick={this.DeviceControlSwitch}
                onChange={this.DeviceControlSwitch}
                checked={this.state.check}></input>
              <span className="slider round"></span>
            </label>
          </div>

          <div className="text-center">
            <div className="d-block">
              <div className="d-none d-md-inline-block me-3">
                {this.state.check == true && (
                  <button
                    className="d-inline-block slider-device-button btn primary-bg text-light"
                    onClick={this.decrementspeed}>
                    -
                  </button>
                )}
              </div>
              <div className="d-inline-block">
                {this.state.check == true && (
                  <RoundSlider
                    label="Speed"
                    appendTospeed={this.props.appendTospeed}
                    image={this.props.image}
                    val={this.getspeed}
                    data={this.state.speed}
                  />
                )}
                {this.state.check == false && (
                  <div
                    className="text-box d-inline-block"
                    style={{
                      padding: '40px',
                      marginBottom: '40px',
                      border: '2px solid #6F5CEA',
                      borderRadius: '50%',
                    }}>
                    <h3 className="text-1">OFF</h3>
                  </div>
                )}
              </div>
              <div className="d-none d-md-inline-block ms-3">
                {this.state.check == true && (
                  <button
                    className="d-inline-block slider-device-button btn primary-bg text-light"
                    onClick={this.incrementspeed}>
                    +
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DeviceControlWithSlider;
