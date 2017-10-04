'use strict';
var customVLP = {
	protocal: document.location.protocol,
	tld: document.domain,
	vlp: "/all-inventory/index.htm",
    startParam: "?start=",
	searchParam: "&search=",
	//Enter stock numbers in a javascript array format (MAXIMUM 16) ['stockNumber1','stockNumber2','stockNumber3','stockNumber4','stockNumber5']
	//stockNumbersArray: ['ZT758311', 'ZC347004', 'ZC105339', 'ST101677', 'ST183492', 'ST193327', 'PA815888', 'PA727101', 'PA727044', 'PA727056'],
 	stockNumbersArray: ['17-304S', '17-3S', '16-1244T', '16-1303T', '17-238D', '17-534S', '17-535S', '17-637D', '17-639D', '17-643D', '17-644D', '17-647D', '17-653D', '17-673D', '17-674D', '17-676D', '17-677D', '17-700D', '17-721D', '17-724D', '17-730D', '17-767D', '17-5S', '17-335S', '17-377D', '17-478S', '17-533S', '17-606S', '17-619S', '17-620S', '17-995D', '17-180S', '17-468D', '17-486D', '17-498D', '17-531D', '17-536D', '17-561S', '17-588D', '17-727D', '16-653T', '17-672D', '17-380D', '17-213D', '17-10D', '17-1003D', '17-509D', '17-521S', '17-803S', '17-827S'],
	//var stockNumbersString = "PA727056+OR+PA727044+OR+PA727101+OR+PA815888+OR+ST193327+OR+ST183492+OR+ST101677+OR+ZC105339+OR+ZT758311+OR+ZC347004";
	stockNumbersString: "",
    pagination: "",
	layout: DDC.dataLayer.page.attributes.layoutType,
	destTarget: ['.ddc-content.type-2', 'div#ddc-mobile-vlp-inventory'],
	dataTarget: [' .ddc-content.inventory-listing-default .bd', ' div#ddc-mobile-vlp-inventory'],
	index: 0,
	vinArray: [],
	vinArrayLength: null,
	pageviewsArray: [],
	cacheSearch: {},
	init: function () {
		//this.cacheDom();
		//this.bindEvents();
		this.joinStockNumbers();
		this.setLayout();
        this.getPagination();
		this.loadVehicles();
		this.storeEachVin();
	},
	joinStockNumbers: function () {
		this.stockNumbersString = this.stockNumbersArray.join('+OR+');
	},
	setLayout: function () {
		if (this.layout === 'desktop') {
			return this.index;
		} else {
			this.index = 1;
		}
	},
    getPagination: function () {
        
             $.get(customVLP.protocal + '//' + customVLP.tld + customVLP.vlp + customVLP.searchParam + customVLP.stockNumbersString, function(data){
    
            var paginationString = $(data).find(".pagination .ddc-pagination-current-page").parent().html().split(" ");
                 
            var paginationLength = paginationString.length;

            var pagination = paginationString[paginationLength-1];
                 
            customVLP.pagination = parseInt(pagination);
                 
});
      
        

        
        
        
        
    },
    
    
    
    
	loadVehicles: function () {
        
        
        
        
//var loadedImagesIndex = [];


//for (i = 0; i <= p; i++) {
//	
//	var n = 16 * i;
//	
//	var firstImage = 0 + n;
//	
//	var secondImage = 1 + n;
//	
//	var thirdImage = 2 + n;
//	
//	var forthImage = 3 + n;
//	
//	loadedImagesIndex.push(firstImage, secondImage, thirdImage, forthImage); 
//	
//}
        var i;
        var start = ['0', '16', '32'];
        
    //for (i = 0; i < this.pagination; i++) {
        
        
       $.get('https://www.wellingtonmotors.com/all-inventory/index.htm?search=17-304S+OR+17-3S+OR+16-1244T+OR+16-1303T+OR+17-238D+OR+17-534S+OR+17-535S+OR+17-637D+OR+17-639D+OR+17-643D+OR+17-644D+OR+17-647D+OR+17-653D+OR+17-673D+OR+17-674D+OR+17-676D+OR+17-677D+OR+17-700D+OR+17-721D+OR+17-724D+OR+17-730D+OR+17-767D+OR+17-5S+OR+17-335S+OR+17-377D+OR+17-478S+OR+17-533S+OR+17-606S+OR+17-619S+OR+17-620S+OR+17-995D+OR+17-180S+OR+17-468D+OR+17-486D+OR+17-498D+OR+17-531D+OR+17-536D+OR+17-561S+OR+17-588D+OR+17-727D+OR+16-653T+OR+17-672D+OR+17-380D+OR+17-213D+OR+17-10D+OR+17-1003D+OR+17-509D+OR+17-521S+OR+17-803S+OR+17-827S', function(data){
     
    var targetDiv = $(data).find('.ddc-content.inventory-listing-default .bd').html();
              
           console.log(targetDiv);
           
    var vehicleList; 
           
           $(targetDiv).appendTo(vehicleList);
           
           console.log(vehicleList);
           
           
    
  //console.log("Data: " + targetDiv);
});
        
    //}
        
	},
	storeEachVin: function () {
		jQuery(document).ajaxStop(function () {
			jQuery('li.item').each(function () {
				var vinItem = $(this).find('.hproduct').attr('data-vin');
				customVLP.vinArray.push(vinItem);
			});
		});
				customVLP.saveVinData();
	},
	saveVinData: function () {
		
		this.vinArrayLength = this.vinArray.length;
		
		// ID of the Google Spreadsheet
		var spreadsheetID = "1cMqvEw-rQeKLhRIU3JMqTrCsLODjeqZlJESWdbuibik";

		// Make sure it is public or set to Anyone with link can view 
		var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";
		$.getJSON(url, function (data) {

			var entry = data.feed.entry;
			
			var currentDealership = customVLP.tld;
			
			$(entry).each(function () {
				
					//if ((this.gsx$url.$t.indexOf(currentDealership) > -1) && this.gsx$pageviews.$t > 10 )  {

					if (this.gsx$url.$t.indexOf(currentDealership) > -1)  {	
						
						customVLP.cacheSearch[this.gsx$vin.$t] = this.gsx$pageviews.$t;
				}

			});
			
		});
			customVLP.addViewData();
	},
	addViewData: function () {
		
		this.vinArrayLength = this.vinArray.length;
		
		jQuery(document).ajaxStop(function () {

					
			jQuery('.hproduct').each(function (index, value) {
			
				var vin = jQuery(this).attr('data-vin');
					
				jQuery(this).closest('li.item').attr('data-pageviews', customVLP.cacheSearch[vin]);
				
				//jQuery(this).closest('li.item')
					
			});
			
				customVLP.sortByPageview();
			
		});
		
		
		
	},
	sortByPageview: function () {

			jQuery('ul.inventoryList:gt(0)').detach().children('li').appendTo('ul.inventoryList:eq(0)');

				jQuery("ul.inventoryList").each(function(){

					  jQuery(this).html(jQuery(this).children('li').sort(function(a, b){
					return (jQuery(b).data('pageviews')) > (jQuery(a).data('pageviews')) ? 1 : -1;
				  }));

				});
		
	}
	
};
customVLP.init();




//
//var loadedImagesIndex = [];
//
//
//for (i = 0; i <= p; i++) {
//	
//	var n = 16 * i;
//	
//	var firstImage = 0 + n;
//	
//	var secondImage = 1 + n;
//	
//	var thirdImage = 2 + n;
//	
//	var forthImage = 3 + n;
//	
//	loadedImagesIndex.push(firstImage, secondImage, thirdImage, forthImage); 
//	
//}






//
//var imgSrc = jQuery('.bd > ul li div.hproduct .media img img').attr('src');
//
//console.log(imgSrc);
//
//
//.bd > ul 
//
//
//
//<div class="media"> 
//
//	<a href="/new/Chrysler/2016-Chrysler-200-553244a30a0e0a175f53480c64fdfc8b.htm"> 
//		<img src="https://pictures.dealer.com/ddc/resize/320x/quality/70/sharpen/1/ddc/m/mapleridgechryslerdodgejeeptc/0932/6576c5e7504070afbb3a733191ec2206x.jpg" width="320" alt="2016 Chrysler 200 LX Sedan" title="2016 Chrysler 200 LX Sedan" class="photo thumb"> 
//	</a>
//</div>
//
//
//<div class="media">
//	<a href="/new/Chrysler/2017-Chrysler-Pacifica-f4c49b7f0a0e0a176609e003e6076356.htm"> 		<img class="lazy-image photo thumb" src="https://static.dealer.com/images/blank.gif?	r=1319813457000" data-			src="https://pictures.dealer.com/ddc/resize/320x/quality/70/sharpen/1/ddc/m/mapleridgechryslerdodgejeeptc/0657/4a869ae2f4a1654f9c17133004c873dax.jpg" alt="2017 Chrysler Pacifica LX Van Passenger Van" title="2017 Chrysler Pacifica LX Van Passenger Van"> 
//	</a>
//</div>
//
//
//
//  
//

//$(".hproduct").each(function(){
//
//
//	  $(this).html($(this).children('li').sort(function(a, b){
//  	return ($(b).data('position')) < ($(a).data('position')) ? 1 : -1;
//  }));
//
//
//
//});



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



//
//	
//	cacheDom: function () {
//		this.$el = $('#customVLP');
//		this.$wrapper = this.$el.find('.input_fields_wrap');
//		this.$input = this.$el.find('input[name="key"]');
//		this.$get_button = this.$el.find('.get_info_button');
//		this.$reset_button = this.$el.find('.reset_page_button');
//		this.$download_button = this.$el.find('.download_csv_button');
//		this.$hiddenDiv = this.$el.find('.hidden-div');
//		this.$listItem = this.$el.find('li.item.hproduct');
//		this.$result = this.$el.find('#result');
//	},
//	bindEvents: function () {
//		this.$get_button.on('click', this.getStockNumbers.bind(this));
//	},
//	getStockNumbers: function () {
//		var i = 0;
//		var inputVal = this.$input.val();
//		var inputArray = inputVal.split(" ");
//		var inputArrayLength = inputArray.length;
//		for (i = 0; i < inputArrayLength; i++) {
//			this.stockNumbersArray.push(inputArray[i]);
//		}
//		this.stockNumbers = this.stockNumbersArray.join('+OR+');
//		this.$input.val('');
//		this.step = 2;
//	},
//	loadVehicleData: function () {
//		this.$hiddenDiv.load("/all-inventory/index.htm?search=" + this.stockNumbers + " ul.gv-inventory-list.normal-grid.list-unstyled").bind(this);
//	},
//	loopActions: function () {
//		this.$listItem = this.$el.find('li.item.hproduct');
//		$('li.item.hproduct').
//		each(function () {
//			customVLP.saveVehicleData(this);
//			customVLP.loadImages(this);
//		});
//		this.makeTable();
//	},
//	ajaxComplete: function () {
//		$(document).
//		ajaxComplete(function () {
//			customVLP.swapImgSource($(this));
//			customVLP.loopActions($(this));
//		});
//	},
//	saveVehicleData: function (item) {
//		this.filePath = $(item).find('.image-wrap img').attr('src');
//		this.fileName = this.filePath.split('/').slice(16).join('/');
//		var price = $(item).find('.gv-pricing .finalPrice .value').text().replace(',', '');
//		var currentStockNumber = $(item).find('.gv-description [data-name="stockNumber"] span').text().slice(0, -1);
//		if ((this.stockNumbersArray.indexOf(currentStockNumber)) > -1) {
//			customVLP.vehicleData.push({
//				stockNumber: $(item).find('.gv-description [data-name="stockNumber"] span').text().slice(0, -1),
//				pageURL: customVLP.domain + $(item).find('.inventory-title a').attr("href"),
//				imgFileName: this.fileName,
//				Type: $(item).find('.inventory-title a').attr("href").split('/').slice(1, 2).join('/'),
//				Year: $(item).attr("data-year"),
//				Make: $(item).attr("data-make"),
//				Model: $(item).attr("data-model"),
//				Trim: $(item).attr("data-trim"),
//				bodyStyle: $(item).find('.gv-description [data-name="bodyStyle"] span').text().slice(0, -1),
//				exteriorColour: $(item).find('.gv-description [data-name="exteriorColor"] span').text().slice(0, -1),
//				price: price
//			});
//		}
//	},
//	cssChanges: function () {
//		if (this.step === 1) {
//			$('button.download_csv_button').css('display', 'none');
//			$('button.reset_page_button').css('display', 'none');
//		} else {
//			$('button.download_csv_button, button.reset_page_button').css('display', 'initial');
//			$('button.get_info_button, button.reset_page_button').css('background', '#939393');
//			$('button.get_info_button').css('display', 'none');
//			$('input[type="text"]').prop("disabled", true);
//			$('span.comment').text('Content Loaded Successfully');
//		}
//	}
//};
//customVLP.init();
