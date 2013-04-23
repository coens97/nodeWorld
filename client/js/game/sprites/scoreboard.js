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
		
		if(!ObIsEmpty(scores)){
			SortTable(3);
		}
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

//sorteer tabbel
function SortTable(sortOn) {
	var table = document.getElementById('tbsb');
	var tbody = table.getElementsByTagName('tbody')[0];
	var rows = tbody.getElementsByTagName('tr');

	var rowArray = new Array();
	for (var i=0, length=rows.length; i<length; i++) {
		rowArray[i] = new Object;
		rowArray[i].oldIndex = i;
		rowArray[i].value = rows[i].getElementsByTagName('td')[sortOn].firstChild.nodeValue;
	}
	rowArray.sort(RowCompareNumbers);

	var newTbody = document.createElement('tbody');
	for (var i=0, length=rowArray.length ; i<length; i++) {
		newTbody.appendChild(rows[rowArray[i].oldIndex].cloneNode(true));
	}

	table.replaceChild(newTbody, tbody);
}
// Compare number
function RowCompareNumbers(b, a) {
	var aVal = parseInt( a.value);
	var bVal = parseInt(b.value);
	return (aVal - bVal);
}

function ObIsEmpty(ob){
   for(var i in ob){ return false;}
  return true;
}