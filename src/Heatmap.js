import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function Heatmap() {
	const chartRef = useRef(null);

	useEffect(() => {
		d3.json("/filteredData.json").then((data) => {
			const svg = d3.select(chartRef.current);
			const margin = { top: 50, right: 50, bottom: 100, left: 100 };
			const width = 2000 - margin.left - margin.right;
			const height = 1500 - margin.top - margin.bottom;

			const timeStart = d3.min(data, (d) => d.timestamp);
			const timeEnd = d3.max(data, (d) => d.timestamp);

			// Scales
			const xScale = d3
				.scaleLinear()
				.domain([timeStart, timeEnd])
				.range([0, width]);
			const yScale = d3
				.scaleLinear()
				.domain(d3.extent(data, (d) => d.price))
				.range([height, 0]);

			// Axes
			const xAxis = svg
				.append("g")
				.attr(
					"transform",
					`translate(${margin.left}, ${height + margin.top})`
				)
				.call(d3.axisBottom(xScale).ticks(width / 100));

			xAxis
				.selectAll("text")
				.style("text-anchor", "end")
				.attr("transform", "rotate(-45)")
				.text((d) => {
					return `${(d - timeStart).toFixed(0)}`;
				});

			svg.append("g")
				.attr("transform", `translate(${margin.left}, ${margin.top})`)
				.call(d3.axisLeft(yScale));

			// Data lines
			svg.selectAll("line")
				.data(data)
				.enter()
				.append("line")
				.attr("x1", (d) => xScale(d.timestamp))
				.attr("y1", (d) => yScale(d.price))
				.attr("x2", (d) => {
					const endPoint = d.timestamp + 150000; // 150ms later
					return xScale(endPoint > timeEnd ? timeEnd : endPoint);
				})
				.attr("y2", (d) => yScale(d.price))
				.attr("stroke", (d) => (d.side === "ask" ? "red" : "green"))
				.attr("stroke-width", 2)
				.attr("transform", `translate(${margin.left}, ${margin.top})`);
		});
	}, []);

	return (
		<div className="chart-container">
			<svg
				ref={chartRef}
				width={2000}
				height={1500}
				style={{ border: "1px solid #ccc", backgroundColor: "gray" }}
			></svg>
		</div>
	);
}

export default Heatmap;
