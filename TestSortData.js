$(".hproduct").each(function(){
  $(this).html(
	  $(this).detach().sort(function(a, b){
  	return ($(b).data('pageviews')) < ($(a).data('pageviews')) ? 1 : -1;
  	}).appendTo('li.item');
  );
});









//sorted sections

$('ul:gt(0)').remove().children('li').appendTo('ul:eq(0)');


$("ul").each(function(){
	
	  $(this).html($(this).children('li').sort(function(a, b){
  	return ($(b).data('pageviews')) > ($(a).data('pageviews')) ? 1 : -1;
  }));

});




//a


$('ul:gt(0)').remove().children('li').appendTo('ul:eq(0)');


$("li").each(function(){
	  var li = $(this).html($(this).detach());
    
    console.log(li);
});



$("ul").each(function(){
	
	
	
	
	
	  $(this).html(
		  $(this).children('li').sort(function(a, b){
  	return ($(b).data('pageviews')) > ($(a).data('pageviews')) ? 1 : -1;
  }));

});







//b


$("li").each(function(){
	  $(this).html($(this).detach());
    
     $(this).html(
		  $(this).sort(function(a, b){
  	return ($(b).data('pageviews')) > ($(a).data('pageviews')) ? 1 : -1;
  }));
});



$("ul").each(function(){
	
	
	
	
	
	  $(this).html(
		  $(this).children('li').sort(function(a, b){
  	return ($(b).data('pageviews')) > ($(a).data('pageviews')) ? 1 : -1;
  }));

});


//c


$("ul").each(function(){
	  $(this).html($(this).children('li').sort(function(a, b){
  	return ($(b).data('pageviews')) > ($(a).data('pageviews')) ? 1 : -1;
  }));

});