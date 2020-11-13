function dgebi(id){
	return document.getElementById(id).value;
}

function dsebi(id, value){
	document.getElementById(id).value = value;
}

function number(num){
	var numUno = dgebi("numUno");
	if(numUno == "0"){ //Primera vez numero
		dsebi("numUno", num);
		dsebi("pantalla", new Intl.NumberFormat('de-DE').format(num));
	}else{
		dsebi("numUno", numUno+num);
		dsebi("pantalla", new Intl.NumberFormat('de-DE').format(numUno+num));	
	}
}

function operation(operador){
	var numUno = dgebi("numUno");
	var numDos = dgebi("numDos");
	var signo = dgebi("operador");
	
	if(numDos == "0"){ //Primera vez signo
		dsebi("numDos", numUno);
		dsebi("numUno", "0");
	}else{
		var res = respuesta(signo, numUno, numDos);
		dsebi("pantalla", new Intl.NumberFormat('de-DE').format(res));
		dsebi("numUno", "0");
		dsebi("numDos", res);
	}
	dsebi("operador", operador);
	dsebi("punto", "");
}

function igual(){
	var numUno = dgebi("numUno");
	var numDos = dgebi("numDos");
	var signo = dgebi("operador");

	if(signo != ""){
		var res = respuesta(signo, numUno, numDos);
		dsebi("pantalla", new Intl.NumberFormat('de-DE').format(res));
		dsebi("numUno", res);
		dsebi("numDos", "0");
		dsebi("operador", "");
	}
}

function punto(){
	var numUno = dgebi("numUno");
	var punto = dgebi("punto");
	dsebi("punto", ".");

	if(numUno == "0"){
		number( "0.");
	}else{
		if(punto != "."){
			number(".");
		}
	}
}

function ce(){
	dsebi("pantalla", "0");
	dsebi("numUno", "0");
	dsebi("punto", "");
}

function c(){
	dsebi("pantalla", "0");
	dsebi("numUno", "0");
	dsebi("numDos", "0");
	dsebi("operador", "");
	dsebi("punto", "");
}

function respuesta(operador, numUno, numDos){
	if(operador == "+"){
		return suma(numUno, numDos);
	}

	if(operador == "-"){
		return resta(numDos, numUno);
	}

	if(operador == "*"){
		return multi(numDos, numUno);
	}

	if(operador == "/"){
		return div(numDos, numUno);
	}
}

function suma(numUno, numDos){
	return parseFloat(numUno) + parseFloat(numDos);
}

function resta(numUno, numDos){
	return parseFloat(numUno) - parseFloat(numDos);
}

function multi(numUno, numDos){
	return parseFloat(numUno) * parseFloat(numDos);
}

function div(numUno, numDos){
	return parseFloat(numUno) / parseFloat(numDos);
}