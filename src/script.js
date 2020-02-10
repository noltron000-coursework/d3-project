const startAudio = () => {
	const audio = new Audio()
	const audioContext = new (window.AudioContext || window.webkitAudioContext)()

	audio.src = './data/bird-whistling-a.wav'

	audio.play()
}
