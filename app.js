const log = console.log

class Chess {
    constructor(target, size) {
        this.target = target
        this.white = []
        this.black = []

        this.createPieces()
        this.createEmptyBoard()
        this.setBoard()
        this.drawBoard()
    }
    createEmptyBoard() {
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
    		var x = 0;
        this.black.map(piece => {
        		x++
            this.board[piece.x][piece.y] = piece
        })
        this.white.map(piece => {
        		x++
            this.board[piece.x][piece.y] = piece
        })
    }
    drawBoard(MA) {
        var switcher = false
        this.target.innerHTML = ""
        this.board.map((row, x) => {
            switcher = !switcher
            row.map((cell, y) => {
                switcher = !switcher
                var coloration = switcher ? "dark" : ""
                if(MA?.moves.filter((item)=>{return item.x == x && item.y == y}).length){
                	coloration = "move"
                }else if(MA?.attacks.filter((item)=>{return item.x == x && item.y == y}).length){
                	coloration = "take"
                }
                this.target.appendChild(this.createCell(cell, x, y, coloration))  
            })
        })
    }
    createCell(cell, x, y, dark) {
    		var div = document.createElement("div")
    		div.classList.add("cell")
    		div.dataset.x = x
    		div.dataset.y = y
    		dark ? div.classList.add(dark) : null;
    		cell?.color == "black" ? div.classList.add("black") : null;
    		div.innerHTML = `${cell?.name || "" }`

    		//CLICK LISTENER
    		var that = this
    		var theCell = cell
    		div.addEventListener('click', function(e){
    			
    			var moves = theCell.getMoves(that.board)
    			var attacks = theCell.getAttacks(that.board)
    			log(theCell, moves, attacks)
    			var pieceActions = {}

    			that.drawBoard({moves, attacks})
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
    constructor(stats, color, x, y) {

    		this.name = stats.name
        this.moves = stats.move
        this.color = color
        this.attacks = stats.attack
        this.infinite = stats.infinite
        this.moveTo(x, y)
    }
    moveTo(x, y) {
        this.x = x
        this.y = y
    }
    // getMovesAttacks(board){
    // 	return {moves:this.getMoves(board), attacks:this.getAttacks(board)}
    // }
    getMoves(board) {
    	log("moves", this.moves)
      return this.moves?.filter( (move) => {
      	return (board[move.x] && board[move.x][move.y]) 
      }) || []
    }
    getAttacks(board){
    	log("attacks", this.attacks)
    	return this.attacks?.filter( (move) => {
    		return (board[move.x] && board[move.x][move.y]) 
    	}) || []
    }
    // checkMove(move) {
    // 	if(board[move.x] && board[move.x][move.y]){
    // 		return true
    // 	}
    // }
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