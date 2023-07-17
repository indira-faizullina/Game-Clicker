const start = document.querySelector('.start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('.time-list')
const timeElement = document.querySelector('#time')
const board = document.querySelector('#board')

const colors = [
  '#3388ff',
  '#ff41d5',
  '#ffb770',
  '#fffb81',
  '#a2ffaf',
  '#f47137',
  '#ff00ff',
  '#ffd700',
  '#ff4500'
]

let time = 0
let score = 0

timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    time = Number(event.target.dataset.time)
    scroll(1)
    startGame()
  }
})

start.addEventListener('click', (event) => {
  event.preventDefault()
  scroll(0)
})

function scroll(index) {
  screens[index].classList.add('up')
}

board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    score++
    event.target.remove()
    createRandomCircle()
  }
})

function startGame() {
  setInterval(decreaseTime, 1000)
  setTime(time)
  createRandomCircle()
}

function decreaseTime() {
  if (time === 0) {
    finishGame()
  } else {
    let current = --time
    if (current < 10) {
      current = `0${current}`
    }
    setTime(current)
  }
}

function finishGame() {
  timeElement.parentNode.classList.add('hide')
  board.innerHTML = `<div><h1>Счёт: <span class="primary">${score}</span></h1>
  <button class="update">Назад</button></div>`
  const updateButton = document.querySelector('.update')
  updateButton.addEventListener('click', () => location.reload())
}

function setTime(value) {
  timeElement.textContent = `00:${value}`
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function createRandomCircle() {
  const circle = document.createElement('div')
  circle.className = 'circle'

  const circleSize = getRandomNumber(10, 55)
  circle.style.height = `${circleSize}px`
  circle.style.width = `${circleSize}px`

  const { width, height } = board.getBoundingClientRect()

  const x = getRandomNumber(0, width - circleSize)
  const y = getRandomNumber(0, height - circleSize)

  circle.style.top = `${y}px`
  circle.style.left = `${x}px`

  const circleColorIndex = getRandomNumber(0, colors.length - 1)
  circle.style.backgroundColor = colors[circleColorIndex]

  board.append(circle)
}

function winTheGame() {
  function killCircle() {
    const circle = board.querySelector('.circle')
    if (circle) {
      circle.click()
    }
  }

  setInterval(killCircle, 50)
}
