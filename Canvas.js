$(function() {
	$("canvas").height( $(window).height() ); 
	$("canvas").width( $(window).width() ); 
	
	function setBodyClass(){
	var viewPortWidth = $(window).width();

	if (viewPortWidth < 520 && viewPortWidth >= 380) { $("h1").css("font-size","50px").css("line-height","50px");}
	else if( viewPortWidth < 380 ){ $("h1").css("font-size","40px").css("line-height","40px");}
	else{ $("h1").css("font-size","68px").css("line-height","68px"); }
	};

	$(window).resize(function() { setBodyClass(); });

function dot(ctx, x, y) {
    ctx.fillStyle = "gray";
    ctx.fillRect(x, y, 2, 2);
}

function stem(ctx, x, y) {
    ctx.fillStyle = "gray";
    ctx.fillRect(x, y, 1, 10);
}

var ctx = document.getElementById('canvas').getContext('2d');
ctx.globalAlpha = 0.1;

function position(i, y, x, note) {
    this.I = i;
    this.Y = y;
    this.X = x;
    this.NOTE = note;
}

var positions = [];


for (var h = 0; h < 21; h++) {
    for (var i = 3; i < 100; i += 2) {
        var note = Math.floor(Math.random() * 8);
        if (note < 6) {
            positions.push(new position(i * 14, note * 4.5 + h * 54,  i * 14, note));
        }
    }
}


function draw() {

	ctx.clearRect(0,0,canvas.width,canvas.height);
    for ( var c = 0; c < positions.length; c++) {

//	console.log("c: " + c + "position.x: " + positions[c].X + "note: " + positions[c].NOTE);

        dot(ctx, positions[c].X, positions[c].Y);

        if ( positions[c].NOTE > 2) {
            stem(ctx, positions[c].X + 2, positions[c].Y - 9);
        } else {
            stem(ctx, positions[c].X - 1, positions[c].Y);
        }
	positions[c].X --;
	if( positions[c].X < 3 )
	{ positions[c].X = canvas.width; }
    }
}

draw();

setInterval(function() { draw(); if(ctx.globalAlpha < 1){ ctx.globalAlpha += 0.01; } }, 80);

});
