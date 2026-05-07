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
# Բարի գալուստ D3.js
D3 (Data-Driven Documents) - JavaScript-ի գրադարան է՝ դինամիկ, ինտերակտիվ տվյալների վիզուալիզացիաներ ստեղծելու համար:

### Հիմնական հասկացություններ
* **Selections:** D3-ը թույլ է տալիս հեշտությամբ ընտրել DOM տարրեր՝ օգտագործելով CSS ընտրիչներ (e.g., \`d3.select("#chart")\`).
* **SVG:** D3 գծապատկերների մեծ մասը կազմված է մասշտաբային վեկտորային գրաֆիկայի միջոցով:
* **Data Binding:** D3-ը կապում է տվյալների զանգվածները DOM տարրերին:

* Եկեք նկարենք պարզ դիագրամ: Նայեք կոդին՝ տեսնելու համար, թե ինչպես ենք մենք սահմանում մասշտաբները և ավելացնում \`<rect>\` տարրերը:
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
Դիագրամը շատ օգտակար չէ առանց համատեքստի: D3-ում տրամադրվում են առանցքների գեներատորներ:

### Հիմնական հասկացություններ
* **d3.axisBottom / d3.axisLeft:** Ստեղծում է առանցքի բաղադրիչներ՝ հիմնվելով ձեր մասշտաբների վրա:
* **Margins:** Միշտ տեղ թողեք առանցքների համար՝ օգտագործելով margin հրամանը:
* **Groups (<g>):** D3-ն օգտագործում է SVG խմբեր՝ միաժամանակ թարգմանելու (տեղափոխելու) տարրերի ամբողջ բաժինները:
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
				description: 'Իմացեք, թե ինչպես գծեր գծել d3․line()-ով',
				theory: `
# գծապատկերներ և ուրվագծեր
Գծապատկերները ցույց են տալիս շարունակականությունը: SVG-ում գծերը գծվում են <path>տարրի միջոցով:

### Հիմնական հասկացություններ
* **d3.line():** d3.line()-ը գեներատոր է, որը կետերի զանգվածը վերածում է SVG path հրամանի:
* **Fill & Stroke:** Գծերի համար մենք սովորաբար սահմանում ենք \`fill: none\` և գույների համար \`stroke\`։
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
# Անիմացիաներ
D3-ը անցումներն աներևակայելի պարզ է դարձնում:

### Հիմնական հասկացություններ
* **.transition():** Նշեք, որ ցանկանում եք կենդանացնել հետևյալ հատկանիշները:
* **.duration():** սահմանեք անիմացիայի տևողությունը միլիվայրկյաններով:
* **.delay():** սահմանեք դադար սկսելուց առաջ:
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
# Կետային գծագրեր
Կետային գծագրերում ուղիղ գծերի կամ ուրվագծերի փոխարեն օգտագործվում են SVG <circles > տարրեր:

### Հիմնական հասկացություններ
* **cx & cy:** Շրջանագծի կենտրոնի կոորդինատները:
* **r:** սահմանեք շրջանագծի շառավիղը:
* **opacity:** պետք է, երբ շրջանակները համընկնում են: որպիսի դարձնել թափանցիկ։
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
# Բարի գալուստ Chart.js
Chart.js ֆանտաստիկ canvas-ի վրա հիմնված գրադարան է: Այն աներևակայելի հեշտ է կարգավորել:

### Հիմնական հասկացություններ
* **Canvas:** Chart.js-ն արտացոլվում է "<canvas>" HTML տարրի մեջ, այլ ոչ թե SVG-ով:
* **Config Object:** Ամեն ինչ սահմանվում է մեկ կազմաձևման օբյեկտում, որը փոխանցվում է \`new Chart()\`-ին:
* **Type:** Որոշել գծապատկերի ոճը (bar, line, pie,  և այլն):
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
# Գծեր և տարածքներ
Գծապատկերները Chart․js-ում շատ հարմարեցված են: 

### Հիմնական հասկացություններ
* **tension:** Curve-ով ծռեք գիծը ։  "0" - ուղիղ, "0.4" - սահուն:
* **fill:** փոխանցեք "true" որպեսզի ներկելի գծի տակի հատվածը:
* **borderColor vs backgroundColor:** Border-ը գիծն է, background-ը՝ ֆոնը:
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
# շրջանաձև պոնչիկ գծապատկեր
Դրանք հիանալի են համամասնական տվյալները ցուցադրելու համար:

### Հիմնական հասկացություններ
* **type: 'doughnut':** ստեղծում է կլոր գծապատկեր մեջտեղում անցքով։
* **cutout:** կառավարում է գծապատկերի հաստությունը։
* **hoverOffset:** հատվածը ընդգծում է, երբ պահում եք մկնիկը վրան։
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
        borderWidth: 0,
        cutout: 100
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
Դուք չեք սահմանափակված կտավի վրա գծապատկերի մեկ տեսակով:

### Հիմնական հասկացություններ
* **Dataset Types:** Դուք կարող եք նշել \`type\` հատկությունը հիմնական գծապատկերի տեսակը փոխելու համար:
* **Order:** Որոշում է, թե որ տվյալների հավաքածուն է ցուցադրվում վերևում: Ավելի փոքր թվերը ցուցադրվում են ավելի մեծ թվերի վրա:
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
          backgroundColor: '#3B82F6',
          order: -1
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
# Chart.js-ի Կարգավորում
\`options\`օբյեկտը այն վայրն է, որտեղ տեղի են ունենում հրաշքներ:

### Հիմնական հասկացություններ
* **plugins:** փոփոխեք մանրամասները, և վերնագիրը.
* **scales:** Կարգավորեք ցանցի գծերը, առանցքների ցուցադրումը և նվազագույն / առավելագույն արժեքները:
* **responsive:** Chart.js-ը ավտոմատ չափափոխվում է՝ համապատասխանելով իր կոնտեյներին:
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

### Հիմնական հասկացություններ
* **Highcharts.chart():** ինիցիալիզացնող ֆունկցիան ընդունում է կոնտեյների id-ն և կոնֆիգուրացվող օբյեկտը։
* **series:** Հիմնական զանգվածային տվյալները։ Յուրաքանչյուր օբյեկտ, այդ զանգվածում ներկայացնում է մի գիծ, մի խումբ սյուներ և այլն:
* **title & yAxis:** Ներկառուցված կոնֆիգուրացվող օպցիաներ ստանդարտ գծապատկերների համար։
        `,
				initialCode: createHighchartsLesson(
					`  Highcharts.chart('container', {
    chart: { type: 'line' },
    title: { text: 'Ամսական վաճառք' },
    xAxis: { categories: ["Հունվար", "Փետրվար", "Մարտ", "Ապրիլ", "Մայիս", "Հունիս"] },
    yAxis: { title: { text: 'Վաճառված չափման միավորներ' } },
    series: [{ 
      name: 'Վաճառքներ', 
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
Highcharts - ում column-ը ուղղահայաց է, իսկ bar-ը հորիզոնական:

### Հիմնական հասկացություններ
* **chart.type:** Հեշտությամբ փոխեք column-ի և bar-ի միջև:
* **plotOptions:** Գլոբալ պարամետրեր, որոնք կիրառվում են բոլոր շարքերում գծապատկերների որոշակի տեսակների վրա:
        `,
				initialCode: createHighchartsLesson(
					`  Highcharts.chart('container', {
    chart: { type: 'column' },
    title: { text: 'Սերվերի օգտագործումը' },
    xAxis: { categories: ["ծրագիր", "Տվյալների Բազա", "քեշ"] },
    yAxis: { min: 0, title: { text: 'Պրոցեսոր %' } },
    plotOptions: {
      column: {
        borderRadius: 4,
        dataLabels: { enabled: true }
      }
    },
    series: [{
      name: 'Սերվեր 1',
      data: [45, 80, 20],
      color: '#8B5CF6'
    }, {
      name: 'Սերվեր 2',
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
# Կարկանդակի տեսքով գծապատկերներ
Highcharts-ը կարկանդակի գծապատկերները մշակում է սերիայի տիպի, այլ ոչ թե գլոբալ աղյուսակի տիպի միջոցով:

### Հիմնական հասկացություններ
* **innerSize:** Օգտագործվում է կարկանդակի աղյուսակում ՝ Այն բլիթների աղյուսակի վերածելու համար:
* **dataLabels.format:** Լարային ձևանմուշ (օրինակ՝ \'{point.name}: {point.percentage:.1f}%\`) պիտակների ձևաչափման համար՝ առանց բարդ գործառույթ օգտագործելու:
        `,
				initialCode: createHighchartsLesson(
					`  Highcharts.chart('container', {
    chart: { type: 'pie' },
    title: { text: 'Բրաուզերների շուկայի մասնաբաժինները' },
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
				title: 'Տարածք և կորագիծ',
				description: 'Հարթեցված գծեր և ստվերավորված տարածքներ:',
				theory: `
# Տարածք և կորագիծ
Օգտագործեք areaspline՝ հարթ գիծ ստանալու համար, որի տակ ներկվածս տարածք կա:

### Հիմնական հասկացություններ
* **type: 'areaspline':** Համատեղում է spline (կոր գիծ) Տարածքի լրացման հետ:
* **fillOpacity:** Որոշում է ողողված տարածքի թափանցիկությունը:
* **marker:** Կարգավորում է կետերի դասավորությունը տվյալների կետերում:
        `,
				initialCode: createHighchartsLesson(
					`  Highcharts.chart('container', {
    chart: { type: 'areaspline' },
    title: { text: "Միջին ջերմաստիճանը" },
    xAxis: { categories: ["Հունվար", "Փետրվար", "Մարտ", "Ապրիլ", "Մայիս", "Հունիս"] },
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

### Հիմնական հասկացություններ
* **drilldown script:** Պահանջվում է բեռնել\`drilldown.js\` մոդուլը։
* **drilldown property:** Կապում է ծնող օբյեկտը երեխա օբյեկտի հետ, ըստ id-ի:
* **drilldown series:** Մի կետի վրա սեղմելիս ցուցադրվող շարքի օբյեկտների առանձին զանգված:
        `,
				initialCode: createHighchartsLesson(
					`  Highcharts.chart('container', {
    chart: { type: 'column' },
    title: { text: 'սեխմեք սյունակներին՝ մանրամասները տեսնելու համար' },
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
