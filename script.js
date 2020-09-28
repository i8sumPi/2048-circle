var el = id=>document.getElementById(id);
var tilesDiv = el("tiles");
var tiles = JSON.parse(localStorage.getItem("2048-circle"));

if (!tiles) tiles = [];

tiles.forEach(tile=>makeNewTile(tile));

if(tiles.length == 0) newGame();

function makeNewTile(tile){
	var newTile = document.createElement("div");
	newTile.innerHTML = tile.value;
	newTile.className = "tile";

	newTile.style.marginLeft = tile.x*90+10+"px";
	newTile.style.marginTop = tile.y*90+10+"px";

	setTimeout(()=>tilesDiv.appendChild(newTile), 100);
	setTimeout(()=>newTile.style.backgroundColor = getCol(tile),110);

	tile.div = newTile;
	tile.xAdd = 0;
	tile.yAdd = 0;
	return tile;
}

function getCol(tile){
	var colNum = Math.log2(tile.value)-1;
	if(tile.value >= 32) colNum += 2;
	if(tile.value >= 4096) return "hsl("+((colNum+1)*50)+", 100%, 15%)";
	return "hsl("+(colNum*27)+", 100%, 40%)";
}

function randomKey(){
	var rand = Math.random();
	if(rand < 0.25) document.onkeydown({key:"ArrowUp"});
	else if(rand < 0.5) document.onkeydown({key:"ArrowRight"});
	else if(rand < 0.75) document.onkeydown({key:"ArrowLeft"});
	else if(rand < 1) document.onkeydown({key:"ArrowDown"});
}

function allFour(){
	setTimeout(document.onkeydown,50,{key:"ArrowUp"});
	setTimeout(document.onkeydown,100,{key:"ArrowRight"});
	setTimeout(document.onkeydown,150,{key:"ArrowDown"});
	setTimeout(document.onkeydown,250,{key:"ArrowLeft"});
}

function newGame(){
	tiles.forEach(i=>i.div.remove());
	tiles = [];
	addNewRandomTile();
	localStorage.setItem("2048-circle",JSON.stringify(tiles.map(i=>{return {
		value: i.value, 
		x: i.x, 
		y: i.y
	}})));
}