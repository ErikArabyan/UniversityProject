export interface Lesson {
  id: string;
  title: string;
  description: string;
  theory: string;
  initialCode: string;
}

export interface Library {
  id: string;
  name: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  logoColor: string;
  lessons: Lesson[];
}

export const libraries: Library[] = [
  {
    id: "d3js",
    name: "D3.js",
    description: "The gold standard for custom data visualization in JavaScript. Powerful but complex.",
    difficulty: "Advanced",
    logoColor: "text-orange-500",
    lessons: [
      {
        id: "1",
        title: "Introduction to SVG",
        description: "Learn how D3 works with HTML SVGs to draw shapes.",
        theory: `
# Welcome to D3.js
D3 (Data-Driven Documents) is a powerful JavaScript library for producing dynamic, interactive data visualizations.

### Key Concepts
* **Selections:** D3 allows you to select DOM elements easily using CSS selectors (e.g., \`d3.select("#chart")\`).
* **SVG:** Most D3 charts are drawn using Scalable Vector Graphics.
* **Data Binding:** D3 binds arrays of data to DOM elements.

Let's draw a simple bar chart. Look at the code to see how we define scales and append \`<rect>\` elements.
        `,
        initialCode: `<!DOCTYPE html>
<html>
<head>
  <script src="https://d3js.org/d3.v7.min.js"></script>
</head>
<body>
<svg id="chart" width="400" height="300"></svg>
<script>
  const data = [30, 86, 168, 281, 303, 365];
  const svg = d3.select("#chart");
  const width = 400, height = 300;
  
  const xScale = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([0, width])
    .padding(0.1);
    
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([height, 0]);
    
  svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => xScale(i))
    .attr("y", d => yScale(d))
    .attr("width", xScale.bandwidth())
    .attr("height", d => height - yScale(d))
    .attr("fill", "#4F46E5");
</script>
</body>
</html>`
      },
      {
        id: "2",
        title: "Scales and Axes",
        description: "Add labeled axes to your visualizations.",
        theory: `
# Scales and Axes
A chart isn't very useful without context. D3 provides axis generators.

### Key Concepts
* **d3.axisBottom / d3.axisLeft:** Creates axis components based on your scales.
* **Margins:** Always leave space for axes by using a margin convention.
* **Groups (<g>):** D3 uses SVG groups to translate (move) whole sections of elements at once.
        `,
        initialCode: `<!DOCTYPE html>
<html>
<head>
  <script src="https://d3js.org/d3.v7.min.js"></script>
</head>
<body>
<svg id="chart" width="450" height="350"></svg>
<script>
  const data = [30, 86, 168, 281, 303];
  const margin = {top: 20, right: 20, bottom: 30, left: 40};
  const width = 450 - margin.left - margin.right;
  const height = 350 - margin.top - margin.bottom;
  
  const svg = d3.select("#chart")
    .append("g")
    .attr("transform", \`translate(\${margin.left},\${margin.top})\`);
    
  const xScale = d3.scaleBand().domain(d3.range(data.length)).range([0, width]).padding(0.1);
  const yScale = d3.scaleLinear().domain([0, d3.max(data)]).range([height, 0]);
    
  // Add Axes
  svg.append("g")
    .attr("transform", \`translate(0,\${height})\`)
    .call(d3.axisBottom(xScale));
    
  svg.append("g")
    .call(d3.axisLeft(yScale));

  svg.selectAll(".bar").data(data).enter().append("rect")
    .attr("class", "bar")
    .attr("x", (d, i) => xScale(i))
    .attr("y", d => yScale(d))
    .attr("width", xScale.bandwidth())
    .attr("height", d => height - yScale(d))
    .attr("fill", "#10B981");
</script>
</body>
</html>`
      },
      {
        id: "3",
        title: "Line Charts & Paths",
        description: "Learn how to draw lines using d3.line()",
        theory: `
# Line Charts
Line charts show continuity. In SVG, lines are drawn using the \`<path>\` element.

### Key Concepts
* **d3.line():** A generator that turns an array of points into a string of SVG path commands.
* **Path 'd' attribute:** The instructions for drawing the path.
* **Fill & Stroke:** For lines, we typically set \`fill: none\` and \`stroke\` to a color.
        `,
        initialCode: `<!DOCTYPE html>
<html>
<head>
  <script src="https://d3js.org/d3.v7.min.js"></script>
</head>
<body>
<svg id="chart" width="400" height="300"></svg>
<script>
  const data = [{x: 0, y: 10}, {x: 1, y: 50}, {x: 2, y: 30}, {x: 3, y: 90}, {x: 4, y: 40}];
  const svg = d3.select("#chart");
  const width = 400, height = 300;
  
  const xScale = d3.scaleLinear().domain([0, 4]).range([0, width]);
  const yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);
  
  const line = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y));
    
  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#8B5CF6")
    .attr("stroke-width", 3)
    .attr("d", line);
</script>
</body>
</html>`
      },
      {
        id: "4",
        title: "Transitions & Animation",
        description: "Bring your charts to life with movement.",
        theory: `
# Animations
D3 makes transitions incredibly easy.

### Key Concepts
* **.transition():** Tells D3 you want to animate the next attributes.
* **.duration():** How long the animation lasts in milliseconds.
* **.delay():** Pause before starting.
        `,
        initialCode: `<!DOCTYPE html>
<html>
<head>
  <script src="https://d3js.org/d3.v7.min.js"></script>
</head>
<body>
<svg id="chart" width="400" height="300"></svg>
<script>
  const data = [30, 86, 168, 281];
  const svg = d3.select("#chart");
  const xScale = d3.scaleBand().domain(d3.range(data.length)).range([0, 400]).padding(0.1);
  const yScale = d3.scaleLinear().domain([0, 300]).range([300, 0]);
  
  // Start bars at y=300 (bottom) with height=0
  const bars = svg.selectAll("rect").data(data).enter().append("rect")
    .attr("x", (d, i) => xScale(i))
    .attr("y", 300)
    .attr("width", xScale.bandwidth())
    .attr("height", 0)
    .attr("fill", "#EF4444");
    
  // Animate to true height
  bars.transition()
    .duration(1000)
    .delay((d, i) => i * 200)
    .attr("y", d => yScale(d))
    .attr("height", d => 300 - yScale(d));
</script>
</body>
</html>`
      },
      {
        id: "5",
        title: "Scatter Plots",
        description: "Plot points on an X/Y plane to show correlations.",
        theory: `
# Scatter Plots
Scatter plots use SVG \`<circle>\` elements instead of rects or paths.

### Key Concepts
* **cx & cy:** The center coordinates of the circle.
* **r:** The radius of the circle.
* **opacity:** Useful when circles overlap.
        `,
        initialCode: `<!DOCTYPE html>
<html>
<head>
  <script src="https://d3js.org/d3.v7.min.js"></script>
</head>
<body>
<svg id="chart" width="400" height="300"></svg>
<script>
  const data = [
    {x: 30, y: 40}, {x: 120, y: 110}, {x: 250, y: 90}, 
    {x: 320, y: 210}, {x: 150, y: 250}, {x: 280, y: 160}
  ];
  const svg = d3.select("#chart");
  
  svg.selectAll("circle")
    .data(data).enter().append("circle")
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", 8)
    .attr("fill", "#06B6D4")
    .attr("opacity", 0.7)
    .attr("stroke", "#fff")
    .attr("stroke-width", 2);
</script>
</body>
</html>`
      }
    ]
  },
  {
    id: "chartjs",
    name: "Chart.js",
    description: "Simple yet flexible JavaScript charting for designers & developers.",
    difficulty: "Beginner",
    logoColor: "text-rose-400",
    lessons: [
      {
        id: "1",
        title: "Getting Started with Chart.js",
        description: "Create your first chart in minutes.",
        theory: `
# Welcome to Chart.js
Chart.js is a fantastic canvas-based library. It's incredibly easy to set up.

### Key Concepts
* **Canvas:** Chart.js renders into an HTML \`<canvas>\` element, not SVG.
* **Config Object:** Everything is defined in a single configuration object passed to \`new Chart()\`.
* **Type:** Defines the chart style (bar, line, pie, etc).
        `,
        initialCode: `<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style> body { background: #1a1b26; color: white; } </style>
</head>
<body>
<div style="width: 400px;"><canvas id="myChart"></canvas></div>
<script>
  const ctx = document.getElementById('myChart').getContext('2d');
  
  // Set default text color for dark mode
  Chart.defaults.color = '#fff';
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Monthly Sales',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: ['#4F46E5','#7C3AED','#2563EB','#0891B2','#059669','#D97706']
      }]
    }
  });
</script>
</body>
</html>`
      },
      {
        id: "2",
        title: "Line and Area Charts",
        description: "Configuring lines and filling areas beneath them.",
        theory: `
# Lines and Areas
Line charts in Chart.js are heavily customizable. 

### Key Concepts
* **tension:** Curves the line. \`0\` is straight, \`0.4\` is smooth.
* **fill:** Set to \`true\` to fill the area under the line.
* **borderColor vs backgroundColor:** Border is the line, background is the fill.
        `,
        initialCode: `<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style> body { background: #1a1b26; color: white; } </style>
</head>
<body>
<div style="width: 400px;"><canvas id="myChart"></canvas></div>
<script>
  Chart.defaults.color = '#fff';
  new Chart(document.getElementById('myChart'), {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      datasets: [{
        label: 'Active Users',
        data: [150, 230, 180, 290, 310],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        fill: true,
        tension: 0.4
      }]
    }
  });
</script>
</body>
</html>`
      },
      {
        id: "3",
        title: "Pie and Doughnut",
        description: "Representing parts of a whole.",
        theory: `
# Pie & Doughnut
These are excellent for showing proportional data.

### Key Concepts
* **type: 'doughnut':** Creates a chart with a hole in the middle.
* **cutout:** Controls the thickness of the doughnut ring.
* **hoverOffset:** Makes slices pop out when you hover over them.
        `,
        initialCode: `<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style> body { background: #1a1b26; color: white; } </style>
</head>
<body>
<div style="width: 350px;"><canvas id="myChart"></canvas></div>
<script>
  Chart.defaults.color = '#fff';
  new Chart(document.getElementById('myChart'), {
    type: 'doughnut',
    data: {
      labels: ['Desktop', 'Mobile', 'Tablet'],
      datasets: [{
        data: [55, 35, 10],
        backgroundColor: ['#6366F1', '#EC4899', '#14B8A6'],
        hoverOffset: 10,
        borderWidth: 0
      }]
    }
  });
</script>
</body>
</html>`
      },
      {
        id: "4",
        title: "Mixed Charts",
        description: "Combining bars and lines in one canvas.",
        theory: `
# Mixed Charts
You aren't limited to one chart type per canvas!

### Key Concepts
* **Dataset Types:** You can specify a \`type\` property directly on a dataset to override the main chart type.
* **Order:** Controls which dataset draws on top. Lower numbers draw on top of higher numbers.
        `,
        initialCode: `<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style> body { background: #1a1b26; color: white; } </style>
</head>
<body>
<div style="width: 400px;"><canvas id="myChart"></canvas></div>
<script>
  Chart.defaults.color = '#fff';
  new Chart(document.getElementById('myChart'), {
    type: 'bar', // Base type
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr'],
      datasets: [
        {
          type: 'line',
          label: 'Target',
          data: [40, 45, 50, 60],
          borderColor: '#F59E0B',
          borderWidth: 3,
          fill: false
        },
        {
          type: 'bar',
          label: 'Actual',
          data: [35, 48, 42, 65],
          backgroundColor: '#3B82F6'
        }
      ]
    }
  });
</script>
</body>
</html>`
      },
      {
        id: "5",
        title: "Options & Customization",
        description: "Tuning the tooltips, legend, and layout.",
        theory: `
# Customizing Chart.js
The \`options\` object is where the magic happens.

### Key Concepts
* **plugins:** Configure the legend, tooltips, and title.
* **scales:** Configure grid lines, axis display, and min/max values.
* **responsive:** Chart.js is responsive by default, resizing to its container.
        `,
        initialCode: `<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style> body { background: #1a1b26; color: white; } </style>
</head>
<body>
<div style="width: 400px;"><canvas id="myChart"></canvas></div>
<script>
  Chart.defaults.color = '#fff';
  new Chart(document.getElementById('myChart'), {
    type: 'bar',
    data: {
      labels: ['A', 'B', 'C'],
      datasets: [{
        label: 'Votes',
        data: [12, 19, 3],
        backgroundColor: '#8B5CF6'
      }]
    },
    options: {
      plugins: {
        legend: { position: 'bottom' },
        title: { display: true, text: 'Customized Chart' }
      },
      scales: {
        y: { 
          beginAtZero: true,
          grid: { color: 'rgba(255,255,255,0.1)' }
        },
        x: {
          grid: { display: false }
        }
      }
    }
  });
</script>
</body>
</html>`
      }
    ]
  },
  {
    id: "highcharts",
    name: "Highcharts",
    description: "Robust, feature-rich library widely used in enterprise.",
    difficulty: "Intermediate",
    logoColor: "text-blue-400",
    lessons: [
      {
        id: "1",
        title: "Introduction to Highcharts",
        description: "The basics of Highcharts configuration.",
        theory: `
# Welcome to Highcharts
Highcharts uses an SVG rendering engine but abstracts it behind a JSON configuration API.

### Key Concepts
* **Highcharts.chart():** The initializer function taking a container ID and a configuration object.
* **series:** The core data array. Each object in this array is a line, bar group, etc.
* **title & yAxis:** Built-in configuration blocks for standard chart elements.
        `,
        initialCode: `<!DOCTYPE html>
<html>
<head>
  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/themes/dark-unica.js"></script>
</head>
<body>
<div id="container" style="min-width: 310px; height: 300px;"></div>
<script>
  Highcharts.chart('container', {
    chart: { type: 'line' },
    title: { text: 'Monthly Sales' },
    xAxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
    yAxis: { title: { text: 'Units sold' } },
    series: [{ 
      name: 'Sales', 
      data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0],
      color: '#06B6D4'
    }]
  });
</script>
</body>
</html>`
      },
      {
        id: "2",
        title: "Column and Bar Charts",
        description: "Display categorical data effectively.",
        theory: `
# Columns and Bars
In Highcharts, a 'column' is vertical and a 'bar' is horizontal.

### Key Concepts
* **chart.type:** Swap between 'column' and 'bar' easily.
* **plotOptions:** Global settings that apply to specific chart types across all series.
        `,
        initialCode: `<!DOCTYPE html>
<html>
<head>
  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/themes/dark-unica.js"></script>
</head>
<body>
<div id="container" style="min-width: 310px; height: 300px;"></div>
<script>
  Highcharts.chart('container', {
    chart: { type: 'column' },
    title: { text: 'Server Usage' },
    xAxis: { categories: ['App', 'DB', 'Cache'] },
    yAxis: { min: 0, title: { text: 'CPU %' } },
    plotOptions: {
      column: {
        borderRadius: 4,
        dataLabels: { enabled: true }
      }
    },
    series: [{
      name: 'Server 1',
      data: [45, 80, 20],
      color: '#8B5CF6'
    }, {
      name: 'Server 2',
      data: [60, 40, 50],
      color: '#10B981'
    }]
  });
</script>
</body>
</html>`
      },
      {
        id: "3",
        title: "Pie and Donut Options",
        description: "Formatting data labels and sizing.",
        theory: `
# Pie Charts
Highcharts handles pie charts via the series type, not the global chart type.

### Key Concepts
* **innerSize:** Used on a pie series to convert it into a donut chart.
* **dataLabels.format:** A string template (e.g., \`{point.name}: {point.percentage:.1f}%\`) to format labels without a complex function.
        `,
        initialCode: `<!DOCTYPE html>
<html>
<head>
  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/themes/dark-unica.js"></script>
</head>
<body>
<div id="container" style="min-width: 310px; height: 300px;"></div>
<script>
  Highcharts.chart('container', {
    chart: { type: 'pie' },
    title: { text: 'Browser Market Share' },
    plotOptions: {
      pie: {
        innerSize: '50%', // Makes it a donut
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
      name: 'Brands',
      colorByPoint: true,
      data: [
        { name: 'Chrome', y: 61, sliced: true, selected: true },
        { name: 'Safari', y: 11 },
        { name: 'Edge', y: 10 },
        { name: 'Firefox', y: 4 }
      ]
    }]
  });
</script>
</body>
</html>`
      },
      {
        id: "4",
        title: "Area and Spline",
        description: "Smoothed lines and shaded areas.",
        theory: `
# Area and Spline
Use \`areaspline\` to get a smooth line with a filled area below it.

### Key Concepts
* **type: 'areaspline':** Combines a spline (curved line) with an area fill.
* **fillOpacity:** Control how transparent the filled area is.
* **marker:** Configure the dots on the data points.
        `,
        initialCode: `<!DOCTYPE html>
<html>
<head>
  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/themes/dark-unica.js"></script>
</head>
<body>
<div id="container" style="min-width: 310px; height: 300px;"></div>
<script>
  Highcharts.chart('container', {
    chart: { type: 'areaspline' },
    title: { text: 'Average Temperature' },
    xAxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
    series: [{
      name: 'Temp',
      data: [3, 4, 8, 12, 16, 20],
      color: '#F59E0B',
      fillOpacity: 0.3,
      marker: {
        radius: 4,
        lineColor: '#fff',
        lineWidth: 1
      }
    }]
  });
</script>
</body>
</html>`
      },
      {
        id: "5",
        title: "Drilldown Feature",
        description: "Interactive charts that expand into sub-charts.",
        theory: `
# Drilldown
Highcharts has a powerful built-in drilldown module.

### Key Concepts
* **drilldown script:** Requires loading the \`drilldown.js\` module.
* **drilldown property:** Connects a parent point to a child series by ID.
* **drilldown series:** A separate array of series objects to render when a point is clicked.
        `,
        initialCode: `<!DOCTYPE html>
<html>
<head>
  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/modules/drilldown.js"></script>
  <script src="https://code.highcharts.com/themes/dark-unica.js"></script>
</head>
<body>
<div id="container" style="min-width: 310px; height: 300px;"></div>
<script>
  Highcharts.chart('container', {
    chart: { type: 'column' },
    title: { text: 'Click the bars to drill down' },
    xAxis: { type: 'category' },
    series: [
      {
        name: 'Animals',
        data: [
          { name: 'Cats', y: 5, drilldown: 'cats' },
          { name: 'Dogs', y: 4, drilldown: 'dogs' }
        ]
      }
    ],
    drilldown: {
      series: [
        {
          id: 'cats',
          name: 'Cats',
          data: [['Persian', 2], ['Siamese', 3]]
        },
        {
          id: 'dogs',
          name: 'Dogs',
          data: [['Husky', 1], ['Bulldog', 3]]
        }
      ]
    }
  });
</script>
</body>
</html>`
      }
    ]
  }
];

export function getLibrary(id: string): Library | undefined {
  return libraries.find((lib) => lib.id === id);
}

export function getLesson(libId: string, lessonId: string): Lesson | undefined {
  const lib = getLibrary(libId);
  return lib?.lessons.find((l) => l.id === lessonId);
}
