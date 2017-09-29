'use strict';
var customVLP = {
	protocal: document.location.protocol,
	tld: document.domain,
	vlp: "/all-inventory/index.htm",
	searchParam: "?search=",
	//Enter stock numbers in a javascript array format (MAXIMUM 16) ['stockNumber1','stockNumber2','stockNumber3','stockNumber4','stockNumber5']
	stockNumbersArray: ['ZC347004', 'ZT758311', 'ZC105339', 'ST101677', 'ST183492', 'ST193327', 'PA815888', 'PA727101', 'PA727044', 'PA727056'],
	//var stockNumbersString = "PA727056+OR+PA727044+OR+PA727101+OR+PA815888+OR+ST193327+OR+ST183492+OR+ST101677+OR+ZC105339+OR+ZT758311+OR+ZC347004";
	stockNumbersString: "",
	layout: DDC.dataLayer.page.attributes.layoutType,
	destTarget: ['.ddc-content.type-2', 'div#ddc-mobile-vlp-inventory'],
	dataTarget: [' .ddc-content.inventory-listing-default .bd', ' div#ddc-mobile-vlp-inventory'],
	index: 0,
	vinArray: [],
	vinArrayLength: null,
	pageviewsArray: [],
	init: function () {
		//this.cacheDom();
		//this.bindEvents();
		this.joinStockNumbers();
		this.setLayout();
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
	loadVehicles: function () {
		jQuery(this.destTarget[this.index]).load(this.protocal + '//' + this.tld + this.vlp + this.searchParam + this.stockNumbersString + this.dataTarget[this.index]);
	},
	storeEachVin: function () {
		jQuery(document).ajaxStop(function () {
			jQuery('li.item').each(function () {
				var vinItem = $(this).find('.hproduct').attr('data-vin');
				customVLP.vinArray.push(vinItem);
			});
			customVLP.loadPageviews();
		});
	},
	loadPageviews: function () {
		
		this.vinArrayLength = this.vinArray.length;
		
		console.log(this.vinArrayLength);
		
		// ID of the Google Spreadsheet
		var spreadsheetID = "1cMqvEw-rQeKLhRIU3JMqTrCsLODjeqZlJESWdbuibik";

		// Make sure it is public or set to Anyone with link can view 
		var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";
		$.getJSON(url, function (data) {

			var entry = data.feed.entry;
			
			$(entry).each(function (i, val) {
				
				//console.log(vinArrayLength);

				for (i = 0; i < customVLP.vinArrayLength; i++) {
					
					//console.log(customVLP.vinArray[i]);

					if (this.gsx$vin.$t === customVLP.vinArray[i]) {

						customVLP.pageviewsArray.push(this.gsx$pageviews.$t);
						
						console.log(customVLP.pageviewsArray);
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

	}
};
customVLP.init();








































		$('.hproduct').each(function (index, value) {
			
				var vin = jQuery(this).attr('data-vin')
				
				if (vin == vinArray[index]) {
					
					//console.log('success');
					
					jQuery(this).attr('data-pageviews', pageviews[index] )
					
					
				} 
					
		});





	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	cacheDom: function () {
		this.$el = $('#customVLP');
		this.$wrapper = this.$el.find('.input_fields_wrap');
		this.$input = this.$el.find('input[name="key"]');
		this.$get_button = this.$el.find('.get_info_button');
		this.$reset_button = this.$el.find('.reset_page_button');
		this.$download_button = this.$el.find('.download_csv_button');
		this.$hiddenDiv = this.$el.find('.hidden-div');
		this.$listItem = this.$el.find('li.item.hproduct');
		this.$result = this.$el.find('#result');
	},
	bindEvents: function () {
		this.$get_button.on('click', this.getStockNumbers.bind(this));
	},
	getStockNumbers: function () {
		var i = 0;
		var inputVal = this.$input.val();
		var inputArray = inputVal.split(" ");
		var inputArrayLength = inputArray.length;
		for (i = 0; i < inputArrayLength; i++) {
			this.stockNumbersArray.push(inputArray[i]);
		}
		this.stockNumbers = this.stockNumbersArray.join('+OR+');
		this.$input.val('');
		this.step = 2;
	},
	loadVehicleData: function () {
		this.$hiddenDiv.load("/all-inventory/index.htm?search=" + this.stockNumbers + " ul.gv-inventory-list.normal-grid.list-unstyled").bind(this);
	},
	loopActions: function () {
		this.$listItem = this.$el.find('li.item.hproduct');
		$('li.item.hproduct').
		each(function () {
			customVLP.saveVehicleData(this);
			customVLP.loadImages(this);
		});
		this.makeTable();
	},
	ajaxComplete: function () {
		$(document).
		ajaxComplete(function () {
			customVLP.swapImgSource($(this));
			customVLP.loopActions($(this));
		});
	},
	saveVehicleData: function (item) {
		this.filePath = $(item).find('.image-wrap img').attr('src');
		this.fileName = this.filePath.split('/').slice(16).join('/');
		var price = $(item).find('.gv-pricing .finalPrice .value').text().replace(',', '');
		var currentStockNumber = $(item).find('.gv-description [data-name="stockNumber"] span').text().slice(0, -1);
		if ((this.stockNumbersArray.indexOf(currentStockNumber)) > -1) {
			customVLP.vehicleData.push({
				stockNumber: $(item).find('.gv-description [data-name="stockNumber"] span').text().slice(0, -1),
				pageURL: customVLP.domain + $(item).find('.inventory-title a').attr("href"),
				imgFileName: this.fileName,
				Type: $(item).find('.inventory-title a').attr("href").split('/').slice(1, 2).join('/'),
				Year: $(item).attr("data-year"),
				Make: $(item).attr("data-make"),
				Model: $(item).attr("data-model"),
				Trim: $(item).attr("data-trim"),
				bodyStyle: $(item).find('.gv-description [data-name="bodyStyle"] span').text().slice(0, -1),
				exteriorColour: $(item).find('.gv-description [data-name="exteriorColor"] span').text().slice(0, -1),
				price: price
			});
		}
	},
	cssChanges: function () {
		if (this.step === 1) {
			$('button.download_csv_button').css('display', 'none');
			$('button.reset_page_button').css('display', 'none');
		} else {
			$('button.download_csv_button, button.reset_page_button').css('display', 'initial');
			$('button.get_info_button, button.reset_page_button').css('background', '#939393');
			$('button.get_info_button').css('display', 'none');
			$('input[type="text"]').prop("disabled", true);
			$('span.comment').text('Content Loaded Successfully');
		}
	}
};
customVLP.init();
