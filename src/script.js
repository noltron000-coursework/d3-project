let analyzer
let frequencyArray
const playButton = document.getElementById('button-play')

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

playButton.addEventListener('click', (ev) => {
	startAudio()
})
