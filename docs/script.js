const canvas = document.getElementById('visualizer')
canvas.width = 300
canvas.height = 300
const context = canvas.getContext('2d')

const width = canvas.width
const height = canvas.height
const centerX = width / 2
const centerY = height / 2
const radius = Math.min(width, height) / 13

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
	
	render()
}


const render = () => {
	context.clearRect(0, 0, width, height)
	context.beginPath()

	context.arc(centerX, centerY, radius, 0, 2 * Math.PI)
	context.strokeStyle = '#002B36'

	context.stroke()

	const bars = 1024
	const step = Math.PI * 2 / bars

	analyzer.getByteFrequencyData(frequencyArray)

	frequencyArray.forEach((f, i) => {
		const barLength = frequencyArray[i] * 0.5
		const x1 = (Math.cos(step * i) * radius) + centerX
		const y1 = (Math.sin(step * i) * radius) + centerY
		const x2 = (Math.cos(step * i) * (radius + barLength)) + centerX
		const y2 = (Math.sin(step * i) * (radius + barLength)) + centerY

		context.moveTo(x1, y1)
		context.lineTo(x2, y2)
	})

	context.stroke()

	requestAnimationFrame(render)
}


canvas.addEventListener('click', (event) => {
	startAudio()
})
