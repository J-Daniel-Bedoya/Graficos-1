import React, { useEffect, useRef } from "react";
import { createChart, ColorType } from "lightweight-charts";

const ChartComponent = ({ data, colors = {} }) => {
  const {
    backgroundColor = "#000",
    textColor = "#fff",
    areaTopColor = "#00e988",
    areaBottomColor = "#2962ff47",
  } = colors;

  const chartContainerRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
      rightPriceScale: {
        visible: false, // Oculta el eje Y derecho
      },
      leftPriceScale: {
        visible: false, // Oculta el eje Y izquierdo
      },
      grid: {
        vertLines: {
          visible: true,
        },
        horzLines: {
          visible: false,
          color: "#1775d3", // Color de las líneas horizontales
        },
      },
    });
    chart.timeScale().fitContent();

    const series = chart.addAreaSeries({
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
    });

    series.setData(
      data.map((point) => ({ time: point.time, value: point.value })),
      {
        priceLineColor: (index, point) => {
          if (point.value < 2) {
            return "blue"; // Color azul si es menos de 2
          } else if (point.value >= 2) {
            return "violet"; // Color violeta si es más de 10
          } else {
            return "purple"; // Color morado para otros valores
          }
        },
      }
    );

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data, backgroundColor, textColor]);

  return <div ref={chartContainerRef} />;
};

export default ChartComponent;
