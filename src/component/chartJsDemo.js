import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
var ReactDOM = require('react-dom');
export default function ChartJSDemo() {
    const [state, setState] = useState({
        data: [12, 20, 15, 25, 15, 18, 3],
    });

    const refHolder = useRef();
    useEffect(() => {
        setInterval(() => {
            changedata();
        }, 5000);
    }, state.data);
    let width, height, gradient;
    function getGradient(ctx, chartArea) {
        const chartWidth = chartArea.right - chartArea.left;
        const chartHeight = chartArea.bottom - chartArea.top;
        if (!gradient || width !== chartWidth || height !== chartHeight) {
            // Create the gradient because this is either the first render
            // or the size of the chart has changed
            width = chartWidth;
            height = chartHeight;
            gradient = ctx.createLinearGradient(0, chartArea.right, 0, chartArea.left);
            // gradient.addColorStop(0, Utils.CHART_COLORS.blue);
            // gradient.addColorStop(0.5, Utils.CHART_COLORS.yellow);
            // gradient.addColorStop(1, Utils.CHART_COLORS.red);
            // const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

            gradient.addColorStop(0.3, "#ffffff");
            gradient.addColorStop(0.5, "#FFB697");
            // gradient.addColorStop(0.8, "#FF611F");

        }

        return gradient;
    }
    const chartData = {
        labels: [
            "Sat",
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
        ],
        datasets: [
            {
                id: 2,
                label: "temperature of the week",
                data: state.data,
                backgroundColor: function (context) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) {
                        // This case happens on initial chart load
                        return;
                    }
                    return getGradient(ctx, chartArea);
                },
                pointBackgroundColor: "white",
                pointBorderColor: "black",
                borderColor: "#FF611F",
                borderWidth: 1


            },


        ],
        bordercolor: "black",
    };
    const changedata = () => {
        var tmp = state.data;
        for (let i = 0; i < 7; i++) {
            tmp[i] = Math.floor(Math.random() * 100);
        }

        setState({ data: tmp });


    };

    // ReactDOM.render(element, document.getElementById('chart'));

    return (
        <div>
            <Line
                id="chart"
                ref={refHolder}
                redraw={true}
                datasetIdKey="id"
                data={chartData}

            />
        </div>
    );
}
