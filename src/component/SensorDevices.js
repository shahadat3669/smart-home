import React, { Component, useState } from 'react';
import axios from 'axios';
import audio1 from '../siren.mp3';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import usePrevious from './usePrevious';

const MySwal = withReactContent(Swal);
const swalCheck = [false, false, false];

export default class SensorDevices extends Component {
  state = {
    sensorData: [],
  };
  componentDidMount = () => {
    axios
      .get(`http://localhost:8000/device`)
      .then(res => {
        const TempSensorData = res.data.sensor;
        this.setState({ sensorData: TempSensorData });
      })
      .catch(error => {
        console.error(error);
      });
    // axios
    //   .get(`http://localhost:8000/device`)
    //   .then(res => {
    //     const TempSensorData = res.data.sensor;
    //     this.setState({ sensorData: TempSensorData });
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
    // setInterval(() => {
    //   axios
    //     .get(`http://localhost:8000/device`)
    //     .then(res => {
    //       const TempSensorData = res.data.sensor;
    //       this.setState({ sensorData: TempSensorData });
    //     })
    //     .catch(error => {
    //       console.error(error);
    //     });
    // }, 1000);
  };

  componentWillMount = () => {
    setInterval(() => {
      axios
        .get(`http://localhost:8000/device`)
        .then(res => {
          const TempSensorData = res.data.sensor;

          this.state.sensorData.map((sensor, key) => {
            if (
              TempSensorData[key].id === sensor.id &&
              TempSensorData[key].status !== sensor.status
            ) {
              this.setState({ sensorData: TempSensorData });
            }
          });
        })
        .catch(error => {
          console.error(error);
        });
    }, 1000);
  };
  UpdateSensor = (id, type) => {
    console.log('Update sensor: ');
    const url = 'http://localhost:8000/device';
    const requestMetadata = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sensor: [
          {
            id: id,
            status: 0,
            type: type,
          },
        ],
      }),
    };
    console.log('Req meta data: ', requestMetadata);
    fetch(url, requestMetadata)
      .then(res => res.json())
      .then(recipes => {
        this.setState({ recipes });
      });
  };
  render() {
    var user = 'Shufol';
    function sensorType(value) {
      if (value === 0) return 'Fire';
      else if (value === 1) return 'Water Level';
      else if (value === 2) return 'Gas';
    }
    function sensorIcon(value) {
      if (value === 0) return 'fa-solid fa-fire';
      else if (value === 1) return 'fa-solid fa-droplet';
      else if (value === 2) return 'fa-solid fa-gas-pump';
    }
    function isDetected(value, type) {
      if (value === 0 && type !== 1) return 'Not-Detected';
      else if (value === 1 && type !== 1) return 'Detected';
      else if (value === 0 && type === 1) return 'Full';
      else if (value === 1 && type === 1) return 'Low';
    }
    return (
      <>
        <div className="smart-nav pb-3 clearfix">
          <div className="text-box d-inline-block">
            <h3 className="text-1">
              {this.props.title ? this.props.title : `${user}'s Home`}
            </h3>
          </div>
        </div>
        <div className="row g-4 mb-3">
          {this.state.sensorData.map((value, key) => {
            if (value.status === 1) {
              MySwal.fire({
                title:
                  sensorType(value.type) +
                  ' ' +
                  isDetected(value.status, value.type),
                text: 'Do you want to Fix It',
                icon: 'error',
                backdrop: false,
                confirmButtonText: 'YES',
              }).then(result => {
                if (result.isConfirmed) {
                  Swal.fire(
                    'Fixed!',
                    'Your ' + sensorType(value.type) + ' has been fixed',
                    'success'
                  );
                  this.UpdateSensor(value.id, value.type);
                }
              });
            }
            return (
              <div
                key={key}
                className="col- col-xm-6 col-sm-6 col-md-6 col-lg-4">
                <div className={isDetected(value.status) + ' card Sensor-card'}>
                  <div className="card-body">
                    {value.status == 1 && <audio preload="auto" autoplay="true" src={audio1}>
                      Your browser does not support the HTML5 audio element.
                    </audio>}
                    <i className={sensorIcon(value.type) + ' sensorIcon'}></i>
                    <h4 style={{ marginTop: '16px', marginBottom: '0px' }}>
                      {sensorType(value.type)}
                    </h4>
                    <h6>{isDetected(value.status, value.type)}</h6>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
