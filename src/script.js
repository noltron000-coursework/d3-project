const playButton = document.getElementById('button-play')
const canvas = document.getElementById('visualizer')
const context = canvas.getContext('2d')

const width = canvas.width
const height = canvas.height
const centerX = width / 2
const centerY = height / 2
// const radius = width / 5

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
	const audio = new Audio('./data/bird-whistling-a.wav')
	const source = audioContext.createMediaElementSource(audio)

	// connect source audio with the analyzer
	source.connect(analyzer)

	// track the analyzer's frequency rates
	frequencyArray = new Uint8Array(analyzer.frequencyBinCount)

	// play the audio
	audio.play()
}


const render = () => {
	context.clearRect(0, 0, width, height)
	context.beginPath()

	context.arc(centerX, centerY, radius, 0, 2 * Math.PI)
	context.strokeStyle = 'red'

	context.stroke()

	const bars = 200
	const step = Math.PI * 2 / bars

	analyser.getByteFrequencyData(frequencyArray)

	requestAnimationFrame(render)
}


playButton.addEventListener('click', (ev) => {
	startAudio()
})
