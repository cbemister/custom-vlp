var startParam = ['', '?start=16', '?start=32', '?start=48', '?start=64', '?start=80', '?start=96', '?start=112', '?start=128', '?start=144', '?start=160', '?start=176', '?start=192', '?start=208', '?start=224', '?start=240', '?start=256', '?start=272', '?start=288', '?start=304', '?start=320'
, '?start=336', '?start=352', '?start=368', '?start=384', '?start=400', '?start=416', '?start=432', '?start=448', '?start=464', '?start=480', '?start=496', '?start=512', '?start=528', '?start=544', '?start=560', '?start=576', '?start=592', '?start=608', '?start=624', '?start=640', '?start=656', '?start=672', '?start=688', '?start=704', '?start=720', '?start=736', '?start=752', '?start=768', '?start=784', '?start=800', '?start=816', '?start=832', '?start=848', '?start=864', '?start=880', '?start=896', '?start=912', '?start=928', '?start=944', '?start=960', '?start=976', '?start=992', '?start=1008', '?start=1024', '?start=1040', '?start=1056', '?start=1072', '?start=1088', '?start=1104', '?start=1120'
, '?start=1136', '?start=1152', '?start=1168', '?start=1184', '?start=1200'];
var page1 = 'https://www.wellingtonmotors.com/all-inventory/index.htm?search=17-304S+OR+17-3S+OR+16-1244T+OR+16-1303T+OR+17-238D+OR+17-534S+OR+17-535S+OR+17-637D+OR+17-639D+OR+17-643D+OR+17-644D+OR+17-647D+OR+17-653D+OR+17-673D+OR+17-674D+OR+17-676D+OR+17-677D+OR+17-700D+OR+17-721D+OR+17-724D+OR+17-730D+OR+17-767D+OR+17-5S+OR+17-335S+OR+17-377D+OR+17-478S+OR+17-533S+OR+17-606S+OR+17-619S+OR+17-620S+OR+17-995D+OR+17-180S+OR+17-468D+OR+17-486D+OR+17-498D+OR+17-531D+OR+17-536D+OR+17-561S+OR+17-588D+OR+17-727D+OR+16-653T+OR+17-672D+OR+17-380D+OR+17-213D+OR+17-10D+OR+17-1003D+OR+17-509D+OR+17-521S+OR+17-803S+OR+17-827S'
    , page2 = 'https://www.wellingtonmotors.com/all-inventory/index.htm?start=16&search=17-304S+OR+17-3S+OR+16-1244T+OR+16-1303T+OR+17-238D+OR+17-534S+OR+17-535S+OR+17-637D+OR+17-639D+OR+17-643D+OR+17-644D+OR+17-647D+OR+17-653D+OR+17-673D+OR+17-674D+OR+17-676D+OR+17-677D+OR+17-700D+OR+17-721D+OR+17-724D+OR+17-730D+OR+17-767D+OR+17-5S+OR+17-335S+OR+17-377D+OR+17-478S+OR+17-533S+OR+17-606S+OR+17-619S+OR+17-620S+OR+17-995D+OR+17-180S+OR+17-468D+OR+17-486D+OR+17-498D+OR+17-531D+OR+17-536D+OR+17-561S+OR+17-588D+OR+17-727D+OR+16-653T+OR+17-672D+OR+17-380D+OR+17-213D+OR+17-10D+OR+17-1003D+OR+17-509D+OR+17-521S+OR+17-803S+OR+17-827S&'
    , page3 = 'https://www.wellingtonmotors.com/all-inventory/index.htm?start=32&search=17-304S+OR+17-3S+OR+16-1244T+OR+16-1303T+OR+17-238D+OR+17-534S+OR+17-535S+OR+17-637D+OR+17-639D+OR+17-643D+OR+17-644D+OR+17-647D+OR+17-653D+OR+17-673D+OR+17-674D+OR+17-676D+OR+17-677D+OR+17-700D+OR+17-721D+OR+17-724D+OR+17-730D+OR+17-767D+OR+17-5S+OR+17-335S+OR+17-377D+OR+17-478S+OR+17-533S+OR+17-606S+OR+17-619S+OR+17-620S+OR+17-995D+OR+17-180S+OR+17-468D+OR+17-486D+OR+17-498D+OR+17-531D+OR+17-536D+OR+17-561S+OR+17-588D+OR+17-727D+OR+16-653T+OR+17-672D+OR+17-380D+OR+17-213D+OR+17-10D+OR+17-1003D+OR+17-509D+OR+17-521S+OR+17-803S+OR+17-827S&';
$.when($.get(page1, function (data1) {
    //console.log(data1);
}), $.get(page2, function (data2) {
    //console.log(data2);
}), $.get(page3), function (data3) {
    //console.log(data3);
}).then(function (data1, data2, data3) {
    var combinedInventory;
    var inventoryLists = [data1, data2, data3];
    var inventoryListLength = inventoryLists.length;
    var i;
    for (i = 0; i < inventoryListLength; i++) {
        var filterData = $(inventoryLists[i]['0']).find('.ddc-content.inventory-listing-default .bd').html();
        //console.log(filterData)
        combinedInventory = combinedInventory + filterData;
    }
    console.log(combinedInventory);
}).fail(function (err) {
    console.error('Opps', err);
});