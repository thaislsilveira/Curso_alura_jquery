var tempoInicial = $("#tempo-digitacao").text();
//troquei o seletor de classes para o de id em campo-digitacao
var campo = $("#campo-digitacao");

/*atalho para a $(document).ready(function() que é 
$(function(){
atualizaTamanhoFrase();
		inicializaContadores();
		inicializaCronometro();
		$("#botao-reiniciar").click(reiniciaJogo);
}); */

$(document).ready(function(){
		atualizaTamanhoFrase();
		inicializaContadores();
		inicializaCronometro();
		inicializaMarcadores();
		$("#botao-reiniciar").click(reiniciaJogo);
});


function atualizaTempoInicial(tempo) {
    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);
}
// Seletor no jQuery é jQuery
// o dolar($) é um atalho para a função jquery
//.text() é para selecionar o texto no jquery
//no curso ele utiliza seletor de classes porem ele não pegou,estou usando seletor de id por isso em #frase

function atualizaTamanhoFrase(){
	var frase = jQuery(".frase").text();
	//console.log(frase);
	var numPalavras = frase.split(" ").length;

	var tamanhoFrase = $("#tamanho-frase");
	//console.log(tamanhoFrase);
	tamanhoFrase.text(numPalavras);
	
}
	


function inicializaContadores(){
	campo.on("input", function() {
	    var conteudo = campo.val();
	       //Retira os espaço da String 
	    var conteudoSemEspaco = conteudo.replace(/\s+/g,'');
	    
	    var qtdPalavras = conteudo.split(/\S+/).length -1;
	    $("#contador-palavras").text(qtdPalavras);

	    var qtdCaracteres = conteudoSemEspaco.length;
	    $('#contador-caracteres').text(qtdCaracteres);
	});	
}


// evento de focus detecta a hora que o usuario entrou na area do textarea

function inicializaCronometro(){
		

	// função one só chama aquele evento uma unica vez, já a função on fica sempre escutando o evento de focus
	campo.one("focus", function() {
		var tempoRestante = $("#tempo-digitacao").text();
		//ele decresce de 1 em 1 segundo
	var cronometroID = 	setInterval(function() {
			tempoRestante--;
			//ele vai subtrair de um e atualizar o valor do campo
			$("#tempo-digitacao").text(tempoRestante);
			//o attr altera o atribudo de alguma coisa
			if(tempoRestante < 1){
				// ela faz com que o setInterval para de funcionar e com isso ele para de contar o tempo negativo
				clearInterval(cronometroID);
				finalizaJogo();
			}
		},1000);

	});

function finalizaJogo(){
		campo.attr("disabled", true);				
		//só passa o nome da classe, não seleciona nada
		campo.toggleClass("campo-desativado");
		inserePlacar();
	}
}

function inicializaMarcadores(){

	
	campo.on("input",function(){
		var frase =  $(".frase").text();
		var digitado = campo.val();
		//substr é um pedaço da minha string
		var comparavel = frase.substr(0,digitado.length);
		if(digitado == comparavel){
			campo.addClass("borda-verde");
			campo.removeClass("borda-vermelha");
		}else{
			campo.addClass("borda-vermelha");	
			campo.removeClass("borda-verde");
		}

	});
}
/*
$("#botao-reiniciar").on("click ", function () {
	console.log("Botão clicado");
}); */



function reiniciaJogo(){
	campo.attr("disabled", false);
	campo.val("");
	$("#contador-palavras").text("0");
	$("#contador-caracteres").text("0");
	$("#tempo-digitacao").text(tempoInicial);
	inicializaCronometro();
	//togleClass ele coloca e tira a classe
	campo.toggleClass("campo-desativado");
	campo.removeClass("borda-vermelha");
	campo.removeClass("borda-verde");
}

