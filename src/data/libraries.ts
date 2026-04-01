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
	difficulty: 'Սկսնակ' | 'Միջնակ' | 'Առաջադեմ';
	logoColor: string;
	lessons: Lesson[];
}

type LessonHtmlOptions = {
	body: string;
	script: string;
	scripts?: string[];
	styles?: string;
};

function createLessonHtml({ body, script, scripts = [], styles }: LessonHtmlOptions) {
	const headContent = [...scripts.map((src) => `  <script src="${src}"></script>`), styles ? `  <style>${styles}</style>` : null].filter(Boolean).join('\n');

	return `<!DOCTYPE html>
<html>
<head>
${headContent}
</head>
<body>
${body}
<script>
${script}
</script>
</body>
</html>`;
}

function createD3Lesson(width: number, height: number, script: string) {
	return createLessonHtml({
		scripts: ['https://d3js.org/d3.v7.min.js'],
		styles: `html, body { margin: 0; min-height: 100%; background: radial-gradient(circle at top, #1e293b 0%, #0f172a 55%, #020617 100%); color: #e2e8f0; font-family: Inter, system-ui, sans-serif; }
body { display: flex; align-items: center; justify-content: center; padding: 24px; box-sizing: border-box; }
.chart-shell { width: fit-content; padding: 16px; background: rgba(15, 23, 42, 0.82); border: 1px solid rgba(148, 163, 184, 0.18); border-radius: 20px; box-shadow: 0 20px 45px rgba(2, 6, 23, 0.35); }
svg { display: block; overflow: visible; background: linear-gradient(180deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98)); border-radius: 14px; }
.axis text { fill: #cbd5e1; font-size: 12px; }
.axis path, .axis line { stroke: #475569; }
.grid line { stroke: rgba(148, 163, 184, 0.16); }
.grid path { stroke-width: 0; }`,
		body: `<div class="chart-shell"><svg id="chart" width="${width}" height="${height}"></svg></div>`,
		script,
	});
}

function createChartJsLesson(width: number, script: string) {
	return createLessonHtml({
		scripts: ['https://cdn.jsdelivr.net/npm/chart.js/dist/chart.umd.min.js'],
		styles: `html, body { margin: 0; min-height: 100%; background: radial-gradient(circle at top, #1e293b 0%, #0f172a 55%, #020617 100%); color: #e2e8f0; font-family: Inter, system-ui, sans-serif; }
body { display: flex; align-items: center; justify-content: center; padding: 24px; box-sizing: border-box; }
.chart-shell { width: ${width}px; padding: 16px; background: rgba(15, 23, 42, 0.82); border: 1px solid rgba(148, 163, 184, 0.18); border-radius: 20px; box-shadow: 0 20px 45px rgba(2, 6, 23, 0.35); }
canvas { display: block; }`,
		body: `<div class="chart-shell"><canvas id="myChart"></canvas></div>`,
		script,
	});
}

function createHighchartsLesson(script: string, modules: string[] = []) {
	return createLessonHtml({
		scripts: ['https://cdn.jsdelivr.net/npm/highcharts/highcharts.js', ...modules.map((module) => `https://cdn.jsdelivr.net/npm/highcharts/modules/${module}.js`), 'https://cdn.jsdelivr.net/npm/highcharts/themes/dark-unica.js'],
		styles: `html, body { margin: 0; min-height: 100%; background: radial-gradient(circle at top, #1e293b 0%, #0f172a 55%, #020617 100%); color: #e2e8f0; font-family: Inter, system-ui, sans-serif; }
body { display: flex; align-items: center; justify-content: center; padding: 24px; box-sizing: border-box; }
.chart-shell { width: min(720px, 100%); padding: 16px; background: rgba(15, 23, 42, 0.82); border: 1px solid rgba(148, 163, 184, 0.18); border-radius: 20px; box-shadow: 0 20px 45px rgba(2, 6, 23, 0.35); }
#container { min-width: 0 !important; width: 100%; height: 320px; }`,
		body: '<div class="chart-shell"><div id="container"></div></div>',
		script,
	});
}

export const libraries: Library[] = [
	{
		id: 'd3js',
		name: 'D3.js',
		description: 'Ոսկե ստանդարտ JavaScript-ում տվյալների անվանական վիզուալիզացիայի համար: Հզոր, բայց բարդ:',
		difficulty: 'Առաջադեմ',
		logoColor: 'text-orange-500',
		lessons: [
			{
				id: '1',
				title: 'SVG-ի Ներածություն',
				description: 'Իմացեք, թե ինչպես է D3-ն աշխատում HTML SVG ֆայլերի հետ ՝ ձևեր նկարելու համար:',
				theory: `
# Welcome to D3.js
D3 (Data-Driven Documents) is a powerful JavaScript library for producing dynamic, interactive data visualizations.

### Key Concepts
* **Selections:** D3 allows you to select DOM elements easily using CSS selectors (e.g., \`d3.select("#chart")\`).
* **SVG:** Most D3 charts are drawn using Scalable Vector Graphics.
* **Data Binding:** D3 binds arrays of data to DOM elements.

Let's draw a simple bar chart. Look at the code to see how we define scales and append \`<rect>\` elements.
        `,
				initialCode: createD3Lesson(
					400,
					300,
					`  const data = [
    { label: 'Jan', value: 30 },
    { label: 'Feb', value: 86 },
    { label: 'Mar', value: 168 },
    { label: 'Apr', value: 281 },
    { label: 'May', value: 303 },
    { label: 'Jun', value: 365 }
  ];
  const margin = { top: 24, right: 24, bottom: 40, left: 44 };
  const width = 400 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;
  
  const svg = d3
    .select('#chart')
    .append('g')
    .attr('transform', \`translate(\${margin.left},\${margin.top})\`);
  
  const xScale = d3.scaleBand()
    .domain(data.map((d) => d.label))
    .range([0, width])
    .padding(0.18);
    
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, (d) => d.value)])
    .nice()
    .range([height, 0]);

  svg.append('g')
    .attr('class', 'grid')
    .call(d3.axisLeft(yScale).ticks(5).tickSize(-width).tickFormat(() => ''));

  svg.append('g')
    .attr('class', 'axis')
    .call(d3.axisLeft(yScale).ticks(5));

  svg.append('g')
    .attr('class', 'axis')
    .attr('transform', \`translate(0,\${height})\`)
    .call(d3.axisBottom(xScale));
    
  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (d) => xScale(d.label))
    .attr('y', (d) => yScale(d.value))
    .attr('width', xScale.bandwidth())
    .attr('height', (d) => height - yScale(d.value))
    .attr('rx', 8)
    .attr('fill', '#4F46E5');`,
				),
			},
			{
				id: '2',
				title: 'Սանդղակներ և գծեր',
				description: 'Add labeled axes to your visualizations.',
				theory: `
# Սանդղակներ և գծեր
A chart isn't very useful without context. D3 provides axis generators.

### Key Concepts
* **d3.axisBottom / d3.axisLeft:** Creates axis components based on your scales.
* **Margins:** Always leave space for axes by using a margin convention.
* **Groups (<g>):** D3 uses SVG groups to translate (move) whole sections of elements at once.
        `,
				initialCode: createD3Lesson(
					450,
					350,
					`  const data = [30, 86, 168, 281, 303];
  const margin = {top: 20, right: 20, bottom: 30, left: 40};
  const width = 450 - margin.left - margin.right;
  const height = 350 - margin.top - margin.bottom;
  
  const svg = d3.select("#chart")
    .append("g")
    .attr("transform", \`translate(\${margin.left},\${margin.top})\`);
    
  const xScale = d3.scaleBand().domain(d3.range(data.length)).range([0, width]).padding(0.1);
  const yScale = d3.scaleLinear().domain([0, d3.max(data)]).range([height, 0]);
    
  svg.append("g")
    .attr("class", "grid")
    .call(d3.axisLeft(yScale).ticks(6).tickSize(-width).tickFormat(() => ""));

  svg.append("g")
    .attr("class", "axis")
    .call(d3.axisLeft(yScale).ticks(6));

  svg.append("g")
    .attr("class", "axis")
    .attr("transform", \`translate(0,\${height})\`)
    .call(d3.axisBottom(xScale));

  svg.selectAll(".bar").data(data).enter().append("rect")
    .attr("class", "bar")
    .attr("x", (d, i) => xScale(i))
    .attr("y", d => yScale(d))
    .attr("width", xScale.bandwidth())
    .attr("height", d => height - yScale(d))
    .attr("fill", "#10B981")
    .attr("rx", 8);`,
				),
			},
			{
				id: '3',
				title: 'Գծապատկերներ և ուրվագծեր',
				description: 'Learn how to draw lines using d3.line()',
				theory: `
# գծապատկերներ և ուրվագծեր
Line charts show continuity. In SVG, lines are drawn using the \`<path>\` element.

### Key Concepts
* **d3.line():** A generator that turns an array of points into a string of SVG path commands.
* **Path 'd' attribute:** The instructions for drawing the path.
* **Fill & Stroke:** For lines, we typically set \`fill: none\` and \`stroke\` to a color.
        `,
				initialCode: createD3Lesson(
					400,
					300,
					`  const data = [{x: 0, y: 10}, {x: 1, y: 50}, {x: 2, y: 30}, {x: 3, y: 90}, {x: 4, y: 40}];
  const margin = { top: 24, right: 24, bottom: 40, left: 44 };
  const width = 400 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const svg = d3
    .select("#chart")
    .append("g")
    .attr("transform", \`translate(\${margin.left},\${margin.top})\`);
  
  const xScale = d3.scaleLinear().domain(d3.extent(data, (d) => d.x)).nice().range([0, width]);
  const yScale = d3.scaleLinear().domain([0, d3.max(data, (d) => d.y)]).nice().range([height, 0]);
  
  svg.append("g")
    .attr("class", "grid")
    .call(d3.axisLeft(yScale).ticks(5).tickSize(-width).tickFormat(() => ""));

  svg.append("g")
    .attr("class", "axis")
    .call(d3.axisLeft(yScale).ticks(5));

  svg.append("g")
    .attr("class", "axis")
    .attr("transform", \`translate(0,\${height})\`)
    .call(d3.axisBottom(xScale).ticks(5).tickFormat(d3.format("d")));

  const line = d3.line()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y));
    
  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#8B5CF6")
    .attr("stroke-width", 3)
    .attr("d", line);

  svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d.x))
    .attr("cy", (d) => yScale(d.y))
    .attr("r", 5)
    .attr("fill", "#c4b5fd")
    .attr("stroke", "#0f172a")
    .attr("stroke-width", 2);`,
				),
			},
			{
				id: '4',
				title: 'Անցումներ և անիմացիաներ',
				description: 'Գեղեցկացրեք ձեր գրաֆիկները շարժման միջոցով:',
				theory: `
# Animations
D3 makes transitions incredibly easy.

### Key Concepts
* **.transition():** Tells D3 you want to animate the next attributes.
* **.duration():** How long the animation lasts in milliseconds.
* **.delay():** Pause before starting.
        `,
				initialCode: createD3Lesson(
					400,
					300,
					`  const data = [
    { label: 'Q1', value: 30 },
    { label: 'Q2', value: 86 },
    { label: 'Q3', value: 168 },
    { label: 'Q4', value: 281 }
  ];
  const margin = { top: 24, right: 24, bottom: 40, left: 44 };
  const width = 400 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const svg = d3
    .select("#chart")
    .append("g")
    .attr("transform", \`translate(\${margin.left},\${margin.top})\`);

  const xScale = d3.scaleBand()
    .domain(data.map((d) => d.label))
    .range([0, width])
    .padding(0.18);
  const yScale = d3.scaleLinear().domain([0, d3.max(data, (d) => d.value)]).nice().range([height, 0]);

  svg.append("g")
    .attr("class", "grid")
    .call(d3.axisLeft(yScale).ticks(5).tickSize(-width).tickFormat(() => ""));

  svg.append("g")
    .attr("class", "axis")
    .call(d3.axisLeft(yScale).ticks(5));

  svg.append("g")
    .attr("class", "axis")
    .attr("transform", \`translate(0,\${height})\`)
    .call(d3.axisBottom(xScale));
  
  const bars = svg.selectAll("rect").data(data).enter().append("rect")
    .attr("x", (d) => xScale(d.label))
    .attr("y", height)
    .attr("width", xScale.bandwidth())
    .attr("height", 0)
    .attr("rx", 8)
    .attr("fill", "#EF4444");
    
  bars.transition()
    .duration(1000)
    .delay((d, i) => i * 200)
    .attr("y", (d) => yScale(d.value))
    .attr("height", (d) => height - yScale(d.value));`,
				),
			},
			{
				id: '5',
				title: 'Կետային գծապատկերներ',
				description: 'Կիրառեք կետերը X/Y հարթության վրա՝ փոխկապակցվածությունը ցույց տալու համար:',
				theory: `
# Scatter Plots
Scatter plots use SVG \`<circle>\` elements instead of rects or paths.

### Key Concepts
* **cx & cy:** The center coordinates of the circle.
* **r:** The radius of the circle.
* **opacity:** Useful when circles overlap.
        `,
				initialCode: createD3Lesson(
					400,
					300,
					`  const data = [
    {x: 30, y: 40}, {x: 120, y: 110}, {x: 250, y: 90}, 
    {x: 320, y: 210}, {x: 150, y: 250}, {x: 280, y: 160}
  ];
  const margin = { top: 24, right: 24, bottom: 40, left: 44 };
  const width = 400 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const svg = d3
    .select("#chart")
    .append("g")
    .attr("transform", \`translate(\${margin.left},\${margin.top})\`);
  
  const xScale = d3.scaleLinear().domain([0, d3.max(data, (d) => d.x) + 20]).nice().range([0, width]);
  const yScale = d3.scaleLinear().domain([0, d3.max(data, (d) => d.y) + 20]).nice().range([height, 0]);

  svg.append("g")
    .attr("class", "grid")
    .call(d3.axisLeft(yScale).ticks(5).tickSize(-width).tickFormat(() => ""));

  svg.append("g")
    .attr("class", "axis")
    .call(d3.axisLeft(yScale).ticks(5));

  svg.append("g")
    .attr("class", "axis")
    .attr("transform", \`translate(0,\${height})\`)
    .call(d3.axisBottom(xScale).ticks(5));
  
  svg.selectAll("circle")
    .data(data).enter().append("circle")
    .attr("cx", (d) => xScale(d.x))
    .attr("cy", (d) => yScale(d.y))
    .attr("r", 8)
    .attr("fill", "#06B6D4")
    .attr("opacity", 0.75)
    .attr("stroke", "#fff")
    .attr("stroke-width", 2);`,
				),
			},
		],
	},
	{
		id: 'chartjs',
		name: 'Chart.js',
		description: 'Պարզ, բայց ճկուն JavaScript գծապատկերներ դիզայներների և մշակողների համար:',
		difficulty: 'Սկսնակ',
		logoColor: 'text-rose-400',
		lessons: [
			{
				id: '1',
				title: 'Սկսել Chart.js-ից',
				description: 'Ստեղծեք ձեր առաջին գրաֆիկը հաշված րոպեների ընթացքում:',
				theory: `
# Welcome to Chart.js
Chart.js is a fantastic canvas-based library. It's incredibly easy to set up.

### Key Concepts
* **Canvas:** Chart.js renders into an HTML \`<canvas>\` element, not SVG.
* **Config Object:** Everything is defined in a single configuration object passed to \`new Chart()\`.
* **Type:** Defines the chart style (bar, line, pie, etc).
        `,
				initialCode: createChartJsLesson(
					400,
					`  const ctx = document.getElementById('myChart').getContext('2d');
  
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
  });`,
				),
			},
			{
				id: '2',
				title: 'Գծային և տարածքի գծապատկերներ',
				description: 'Ստեղծեք գծերը և Լրացրեք դրանց տակ գտնվող տարածքները:',
				theory: `
# Lines and Areas
Line charts in Chart.js are heavily customizable. 

### Key Concepts
* **tension:** Curves the line. \`0\` is straight, \`0.4\` is smooth.
* **fill:** Set to \`true\` to fill the area under the line.
* **borderColor vs backgroundColor:** Border is the line, background is the fill.
        `,
				initialCode: createChartJsLesson(
					400,
					`  Chart.defaults.color = '#fff';
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
  });`,
				),
			},
			{
				id: '3',
				title: 'Կլոր գծապատկեր',
				description: 'Ներկայացնում են մեկ ամբողջության մասեր:',
				theory: `
# Pie & Doughnut
These are excellent for showing proportional data.

### Key Concepts
* **type: 'doughnut':** Creates a chart with a hole in the middle.
* **cutout:** Controls the thickness of the doughnut ring.
* **hoverOffset:** Makes slices pop out when you hover over them.
        `,
				initialCode: createChartJsLesson(
					350,
					`  Chart.defaults.color = '#fff';
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
  });`,
				),
			},
			{
				id: '4',
				title: 'Խառը գծապատկերներ',
				description: 'Միավորել գծերն ու գծերը մեկ կանվասի վրա:',
				theory: `
# Խառը գծապատկերներ
You aren't limited to one chart type per canvas!

### Key Concepts
* **Dataset Types:** You can specify a \`type\` property directly on a dataset to override the main chart type.
* **Order:** Controls which dataset draws on top. Lower numbers draw on top of higher numbers.
        `,
				initialCode: createChartJsLesson(
					400,
					`  Chart.defaults.color = '#fff';
  new Chart(document.getElementById('myChart'), {
    type: 'bar',
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
  });`,
				),
			},
			{
				id: '5',
				title: 'Հուշումների անհատականացում',
				description: 'Անհատականացրեք գործիքի հուշումները, խորհրդանիշները և դասավորությունը:',
				theory: `
# Customizing Chart.js
The \`options\` object is where the magic happens.

### Key Concepts
* **plugins:** Configure the legend, tooltips, and title.
* **scales:** Configure grid lines, axis display, and min/max values.
* **responsive:** Chart.js is responsive by default, resizing to its container.
        `,
				initialCode: createChartJsLesson(
					400,
					`  Chart.defaults.color = '#fff';
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
  });`,
				),
			},
		],
	},
	{
		id: 'highcharts',
		name: 'Highcharts',
		description: 'Հուսալի, բազմաֆունկցիոնալ գրադարան, որը լայնորեն օգտագործվում է ձեռնարկություններում:',
		difficulty: 'Միջնակ',
		logoColor: 'text-blue-400',
		lessons: [
			{
				id: '1',
				title: 'Highcharts-ի Ներածություն',
				description: 'Highcharts-ի հիմունքները:',
				theory: `
# Բարի գալուստ Highcharts
Highcharts uses an SVG rendering engine but abstracts it behind a JSON configuration API.

### Key Concepts
* **Highcharts.chart():** The initializer function taking a container ID and a configuration object.
* **series:** The core data array. Each object in this array is a line, bar group, etc.
* **title & yAxis:** Built-in configuration blocks for standard chart elements.
        `,
				initialCode: createHighchartsLesson(
					`  Highcharts.chart('container', {
    chart: { type: 'line' },
    title: { text: 'Monthly Sales' },
    xAxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
    yAxis: { title: { text: 'Units sold' } },
    series: [{ 
      name: 'Sales', 
      data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0],
      color: '#06B6D4'
    }]
  });`,
				),
			},
			{
				id: '2',
				title: 'Սյունակային և հիստոգրամային գծապատկերներ',
				description: 'Արդյունավետորեն ցուցադրել կատեգորիկ տվյալները:',
				theory: `
# Սյունակներ և հիստոգրամաներ
In Highcharts, a 'column' is vertical and a 'bar' is horizontal.

### Key Concepts
* **chart.type:** Swap between 'column' and 'bar' easily.
* **plotOptions:** Global settings that apply to specific chart types across all series.
        `,
				initialCode: createHighchartsLesson(
					`  Highcharts.chart('container', {
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
  });`,
				),
			},
			{
				id: '3',
				title: 'Pie and Donut Options',
				description: 'Տվյալների պիտակների ձևավորում և չափի որոշում:',
				theory: `
# Pie Charts
Highcharts handles pie charts via the series type, not the global chart type.

### Key Concepts
* **innerSize:** Used on a pie series to convert it into a donut chart.
* **dataLabels.format:** A string template (e.g., \`{point.name}: {point.percentage:.1f}%\`) to format labels without a complex function.
        `,
				initialCode: createHighchartsLesson(
					`  Highcharts.chart('container', {
    chart: { type: 'pie' },
    title: { text: 'Browser Market Share' },
    plotOptions: {
      pie: {
        innerSize: '50%',
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
  });`,
				),
			},
			{
				id: '4',
				title: 'Տարածք և Սպլին',
				description: 'Հարթեցված գծեր և ստվերավորված տարածքներ:',
				theory: `
# Area and Spline
Use \`areaspline\` to get a smooth line with a filled area below it.

### Key Concepts
* **type: 'areaspline':** Combines a spline (curved line) with an area fill.
* **fillOpacity:** Control how transparent the filled area is.
* **marker:** Configure the dots on the data points.
        `,
				initialCode: createHighchartsLesson(
					`  Highcharts.chart('container', {
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
  });`,
				),
			},
			{
				id: '5',
				title: 'Մանրամասն գործառույթ',
				description: 'Ինտերակտիվ գծապատկերներ, որոնք ընդլայնվում են Տեղադրված գծապատկերների մեջ:',
				theory: `
# Drilldown
Highcharts-ն ունի ներկառուցված մանրամասների հզոր մոդուլ.

### Key Concepts
* **drilldown script:** Requires loading the \`drilldown.js\` module.
* **drilldown property:** Connects a parent point to a child series by ID.
* **drilldown series:** A separate array of series objects to render when a point is clicked.
        `,
				initialCode: createHighchartsLesson(
					`  Highcharts.chart('container', {
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
  });`,
					['drilldown'],
				),
			},
		],
	},
];

export function getLibrary(id: string): Library | undefined {
	return libraries.find((lib) => lib.id === id);
}

export function getLesson(libId: string, lessonId: string): Lesson | undefined {
	const lib = getLibrary(libId);
	return lib?.lessons.find((l) => l.id === lessonId);
}
