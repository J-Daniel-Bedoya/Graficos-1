import React, { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import { GridComponent, TooltipComponent } from "echarts/components";
import { LineChart } from "echarts/charts";
import "echarts-liquidfill";

// Registra los componentes necesarios
echarts.use([GridComponent, TooltipComponent, LineChart]);

const ChartComponent = ({ data, colors = {}, height = 400 }) => {
  const {
    backgroundColor = "#000",
    textColor = "#fff",
    lineColor = "#2962FF",
    pointColorLow = "#00FF00",
    pointColorHigh = "#800080",
  } = colors;

  const chartContainerRef = useRef();

  useEffect(() => {
    const chart = echarts.init(chartContainerRef.current);

    chart.setOption({
      backgroundColor,
      textStyle: {
        color: textColor,
      },
      xAxis: {
        type: "category",
        data: data.map((item) => item.time),
        axisLabel: {
          show: false, // Oculta los valores en el eje x
        },
      },
      yAxis: {
        type: "value",
        axisLabel: {
          show: false, // Oculta los valores en el eje y
        },
      },
      series: [
        {
          type: "line",
          data: data.map((item) => ({
            value: item.value,
            itemStyle: {
              color: item.value < 2 ? pointColorLow : pointColorHigh,
            },
          })),
          lineStyle: {
            color: lineColor,
          },
        },
      ],
    });

    return () => {
      chart.dispose();
    };
  }, [
    data,
    backgroundColor,
    textColor,
    lineColor,
    pointColorLow,
    pointColorHigh,
  ]);

  return <div ref={chartContainerRef} style={{ width: "100%", height }} />;
};

export default ChartComponent;
