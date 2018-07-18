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
	  var propriedade = propriedade.toUpperCase();

	  var input = document.createElement("input");
	  input.setAttribute("type", "hidden");
	  input.setAttribute("name", nome);
	  input.setAttribute("value", propriedade);
	  $( "form" ).append( input );
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
	var palavra = campanha.toUpperCase();

	var camp = valida_utm_campaign(palavra);

	var new_camp = camp.split(" ");

	// return new_camp[0]+'-'+new_camp[1];
	return campanha;
}
  
//FUNÇÃO PARA MUDAR OS TELEFONES DE ACORDO COM A CAMPANHA
var muda_tel = function(campanha){
	var campanha_clean = campanha.replace(/[^0-9]/g, '');

	// $('.top-telefone-numero').html(campanha);
	// $('.top-telefone-numero').attr("href", "tel://"+campanha_clean);
	$('.menu-link-sac').html(campanha);
	$('.menu-link-sac').attr("href", "tel://"+campanha_clean);
	$('.link-tel-form').html(campanha);
	$('.link-tel-form').attr("href", "tel://"+campanha_clean);
	$('.telefone-footer').html(campanha);
	$('.telefone-footer').attr("href", "tel://"+campanha_clean);
};


var do_form = function(form, event){
	event.preventDefault();

	console.log(form.attr('name'));

	var formulario = form;
	var campo_telefone = formulario.find('.campo-tel');
	var campo_ddd = formulario.find('.campo-ddd');


	var ddd = false;
	var tel = false;
    

    if(campo_ddd.val().replace(/[^0-9]/g, '').length < 2 || campo_ddd.val().replace(/[^0-9]/g, '').length > 2 ){
      campo_ddd.css('background-color','#FF7171');
      campo_ddd.focus();
      
      ddd = false;
    }else{
      campo_ddd.css('background-color','#FFFFFF');
      ddd = true;
    }

    if(campo_telefone.val().replace(/[^0-9]/g, '').length < 8 || campo_telefone.val().replace(/[^0-9]/g, '').length > 9 ){
      campo_telefone.css('background-color','#FF7171');
      campo_telefone.focus();
      
      tel = false;
    }else{
      campo_telefone.css('background-color','#FFFFFF');
      tel = true;
    }

    if (ddd == true && tel == true) {
    	return true;
    }else{
    	return false;
    }
}




if ( readCookie('utm_campaign') ){

	if( _GETURL("utm_campaign") ){
		console.log(_GETURL("utm_campaign"));

	    if ( readCookie('utm_campaign') == _GETURL("utm_campaign") ){
	        //Se o cookie existir, a URL também existir e eles forem iguais, muda os telefones.
	        // muda_tel( checa_campanha( _GETURL("utm_campaign") ) );
	        _CRIAINPUT( "campanha", adapta_campanha( _GETURL("utm_campaign") ));
	        $('#campanha').val(  _GETURL("utm_campaign")  );
	    }else{
	        //Se o cookie existir, a URL também existir e eles NÃO forem iguais, muda os telefones e atualiza o COOKIE para o mesmo valor da URL.
	        // muda_tel( checa_campanha( _GETURL("utm_campaign") ) );
	        document.cookie = "utm_campaign = "+_GETURL("utm_campaign");
	        _CRIAINPUT( "campanha", adapta_campanha( _GETURL("utm_campaign") ));
	        $('#campanha').val(  _GETURL("utm_campaign")  );
	    }

	}else{

	    //Se o cookie existir, mas a url não existir, muda o telefone pelo valor do cookie
	    // muda_tel( checa_campanha( readCookie("utm_campaign") ) );
	    _CRIAINPUT( "campanha", adapta_campanha( readCookie("utm_campaign") ));
	    $('#campanha').val(  readCookie("utm_campaign")  );

	}

}else{

	if( _GETURL("utm_campaign") ){
		console.log(_GETURL("utm_campaign"));

		//Se o cookie não existir, mas a URL existir, muda os telefones e Cria o cookie
		// muda_tel( checa_campanha( _GETURL("utm_campaign") ) );         

		document.cookie = "utm_campaign = "+_GETURL("utm_campaign");
		_CRIAINPUT( "campanha", adapta_campanha( _GETURL("utm_campaign") ));
		$('#campanha').val(  _GETURL("utm_campaign")  );

	}else{

		//se o cookie e a url não existirem, não muda telefone, mas cria os inputs utm_source e medium com valores padrões
		_CRIAINPUT( "campanha", 'ORGANICO');
		$('#campanha').val( 'ORGANICO' );


	}

}


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