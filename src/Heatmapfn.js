import React, { useEffect, useState } from "react";
import "./Heatmapfn.css";

function Heatmapfn() {
	const [data, setData] = useState([]);
	const margin = { top: 50, right: 50, bottom: 100, left: 100 };
	const width = 2000 - margin.left - margin.right;
	const height = 1500 - margin.top - margin.bottom;
	const numXTicks = 15;
	const numYTicks = 10;
	const finalTimestamp = 1703894401478000;

	useEffect(() => {
		fetch("/filteredData.json")
			.then((response) => response.json())
			.then((data) => setData(data));
	}, []);

	if (!data.length) {
		return <div>Loading</div>;
	}

	const minTimestamp = data[0].timestamp;
	const maxTimestamp = finalTimestamp;

	const xScale = (value) =>
		((value - minTimestamp) / (maxTimestamp - minTimestamp)) * width;
	const prices = data.map((d) => d.price);
	const minPrice = Math.min(...prices);
	const maxPrice = Math.max(...prices);
	const yScale = (value) =>
		height - ((value - minPrice) / (maxPrice - minPrice)) * height;

	const lines = data.map((d, index) => {
		const x1 = xScale(d.timestamp);
		const x2 = xScale(Math.min(d.timestamp + 100000, finalTimestamp));
		return (
			<line
				key={index}
				x1={x1}
				y1={yScale(d.price)}
				x2={x2}
				y2={yScale(d.price)}
				stroke={d.side === "ask" ? "red" : "green"}
				strokeWidth={2}
			/>
		);
	});

	const xTicks = Array.from(
		{ length: numXTicks },
		(_, i) =>
			minTimestamp + (i / (numXTicks - 1)) * (maxTimestamp - minTimestamp)
	);
	const yTicks = Array.from(
		{ length: numYTicks },
		(_, i) => minPrice + (i / (numYTicks - 1)) * (maxPrice - minPrice)
	);
	return (
		<div className="chart-container">
			<svg
				width={2000}
				height={1500}
				style={{ border: "1px solid #ccc", backgroundColor: "black" }}
			>
				<g transform={`translate(${margin.left}, ${margin.top})`}>
					{lines}
					{/* X-Axis Ticks */}
					{xTicks.map((tick, i) => (
						<text
							key={i}
							x={xScale(tick)}
							y={height + 20}
							textAnchor="middle"
							fontSize="10"
							fill="white"
						>
							{((tick - minTimestamp) / 1000).toFixed(0)}
						</text>
					))}
					{/* Y-Axis Ticks */}
					{yTicks.map((tick, i) => (
						<text
							key={i}
							x={-10}
							y={yScale(tick)}
							textAnchor="end"
							fontSize="10"
							fill="white"
						>
							{tick.toFixed(2)}
						</text>
					))}
					{/* Axis Labels */}
					<text
						transform={`translate(${width / 2}, ${
							height + margin.bottom - 20
						})`}
						textAnchor="middle"
						fontSize="16"
						fill="white"
					>
						Time (milliseconds)
					</text>
					<text
						transform={`translate(${-margin.left + 20}, ${
							height / 2
						}) rotate(-90)`}
						textAnchor="middle"
						fontSize="16"
						fill="white"
					>
						Price
					</text>
				</g>
			</svg>
		</div>
	);
}

export default Heatmapfn;
