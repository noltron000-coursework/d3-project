class AudioVisualizer {
	constructor (audioURL) {
		// Get width, height, etc.
		this.props = {
			'width': window.innerWidth,
			'height': window.innerHeight,
		}

		// Get HTML elements.
		this.audioElement = document.getElementById('main-audio')
		this.visualElement = document.getElementById('main-visual')

		// Load & initialize audio file to "Audio" object.
		// https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio
		this.audio = this.audioElement // new Audio(audioURL)

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

	_getDataColor (index, frequency) {
		const color = d3
		.scaleLinear()
		.domain([0, 150])
		.range(["#2c7bb6","#d7191c"]) // this is a function!
		(index) // immediately call it with an index.
	}

	_getPositionX (index, frequency) {
		return d3
		.scaleLinear()
		.domain([0, this.frequencyArray.length])
		.range([0, this.props.width]) // this is a function!
		(index) // immediately call it with an index.
	}

	_getPositionY (index, frequency) {
		return this.props.height / 2 - frequency
	}
	
	_getPropertyR (index, frequency) {
		return this.props.width / this.frequencyArray.length / 2 + 0.3
	}

	setup () {
		// populate the frequency array
		this.audioAnalyzer.getByteFrequencyData(this.frequencyArray)

		// set up the svg object
		this.svg = d3
		// .select('main-visual')
		.select(this.visualElement)
		.attr('width', this.props.width)
		.attr('height', this.props.height)

		// create 1024 tiny circles
		this.svg
		.selectAll('circle') // ???
		.data(this.frequencyArray)
		.enter()
		.append('circle')
		.attr('r', (frequency, index) => this._getPropertyR(index, frequency))
		.attr('cx', (frequency, index) => this._getPositionX(index, frequency))
		.attr('cy', (frequency, index) => this._getPositionY(index, frequency))
		.attr('fill', (frequency, index) => this._getDataColor(index, frequency))

		// call render on the next frame
		requestAnimationFrame(() => {
			this.render()
		})
	}

	render () {
		// populate the frequencyArray
		this.audioAnalyzer.getByteFrequencyData(this.frequencyArray)

		// select svg items
		this.svg
		.selectAll('circle')
		.data(this.frequencyArray)
		.attr('cy', (frequency, index) => this._getPositionY(index, frequency))
		.attr('fill', (frequency, index) => this._getDataColor(index, frequency))

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
