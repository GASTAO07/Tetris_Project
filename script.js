const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20, 20);

// Matrice Tetromino T
const matrix = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
];

function playerDrop() {
    player.pos.y++;
    dropCounter = 0;
}

function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawMatrix(player.matrix, player.pos);
}

// Dessine la matrice tetromino, en dessinant un carré à la position (x,y), taille (1,1)
// SI un 1 est present dans la matrice.
function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = 'red';
                context.fillRect(x + offset.x, y + offset.y, 1, 1); //offset règle position
            }
        });
    });
}

let dropCounter = 0;
let dropInterval = 1000; //milliseconds = 1sec
let lastTime = 0;

function update(time = 0) {
    // Calcul l'écart de temps de l'exec d'update(), si >1sec, alors tetromino drop et remise à 0 de l'écart
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
    }

    draw();
    requestAnimationFrame(update);
}

const player = {
    pos: { x: 5, y: 5 },
    matrix: matrix,
}

// à la pression d'une touche, déclenche évènement qui la détecte.
document.addEventListener('keydown', event => {
    //console.log(event); -> permet de voir l'event, dont le keycode de la touche pressée.
    if (event.keyCode == 37) {
        player.pos.x--;
    } else if (event.keyCode == 39) {
        player.pos.x++;
    } else if (event.keyCode == 40) {
        playerDrop();
    }
});

update();