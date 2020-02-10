const playButton = document.getElementById('button-play')

const startAudio = () => {
	const audio = new Audio()
	const audioContext = new (window.AudioContext || window.webkitAudioContext)()

	audio.src = './data/bird-whistling-a.wav'
	audio.play()
}

playButton.addEventListener('click', (ev) => {
	startAudio()
})
