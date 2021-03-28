// import React, {useEffect, useRef} from "react";
import Chart from "react-apexcharts";
import useWindowDimensions from "../helper/WindowDims"

interface IProps {
  graphData: number[];
  fireGoal: number;
}

const BreakdownChart = (prop: IProps): JSX.Element => {
  const {graphData, fireGoal} = prop;

  var state = {
    
    options: {
      annotations: {
        position: 'front' ,
        yaxis: [{
          y: fireGoal,
          borderColor: '#F4C63D',
          opactity: 0.8,
        }]
      },


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

export default BreakdownChart;