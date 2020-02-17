let analyzer
let frequencyArray

const startAudio = () => {
	// TODO: understand what this does a little better

	// create an "audio context"
	// https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
	const audioContext = new AudioContext()
	analyzer = audioContext.createAnalyser()
	analyzer.connect(audioContext.destination)

	// load & apply audio files
	// https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio
	const audio = new Audio('./data/rick-roll.mp3')
	const source = audioContext.createMediaElementSource(audio)

	// connect source audio with the analyzer
	source.connect(analyzer)

	// track the analyzer's frequency rates
	frequencyArray = new Uint8Array(analyzer.frequencyBinCount)

	// play the audio
	audio.play()
	
	render()
}

const render = () => {
	// populate the frequencyArray
	analyzer.getByteFrequencyData(frequencyArray)

	d3
	.select('body')
	.data(frequencyArray)
	.enter()
	.append('div')
	.text(d => d)
	.style('padding', '1em')
	.style('background-color', 'red')
	.style('margin', '1px')
	.style('width', d => `${d / 255 * 100}%`)
	.style('box-sizing', 'border-box')

	// repeat render function every frame
	requestAnimationFrame(render)
}
