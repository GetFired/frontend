// import React, {useEffect, useRef} from "react";
import Chart from "react-apexcharts";
import useWindowDimensions from "../helper/WindowDims"

interface IProps {
  graphData: number[];
}

const AssetChart = (prop: IProps): JSX.Element => {
  const {graphData} = prop;

  var state = {
    
    options: {
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: graphData[0],
      },
      yaxis: {
        decimalsInFloat: 0,
        forceNiceScale: true,
        
      tooltip: {
          enabled: true,
          offsetX: 0,
      },
      
      },
      colors: ['#EF6458','#F4C63D','#D70206',],
    },
    series: [
      {
        name: "series-1",
        data: graphData[1],
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