





var paginationString = $(".pagination .ddc-pagination-current-page").parent().html().split(" ");

var paginationLength = paginationString.length;

var p = paginationString[paginationLength-1];

console.log(p);



var $div = $('<div>');

$div.load('index.php #somediv', function(){
    // now $(this) contains #somediv
});



?start=16&

jQuery(this.destTarget[this.index]).load(this.protocal + '//' + this.tld + this.vlp + this.searchParam + this.stockNumbersString + this.dataTarget[this.index]);


[16, 32, 48 ]


var urls = ['/url/one','/url/two', ....];

$.each(urls, function(i,u){ 
     $.ajax(u, 
       { type: 'POST',
         data: {
            answer_service: answer,
            expertise_service: expertise,
            email_service: email,
         },
         success: function (data) {
             $(".error_msg").text(data);
         } 
       }
     );
});
//Note: The messages generated by the success callback will overwrite each other as shown. You'll probably want to use $('#someDiv').append() or similar in the success function.





jQuery.ajax({
			url: this.protocal + '//' + this.tld + this.vlp + this.searchParam + this.stockNumbersString + this.pagination,
			success: function (data) {

				if (data != "") {
					loading = false;
					
					var hostPageContainer = this.dataTarget[this.index];
					
					jQuery(hostPageContainer, data).each(function (index) {



					});
				}
			}
		});








var myStrArray = ["http://www.google.de", "http://www.facebook.de", "http://www.lycos.de"];

//Initialize local deferred for myStrArray 
var myDeferredArray = [];
for (var i = 0; i < myStrArray; i++)
{
   myDeferredArray[i] = $.Deferred();
}

for (var i = 0; i < myStrArray.length; i++)
{
   $(element).load(myStrArray, function() {
       doSomething();
       myDeferredArray[i].resolve();
   });
}

return myDeferredArray as single deferred


$.when.apply(null, deferreds);
