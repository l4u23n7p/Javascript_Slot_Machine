	slotitem = new Array('0','1','2','3');
	var credit =20;


	$("#chip").html(credit);

	$("#control").click( function () {
        if ($("#control").html() == "Jouer") {
            start();
        } else {
            restart();
        }

    });


	function start () {
		counter=0;
		if (credit>0) {
			$('#control').keydown(function(event) {

				if (event.keyCode === 32 || event.keyCode === 13) 
					event.preventDefault();
				return false;

			});
			$("#control").html("Jouer");
			run();
            credit--;
            pauseLose();
			playSpin();
		}

        $("#chip").html(credit);


        if (credit == -1) {

            $("#control").html("Recommencer");
            Materialize.toast('Nombre d\'essai épuisé', 5000, 'blue');
        }
		$("#control").addClass(" disabled ");
	}

	function run() {
		randomSlot(".slot1");
		randomSlot(".slot2");
		randomSlot(".slot3");
		randomSlot(".slot4");
		counter++;
		if (counter<40) {
			setTimeout("run();",100);
		} else {
			checkMatch();
		}

	}

	function randomSlot(slot) {
        turn=4+Math.floor((Math.random() * 4));
        for (a=0;a<turn;a++)
        {
            $(slot).attr("src","assets/images/"+slotitem[a % 3]+".png");
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
		};
        return allCards;
	}

	function calcCredit(mise, baseCredit) {
		return Math.pow((baseCredit), 2) * (mise-1) + baseCredit;
    }

    function load() {
		$("#all").html(calcCredit($('input[name="bet"]').val(), 5));
		$("#doublePair").html(calcCredit($('input[name="bet"]').val(), 3));
		$("#onePair").html(calcCredit($('input[name="bet"]').val(), 1));

    }

	function checkMatch()	{

		var cards = countCards();

		if (cards.trefle == 4 || cards.carreau == 4 || cards.pique == 4 || cards.coeur == 4) {
			Materialize.toast('Bravo vous avez gagné', 5000, 'green');
			pauseSpin();
			playWin();
			winner(calcCredit($('input[name="bet"]').val(), 5));
			$("#chip").html(credit);
		}
		else if ((cards.trefle == 2 && cards.carreau == 2) || (cards.trefle == 2 && cards.coeur == 2) || (cards.trefle == 2 && cards.pique == 2) || (cards.carreau == 2 && cards.coeur == 2) || (cards.carreau == 2 && cards.pique == 2) || (cards.coeur ==  2 && cards.pique == 2)) {
            Materialize.toast('Bravo vous avez gagné', 5000, 'green');
            pauseSpin();
            playWin();
            winner(calcCredit($('input[name="bet"]').val(),3));
            $("#chip").html(credit);
        }
		else if (cards.trefle == 2 || cards.carreau == 2 || cards.pique == 2 || cards.coeur == 2) {
            Materialize.toast('Bravo vous avez gagné', 5000, 'green');
            pauseSpin();
            playWin();
            winner(calcCredit($('input[name="bet"]').val(),1));
            $("#chip").html(credit);
        }

		else {
			Materialize.toast('Dommage. Réessayez', 5000, 'red');
			pauseSpin();
			playLose();
			if (credit == 0) {

				$("#control").html("Recommencer");
				Materialize.toast('Nombre d\'essai épuisé', 5000, 'blue');
			}
		}
		$("#control").removeClass(" disabled ");
	}

	function restart() {
		$("#control").removeClass(" disabled ");
		Materialize.toast('Le jeu recommence', 5000, 'blue');
		$("#control").html("Jouer");
		credit = 20;
        $("#chip").html(credit);
	}

    function winner(value) {
        $("#control").removeClass(" disabled ");
        Materialize.toast('Vous gagnez '+value+' crédits', 5000, 'blue');
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
	