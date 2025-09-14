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
		let res = response(data.operador, data.numUno, data.numDos);
		dgebiSetter({"pantalla":new Intl.NumberFormat('de-DE').format(res), "numUno":"0", "numDos":res});
	}
	dgebiSetter({"operador":operator, "dot":""});
}

function equal() {
	let data = dgebiGetter(["numUno", "numDos", "operador"]);
	if(data.operador != "") {
		let res = response(data.operador, data.numUno, data.numDos);
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


function response(operator, num1, num2) {
	let n1 = parseFloat(num1);
	let n2 = parseFloat(num2);
	const operations = {
		'+': (a, b) => a + b,
		'-': (b, a) => a - b,
		'*': (b, a) => a * b,
		'/': (b, a) => a / b
	};
	return operations[operator](n1, n2);
}

function dgebiSetter(obj) {
	Object.entries(obj).forEach(([key, value]) => {
		document.getElementById(key).value = value;
	});
}

function dgebiGetter(keys) {
	return keys.reduce((acc, key) => {
		acc[key] = document.getElementById(key).value;
		return acc;
	}, {});
}
