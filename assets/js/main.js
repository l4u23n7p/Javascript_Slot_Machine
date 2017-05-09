	slotitem = new Array('0','1','2','3');
	var credit =20;


	$("#chip").html(credit);


	function start () {
		counter=0;
		if (credit>=0) {
			$('#control').keydown(function(event) {

				if (event.keyCode === 32 || event.keyCode === 13) 
					event.preventDefault();
				return false;

			});
			$("#control").html("Jouer");
			credit--;
			run();
			pauseLose();
			playSpin();
		}
		


		if (credit == -1) {

			$("#control").html("Recommencer");
			Materialize.toast('Nombre d\'essai épuisé', 5000, 'blue');
			restart();
		}
		$("#chip").html(credit);
		$("#control").addClass(" disabled ");
	}

	function run() {
		turn1=4+Math.floor((Math.random() * 4));
		for (a=0;a<turn1;a++)
		{
			$(".slot1").attr("src","assets/images/"+slotitem[a % 3]+".png");
		}
		turn2=4+Math.floor((Math.random() * 4));
		for (b=0;b<turn2;b++)
		{
			$(".slot2").attr("src","assets/images/"+slotitem[b % 3]+".png");
		}
		turn3=4+Math.floor((Math.random() * 4));
		for (c=0;c<turn3;c++)
		{
			$(".slot3").attr("src","assets/images/"+slotitem[c % 3]+".png");
		}
		turn4=4+Math.floor((Math.random() * 4));
		for (d=0;d<turn4;d++)
		{
			$(".slot4").attr("src","assets/images/"+slotitem[d % 3]+".png");
		}
		counter++;

		if (counter<80) {
			setTimeout("run(counter);",100);
		} else {
			checkmatch();
		}


	}
	function checkmatch()	{ 

		if (($(".slot1").attr("src") == $(".slot2").attr("src")) && ($(".slot1").attr("src") == $(".slot3").attr("src")) && ($(".slot1").attr("src") == $(".slot4").attr("src"))) {
			Materialize.toast('Bravo vous avez gagné', 5000, 'green');
			pauseSpin();
			playWin();
			winner();
			$("#chip").html(credit);
		}

		else {
			Materialize.toast('Dommage. Réessayez', 5000, 'red');
			pauseSpin();
			playLose();
			if (credit == 0) {

				$("#control").html("Recommencer");
				Materialize.toast('Nombre d\'essai épuisé', 5000, 'blue');
				restart();
				$("#chip").html(credit);
			}
		}
		$("#control").removeClass(" disabled ");
	}

	function restart() {
		$("#control").removeClass(" disabled ");
		Materialize.toast('Le jeu recommence', 5000, 'blue');
		credit = 20;
	}
	function winner() {
		$("#control").removeClass(" disabled ");
		Materialize.toast('Vous gagnez 5 crédits', 5000, 'blue');
		credit +=5;
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
	