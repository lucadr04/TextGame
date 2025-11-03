import { useLayoutStore } from '../stores/layoutStore.js'

import SfxController from '../controllers/sfxController.js'

// Function to print text with sfx and a set speed
// Note: £ can't be used in 'normal text'. Luckily it is not a big loss
export function textPrinter(fullText, speed) {
  const layout = useLayoutStore()
  let i = 0
  let stopped = false

  function typeNextChar() {
    if (stopped || i >= fullText.length) return

    let char = fullText[i]
    if(char === '£') {
      let sfx = ''
      i++;
      while(i < fullText.length && fullText[i] !== '£') {
        sfx += fullText[i]
        i++;
      }
      i++;
      SfxController.play(sfx)
      return setTimeout(typeNextChar, speed)
    }

    layout.addToTextbox(char)

    if (![' ', ',', '.', '!', '?'].includes(char)) {
      SfxController.play('txt3')
    }

    i++

    // Variable delay to slow down after punctuation
    let delay = speed
    if ([','].includes(char)) {
      delay = speed * 3 // adjust multiplier as needed
    } else if (['.', '!', '?'].includes(char)) {
      delay = speed * 8 // adjust multiplier as needed
    } 

    SfxController.typeTimeout = setTimeout(typeNextChar, delay)
  }

  typeNextChar()

  // Click to skip
  const stopOnClick = () => {
    stopped = true
    layout.updateTextbox(fullText.replace(/£.*?\£/g, ''))
    clearTimeout(SfxController.typeTimeout)
    document.removeEventListener('click', stopOnClick)
  }

  document.addEventListener('click', stopOnClick)
}
