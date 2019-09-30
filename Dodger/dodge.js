var player;
var projs = []; // track on-screen Squares

var difficulty; // difficulty of the projs

function setup() {

    createCanvas(700, 600);

    difficulty = 2;

    /* initialize player */
    player = new Square(width / 2, height / 2,
        30, color("pink"), null, difficulty * 0.8);

    textAlign(CENTER);
    textSize(40);
}

function draw() {

    background('black');

    handleprojs();
    handlePlayer();
    handleKeys();

    attemptNewProjectile(frameCount);

    drawScore();
}

//put new projectiles into projs array
function attemptNewProjectile(frame) {

    if (frame % 30 === 0) {
        // every 0.5 seconds

        if (random(difficulty) > 1.25) {
            // based upon difficulty

            projs.push(generateSquare());
        }

        // increase difficulty
        difficulty += 0.05;
    }
}


function handleKeys() {

    // player is 80% slower than projs
    var speed = difficulty * 0.8;

    if (keyIsDown(UP_ARROW))
        player.move(0, -speed);

    if (keyIsDown(DOWN_ARROW))
        player.move(0, speed);

    if (keyIsDown(LEFT_ARROW))
        player.move(-speed, 0);

    if (keyIsDown(RIGHT_ARROW))
        player.move(speed, 0);

}


function drawScore() {

    noStroke();
    text(frameCount, width / 2, 60);
}

//collision
function handleprojs() {

    for (var i = projs.length - 1; i >= 0; i--) {

        /* update & draw */
        projs[i].update(false); // false = not-the-player
        projs[i].draw();

        if (projs[i].collidesWith(player))
            endGame();

        if (projs[i].isOffscreen())
            projs.splice(i, 1);

    }
}


function handlePlayer() {


    player.update(true);
    player.draw();

   //end game is off screen
    if (player.isOffscreen()) {
        endGame();
    }
}


function endGame() {

    noLoop();
    textSize(70);
    fill(255);
    noStroke();
    text("Game Over!", width / 2, height / 2);
    textSize(40);
}

//this is where I will do the work to create squares that do certain things
function generateSquare() {

    /* create square */
    var plane = (random() > 0.5);
    // true = randomize x-axis & keep y-axis constant
    // false = randomize y-axis & keep x-axis constant

    /* only allow squares to spawn at edges */
    var x = (plane) ? random(width) : ((random() > 0.5) ? 0 : width);
    var y = (plane) ? ((random() > 0.5) ? 0 : height) : random(height);

    return new Square(x, y, random(35), randomColor(), player.position, difficulty);
    
}


function randomColor() {
    return color(random(255), random(255), random(255));
}