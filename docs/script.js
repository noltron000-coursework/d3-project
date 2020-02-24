class AudioVisualizer {
	constructor (audioURL) {
		this.audio = new Audio(audioURL)
		this.audioContext = new AudioContext()
		this.audioElement = document.getElementById('main-audio')
		this.audioAnalyzer = null
		this.frequencyArray = new Uint8Array()
		this.startAudio()
		this.renderAudio()
	}

	startAudio () {
		// TODO: understand what this does a little better

		// create an "audio context"
		// https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
		this.audioAnalyzer = this.audioContext.createAnalyser()
		this.audioAnalyzer.connect(this.audioContext.destination)

		// load & apply audio files
		// https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio
		const source = this.audioContext.createMediaElementSource(this.audio)

		// connect source audio with the analyzer
		source.connect(this.audioAnalyzer)

		// track the analyzer's frequency rates
		this.frequencyArray = new Uint8Array(this.audioAnalyzer.frequencyBinCount)
	}

	renderAudio () {
		// populate the frequencyArray
		this.audioAnalyzer.getByteFrequencyData(this.frequencyArray)

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
