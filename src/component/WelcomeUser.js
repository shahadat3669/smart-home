import React from "react";

export default function WelcomeUser(props) {
    return (
        <div
            className="card welcome-card text-dark"

        >
            <img className="welcome-image " src={props.image} alt={"welcome image"}></img>
            <div className="card-img-overlay">
                <div className="card-text--box">
                    <h5 className="card-title card-text-1">Hello, {props.name}!</h5>
                    <div className="card-text card-text-2">
                        Welcome Home! The air quality is good & fresh you can go out today.
                    </div>
                    <div className="card-text--box--inner-box">
                        <div className="inner-text-1">
                            <span>
                                <i className="fas fa-thermometer-quarter welcome-card-icon"></i>
                                <span className="celcius-data">+{props.temperature}º</span>
                                Outdoor temperature
                            </span>
                        </div>
                        <div className="inner-text-1">
                            <i className="fas fa-cloud welcome-card-icon"></i>
                            Fuzzy cloudy weather
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
