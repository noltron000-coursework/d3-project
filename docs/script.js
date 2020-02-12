const canvas = document.getElementById('visualizer')
canvas.width = 300
canvas.height = 300
const context = canvas.getContext('2d')

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
	context.clearRect(0, 0, canvas.width, canvas.height)

	// populate the frequencyArray
	analyzer.getByteFrequencyData(frequencyArray)
	
	// loop through the frequencyArray
	frequencyArray.forEach((frequency01, index01) => {
		// get the width-multiplier of the graph-curve segment.
		const xMult = frequencyArray.length / canvas.width
		// get the height-multiplier of the graph-curve segment.
		const yMult = canvas.height / 255

		// stop before the final iteration.
		if (frequencyArray.length >= index01 + 1) {

			// get second frequency item.
			const index02 = index01 + 1
			const frequency02 = frequencyArray[index02]

			// get coordinates based on data.
			const startPoint = {
				x: index01 * xMult,
				y: frequency01 * yMult,
			}
			const endPoint = {
				x: index02 * xMult,
				y: frequency02 * yMult,
			}
			const handle01 = {
				x: startPoint.x + xMult/2,
				y: startPoint.y,
			}
			const handle02 = {
				x: endPoint.x - xMult/2,
				y: endPoint.y,
			}

			// draw
			context.beginPath()
			context.moveTo(
				startPoint.x,
				startPoint.y,
			)
			context.bezierCurveTo(
				handle01.x,
				handle01.y,
				handle02.x,
				handle02.y,
				endPoint.x,
				endPoint.y,
			)
			context.stroke()
		}
	})

	requestAnimationFrame(render)
}


canvas.addEventListener('click', (event) => {
	startAudio()
})
