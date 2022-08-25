const playSparkline = (notes) => {
  let playing = null
  let note = 0
  const audioContext = new window.AudioContext()
  const osc = audioContext.createOscillator()
  const amplifier = audioContext.createGain()

  const playNotes = function () {
    if (note < notes.length) {
      osc.frequency.value = 440 + notes[note] * 64 // hertz
      note = note + 1
    } else {
      amplifier.gain.value = 0
    }
    playing = window.setTimeout(playNotes, 25)
  }
  playNotes()
  osc.connect(amplifier)
  amplifier.connect(audioContext.destination)
  osc.start(0)

  window.setTimeout(() => {
    osc.stop(0)
    window.clearTimeout(playing)
    audioContext.close()
  }, notes.length * 64)

  return () => {
    window.clearTimeout(playing)
    audioContext.close()
  }
}

export default playSparkline
