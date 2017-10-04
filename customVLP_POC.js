'use strict';
var customVLP = {
    protocal: document.location.protocol
    , tld: document.domain
    , vlp: "/all-inventory/index.htm"
    , searchParam: "?search="
    , //Enter stock numbers in a javascript array format (MAXIMUM 16) ['stockNumber1','stockNumber2','stockNumber3','stockNumber4','stockNumber5']
    stockNumbersArray: ['ZT758311', 'ZC347004', 'ZC105339', 'ST101677', 'ST183492', 'ST193327', 'PA815888', 'PA727101', 'PA727044', 'PA727056']
    , //var stockNumbersString = "PA727056+OR+PA727044+OR+PA727101+OR+PA815888+OR+ST193327+OR+ST183492+OR+ST101677+OR+ZC105339+OR+ZT758311+OR+ZC347004";
    stockNumbersString: ""
    , layout: DDC.dataLayer.page.attributes.layoutType
    , destTarget: ['.ddc-content.type-2', 'div#ddc-mobile-vlp-inventory']
    , dataTarget: [' .ddc-content.inventory-listing-default .bd', ' div#ddc-mobile-vlp-inventory']
    , index: 0
    , vinArray: []
    , vinArrayLength: null
    , pageviewsArray: []
    , cacheSearch: {}
    , init: function () {
        //this.cacheDom();
        //this.bindEvents();
        this.joinStockNumbers();
        this.setLayout();
        this.loadVehicles();
        this.storeEachVin();
    }
    , joinStockNumbers: function () {
        this.stockNumbersString = this.stockNumbersArray.join('+OR+');
    }
    , setLayout: function () {
        if (this.layout === 'desktop') {
            return this.index;
        }
        else {
            this.index = 1;
        }
    }
    , loadVehicles: function () {
        jQuery(this.destTarget[this.index]).load(this.protocal + '//' + this.tld + this.vlp + this.searchParam + this.stockNumbersString + this.dataTarget[this.index]);
    }
    , storeEachVin: function () {
        jQuery(document).ajaxStop(function () {
            jQuery('li.item').each(function () {
                var vinItem = $(this).find('.hproduct').attr('data-vin');
                customVLP.vinArray.push(vinItem);
            });
        });
        customVLP.saveVinData();
    }
    , saveVinData: function () {
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
                if (this.gsx$url.$t.indexOf(currentDealership) > -1) {
                    customVLP.cacheSearch[this.gsx$vin.$t] = this.gsx$pageviews.$t;
                }
            });
        });
        customVLP.addViewData();
    }
    , addViewData: function () {
        this.vinArrayLength = this.vinArray.length;
        jQuery(document).ajaxStop(function () {
            jQuery('.hproduct').each(function (index, value) {
                var vin = jQuery(this).attr('data-vin');
                jQuery(this).closest('li.item').attr('data-pageviews', customVLP.cacheSearch[vin]);
                //jQuery(this).closest('li.item')
            });
            customVLP.sortByPageview();
        });
    }
    , sortByPageview: function () {
        jQuery('ul.inventoryList:gt(0)').detach().children('li').appendTo('ul.inventoryList:eq(0)');
        jQuery("ul.inventoryList").each(function () {
            jQuery(this).html(jQuery(this).children('li').sort(function (a, b) {
                return (jQuery(b).data('pageviews')) > (jQuery(a).data('pageviews')) ? 1 : -1;
            }));
        });
    }
};
customVLP.init();