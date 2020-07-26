const log = console.log

class Chess {
    constructor(target, size) {
        this.target = target
        this.white = []
        this.black = []

        this.createPieces()
        this.createBoard()
        this.setBoard()
        this.drawBoard()
        log(this)
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
    setBoard() {
    		log(this.black)
    		log(this.white)
    		log("mapping black")
    		var x = 0;
        this.black.map(piece => {
        		x++
            log(x,piece)
            log(this.board)
            this.board[piece.x][piece.y] = piece
        })
    		log("mapping white")
        this.white.map(piece => {
        		x++
            log(x,piece)
            log(this.board)
            this.board[piece.x][piece.y] = piece
            // this.board[piece.x][piece.y] = piece
        })
    }
    drawBoard() {
        var switcher = false
        this.board.map((row, x) => {
            switcher = !switcher
            row.map((cell, y) => {
                switcher = !switcher
                this.target.appendChild(this.createCell(cell, x, y, switcher ? "dark" : ""))  
            })
        })
    }
    createCell(cell, x, y, color) {
    		var div = document.createElement("div")
    		div.classList.add("cell")
    		div.classList.add(x)
    		div.classList.add(y)
    		color ? div.classList.add(color) : null;
    		

    		div.innerHTML = `${cell?.name || "" }`
    		div.addEventListener('click', function(e){
    			alert("bob")
    		})
        return div 
    }
    createPieces() {

        var p = []

        var pawnStats = { name: "pawn", direction: 1, move: [{ x: 0, y: 1 }], attack: [{ x: 1, y: 1 }, { x: -1, y: 1 }] }
        var rookStats = { name: "rook", attack: [{ x: 1, y: 0, infinite: true }, { x: -1, y: 0, infinite: true }, { x: 0, y: 1, infinite: true }, { x: 0, y: -1, infinite: true }] }
        var knightStats = { name: "knight", attack: [{ x: 2, y: 1 }, { x: -2, y: 1 }, { x: 2, y: -1 }, { x: -2, y: -1 }, { x: 1, y: 2 }, { x: 1, y: -2 }, { x: -1, y: 2 }, { x: -1, y: -2 }] }
        var bishopStats = { name: "bishop", attack: [{ x: 1, y: 1, infinite: true }, { x: -1, y: 1, infinite: true }, { x: 1, y: -1, infinite: true }, { x: -1, y: -1, infinite: true }] }
        var queenStats = { name: "queen", attack: [{ x: 1, y: 1, infinite: true }, { x: -1, y: 1, infinite: true }, { x: 1, y: -1, infinite: true }, { x: -1, y: -1, infinite: true }, { x: 1, y: 0, infinite: true }, { x: -1, y: 0, infinite: true }, { x: 0, y: 1, infinite: true }, { x: 0, y: -1, infinite: true }] }
        var kingStats = { name: "king", attack: [{ x: 1, y: 1 }, { x: -1, y: 1 }, { x: 1, y: -1 }, { x: -1, y: -1 }] }

        this.white.push(new ChessPiece(pawnStats, "white", 1, 0))
        this.white.push(new ChessPiece(pawnStats, "white", 1, 1))
        this.white.push(new ChessPiece(pawnStats, "white", 1, 2))
        this.white.push(new ChessPiece(pawnStats, "white", 1, 3))
        this.white.push(new ChessPiece(pawnStats, "white", 1, 4))
        this.white.push(new ChessPiece(pawnStats, "white", 1, 5))
        this.white.push(new ChessPiece(pawnStats, "white", 1, 6))
        this.white.push(new ChessPiece(pawnStats, "white", 1, 7))
        this.white.push(new ChessPiece(rookStats, "white", 0, 0))
        this.white.push(new ChessPiece(rookStats, "white", 0, 7))
        this.white.push(new ChessPiece(knightStats, "white", 0, 1))
        this.white.push(new ChessPiece(knightStats, "white", 0, 6))
        this.white.push(new ChessPiece(bishopStats, "white", 0, 2))
        this.white.push(new ChessPiece(bishopStats, "white", 0, 5))
        this.white.push(new ChessPiece(queenStats, "white", 0, 3))
        this.white.push(new ChessPiece(kingStats, "white", 0, 4))

        this.black.push(new ChessPiece(pawnStats, "black", 6, 0))
        this.black.push(new ChessPiece(pawnStats, "black", 6, 1))
        this.black.push(new ChessPiece(pawnStats, "black", 6, 2))
        this.black.push(new ChessPiece(pawnStats, "black", 6, 3))
        this.black.push(new ChessPiece(pawnStats, "black", 6, 4))
        this.black.push(new ChessPiece(pawnStats, "black", 6, 5))
        this.black.push(new ChessPiece(pawnStats, "black", 6, 6))
        this.black.push(new ChessPiece(pawnStats, "black", 6, 7))
        this.black.push(new ChessPiece(rookStats, "black", 7, 0))
        this.black.push(new ChessPiece(rookStats, "black", 7, 7))
        this.black.push(new ChessPiece(knightStats, "black", 7, 1))
        this.black.push(new ChessPiece(knightStats, "black", 7, 6))
        this.black.push(new ChessPiece(bishopStats, "black", 7, 2))
        this.black.push(new ChessPiece(bishopStats, "black", 7, 5))
        this.black.push(new ChessPiece(queenStats, "black", 7, 3))
        this.black.push(new ChessPiece(kingStats, "black", 7, 4))

    }

}

class ChessPiece {
    constructor(moves, color, x, y) {
    		this.name = moves.name
        this.moves = moves
        this.move(x, y)
    }
    move(x, y) {
        this.x = x
        this.y = y
    }
    getMoves(board) {
        return this.moves.map(this.checkMove, board).filter(item => item)
    }
    checkMove(item, board) {

    }
}


var target = document.getElementById('target')
var game = new Chess(target)

// function repeat(times, item) {
//     var arr = []
//     for (var x = 0; x < times; x++) {
//         arr.push(item)
//     }
//     return arr
// }