// Variables.
var bird;
var pipes = [];
var score = 0;
var topscore = 0;
var lastscore = 0;
var hit = false;
var play = true;
var run = 0;

function setup() {
    createCanvas(600, 800);

    button = createButton('Play Again');
    button.position(265, 300);
    button.mousePressed(reset);
    button.hide();

    bird = new Bird();
}

function draw() {
    // Background
    background(98, 195, 203);
    stroke(1);

    // Aici apar obstacolele & verific daca face contact cu pasarea.
    for (var i = pipes.length - 1; i >= 0; i--) {
        pipes[i].show();

        if (play) {
            pipes[i].update();
        }

        if (pipes[i].hits(bird)) {
            hit = true;
            play = false;
        }

        if (pipes[i].offscreen()) {
            pipes.splice(i, 1);
        }
    }

    // Pasarea si functionaliatea de a "zbura".
    if (play) {
        bird.update();
    }
    bird.show();

    // Adaug noi obstacole/tevi pe parcursul jocul.
    if (run % 75 == 0) {
        pipes.push(new Pipe());
    }

    // Cat timp jocul merge si nu ating nici un obstacol, scorul creste.
    if (run % 75 == 35 && run > 35 && (!hit)) {
        score = score + 20;
    }

    // Adaug Highscore-u.
    if (score > topscore) {
        topscore = score;
    }

    // Scoreboard
    fill(238, 238, 238, 200);
    rect(440, 17, 140, 50, 8);

    rect(250, 17, 100, 50, 8); // Live Score Rectangle

    noStroke();
    textSize(48);
    textAlign(CENTER);
    fill(0);
    text(score, 300, 60);
    textSize(16);
    textAlign(LEFT);
    text("Last Score:", 450, 40);
    text("Highscore:", 450, 55);
    textAlign(RIGHT);
    text(lastscore, 570, 40);
    text(topscore, 570, 55);

    if (play) {
        run++;
    } else {
        button.show();
    }
    tutorial();
}

// Butonu de reset.
function reset() {
    if (score > 0) {
        lastscore = score;
    }
    score = 0;
    pipes = [];
    bird = new Bird();
    run = 0;
    button.hide();
    hit = false;
    play = true;
}

function keyPressed() {
    // Press any key on keyboard to play.
    if (keyIsPressed == true) {
        bird.up();
    }
    // Press any key to play again.
    if (hit == true && keyIsPressed == true) {
        reset();
    }
}

// Press mouse to play.
function mousePressed() {
    bird.up();
}

function tutorial() {
    textSize(30);
    textAlign(CENTER);
    if (frameCount < 150) {
        text("Press any key on keyboard to play.", width / 2, height / 2 - 40);
    }
    if (frameCount >= 100 && frameCount < 150) {
        text("Or just use the mouse.", width / 2, height / 2);
    }
    textSize(80);
    if (frameCount >= 165 && frameCount < 250) {
        text("Have fun!", width / 2, height / 2 + 20);
    }
}