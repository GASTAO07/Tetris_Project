class Model {
    constructor() {
        this.score = 0;

        this.T_SHAPE = [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0]
        ];
        this.L_SHAPE = [
            [0, 0, 1],
            [1, 1, 1],
            [0, 0, 0]
        ];
        this.PIECES = [this.T_SHAPE, this.L_SHAPE];
        this.grid = Array(20).fill(Array(10).fill(0));
        Object.freeze(this.T_SHAPE);
        Object.freeze(this.L_SHAPE);
        Object.freeze(this.PIECES);
        Object.freeze(this.grid);
    }

    movePiece(direction) {
        // Get the current piece coordinates
        let currentPiece = this.getCurrentPiece();
        let x = currentPiece.x;
        let y = currentPiece.y;

        // check if the move is possible before applying it
        if (this.canMove(direction, x, y)) {
            // clear the current piece from the grid
            this.clearPiece(currentPiece);
            // update the coordinates
            if (direction === 'left') {
                currentPiece.x -= 1;
            } else if (direction === 'right') {
                currentPiece.x += 1;
            } else if (direction === 'down') {
                currentPiece.y += 1;
            }
            // place the piece on the new coordinates
            this.placePiece(currentPiece);
        } else if (direction === 'down') {
            this.lockPiece(currentPiece);
        }
    }

    rotatePiece() {
        // Get the current piece coordinates
        let currentPiece = this.getCurrentPiece();
        let x = currentPiece.x;
        let y = currentPiece.y;

        // Clear the current piece from the grid
        this.clearPiece(currentPiece);
        // Rotate the piece
        currentPiece.shape = this.rotateShape(currentPiece.shape);
        // Check if the new rotation is possible
        if (this.canPlace(currentPiece, x, y)) {
            // Place the piece on the grid
            this.placePiece(currentPiece);
        } else {
            // If the rotation is not possible, rotate back and place the piece again
            currentPiece.shape = this.rotateShape(currentPiece.shape, false);
            this.placePiece(currentPiece);
        }
    }

    rotateShape(shape, clockwise = true) {
        // Transpose the shape
        for (let i = 0; i < shape.length; i++) {
            for (let j = i; j < shape[0].length; j++) {
                [shape[i][j], shape[j][i]] = [shape[j][i], shape[i][j]];
            }
        }
        // Reverse the rows to rotate the shape
        if (clockwise) {
            shape.forEach(row => row.reverse());
        } else {
            shape.reverse();
        }
        return shape;
    }


    checkCompletedLines() {
        let completedLines = 0;
        for (let y = 0; y < this.grid.length; y++) {
            let filledCells = 0;
            for (let x = 0; x < this.grid[y].length; x++) {
                if (this.grid[y][x] === 1) {
                    filledCells++;
                }
            }
            // Check if the line is complete
            if (filledCells === this.grid[y].length) {
                completedLines++;
                // Remove the line
                this.grid.splice(y, 1);
                // Add a new empty line at the top
                this.grid.unshift(Array(10).fill(0));
            }
        }
        // Update the score
        if (completedLines > 0) {
            this.updateScore(completedLines);
        }
    }


    updateScore(lines) {
        switch (lines) {
            case 1:
                this.score += 100;
                break;
            case 2:
                this.score += 300;
                break;
            case 3:
                this.score += 500;
                break;
            case 4:
                this.score += 800;
                break;
            default:
                break;
        }
    }

    // updateScore(lines) {
    //     this.score += lines*100;
    //  }
     
};