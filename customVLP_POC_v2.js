'use strict';

var customVLP = (function () {

	var protocal = document.location.protocol;
	var tld = document.domain;
	var vlp = "/all-inventory/index.htm";
	var searchParam = "?search=";
	//Enter stock numbers in a javascript array format (MAXIMUM 16) ['stockNumber1','stockNumber2','stockNumber3','stockNumber4','stockNumber5']
	var stockNumbersArray = ['17-304S', '17-3S', '16-1244T', '16-1303T', '17-238D', '17-534S', '17-535S', '17-637D', '17-639D', '17-643D', '17-644D', '17-647D', '17-653D', '17-673D', '17-674D', '17-676D', '17-677D', '17-700D', '17-721D', '17-724D', '17-730D', '17-767D', '17-5S', '17-335S', '17-377D', '17-478S', '17-533S', '17-606S', '17-619S', '17-620S', '17-995D', '17-180S', '17-468D', '17-486D', '17-498D', '17-531D', '17-536D', '17-561S', '17-588D', '17-727D', '16-653T', '17-672D', '17-380D', '17-213D', '17-10D', '17-1003D', '17-509D', '17-521S', '17-803S', '17-827S'];
	var typeFacets = [];
	var yearFacets = [];
	var makeFacets = [];
	var modelFacets = [];
	var bodystyleFacets = [];

	//LOAD VEHICLE DATA FROM LISTINGS PAGE
	(function getVehicleData() {

		$(stockNumbersArray).each(function (i) {
			$.ajax({
				url: protocal + '//' + tld + vlp + searchParam + stockNumbersArray[i],
				dataType: 'html',
				success: function (html) {
					var listItem = $(html).find('li.item').parent().html();

					if (listItem !== null) {
						//listItems.push(listItem);
						//ADD EACH LIST ITEM TO PAGE
						$('ul.inventoryList.data.full.list-unstyled').append(listItem);
					}
				}
			});
		});

	})();
	
	// CREATE DYNAMIC FACET 
	$('li.item').each(function(){
		
		var type = $(this).find('.hproduct').attr('data-type');
		var year = $(this).find('.hproduct').attr('data-year');
		var make = $(this).find('.hproduct').attr('data-make');
		var model = $(this).find('.hproduct').attr('data-model');
		var bodystyle = $(this).find('.hproduct').attr('data-bodystyle');

	
		var typeFacetExists = typeFacets.indexOf(type);
		var yearFacetExists = yearFacets.indexOf(year);
		var makeFacetExists = makeFacets.indexOf(make);
		var modelFacetExists = modelFacets.indexOf(model);
		var bodystyleFacetExists = bodystyleFacets.indexOf(bodystyle);
		
		
		if (modelFacetExists < 0) {
			
			modelFacets.push(model);
			$('form.facetCustomVLP.model').append('<input type="radio" name="' + model +'" value="male"><span class="facetName">' + model + ' <i>(' + model + ')</i></span>');
		}

});
	
	
	

})();











//
//
//
//	$('ul.inventoryList.data.full.list-unstyled').append(listItem);
//
//        jQuery(document).ajaxStop(function () {
//            jQuery('li.item').each(function () {
//                var vinItem = $(this).find('.hproduct').attr('data-vin');
//                customVLP.vinArray.push(vinItem);
//            });
//        });
//
//
//
//
//
//    , init: function () {
//        //this.cacheDom();
//        //this.bindEvents();
//        this.joinStockNumbers();
//        this.setLayout();
//        this.loadVehicles();
//        this.storeEachVin();
//    }
//
//
//
//    , storeEachVin: function () {
//        jQuery(document).ajaxStop(function () {
//            jQuery('li.item').each(function () {
//                var vinItem = $(this).find('.hproduct').attr('data-vin');
//                customVLP.vinArray.push(vinItem);
//            });
//        });
//        customVLP.saveVinData();
//    }
//    , saveVinData: function () {
//        this.vinArrayLength = this.vinArray.length;
//        // ID of the Google Spreadsheet
//        var spreadsheetID = "1cMqvEw-rQeKLhRIU3JMqTrCsLODjeqZlJESWdbuibik";
//        // Make sure it is public or set to Anyone with link can view 
//        var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";
//        $.getJSON(url, function (data) {
//            var entry = data.feed.entry;
//            var currentDealership = customVLP.tld;
//            $(entry).each(function () {
//                //if ((this.gsx$url.$t.indexOf(currentDealership) > -1) && this.gsx$pageviews.$t > 10 )  {
//                if (this.gsx$url.$t.indexOf(currentDealership) > -1) {
//                    customVLP.cacheSearch[this.gsx$vin.$t] = this.gsx$pageviews.$t;
//                }
//            });
//        });
//        customVLP.addViewData();
//    }
//    , addViewData: function () {
//        this.vinArrayLength = this.vinArray.length;
//        jQuery(document).ajaxStop(function () {
//            jQuery('.hproduct').each(function (index, value) {
//                var vin = jQuery(this).attr('data-vin');
//                jQuery(this).closest('li.item').attr('data-pageviews', customVLP.cacheSearch[vin]);
//                //jQuery(this).closest('li.item')
//            });
//            customVLP.sortByPageview();
//        });
//    }
//    , sortByPageview: function () {
//        jQuery('ul.inventoryList:gt(0)').detach().children('li').appendTo('ul.inventoryList:eq(0)');
//        jQuery("ul.inventoryList").each(function () {
//            jQuery(this).html(jQuery(this).children('li').sort(function (a, b) {
//                return (jQuery(b).data('pageviews')) > (jQuery(a).data('pageviews')) ? 1 : -1;
//            }));
//        });
//    }
//};
//customVLP.init();