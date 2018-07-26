//FUNÇÃO PARA PEGAR PARAMETROS NA URL
function _GETURL(variavel)
{
    var url   = window.location.search.replace("?", "");
    var itens = url.split("&");
    for(n in itens)
    {
      if( itens[n].match(variavel) )
      {
      return decodeURIComponent(itens[n].replace(variavel+"=", ""));
      }
    }
    return null;
}

function cria_cookie(name, element){
	console.log("Cookie "+name+" criado");
	document.cookie = name+" = "+element+";path=/";
}

//FUNÇÃO PARA PEGAR OS VALORES DOS COOKIES
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	
	for(var i=0;i < ca.length;i++) {
	  var c = ca[i];
	  while (c.charAt(0)==' ') c = c.substring(1,c.length);
	  if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}

	return null;
}


//FUNÇÃO PARA CRIAR UM INPUT HIDDEN NO FORMULÁRIO    
function _CRIAINPUT(nome, propriedade){
	if (propriedade == null) {
		return false;
		console.log('A');
	}else{

	  var propriedade = propriedade.toUpperCase();

	  var input = document.createElement("input");
	  input.setAttribute("type", "hidden");
	  input.setAttribute("name", nome);
	  input.setAttribute("value", propriedade);
	  $( "form" ).append( input );
	}
}

var valida_utm_campaign = function(utm_campaign){

	// Checa se a campanha contém o _ no lugar do espaço, se não, checa se tem um + no lugar do espaço, se não deixa o espaço
	if ( utm_campaign.indexOf('_') !== -1 ) {

		var camp_array = utm_campaign.split('_'),
		campanha = camp_array[0]+' '+camp_array[1];

	}else if( utm_campaign.indexOf('+') !== -1 ){

		var camp_array = utm_campaign.split('+'),
		campanha = camp_array[0]+' '+camp_array[1];

	}else{

		var campanha = utm_campaign;

	}

	return campanha;
}


var adapta_campanha = function(campanha){
	if (campanha == null) {
		return null;
	}else{
		var palavra = campanha.toUpperCase();

		var camp = valida_utm_campaign(palavra);

		var new_camp = camp.split(" ");

		// return new_camp[0]+'-'+new_camp[1];
		return campanha;
	}
}
  
//FUNÇÃO PARA MUDAR OS TELEFONES DE ACORDO COM A CAMPANHA
var muda_tel = function(tel_atual, campanha){
	var campanha_clean = campanha.replace(/[^0-9]/g, '');
	var tel_atual_clean = tel_atual.replace(/[^0-9]/g, '');

	console.log(campanha_clean);
	console.log(tel_atual_clean);

	$( "a:contains('"+tel_atual+"')" ).each(function() {
		$(this).html(campanha);
		$(this).attr('href', 'tel:'+campanha_clean);
	});

};


var do_form = function(form, event){
	event.preventDefault();

	console.log(form.attr('name'));

	var formulario = form;
	var campo_telefone = formulario.find('.campo-tel');
	var campo_ddd = formulario.find('.campo-ddd');

	var input_colors = form.find('input').first().css('background-color');




	var ddd = false;
	var tel = false;
    

    if(campo_ddd.val().replace(/[^0-9]/g, '').length < 2 || campo_ddd.val().replace(/[^0-9]/g, '').length > 2 ){
      campo_ddd.css('background','#FF7171');
      campo_ddd.focus();
      console.log('q');
      
      ddd = false;
    }else{
      campo_ddd.css('background-color', input_colors);
      console.log('w');
      ddd = true;
    }

    if(campo_telefone.val().replace(/[^0-9]/g, '').length < 8 || campo_telefone.val().replace(/[^0-9]/g, '').length > 9 ){
      campo_telefone.css('background','#FF7171');
      console.log('e');
      campo_telefone.focus();
      
      tel = false;
    }else{
      campo_telefone.css('background-color', input_colors);
      console.log('r');
      tel = true;
    }

    if (ddd == true && tel == true) {
    	return true;
    }else{
    	return false;
    }
}


function make_actions(tel_atual, organico, extensao){
	if ( readCookie('utm_campaign') ){

		if( _GETURL("utm_campaign") ){
			console.log(_GETURL("utm_campaign"));

		    if ( readCookie('utm_campaign') == _GETURL("utm_campaign") ){
		        //Se o cookie existir, a URL também existir e eles forem iguais, muda os telefones.
		        muda_tel( tel_atual, checa_campanha( _GETURL("utm_campaign") ) );
		        _CRIAINPUT( "campanha", adapta_campanha( _GETURL("utm_campaign") )+extensao);
		        _CRIAINPUT( "utm_source", _GETURL("utm_source") );
				_CRIAINPUT( "utm_medium", _GETURL("utm_medium") );
				_CRIAINPUT( "utm_content", _GETURL("utm_content") );
		        $('#campanha').val(  _GETURL("utm_campaign")  );
		    }else{
		        //Se o cookie existir, a URL também existir e eles NÃO forem iguais, muda os telefones e atualiza o COOKIE para o mesmo valor da URL.
		        muda_tel( tel_atual, checa_campanha( _GETURL("utm_campaign") ) );
		        cria_cookie("utm_campaign", _GETURL("utm_campaign"));
		        cria_cookie("utm_source", _GETURL("utm_source"));
				cria_cookie("utm_medium", _GETURL("utm_medium"));
				cria_cookie("utm_content", _GETURL("utm_content"));
		        _CRIAINPUT( "campanha", adapta_campanha( _GETURL("utm_campaign") )+extensao);
		        _CRIAINPUT( "utm_source", _GETURL("utm_source") );
				_CRIAINPUT( "utm_medium", _GETURL("utm_medium") );
				_CRIAINPUT( "utm_content", _GETURL("utm_content") );
		        $('#campanha').val(  _GETURL("utm_campaign")  );
		    }

		}else{

		    //Se o cookie existir, mas a url não existir, muda o telefone pelo valor do cookie
		    muda_tel( tel_atual, checa_campanha( readCookie("utm_campaign") ) );
		    _CRIAINPUT( "campanha", adapta_campanha( readCookie("utm_campaign") )+extensao);
		    _CRIAINPUT( "utm_source", readCookie("utm_source") );
			_CRIAINPUT( "utm_medium", readCookie("utm_medium") );
			_CRIAINPUT( "utm_content", readCookie("utm_content") );
		    $('#campanha').val(  readCookie("utm_campaign")  );

		}



	}else{

		if( _GETURL("utm_campaign") ){
			console.log(_GETURL("utm_campaign"));

			//Se o cookie não existir, mas a URL existir, muda os telefones e Cria o cookie
			muda_tel( tel_atual, checa_campanha( _GETURL("utm_campaign") ) );         

			cria_cookie("utm_campaign", _GETURL("utm_campaign"));
			cria_cookie("utm_source", _GETURL("utm_source"));
			cria_cookie("utm_medium", _GETURL("utm_medium"));
			cria_cookie("utm_content", _GETURL("utm_content"));
			_CRIAINPUT( "campanha", adapta_campanha( _GETURL("utm_campaign") )+extensao);
			_CRIAINPUT( "utm_source", _GETURL("utm_source") );
			_CRIAINPUT( "utm_medium", _GETURL("utm_medium") );
			_CRIAINPUT( "utm_content", _GETURL("utm_content") );
			$('#campanha').val(  _GETURL("utm_campaign")  );

		}else{

			//se o cookie e a url não existirem, não muda telefone, mas cria os inputs utm_source e medium com valores padrões
			_CRIAINPUT( "campanha", organico);
			_CRIAINPUT( "utm_source", 'null' );
			_CRIAINPUT( "utm_medium", 'null' );
			_CRIAINPUT( "utm_content", 'null' );
			$('#campanha').val( organico );


		}

	}
}


$(document).ready(function(){
	  $('.campo-data').mask('00/00/0000');
	  $('.campo-cep').mask('00000-000');
	  $('.campo-cpf').mask('000.000.000-00', {reverse: true});
	  $('.campo-cnpj').mask('00.000.000/0000-00', {reverse: true});



	$(".pj-field").css('display', 'none');
	$(".pj-field").removeAttr('required');
	$('.tipo-pessoa').on('click change', function(e) {
	    var id_tipo = $(this).attr('id');
	    if (id_tipo == 'PJ') {
	    	$(".pj-field").css('display', 'block').attr('required', true);
	    } else {
	    	$(".pj-field").css('display', 'none').removeAttr('required');
	    }
	});
	
});


// VALIDAÇÃO DE FORMULÁRIO
$('.campos-numeros').keyup(function () { 
	  this.value = this.value.replace(/[^0-9\.]/g,'');

	  var maxch = $(this).data("max-char");

	  //Fix to chrome android
	  if(this.value.length>maxch){
	       // this.value = this.value.slice(0, -1);
	       this.value = this.value.substring(0, maxch);
	  }
});


$( document ).on('click', '#form-top-btn', function(event) {
	
	var ff = $(".formulario-top");
	if(do_form(ff, event)){
		ff.submit();
	}else{
		console.log("Não envia");
	}
});


$( document ).on('click', '#form-btn', function(event) {
	
	var f = $(".formulario");
	if(do_form(f, event)){
		f.submit();
	}else{
		console.log("Não envia");
	}
});

console.log('version: 5.0');