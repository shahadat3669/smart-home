import React from "react";
import ChartJS from "./chartJsDemo";

export default function Rechart() {
    return (
        <div className="rechartBox">
            <div className="form-check">
                <input className="form-check-input chart-radio-button" type="radio" name="flexRadioDefault" id="flexRadioDefault2" ></input>
                <label className="form-check-label" htmlFor="flexRadioDefault2" style={{ fontSize: "1vw", fontWeight: "600" }}>
                    temperature & Humadity
                </label>
            </div>
            <ChartJS></ChartJS>
        </div>
    );
}
