function resizeRow(index)
{
	var table = document.getElementById("Matrix "+index);
	var curRow = table.rows.length - 3;
	var desRow = document.getElementById("rList"+index).value;
	var curCol = table.rows[1].cells.length;
	for (var i = curRow; i < desRow; i++)
	{
		var row = table.insertRow(i+1);
		for (var j = 0; j < curCol; j++)
		{
			var cell = row.insertCell(j);
			var sample = document.createElement("input");
			sample = document.getElementById("A11").cloneNode(true);
			sample.value = "";
			sample.id = "" + index + (i+1) + (j + 1);
			sample.placeholder = sample.id;
			cell.appendChild(sample);
		}
	}
	
	for (var i = curRow; i > desRow; i--)
	{
		document.getElementById("Matrix "+index).deleteRow(i);
	}
}

function resizeCol(index)
{
	var table = document.getElementById("Matrix "+index);
	var curCol = table.rows[1].cells.length;
	var desCol = document.getElementById("cList"+index).value;
	var curRow = table.rows.length - 3;
	
	for (var j = curCol; j < desCol; j++)
	{
		for (var i = 1; i <= curRow; i++)
		{
			//document.write("loop j="+j + " i=" + i);
			var cell = table.rows[i].insertCell(j);
			var sample = document.createElement("input");
			sample = document.getElementById("A11").cloneNode(true);
			sample.value = "";
			sample.id = "" + index + i + (j + 1);
			sample.placeholder = sample.id;
			cell.appendChild(sample);
		}
	}
	
	for (var j = curCol; j > desCol; j--)
		for (var i = 1; i <= curRow; i++)
			table.rows[i].deleteCell(-1);
}

function result()
{
	for (var i = 1;i<document.getElementById("Matrix A").rows.length-2;i++)
		for (var j = 1; j <= document.getElementById("Matrix A").rows[1].cells.length;j++)
			if (isNaN(document.getElementById("A" + i + j).value) || document.getElementById("A" + i + j).value == "")
			{
				window.alert("Matrix A contains invalid input!");
				return;
			}
	for (var i = 1;i<document.getElementById("Matrix B").rows.length-2;i++)
		for (var j = 1; j <= document.getElementById("Matrix B").rows[1].cells.length;j++)
			if (isNaN(document.getElementById("B" + i + j).value) || document.getElementById("B" + i + j).value == "")
			{
				window.alert("Matrix B contains invalid input!");
				return;
			}
	
	var colCount = document.getElementById("Matrix A").rows[1].cells.length;
	var rowCount = document.getElementById("Matrix B").rows.length-3;
	if (colCount != rowCount)
	{
		window.alert("Number of columns in Matrix A does not equal to number of rows in Matrix B");
		return;
	}
	if (document.getElementById("resultTable") == null)
	{
		resultMatrixCreation();
	}
	else
	{
		console.log("not null");
		document.getElementById("resultTable").remove();
		resultMatrixCreation();
	}
}

function resultMatrixCreation()
{
	var rowCount = document.getElementById("Matrix A").rows.length;
	var colCount = document.getElementById("Matrix B").rows[1].cells.length;
	var cellMain = document.getElementById("result");
	var table = document.createElement("table");
	table.id = "resultTable";
	var titleText = document.createTextNode("Result Matrix")
	var titleCell=document.createElement("td").appendChild(titleText);
	titleCell.id="titleC";
	table.style.backgroundColor="red";
	table.style.textAlign="center";
	table.appendChild(document.createElement("tr").appendChild(titleCell));
	for (var i = 1;i<rowCount-2;i++)
	{
		var row = document.createElement("tr");
		for (var j = 0; j<colCount;j++)
		{
			var cell = document.createElement("td");
			var sample = document.createElement("input");
			sample = document.getElementById("A11").cloneNode(true);
			sample.value = resultValue(i, j+1);
			sample.id = "R" + i + (j + 1);
			cell.appendChild(sample);
			row.appendChild(cell);
		}
		table.appendChild(row);
	}
	
	var buttonA = document.createElement("button");
	var buttonB = document.createElement("button");
	buttonA.onclick="insert('A')";
	buttonB.onclick="insert('B')";
	buttonA.appendChild(document.createTextNode("Insert to A"));
	buttonB.appendChild(document.createTextNode("Insert to B"));
	
	var buttonCellA=document.createElement("td").appendChild(buttonA);
	var buttonCellB=document.createElement("td").appendChild(buttonB);
	table.appendChild(document.createElement("tr").appendChild(buttonCellA));
	table.appendChild(document.createElement("tr").appendChild(buttonCellB));
	
	cellMain.appendChild(table);
}

function resultValue(i, j)
{
	var product = 0;
	for (x = 1; x <= document.getElementById("Matrix A").rows[1].cells.length; x++)
	{	
		var a = document.getElementById("A" + i + x).value;
		var b = document.getElementById("B" + x + j).value;
		product += a * b;
	}
		
	return product;
}