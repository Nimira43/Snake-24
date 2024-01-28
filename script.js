const canvasEl = document.querySelector('canvas')
const cc = canvasEl.getContext('2d')
canvasEl.height = 400
canvasEl.width = 400

let speed = 7
let tileCount = 20
let snakeHeadX = 10
let snakeHeadY = 10
let xV = 0
let yV = 0
let snackX = 5
let snackY = 5
let snakeTail = 2
let score = 0