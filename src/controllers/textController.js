// text/TextPrinter.js
export class TextPrinter {
  constructor(layoutStore, sfxController) {
    this.layout = layoutStore
    this.sfx = sfxController
    this.isStopped = false
    this.currentTimeout = null
  }

  async print(fullText, speed) {
    this.isStopped = false
    this.layout.emptyTextbox()
    
    return new Promise((resolve) => {
      this._printRecursive(fullText, speed, 0, resolve)
    })
  }

  _printRecursive(fullText, speed, index, resolve) {
    if (this.isStopped || index >= fullText.length) {
      resolve()
      return
    }

    const char = fullText[index]
    
    // Handle SFX commands
    if (char === '£') {
      const { sfxName, newIndex } = this._extractSfxCommand(fullText, index)
      this.sfx.play(sfxName)
      this.currentTimeout = setTimeout(() => 
        this._printRecursive(fullText, speed, newIndex, resolve), speed
      )
      return
    }

    this.layout.addToTextbox(char)
    this._playTypeSound(char)
    
    const delay = this._getPunctuationDelay(char, speed)
    const nextIndex = index + 1
    
    this.currentTimeout = setTimeout(() => 
      this._printRecursive(fullText, speed, nextIndex, resolve), delay
    )
  }

  _extractSfxCommand(text, startIndex) {
    let sfxName = ''
    let i = startIndex + 1
    
    while (i < text.length && text[i] !== '$') {
      sfxName += text[i]
      i++
    }
    
    return { sfxName, newIndex: i + 1 }
  }

  _getPunctuationDelay(char, baseSpeed) {
    const delays = {
      ',': baseSpeed * 3,
      '.': baseSpeed * 7,
      '!': baseSpeed * 7,
      '?': baseSpeed * 7
    }
    return delays[char] || baseSpeed
  }

  _playTypeSound(char) {
    if (![' ', ',', '.', '!', '?'].includes(char)) {
      this.sfx.play('txt3')
    }
  }

  stop() {
    this.isStopped = true
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout)
    }
  }

  skipToEnd(fullText) {
    this.stop()
    this.layout.updateTextbox(fullText)
  }
}