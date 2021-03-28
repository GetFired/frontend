// import React, {useEffect, useRef} from "react";
import Chart from "react-apexcharts";
import useWindowDimensions from "../helper/WindowDims"

//

const AssetChart = (): JSX.Element => {
  var state = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      },
      // colors: ['']
      colors: ['#EF6458','#F4C63D','#D70206',],
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }
    ]
  };

  const { width,height } = useWindowDimensions();


  return (
    <div className="visualization">
      <Chart
        options={state.options}
        series={state.series} type="area" width={width * 0.5 } />
    </div>
  );
}

export default AssetChart;