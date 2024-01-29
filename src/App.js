import React from "react";
import "./App.css";
// import Heatmap from "./Heatmap";
import Heatmap2 from "./Heatmapfn";

function App() {
	return (
		<div className="App">
			<h1>Orderbook Heatmap</h1>
			{/* <Heatmap /> */}
            <Heatmap2 />
		</div>
	);
}

export default App;
