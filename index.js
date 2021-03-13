// player jump animation

$(document).on("keypress", function (event) {
    jump();
    if (lose) {
        restart();
    }
});

$(document).on("click", function (event) {
    jump();
    if (lose) {
        restart();
    }
});

function jump() {
    if (!$("#player").hasClass("jump")) {
        $("#player").addClass("jump");
        setTimeout(function () {
            $("#player").removeClass("jump");
        }, 700);
    }
}

// checks whether blocks collide

let lose = true;
let counter = 0;
let score = 0;
let highScore = 0;

var checkCollision = setInterval(function () {

    // height and width of game border
    let gameWidth = $("#game-border").innerWidth();
    let gameHeight = $("#game-border").innerHeight();

    // height and width of block
    let blockWidth = $("#block").outerWidth();
    let blockHeight = $("#block").outerHeight();

    // player height and width
    let playerWidth = $("#player").outerWidth();
    let playerHeight = $("#player").outerHeight();

    let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));

    if (blockLeft <= playerWidth && blockLeft >= -(blockWidth) && playerTop >= (gameHeight - playerHeight - blockHeight)) {
        $("#block").css("animation", "none");
        $("#block").css("display", "none");
        $("#player").html("<img src='explosion.png' class='sprite'>");
        $("h2").text("YOU LOSE");
        lose = true;
        checkHighScore();
    }

    if (!lose) {
        counter++;
        console.log(counter);
        if (counter >= 100) {
            score++;
            checkHighScore();
            $(".score-count").text(score);
            $(".highscore-count").text(highScore);
            counter = 0;
        }
    }
}, 10);

function restart() {
    $("#block").css("animation", "blockMove 1s infinite linear");
    $("#block").css("display", "inline-block");
    $("#player").html("<img src='dinosaur.png' class='sprite'>");
    $("h2").text("");
    score = 0;
    counter = 0;
    $(".score-count").text("0");
    lose = false;
}

function checkHighScore() {
    if (score > highScore)
        highScore = score;
}