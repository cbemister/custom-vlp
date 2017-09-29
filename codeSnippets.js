





https://www.mapleridgechrysler.com/all-inventory/index.htm?search=PA727056+OR+PA727044+OR+PA727101+OR+PA815888+OR+ST193327+OR+ST183492+OR+ST101677+OR+ZC105339+OR+ZT758311+OR+ZC347004


//Loading

var domainProtocal = document.location.protocol;

var tld = document.domain;

var vlpPageLocation = "/all-inventory/index.htm";

var searchParam = "?search="
	
var stockNumbers = "PA727056+OR+PA727044+OR+PA727101+OR+PA815888+OR+ST193327+OR+ST183492+OR+ST101677+OR+ZC105339+OR+ZT758311+OR+ZC347004";

var layout = DDC.dataLayer.page.attributes.layoutType;

var destTarget = ['.ddc-content.type-2', 'div#ddc-mobile-vlp-inventory'];

var dataTarget = [' .ddc-content.inventory-listing-default .bd', ' div#ddc-mobile-vlp-inventory']


if (layout === 'desktop') {
	var index = 0;
} else {
	var index = 1;
}

$(destTarget[index]).load(domainProtocal + '//' + tld + vlpPageLocation + searchParam + stockNumbers + dataTarget[index] );



$('span.eprice').css('display','none');





//Filtering

.toggleClass("hide");

.closest("li");


$("li.item").each()





Try to use sort() with appendTo(),

$(".listitems li").sort(sort_li) // sort elements
                  .appendTo('.listitems'); // append again to the list
// sort function callback
function sort_li(a, b){
    return ($(b).data('position')) < ($(a).data('position')) ? 1 : -1;    
}
Snippet,

$(function() {
  $(".listitems li").sort(sort_li).appendTo('.listitems');
  function sort_li(a, b) {
    return ($(b).data('position')) < ($(a).data('position')) ? 1 : -1;
  }
});


<ul class="listitems">
  <li data-position="3">Item 3</li>
  <li data-position="2">Item 2</li>
  <li data-position="1">Item 1</li>
  <li data-position="4">Item 4</li>
</ul>
  
  
  
  
  
  
  
$(".listitems").each(function(){

var autosort = $(this).hasClass('autosort');

if (autosort == true) {

	  $(this).html($(this).children('li').sort(function(a, b){
  	return ($(b).data('position')) < ($(a).data('position')) ? 1 : -1;
  }));

}

});
  
  
  
<p>
  Sort this list:
</p>
<ul class="listitems autosort">
    <li data-position="3">Item 3</li>
    <li data-position="2">Item 2</li>
    <li data-position="1">Item 1</li>
    <li data-position="4">Item 4</li>
</ul>
<p>
  Don't sort this list:
</p>
<ul class="listitems">
    <li data-position="5">Item 5</li>
    <li data-position="6">Item 6</li>
    <li data-position="3">Item 3</li>
    <li data-position="4">Item 4</li>
</ul>
<p>
  But do sort this one:
</p>
<ul class="listitems autosort">
    <li data-position="8">Item 8</li>
    <li data-position="7">Item 7</li>
    <li data-position="2">Item 2</li>
    <li data-position="4">Item 4</li>
</ul>
  
	
	
	
	data-vin="1C3CCCFB3GN101677"
	
	
<div class="hproduct auto chrysler" data-classification="primary" data-type="new" data-internetprice="MzEzNzIuMA==" data-msrp="MzEzNzIuMA==" data-exteriorcolor="Velvet Red Pearl" data-bodystyle="Sedan" data-trim="LX" data-year="2016" data-model="200" data-vin="1C3CCCFB3GN101677" data-make="Chrysler" data-index-position="1">
  
	
	
	
  
jQuery(document).ajaxComplete(function () {

var vinArray = [];

jQuery('li.item').each(function () {
	
	var vinItem = $(this).find('.hproduct').attr('data-vin');
	
	//console.log(vinItem);
	
	vinArray.push(vinItem);
	
	
}); 

//console.log(vinArray);


	//jQuery('#invCountQty').text('' + sum + '');

	
	
	
	
	
});
	
	
	
	//===== VLP PAGEVIEW COUNTER START =====//
//jQuery(document).ready(function () {
//
//	jQuery('.ddc-content.inventory-detail-pricing.ddc-box-1').after('<div id="vdpCounter"></div>');
//
//	jQuery('#vdpCounter').append('<i class="fa fa-group"></i> <span id="invCountQty"><img src="https://pictures.dealer.com/a/autocanadatc/1610/ab3477bd3a5091afcad350e032f406d3x.jpg"></span>&nbsp;people recently viewed this.*');
//
//	jQuery('.ddc-content.inventory-detail-tech-specs').after('<br><div id="pageviewDisclaimer">*Number of views in last 30 days.</div>');
//});
	
// ID of the Google Spreadsheet
var spreadsheetID = "1cMqvEw-rQeKLhRIU3JMqTrCsLODjeqZlJESWdbuibik";
var pageviews = [];


// Make sure it is public or set to Anyone with link can view 
var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";
$.getJSON(url, function (data) {

	var entry = data.feed.entry;

	$(entry).each(function (i, val) {
		
		
		var vinArrayLength = vinArray.length;
		
		for (i = 0; i < vinArrayLength; i++ ) {
			
				if (this.gsx$vin.$t === vinArray[i]) {

					pageviews.push(this.gsx$pageviews.$t);
				}
			
		}
			
			});

//	var a = pageviews;
//
//	var result = a.map(function (x) {
//		return parseInt(x, 10);
//	});
//
//	sum = result.reduce(add, 0);
//
//	function add(a, b) {
//		return a + b;
//	}

});
jQuery(document).ajaxStop(function () {
	
		
		$('.hproduct').each(function (index, value) {
			
				var vin = jQuery(this).attr('data-vin')
				
				if (vin == vinArray[index]) {
					
					//console.log('success');
					
					jQuery(this).attr('data-pageviews', pageviews[index] )
					
					
				} 
					
		});
		


	//jQuery('#invCountQty').text('' + sum + '');
	
	console.log(pageviews);

});
//===== VLP PAGEVIEW COUNTER END =====//
	
  
  