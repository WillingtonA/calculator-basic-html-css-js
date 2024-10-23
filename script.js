
function dgebiSetter(obj) {
	/*
	console.log(obj);
	console.log(Object.keys(obj));
	console.log(Object.values(obj));
	console.log("--" + Object.keys(obj).length);
	*/
	for(let key in obj) {
		document.getElementById(key).value = obj[key];
	}
}

function dgebiGetter(keys) {
	let obj = new Object();
	keys.forEach(
		function(key){
			obj[key] = document.getElementById(key).value;
		}
	);
	return obj;
}

function number(num) {
	let numUno = document.getElementById("numUno").value;
	if(numUno == "0") { //Primera vez numero
		dgebiSetter({'numUno':num, 'pantalla':new Intl.NumberFormat('de-DE').format(num)});
	} else {
		dgebiSetter({"numUno":numUno + num, "pantalla":new Intl.NumberFormat('de-DE').format(numUno + num)});
	}
}

function operation(operator) {
	let data = dgebiGetter(["numUno", "numDos", "operador"]);
	if(data.numDos == "0") { //Primera vez signo
		dgebiSetter({"numDos":data.numUno, "numUno":"0"});
	} else {
		let res = respuesta(data.operador, data.numUno, data.numDos);
		dgebiSetter({"pantalla":new Intl.NumberFormat('de-DE').format(res), "numUno":"0", "numDos":res});
	}
	dgebiSetter({"operador":operator, "dot":""});
}

function equal() {
	let data = dgebiGetter(["numUno", "numDos", "operador"]);
	if(data.operador != "") {
		let res = respuesta(data.operador, data.numUno, data.numDos);
		dgebiSetter({"pantalla":new Intl.NumberFormat('de-DE').format(res), "numUno":res, "numDos":"0", "operador":""});
	}
}

function dot() {
	let data = dgebiGetter(["numUno", "dot"]);
	document.getElementById("dot").value = ".";

	if(data.numUno == "0") {
		number( "0.");
	} else {
		if(data.dot != ".") {
			number(".");
		}
	}
}

function ce() {
	let numberOne = document.getElementById("numUno").value;
	let numberShort = "";

	for(let i=0; i<numberOne.length-1; i++) {
		numberShort += numberOne.charAt(i);
	}

	document.getElementById("numUno").value = "0";
	number(numberShort);
}

function clean() {
	dgebiSetter({"pantalla":"0", "numUno":"0", "numDos":"0", "operador":"", "dot":""});
}

function respuesta(operator, numUno, numDos) {
	if(operator == "+") {
		return parseFloat(numUno) + parseFloat(numDos);
	}

	if(operator == "-") {
		return parseFloat(numDos) - parseFloat(numUno);
	}

	if(operator == "*") {
		return parseFloat(numDos) * parseFloat(numUno);
	}

	if(operator == "/") {
		return parseFloat(numDos) / parseFloat(numUno);
	}
}
