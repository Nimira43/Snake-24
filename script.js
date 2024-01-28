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
let tileSize = canvasEl.width / tileCount

const snakeBody = []
document.addEventListener('keydown', keyDown)
const eatSnack = new Audio('eat.wav')

function playGame() {
    changeSnakePosition()
    let result = gameOver()
    if (result) {
        return
    }
    clearScreen()
    snakeColDetect()
    drawSnack()
    drawSnake()
    drawScore()
    setTimeout(playGame, 1000 / speed)
}

function gameOver() {
    let gameOver = false
    if (xV === 0 && yV === 0) return false
    if (
        snakeHeadX < 0 ||
        snakeHeadX === tileCount ||
        snakeHeadY < 0 ||
        snakeHeadY === tileCount
    ) {
        gameOver = true
    }
    for (let i = 0; i < snakeBody.length; i++) {
        let part = snakeBody[i]
        if (part.x === snakeHeadX && part.y === snakeHeadY) {
            gameOver = true
            break
        }
    }
    if (gameOver) {
        cc.fillStyle = 'yellow'
        cc.font = '40px sans-serif'
        cc.fillText('You are dead', canvasEl.width / 8, canvasEl.height / 2)
    }
    return gameOver
}

function drawScore() {
    cc.fillStyle = 'yellow'
    cc.font = '20px sans-serif'
    cc.fillText(`Score: ${score}`, 20, 20)
}

function clearScreen() {
    cc.fillStyle = 'darkred'
    cc.fillRect(0, 0, canvasEl.width, canvasEl.height)
}

function drawSnake() {
    cc.fillStyle = "orangered"
    for (let i = 0; i < snakeBody.length; i++) {
        let part = snakeBody[i]
        cc.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }
    snakeBody.push(new SnakeBody(snakeHeadX, snakeHeadY))
    if (snakeBody.length > snakeTail) {
        snakeBody.shift()
    }
    cc.fileStyle = 'blue'
    cc.fillRect(
        snakeHeadX * tileCount,
        snakeHeadY * tileCount,
        tileSize,
        tileSize
    ) 
}

function changeSnakePosition() {
    snakeHeadX = snakeHeadX + xV
    snakeHeadY = snakeHeadY + yV
}

function drawSnack() {
    cc.fillStyle = 'green'
    cc.fillRect(snackX * tileCount, snackY * tileCount, tileSize, tileSize)
}

function snakeColDetect()      {
    if (snackX === snakeHeadX && snackY === snakeHeadY) {
        snackX = Math.floor(Math.random() * tileCount)
        snackY = Math.floor(Math.random() * tileCount)
        snakeTail++
        score++
        speed++
        eatSnack.play()
    }
}

function keyDown(e) {
    if (e.keyCode === 38) {
        if (yV === 1) return
        yV = -1
        xV = 0
    }
    if (e.keyCode === 40) {
        if (yV === -1) return
        yV = 1
        xV = 0
    }
    if (e.keyCode === 37) {
        if (xV === 1) return
        xV = -1
        yV = 0
    }
    if (e.keyCode === 39) {
        if (xV === -1) return
        xV = 1
        yV = 0
    }
}

class SnakeBody {
    constructor(x, y) {
        this.x = x
        this.y = y            
    }
}

playGame()