let area = document.getElementById('area')
let cells = document.getElementsByClassName('cell')
let WhoWins = document.getElementById('whoWins')
let currentPlayer = document.getElementById('currentPl')
let roundHistoryElement = document.getElementById('roundHistory')
let clickSound = document.getElementById('clickSound')
let winSound = document.getElementById('winSound')

let roundHistory = []

let player = 'X'
let ai = 'O'

let stat = {
    'X': 0,
    'O': 0,
    'D': 0
}

let winCombination = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]

for (let i = 1; i <= 9; i++) {
    area.innerHTML += `<div class='cell' pos="${i}"></div>`
}

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', cellonClick)
}

function cellonClick() {
    let data = []
    if (!this.innerHTML) {
        this.innerHTML = player
        clickSound.play()
    } else {
        alert('Ячейка занята')
        return
    }
    for (let i in cells) {
        if (cells[i].innerHTML == player) {
            data.push(parseInt(cells[i].getAttribute('pos')))
        }
    }
    let winningCells = checkWinner(data)
    if (winningCells) {
        stat[player] += 1
        WhoWins.innerHTML = 'Победил: ' + [player]
        roundHistory.push(WhoWins.innerHTML)
        document.getElementById("roundHistory").innerHTML += `Победил ${player},<br>`
        updateHistory()
        winSound.play() 
        highlightWinningCells(winningCells)
        updateStats()
        setTimeout(() => {
            refresh()
        }, 3000) // 2-second delay before clearing the board
    } else {
        let draw = true
        for (let i in cells) {
            if (cells[i].innerHTML == "") {
                draw = false
                break
            }
        }
        if (draw) {
            stat.D += 1
            WhoWins.innerHTML = 'Ничья'
            roundHistory.push(WhoWins.innerHTML)
            document.getElementById("roundHistory").innerHTML += `Ничья ${player},<br>`
            updateHistory()
            updateStats()
            setTimeout(refresh, 3000) // 2-second delay before clearing the board
        }
    }
    player = player === "X" ? "O" : "X"
    currentPlayer.innerHTML = player
}

function checkWinner(data) {
    for (let i in winCombination) {
        let win = true
        for (let j in winCombination[i]) {
            let id = winCombination[i][j]
            let ind = data.indexOf(id)
            if (ind == -1) {
                win = false
                break
            }
        }
        if (win) return winCombination[i]
    }
    return false
}

function highlightWinningCells(winningCells) {
    for (let i in winningCells) {
        let cell = document.querySelector(`.cell[pos="${winningCells[i]}"]`)
        cell.classList.add('win')
    }
}

function updateStats() {
    document.getElementById('sX').querySelector('span').innerHTML = stat['X']
    document.getElementById('sO').querySelector('span').innerHTML = stat['O']
    document.getElementById('sD').querySelector('span').innerHTML = stat['D']
}

function updateHistory() {
    roundHistoryElement.innerHTML = roundHistory.join('<br>')
}

function refresh() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = ""
        cells[i].classList.remove('win')
    }
}

