import './App.css';
import vector1 from './vector1.png';
import vector2 from './raindrop-close-up.png';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import WelcomeUser from './component/WelcomeUser';
import DeviceControlWithSlider from './component/DeviceControlWithSlider';
import Chart from './component/chart';
import axios from 'axios';
import React, { Component } from 'react';
import UserHome from './component/usersHome';
import TopNavBar from './component/TopNavBar';
import SensorDevice from './component/SensorDevices';
import ErrorBoundary from './component/ErrorBoundary';

export default class App extends Component {
  state = {
    ledData: [],
    selectedLedData: [],
    fanData: [],
  };

  componentDidMount() {
    axios
      .get(`http://localhost:8000/led`)
      .then(res => {
        const ledData = res.data;
        const selectedLedData = [];
        ledData.map((led, key) => {
          if (led.status === 'ON') {
            selectedLedData.push(led);
          }
        });
        this.setState({ ledData, selectedLedData });
      })
      .catch(error => {
        console.error(error);
      });

    axios
      .get(`http://localhost:8000/fan`)
      .then(res => {
        const fanData = res.data;
        this.setState({ fanData: fanData });
      })
      .catch(error => {
        console.error(error);
      });
  }
  onLedDataChange = changedData => {
    const newLedData = [...this.state.ledData];
    // console.log("newLedData: ", newLedData);
    const selectedLedData = [];
    this.state.ledData.map((led, key) => {
      if (led.idled === changedData.idled) {
        newLedData[key].status = changedData.status;
        newLedData[key].className = changedData.className;
      }
      if (led.status === 'ON') {
        selectedLedData.push(led);
      }
    });
    this.setState({ ledData: newLedData, selectedLedData });
  };

  render() {
    var user = 'User';
    return (
      <>
        <div className="App">
          <div className="container">
            <div className="row clearfix g-5">
              <div className="col-md-8 col-12  ">
                <ErrorBoundary>
                  <TopNavBar />
                </ErrorBoundary>
                <ErrorBoundary>
                  <WelcomeUser image={vector1} name="User" temperature={25} />
                </ErrorBoundary>
                <ErrorBoundary>
                  <SensorDevice title="Sensor Data"></SensorDevice>
                </ErrorBoundary>
                <ErrorBoundary>
                  <UserHome
                    ledData={this.state.ledData}
                    onLedDataChange={this.onLedDataChange}
                  />
                </ErrorBoundary>
                <ErrorBoundary>
                  <div className="DeviceSlider py-4">
                    {this.state.fanData.map((value, key) => {
                      // console.log("fan value: ", value);
                      return (
                        <div key={key} className="col-12">
                          <DeviceControlWithSlider
                            appendToValue={'%'}
                            image={vector2}
                            status={value.status}
                            fan_id={value.fan_id}
                            speed={value.speed}
                            className="fas fa-fan device-icon"
                            text={'Fan ' + value.fan_id}
                          />
                        </div>
                      );
                    })}
                  </div>
                </ErrorBoundary>
              </div>
              <div className="col-md-4 col-12 smart-col2 ">
                <ErrorBoundary>
                  <UserHome
                    ledData={this.state.selectedLedData}
                    onLedDataChange={this.onLedDataChange}
                    title={'ON State Devices'}
                  />
                </ErrorBoundary>

                <ErrorBoundary>
                  <Chart />
                </ErrorBoundary>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
