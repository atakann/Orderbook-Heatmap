# Orderbook Heatmap

![heatmap](https://github.com/atakann/orderbook-heatmap/assets/17346304/72d819d2-e9df-4406-b0d3-730d89505a64)


This project showcases two different approaches to building a heatmap visualization in a React application: one using D3.js (in `Heatmap` component) and the other using pure React & JavaScript (in `Heatmapfn` component).

## Implementations

### 1. Using D3.js (`Heatmap` Component)

The `Heatmap` component utilizes D3.js, a powerful library for data visualization. D3.js excels in handling the complexities of scaling, axes, and SVG element manipulation, making it an ideal choice for creating sophisticated data visualizations.

**Features:**
- Data binding and rendering using D3.js
- Automated scaling and axis generation
- Responsive design suitable for complex visualizations

### 2. Using Pure React & JavaScript (`Heatmapfn` Component)

The `Heatmapfn` component demonstrates an alternative approach using only React and JavaScript. This method involves manual calculations for scaling and direct SVG manipulation within React, offering finer control over each aspect of the visualization.

**Features:**
- Manual implementation of data scaling
- SVG rendering within React's JSX
- Direct control over visualization components
