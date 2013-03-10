
var scoreBoard = {
	cont:document.getElementById('score'),
	addPlayer:function(name){
		var row = this.cont.insertRow(this.cont.rows.length);
		row.id = name;

		var cell1 = row.insertCell(0);
		cell1.innerHTML = name;

		var cell2 = row.insertCell(1);
		cell2.innerHTML = "0";

		var cell2 = row.insertCell(2);
		cell2.innerHTML = "0";
	},
	removePlayer:function(name){
		var row = document.getElementById(name);
   		row.parentNode.removeChild(row);
	}
};