'use scrict';

const colorBoxes = []
const btn = document.getElementById('btn')
const addBtn = document.getElementById('add')
const removeBtn = document.getElementById('remove')
const removeNumberSignBtn = document.getElementById('toggle')
let numberSign = true

// Initialize.
colorBoxes.push(document.getElementById('color0'))
colorBoxes.push(document.getElementById('color1'))
// Move text cursor right to "#".
colorBoxes[0].setSelectionRange(1, 1)

// functions

const DecimalToHex = (n) => Number(n).toString(16)

const changeBackground = (obj) => {
  if (obj.value.slice(0, 1) !== '#') { 
    obj.style.backgroundColor = `#${obj.value}`
  } else {
    obj.style.backgroundColor = obj.value
  }
}

const calculateColor = (elementArray) => {
  // Calculate color and dsiplay result.
  const colors = []
  const resultLabel = document.getElementById('result')
  
  for (let i = 0; i < elementArray.length; i++) {
    if ( (elementArray[i].value.match(/#*[0-9a-fA-F]{6}/)) &&  (elementArray[i].value.length != 6 || elementArray[i].value.length != 7) ) {
      if (elementArray[i].value[0] === '#'){
        colors.push(elementArray[i].value.slice(1).match(/.{2}/gi))
      }
      else {
        colors.push(elementArray[i].value.match(/.{2}/gi))
      }
    } else {
      alert(`Please enter 6-digits color code ( color ${i}).`)
    return
    }
    // Split a color code each [R, G, B] and push them to array.
  }
    
  rgb = []
  for (let i = 0; i < 3; i++) {
    let sum = 0
    for (let j = 0; j < colors.length; j++) {
      sum += parseInt(colors[j][i], 16)
    }
    rgb.push(DecimalToHex(Math.ceil(sum / colors.length)))
  }
  resultLabel.textContent = '#' + rgb.join('')
  // resultLabel.value = '#' + rgb.join('')
  resultLabel.style.backgroundColor = '#' + rgb.join('')
  document.body.style.backgroundColor = '#' + rgb.join('')
}

const addColor = (elementArray) => {
  if (elementArray.length >= 4) {
    alert('Up to 4 colors.')
    return
  }
  const exColor = document.createElement('input')
  const boxNode = document.getElementById('input-box')
  const arrayLength = elementArray.length
  exColor.id = `color${arrayLength}`
  exColor.type = 'text'
  exColor.name = `color${arrayLength}`
  exColor.placeholder = `color${arrayLength}`
  exColor.spellcheck = false
  exColor.maxLength = '7'
  exColor.addEventListener('blur', () => changeBackground(exColor))
  if (numberSign) { exColor.value = '#' }
  elementArray.push(exColor)
  boxNode.appendChild(exColor)
}

const removedColor = (elementArray) => {
  if (colorBoxes.length <= 2) {
    alert('At least 2 colors are need.')
    return
  }
  elementArray.pop().remove()
}

const copyToClipboard = () => {
  result = document.getElementById('result')
  resultText = result.textContent
  navigator.clipboard.writeText(resultText)
  // result.classList.add('result-balloon')
  alert('Copied!')
}

//  add Event

btn.addEventListener('click', () => {
  calculateColor(colorBoxes)
})

addBtn.addEventListener('click', () => {
  addColor(colorBoxes)
})

removeBtn.addEventListener('click', () => {
  removedColor(colorBoxes)
})

removeNumberSignBtn.addEventListener('click', () => {
  if (numberSign) {
    for (let i = 0; i < colorBoxes.length; i++) {
      colorBoxes[i].value = colorBoxes[i].value.replace(/#/gi, '')
    }
    numberSign = false
    removeNumberSignBtn.value = 'Add #'
    return
  }
  for (let i = 0; i < colorBoxes.length; i++) {
    colorBoxes[i].value = `#${colorBoxes[i].value}`
  }
  removeNumberSignBtn.value = 'Remove #'
  numberSign = true
})

// result.addEventListener('click', () => {
//   copyToClipboard()
// })