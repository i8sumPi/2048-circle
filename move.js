var anyMovement;
document.onkeydown = event=>{
	el("swipe").currentTime = 0.6;
	el("swipe").volume = 0.05;
	el("swipe").play();
	el("success").volume = 0;

	anyMovement = false;
	if(event.key == "ArrowUp"){
		tiles.filter(i=>i.x==0).sort((a,b)=>a.y-b.y).forEach((item, index, all)=>{item.yN=index+2; checkSame(item,index,all,"y",-1);});
		tiles.filter(i=>i.x==1).sort((a,b)=>a.y-b.y).forEach((item, index, all)=>{item.yN=index+1; checkSame(item,index,all,"y",-1);});
		tiles.filter(i=>i.x==2).sort((a,b)=>a.y-b.y).forEach((item, index, all)=>{item.yN=index  ; checkSame(item,index,all,"y",-1);});
		tiles.filter(i=>i.x==3).sort((a,b)=>a.y-b.y).forEach((item, index, all)=>{item.yN=index  ; checkSame(item,index,all,"y",-1);});
		tiles.filter(i=>i.x==4).sort((a,b)=>a.y-b.y).forEach((item, index, all)=>{item.yN=index+1; checkSame(item,index,all,"y",-1);});
		tiles.filter(i=>i.x==5).sort((a,b)=>a.y-b.y).forEach((item, index, all)=>{item.yN=index+2; checkSame(item,index,all,"y",-1);});
	}

	else if(event.key == "ArrowDown"){
		tiles.filter(i=>i.x==0).sort((a,b)=>b.y-a.y).forEach((item, index, all)=>{item.yN=3-index; checkSame(item,index,all,"y",1);});
		tiles.filter(i=>i.x==1).sort((a,b)=>b.y-a.y).forEach((item, index, all)=>{item.yN=4-index; checkSame(item,index,all,"y",1);});
		tiles.filter(i=>i.x==2).sort((a,b)=>b.y-a.y).forEach((item, index, all)=>{item.yN=5-index; checkSame(item,index,all,"y",1);});
		tiles.filter(i=>i.x==3).sort((a,b)=>b.y-a.y).forEach((item, index, all)=>{item.yN=5-index; checkSame(item,index,all,"y",1);});
		tiles.filter(i=>i.x==4).sort((a,b)=>b.y-a.y).forEach((item, index, all)=>{item.yN=4-index; checkSame(item,index,all,"y",1);});
		tiles.filter(i=>i.x==5).sort((a,b)=>b.y-a.y).forEach((item, index, all)=>{item.yN=3-index; checkSame(item,index,all,"y",1);});
	}

	else if(event.key == "ArrowRight"){
		tiles.filter(i=>i.y==0).sort((a,b)=>b.x-a.x).forEach((item, index, all)=>{item.xN=3-index; checkSame(item,index,all,"x",1);});
		tiles.filter(i=>i.y==1).sort((a,b)=>b.x-a.x).forEach((item, index, all)=>{item.xN=4-index; checkSame(item,index,all,"x",1);});
		tiles.filter(i=>i.y==2).sort((a,b)=>b.x-a.x).forEach((item, index, all)=>{item.xN=5-index; checkSame(item,index,all,"x",1);});
		tiles.filter(i=>i.y==3).sort((a,b)=>b.x-a.x).forEach((item, index, all)=>{item.xN=5-index; checkSame(item,index,all,"x",1);});
		tiles.filter(i=>i.y==4).sort((a,b)=>b.x-a.x).forEach((item, index, all)=>{item.xN=4-index; checkSame(item,index,all,"x",1);});
		tiles.filter(i=>i.y==5).sort((a,b)=>b.x-a.x).forEach((item, index, all)=>{item.xN=3-index; checkSame(item,index,all,"x",1);});
	}

	else if(event.key == "ArrowLeft"){
		tiles.filter(i=>i.y==0).sort((a,b)=>a.x-b.x).forEach((item, index, all)=>{item.xN=index+2; checkSame(item,index,all,"x",-1);});
		tiles.filter(i=>i.y==1).sort((a,b)=>a.x-b.x).forEach((item, index, all)=>{item.xN=index+1; checkSame(item,index,all,"x",-1);});
		tiles.filter(i=>i.y==2).sort((a,b)=>a.x-b.x).forEach((item, index, all)=>{item.xN=index  ; checkSame(item,index,all,"x",-1);});
		tiles.filter(i=>i.y==3).sort((a,b)=>a.x-b.x).forEach((item, index, all)=>{item.xN=index  ; checkSame(item,index,all,"x",-1);});
		tiles.filter(i=>i.y==4).sort((a,b)=>a.x-b.x).forEach((item, index, all)=>{item.xN=index+1; checkSame(item,index,all,"x",-1);});
		tiles.filter(i=>i.y==5).sort((a,b)=>a.x-b.x).forEach((item, index, all)=>{item.xN=index+2; checkSame(item,index,all,"x",-1);});
	} else{
		return;
	}

	tiles.forEach(tile=>{
		tile.x += tile.xAdd;
		tile.y += tile.yAdd;
		tile.xAdd = 0;
		tile.yAdd = 0;
	});

	if(anyMovement){
		addNewRandomTile();
		if(Math.random() < 0.1) addNewRandomTile();
	}

	tiles.filter(i=>i.delete).forEach(i=>{
		setTimeout(()=>i.div.remove(), 100);
	});
	tiles.forEach(tile=>{
		tile.div.innerHTML = tile.value;
		if(!tile.div.style.backgroundColor){
			setTimeout(()=>tile.div.style.backgroundColor = getCol(tile), 110);
		}else{
			tile.div.style.backgroundColor = getCol(tile);
		}
		tile.div.style.marginLeft = tile.x*90+10+"px";
		tile.div.style.marginTop = tile.y*90+10+"px";
	});

	tiles = tiles.filter(i=>!i.delete);

	localStorage.setItem("2048-circle",JSON.stringify(tiles.map(i=>{return {
		value: i.value, 
		x: i.x, 
		y: i.y
	}})));
}

function addNewRandomTile(){
	var stop = false;
	var preventInfinite = 0;
	var outOfGrid = ["0,0","1,0","4,0","5,0","0,1","5,1","0,4","5,4","0,5","1,5","4,5","5,5"];

	while(!stop && preventInfinite < 1000){
		preventInfinite ++;

		var newTile = {
			value: 2**Math.floor(Math.random()*1.5+1),
			x: Math.floor(Math.random()*6),
			y: Math.floor(Math.random()*6)
		};
		if(tiles.filter(i=>i.x==newTile.x && i.y==newTile.y).length == 0 && !outOfGrid.includes(newTile.x+","+newTile.y)){
			stop = true;
			tiles.push(makeNewTile(newTile));
		}
	}
}

function checkSame(item, index, all, xOrY, plusOrMinus){
	if(item[xOrY+"N"] != item[xOrY]) anyMovement = true;
	item[xOrY] = item[xOrY+"N"];

	if(index == 0) return;
	var prev = all[index-1];
	if(prev.value == item.value && !prev.delete){
		anyMovement = true
		prev.value *= 2;
		item.delete = true;
		item.x = prev.x;
		item.y = prev.y;
		item.div.style.zIndex = "1";
		el("success").currentTime = 0;
		el("success").volume = Math.max((Math.log2(prev.value)/12)**2, el("success").volume);
		el("success").play();

		if(prev.value == 2048){
			setTimeout(()=>{
				alert("Congratulations, you win! \n(>'-')> <('-'<) ^(' - ')^ <('-'<) (>'-')>(>'-')> <('-'<) ^(' - ')^ <('-'<) (>'-')>\n\nFeel free to continue playing and try to get 4096.")
			}, 100);
		}

		all.forEach((item2, index2)=>{
			if(index2 > index){
				item2[xOrY+"Add"] += plusOrMinus;
			}
		});
	}
}