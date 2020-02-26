class AudioVisualizer {
	constructor (audioURL) {
		// Get HTML elements.
		this.audioElement = document.getElementById('main-audio')
		this.visualElement = document.getElementById('main')

		// Load & initialize audio file to "Audio" object.
		// https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio
		this.audio = new Audio(audioURL)

		// Create an "AudioContext" and setup the analyzer.
		// https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
		this.audioContext = new AudioContext()
		this.audioAnalyzer = this.audioContext.createAnalyser()

		// TODO: understand what this does a little better
		// connect source audio with the analyzer
		const source = this.audioContext.createMediaElementSource(this.audio)
		source.connect(this.audioAnalyzer)
		this.audioAnalyzer.connect(this.audioContext.destination)

		// Initialize a special array of a certain size,
		// although each index will have no value set yet.
		this.frequencyArray = new Uint8Array(this.audioAnalyzer.frequencyBinCount)

		// Start the first frame by calling the .setup() method.
		this.setup()
	}

	setup () {
		console.log(this.frequencyArray.length)
		// populate the frequency array
		this.audioAnalyzer.getByteFrequencyData(this.frequencyArray)

		// initialize height and width
		const h = window.innerHeight
		const w = window.innerWidth

		// create pretty colors
		const colorScale = d3
		.scaleLinear()
		.domain([0, 150])
		.range(["#2c7bb6","#d7191c"])

		const circleX = d3
		.scaleLinear()
		.domain([0, this.frequencyArray.length])
		.range([0, w])

		// const circleY = h/2 - d

		// create an svg object
		this.svg = d3
		// .select('main')
		.select(this.visualElement)
		.append('svg')
		.attr('width', w)
		.attr('height', h)

		// create 1024 tiny circles
		this.svg
		.selectAll('circle') // ???
		.data(this.frequencyArray)
		.enter()
		.append('circle')
		.attr('r', (d) => {
			return w / this.frequencyArray.length / 2 + 0.3
		})
		.attr('cx', (d, i) => {
			return circleX(i)
		})
		.attr('cy', (d) => {
			return h/2 - d
		})
		.attr('fill', (d, i) => {
			return colorScale(d)
		})

		// call render on the next frame
		requestAnimationFrame(() => {
			this.render()
		})
	}

	render () {
		let frequencyArray = new Uint8Array(this.audioAnalyzer.frequencyBinCount)
		// populate the frequencyArray
		this.audioAnalyzer.getByteFrequencyData(frequencyArray)

		console.log(frequencyArray)

		// initialize height and width
		const h = window.innerHeight
		const w = window.innerWidth

		// create pretty colors
		const colorScale = d3
		.scaleLinear()
		.domain([0, 150])
		.range(["#2c7bb6","#d7191c"])

		// select svg items
		this.svg
		.selectAll('circle')
		.data(frequencyArray)
		.attr('cy', (d) => {
			return h / 2 - d
		})
		.attr('fill', (d, i) => {
			return colorScale(d)
		})

		// d3
		// .select('body')
		// .data(this.frequencyArray)
		// .enter()
		// .append('div')
		// .text(d => d)
		// .style('padding', '1em')
		// .style('background-color', 'red')
		// .style('margin', '1px')
		// .style('width', d => `${d / 255 * 100}%`)
		// .style('box-sizing', 'border-box')

		// repeat render function every frame
		requestAnimationFrame(() => {
			this.render()
		})
	}
}

const RickRoll = () => {
	return new AudioVisualizer('./data/rick-roll.mp3')
}
