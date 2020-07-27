const log = console.log

var pawnStats = {
    name: "pawn",
    direction: 1,
    move: [{
        x: 1,
        y: 0
    }],
    attack: [{
        x: 1,
        y: 1
    }, {
        x: 1,
        y: -1
    }]
}

var rookStats = {
    name: "rook",
    attack: [{
        x: 1,
        y: 0,
        infinite: true
    }, {
        x: -1,
        y: 0,
        infinite: true
    }, {
        x: 0,
        y: 1,
        infinite: true
    }, {
        x: 0,
        y: -1,
        infinite: true
    }]
}

var knightStats = {
    name: "knight",
    attack: [{
        x: 2,
        y: 1
    }, {
        x: -2,
        y: 1
    }, {
        x: 2,
        y: -1
    }, {
        x: -2,
        y: -1
    }, {
        x: 1,
        y: 2
    }, {
        x: 1,
        y: -2
    }, {
        x: -1,
        y: 2
    }, {
        x: -1,
        y: -2
    }]
}

var bishopStats = {
    name: "bishop",
    attack: [{
        x: 1,
        y: 1,
        infinite: true
    }, {
        x: -1,
        y: 1,
        infinite: true
    }, {
        x: 1,
        y: -1,
        infinite: true
    }, {
        x: -1,
        y: -1,
        infinite: true
    }]
}

var queenStats = {
    name: "queen",
    attack: [{
        x: 1,
        y: 1,
        infinite: true
    }, {
        x: -1,
        y: 1,
        infinite: true
    }, {
        x: 1,
        y: -1,
        infinite: true
    }, {
        x: -1,
        y: -1,
        infinite: true
    }, {
        x: 1,
        y: 0,
        infinite: true
    }, {
        x: -1,
        y: 0,
        infinite: true
    }, {
        x: 0,
        y: 1,
        infinite: true
    }, {
        x: 0,
        y: -1,
        infinite: true
    }]
}

var kingStats = {
    name: "king",
    attack: [{
        x: 1,
        y: 1
    }, {
        x: 0,
        y: 1
    }, {
        x: -1,
        y: 1
    }, {
        x: 1,
        y: 0
    }, {
        x: -1,
        y: 0
    }, {
        x: 1,
        y: -1
    }, {
        x: 0,
        y: -1
    }, {
        x: -1,
        y: -1
    }]
}

class Chess {
    constructor(target, size) {
        this.target = target
        this.white = []
        this.black = []

        this.createEmptyBoard()
        this.createPieces()
        // this.setBoard()
        this.drawBoard()
        this.activePiece = null
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
        })
        this.white.map(piece => {
            x++
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
                if (MA?.moves.filter((item) => { return item.x == x && item.y == y }).length) {
                    coloration = "move"
                } else if (MA?.attacks.filter((item) => { return item.x == x && item.y == y }).length) {
                    coloration = "take"
                }
                this.target.appendChild(this.createCell(cell, x, y, coloration))
            })
        })
    }
    createCell(cell, x, y, coloration) {
        var div = document.createElement("div")
        div.classList.add("cell")
        div.dataset.x = x
        div.dataset.y = y
        coloration ? div.classList.add(coloration) : null;
        cell?.color == "black" ? div.classList.add("black") : null;
        div.innerHTML = `${cell?.name || "" }`

        //CLICK LISTENER
        var that = this
        var thePiece = cell || {}
        var theX = x
        var theY = y
        var col = coloration
        var cel = cell
        div.addEventListener('click', function(e) {
        	log(thePiece)
        	var moves = []
					var attacks = []
        	if(thePiece.getMoves){
            moves = thePiece?.getMoves(that.board,theX, theY) || []
        	}
        	if(thePiece.getAttacks){
            attacks = thePiece?.getAttacks(that.board,theX, theY) || []
        	}
        	if(col == "move" || col == "take"){
        		that.board[theX][theY] = that.activePiece.thePiece
        		that.board[that.activePiece.x][that.activePiece.y] = null
        		that.activePiece = null
        	}else{
		        that.activePiece = {x:theX, y:theY, thePiece: thePiece}
        	}
        	
        	log(that)
    	    log(this.activePiece, thePiece, moves, attacks)
    

          that.drawBoard({ moves, attacks })
        })
        return div
    }
    createPieces(board) {

        var p = []

        this.board[3][4] = new Piece(kingStats, "white",)

        // this.white.push(new ChessPiece(pawnStats, "white", 1, 0, board))
        // this.white.push(new ChessPiece(pawnStats, "white", 1, 1, board))
        // this.white.push(new ChessPiece(pawnStats, "white", 1, 2, board))
        // this.white.push(new ChessPiece(pawnStats, "white", 1, 3, board))
        // this.white.push(new ChessPiece(pawnStats, "white", 1, 4, board))
        // this.white.push(new ChessPiece(pawnStats, "white", 1, 5, board))
        // this.white.push(new ChessPiece(pawnStats, "white", 1, 6, board))
        // this.white.push(new ChessPiece(pawnStats, "white", 1, 7, board))
        // this.white.push(new ChessPiece(rookStats, "white", 0, 0, board))
        // this.white.push(new ChessPiece(rookStats, "white", 0, 7, board))
        // this.white.push(new ChessPiece(knightStats, "white", 0, 1, board))
        // this.white.push(new ChessPiece(knightStats, "white", 0, 6, board))
        // this.white.push(new ChessPiece(bishopStats, "white", 0, 2, board))
        // this.white.push(new ChessPiece(bishopStats, "white", 0, 5, board))
        // this.white.push(new ChessPiece(queenStats, "white", 0, 3, board))
        // this.white.push(new ChessPiece(kingStats, "white", 0, 4, board))

        // this.black.push(new ChessPiece(pawnStats, "black", 6, 0, board))
        // this.black.push(new ChessPiece(pawnStats, "black", 6, 1, board))
        // this.black.push(new ChessPiece(pawnStats, "black", 6, 2, board))
        // this.black.push(new ChessPiece(pawnStats, "black", 6, 3, board))
        // this.black.push(new ChessPiece(pawnStats, "black", 6, 4, board))
        // this.black.push(new ChessPiece(pawnStats, "black", 6, 5, board))
        // this.black.push(new ChessPiece(pawnStats, "black", 6, 6, board))
        // this.black.push(new ChessPiece(pawnStats, "black", 6, 7, board))
        // this.black.push(new ChessPiece(rookStats, "black", 7, 0, board))
        // this.black.push(new ChessPiece(rookStats, "black", 7, 7, board))
        // this.black.push(new ChessPiece(knightStats, "black", 7, 1, board))
        // this.black.push(new ChessPiece(knightStats, "black", 7, 6, board))
        // this.black.push(new ChessPiece(bishopStats, "black", 7, 2, board))
        // this.black.push(new ChessPiece(bishopStats, "black", 7, 5, board))
        // this.black.push(new ChessPiece(queenStats, "black", 7, 3, board))
        // this.black.push(new ChessPiece(kingStats, "black", 7, 4, board))

    }

}

var kingStats = {
    name: "king",
    onTaken:function(){
    	alert('you lose the game')
    	return 'gameOver'
    },
    moves:[],
    attacks: [
	    {x: 1,y: 1}, 
	    {x: 0,y: 1}, 
			{x: -1,y: 1}, 
			{x: 1,y: 0}, 
			{x: -1,y: 0}, 
			{x: 1,y: -1}, 
			{x: 0,y: -1}, 
			{x: -1,y: -1}
		]
}

class Piece {
	constructor(stats){
		this.name = stats.name
		this.moves = stats.moves || []
		this.attacks = stats.attacks || []
		this.onTaken = stats.onTaken
		this.onDestination = stats.onDestination
	}
	getMoves(board,x,y){
		log(this.moves)
		return this.moves
		.map((m)=>{return {x:m.x + x,y:m.y + y}})
		.filter((m)=>{return (m.x > 0 && m.x < board.length && m.y > 0 && m.y < board.length)})
	}
	getAttacks(board,x,y){
		log(this.attacks)
		return this.attacks
		.map((m)=>{return {x:m.x + x,y:m.y + y}})
		.filter((m)=>{return (m.x >= 0 && m.x < board.length && m.y >= 0 && m.y < board.length)})
	}
	onTaken(){

	}
	onDestination(){

	}
}

class ChessPiece {
    constructor(stats, color, x, y, board) {
        log(stats.move)
        this.movePattern = stats.move
        this.attackPattern = stats.attack
        this.name = stats.name
        this.color = color
        this.infinite = stats.infinite
        this.moveTo(x, y, board)
    }
    moveTo(x, y, board) {
        this.x = x
        this.y = y
        this.board = board
    }
    getRelativeMoves(pattern) {
        var possibleMoves = pattern?.map((singlePattern) => {
            return { x: singlePattern.x + this.x, y: singlePattern.y + this.y }
        }).filter((singlePattern) => {
            return true
        })
        return possibleMoves || []
    }
    getMoves(board) {
        return this.getRelativeMoves(this.movePattern)
    }
    getAttacks(board) {
        return this.getRelativeMoves(this.attackPattern)
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