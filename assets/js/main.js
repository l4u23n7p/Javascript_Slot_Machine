slotitem = new Array('0', '1', '2', '3');
var credit = 20;
var bet = $('input[name="bet"]');
var ctrl = $("#control");
allScore = sessionStorage;
allScore.clear();
bestScore = localStorage;
var tabScore = new Array(allScore.length);
var tabClassement = new Array(bestScore.length);
var num = 0;
var highScore = 0;

$("#chip").html(credit);

ctrl.click(function () {
    if (ctrl.html() == "Jouer") {
        if (parseInt($("#chip").html()) >= parseInt(bet.val())) {
            start();
        }
        else {
            Materialize.toast('Crédit Insuffisant !', 5000, 'red');
            ctrl.addClass("disabled");
        }
    } else {
        restart();
    }

});

bet.keyup(function () {
    const regex = /\d/g;
    if (regex.exec(bet.val()) != null) {
        load();
        if ($("#chip").html() >= bet.val()) {
            ctrl.removeClass("disabled");
        }
    }
});

$("#save").click(function () {
    $("#saveScore").modal();
    $("#saveScore").modal("open");
});

$("#btnScore").click(function () {
    $("#value").html("");
    for (key in allScore) {
        tabScore[JSON.parse(allScore.getItem(key)).coup] = allScore[key];
    }
    for (i in tabScore) {
        $("#value").append("<tr><td>" + (JSON.parse(tabScore[i]).coup + 1) + "</td><td>" + JSON.parse(tabScore[i]).score + "</td></tr>");
    }
});

$("#btnClassement").click(function () {
    $('#value2').html('');
    tri();
    for (key in tabClassement) {
        $("#value2").append("<tr><td>" + (parseInt(key) + 1) + "</td><td>" + JSON.parse(tabClassement[key]).name + "</td><td>" + JSON.parse(tabClassement[key]).score + "</td></tr>");

    }
});

$("#ok").click(function () {
    if (bestScore.length == 5) {
        bestScore.setItem(4, JSON.stringify({name: $('input[name="name"]').val(), score: highScore}))
    }
    else {
        bestScore.setItem(bestScore.length, JSON.stringify({name: $('input[name="name"]').val(), score: highScore}))
    }
    $("#saveScore").modal("close");
    $("#save").addClass('disabled');
});

function start() {
    counter = 0;
    if (credit > 0) {
        $('#control').keydown(function (event) {

            if (event.keyCode === 32 || event.keyCode === 13)
                event.preventDefault();
            return false;

        });
        ctrl.html("Jouer");
        run();
        credit -= bet.val();
        pauseLose();
        pauseWin()
        playSpin();
    }

    $("#chip").html(credit);


    if (credit == -1) {

        ctrl.html("Recommencer");
        $('#save').show();
        Materialize.toast('Crédit épuisé', 5000, 'blue');
    }
    ctrl.addClass(" disabled ");
}

function isBestScore() {
    if (credit > highScore) {
        $("#highScore").html(credit);
        highScore = credit;
    }
}

function tri() {
    for (key in bestScore) {
        tabClassement[key] = bestScore[key];
    }
    console.log(tabClassement);
    for (var ind01 = 0; ind01 < tabClassement.length - 1; ind01++) {
        var ind02 = ind01 + 1;
        for (ind02; ind02 < tabClassement.length; ind02++) {
            while (JSON.parse(tabClassement[ind01]).score > JSON.parse(tabClassement[ind02]).score) {
                temp = tabClassement[ind01];
                tabClassement[ind01] = tabClassement[ind02];
                tabClassement[ind02] = temp;
            }
        }
    }
    tabClassement.reverse();
    bestScore.clear();
    for (val in tabClassement) {
        bestScore.setItem(val, tabClassement[val]);
    }
    console.log(tabClassement);
}

function save(score) {
    if (allScore.getItem(num) != null) {
        num++
    }
    allScore.setItem(num, JSON.stringify({coup: num, score: score}));
}

function run() {
    randomSlot(".slot1");
    randomSlot(".slot2");
    randomSlot(".slot3");
    randomSlot(".slot4");
    counter++;
    if (counter < 40) {
        setTimeout("run();", 100);
    } else {
        checkMatch();
        isBestScore();
    }

}

function randomSlot(slot) {
    turn = 4 + Math.floor((Math.random() * 4));
    for (a = 0; a < turn; a++) {
        $(slot).attr("src", "assets/images/" + slotitem[a % 3] + ".png");
    }
}

function checkCard(slot) {

    var src = $(slot).attr("src");

    var cards = {pique: 0, carreau: 0, trefle: 0, coeur: 0};

    switch (src) {
        case "assets/images/0.png":
            cards.pique += 1;
            break;
        case "assets/images/1.png":
            cards.carreau += 1;
            break;
        case "assets/images/2.png":
            cards.trefle += 1;
            break;
        case "assets/images/3.png":
            cards.coeur += 1;
            break;
        default:
            break;
    }
    return cards;
}

function countCards() {
    var allCards = {pique: 0, carreau: 0, trefle: 0, coeur: 0};
    for (var key in allCards) {
        allCards[key] = checkCard(".slot1")[key] + checkCard(".slot2")[key] + checkCard(".slot3")[key] + checkCard(".slot4")[key];
    }
    ;
    return allCards;
}

function calcCredit(mise, baseCredit) {
    return Math.pow((baseCredit), 2) * (mise - 1) + baseCredit;
}

function load() {
    $("#all").html(calcCredit(bet.val(), 5));
    $("#doublePair").html(calcCredit(bet.val(), 3));
    $("#onePair").html(calcCredit(bet.val(), 1));
}

function checkMatch() {

    var cards = countCards();

    if (cards.trefle == 4 || cards.carreau == 4 || cards.pique == 4 || cards.coeur == 4) {
        Materialize.toast('Bravo vous avez gagné', 5000, 'green');
        pauseSpin();
        playWin();
        winner(calcCredit(bet.val(), 5));
        save(calcCredit(bet.val(), 5));
        $("#chip").html(credit);
    }
    else if ((cards.trefle == 2 && cards.carreau == 2) || (cards.trefle == 2 && cards.coeur == 2) || (cards.trefle == 2 && cards.pique == 2) || (cards.carreau == 2 && cards.coeur == 2) || (cards.carreau == 2 && cards.pique == 2) || (cards.coeur == 2 && cards.pique == 2)) {
        Materialize.toast('Bravo vous avez gagné', 5000, 'green');
        pauseSpin();
        playWin();
        winner(calcCredit(bet.val(), 3));
        save(calcCredit(bet.val(), 3));
        $("#chip").html(credit);
    }
    else {
        Materialize.toast('Dommage. Réessayez', 5000, 'red');
        save(0);
        pauseSpin();
        playLose();
        if (credit == 0) {

            ctrl.html("Recommencer");
            tri()
            if ((highScore > JSON.parse(tabClassement[tabClassement.length - 1]).score) || tabClassement.length < 5) {
                $("#save").show();
            }
            Materialize.toast('Crédit épuisé', 5000, 'blue');
        }
    }
    ctrl.removeClass(" disabled ");
}

function restart() {
    ctrl.removeClass(" disabled ");
    allScore.clear();
    tabScore.length = 0;
    $("#save").removeClass('disabled')
    Materialize.toast('Le jeu recommence', 5000, 'blue');
    ctrl.html("Jouer");
    credit = 20;
    highScore = 0;
    $("#highScore").html(highScore);
    $("#chip").html(credit);
    $("#save").hide();
}

function winner(value) {
    ctrl.removeClass(" disabled ");
    Materialize.toast('Vous gagnez ' + value + ' crédits', 5000, 'blue');
    credit += value;
}

var spin = document.getElementById("spin");
var lose = document.getElementById("lose");
var win = document.getElementById("win");

function playSpin() {
    spin.play();
}

function pauseSpin() {
    spin.pause();
    spin.currentTime = 0;
}

function playLose() {
    lose.play();
}

function pauseLose() {
    lose.pause();
    lose.currentTime = 0;
}

function playWin() {
    win.play();
}

function pauseWin() {
    win.pause();
    win.currentTime = 0;
}

var year = (new Date()).getFullYear();
$("#copyright").html(year);
	