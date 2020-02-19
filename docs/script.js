class AudioVisualizer {
	constructor (sourceURL) {
		this.source = sourceURL
		this.analyzer = null
		this.frequencyArray = new Uint8Array()
		this.startAudio()
		this.renderAudio()
	}

	startAudio () {
		// TODO: understand what this does a little better

		// create an "audio context"
		// https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
		const audioContext = new AudioContext()
		this.analyzer = audioContext.createAnalyser()
		this.analyzer.connect(audioContext.destination)

		// load & apply audio files
		// https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio
		const audio = new Audio(this.source)
		const source = audioContext.createMediaElementSource(audio)

		// connect source audio with the analyzer
		source.connect(this.analyzer)

		// track the analyzer's frequency rates
		this.frequencyArray = new Uint8Array(this.analyzer.frequencyBinCount)

		// play the audio
		audio.play()
	}
	
	renderAudio () {
		// populate the frequencyArray
		this.analyzer.getByteFrequencyData(this.frequencyArray)

		d3
		.select('body')
		.data(this.frequencyArray)
		.enter()
		.append('div')
		.text(d => d)
		.style('padding', '1em')
		.style('background-color', 'red')
		.style('margin', '1px')
		.style('width', d => `${d / 255 * 100}%`)
		.style('box-sizing', 'border-box')

		// repeat render function every frame
		requestAnimationFrame(() => {
			this.renderAudio()
		})
	}
}

const RickRoll = () => {
	return new AudioVisualizer('./data/rick-roll.mp3')
}
