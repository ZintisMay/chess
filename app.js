const log = console.log

class Chess {
    constructor(target, size) {
        this.target = target

        this.black = this.createPieces("black")
        this.white = this.createPieces("white")
        this.createBoard()
        this.setBoard()
        this.drawBoard()
        log(this)
    }
    drawBoard() {
        var switcher = false
        this.board.map((row, x) => {
            switcher = !switcher
            row.map((cell, y) => {
                switcher = !switcher
                this.target.innerHTML += this.createCell(cell, x, y, switcher ? "dark" : "")
            })
        })
    }
    createBoard() {
        this.board = []
        //Create board array
        for (var x = 0; x < 8; x++) {
            var row = []
            for (var y = 0; y < 8; y++) {
                row.push(null)
            }
            this.board.push(row)
        }
        log(this.board)
    }
    createCell(cell, x, y, color) {
        return `<div class="cell ${x} ${y} ${color}">${cell.name || "" }</div>`
    }
    createPieces(color) {

        var p = []
        
        var pawnStats = { name: "pawn", direction: 1, move: [{ x: 0, y: 1 }], attack: [{ x: 1, y: 1 }, { x: -1, y: 1 }] }
        var rookStats = { name: "rook", attack: [{ x: 1, y: 0, infinite: true }, { x: -1, y: 0, infinite: true }, { x: 0, y: 1, infinite: true }, { x: 0, y: -1, infinite: true }] }
        var knightStats = { name: "knight", attack: [{ x: 2, y: 1 }, { x: -2, y: 1 }, { x: 2, y: -1 }, { x: -2, y: -1 }, { x: 1, y: 2 }, { x: 1, y: -2 }, { x: -1, y: 2 }, { x: -1, y: -2 }] }
        var bishopStats = { name: "bishop", attack: [{ x: 1, y: 1, infinite: true }, { x: -1, y: 1, infinite: true }, { x: 1, y: -1, infinite: true }, { x: -1, y: -1, infinite: true }] }
        var queenStats = { name: "queen", attack: [{ x: 1, y: 1, infinite: true }, { x: -1, y: 1, infinite: true }, { x: 1, y: -1, infinite: true }, { x: -1, y: -1, infinite: true }, { x: 1, y: 0, infinite: true }, { x: -1, y: 0, infinite: true }, { x: 0, y: 1, infinite: true }, { x: 0, y: -1, infinite: true }] }
        var kingStats = { name: "king", attack: [{ x: 1, y: 1 }, { x: -1, y: 1 }, { x: 1, y: -1 }, { x: -1, y: -1 }] }

        p.push(new ChessPiece(pawnStats, "white", 0, 1))
        p.push(new ChessPiece(pawnStats, "white", 1, 1))
        p.push(new ChessPiece(pawnStats, "white", 2, 1))
        p.push(new ChessPiece(pawnStats, "white", 3, 1))
        p.push(new ChessPiece(pawnStats, "white", 4, 1))
        p.push(new ChessPiece(pawnStats, "white", 5, 1))
        p.push(new ChessPiece(pawnStats, "white", 6, 1))
        p.push(new ChessPiece(pawnStats, "white", 7, 1))
        p.push(new ChessPiece(rookStats, "white"), 0, 0)
        p.push(new ChessPiece(rookStats, "white"), 7, 0)
        p.push(new ChessPiece(knightStats, "white"), 1, 0)
        p.push(new ChessPiece(knightStats, "white"), 6, 0)
        p.push(new ChessPiece(bishopStats, "white"), 2, 0)
        p.push(new ChessPiece(bishopStats, "white"), 5, 0)
        p.push(new ChessPiece(queenStats, "white"), 3, 0)
        p.push(new ChessPiece(kingStats, "white"), 4, 0)

        p.push(new ChessPiece(pawnStats, "black", 0, 6))
        p.push(new ChessPiece(pawnStats, "black", 1, 6))
        p.push(new ChessPiece(pawnStats, "black", 2, 6))
        p.push(new ChessPiece(pawnStats, "black", 3, 6))
        p.push(new ChessPiece(pawnStats, "black", 4, 6))
        p.push(new ChessPiece(pawnStats, "black", 5, 6))
        p.push(new ChessPiece(pawnStats, "black", 6, 6))
        p.push(new ChessPiece(pawnStats, "black", 7, 6))
        p.push(new ChessPiece(rookStats, "black"), 0, 7)
        p.push(new ChessPiece(rookStats, "black"), 7, 7)
        p.push(new ChessPiece(knightStats, "black"), 1, 7)
        p.push(new ChessPiece(knightStats, "black"), 6, 7)
        p.push(new ChessPiece(bishopStats, "black"), 2, 7)
        p.push(new ChessPiece(bishopStats, "black"), 5, 7)
        p.push(new ChessPiece(queenStats, "black"), 3, 7)
        p.push(new ChessPiece(kingStats, "black"), 4, 7)

        return p
    }
    setBoard() {
        this.black.map(piece => {
            log(piece)
            this.board[piece.x][piece.y] = piece
        })
        this.white.map(piece => {
            this.board[piece.x][piece.y] = piece
        })
    }
}

class ChessPiece {
    constructor(moves, color, x, y) {
        this.moves = moves
        this.move(x, y)
    }
    move(x, y) {
        this.x = x
        this.y = y
    }
    getMoves(board) {
        return this.moves.map(this.checkMove).filter(item => item)
    }
    checkMove(item) {

    }
}



// var pawn = new ChessPiece(pawnStats)
// var rook = new ChessPiece(rookStats)
// var knight = new ChessPiece(knightStats)
// var bishop = new ChessPiece(bishopStats)
// var queen = new ChessPiece(queenStats)
// var king = new ChessPiece(kingStats)

// log(pawn)
// log(rook)
// log(knight)
// log(bishop)
// log(queen)
// log(king)

var target = document.getElementById('target')
var game = new Chess(target)

function repeat(times, item) {
    var arr = []
    for (var x = 0; x < times; x++) {
        arr.push(item)
    }
    return arr
}