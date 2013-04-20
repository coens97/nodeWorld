
var scoreBoard = {
	cont:document.getElementById('score'),
	addPlayer:function(name){
		var row = this.cont.insertRow(this.cont.rows.length);
		row.id = "row"+name;

		var cell1 = row.insertCell(0);
		cell1.innerHTML = name;

		var cell2 = row.insertCell(1);
		cell2.innerHTML = "0";

		var cell2 = row.insertCell(2);
		cell2.innerHTML = "0";

		var cell3 = row.insertCell(2);
		cell3.innerHTML = "0";
	},
	removePlayer:function(name){
		var row = document.getElementById("row"+name);
   		row.parentNode.removeChild(row);
	},
	updates:function(scores){//when get new scores
		for (var name in scores) {
			this.update(name,scores[name]);
		};
	},
	update:function(name,score){
		var row = document.getElementById("row"+name),
			cells = row.getElementsByTagName('td');
		cells[1].innerHTML = score[0];
		cells[2].innerHTML = score[1];
		//k/d
		if(score[0]==0){
			cells[3].innerHTML = "0";
		}else if(score[1]==0){
			cells[3].innerHTML = score[0];
		}else{
			cells[3].innerHTML = Math.round(score[0]/score[1]*100)/100;
		}
	}
};