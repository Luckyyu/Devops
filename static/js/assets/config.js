
function requests(method,url,data){
  var ret = '';
  $.ajax({
    async:false,
    url:url,
    type:method,
    success:function(response){
        ret = response
    },
    error:function(data){
        ret = {}
    }
  });
  return ret
}

var language =  {
	"sProcessing" : "处理中...",
	"sLengthMenu" : "显示 _MENU_ 项结果",
	"sZeroRecords" : "没有匹配结果",
	"sInfo" : "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
	"sInfoEmpty" : "显示第 0 至 0 项结果，共 0 项",
	"sInfoFiltered" : "(由 _MAX_ 项结果过滤)",
	"sInfoPostFix" : "",
	"sSearch" : "搜索: ",
	"sUrl" : "",
	"sEmptyTable" : "表中数据为空",
	"sLoadingRecords" : "载入中...",
	"sInfoThousands" : ",",
	"oPaginate" : {
		"sFirst" : "首页",
		"sPrevious" : "上页",
		"sNext" : "下页",
		"sLast" : "末页"
	},
	"oAria" : {
		"sSortAscending" : ": 以升序排列此列",
		"sSortDescending" : ": 以降序排列此列"
	}
}

function InitDataTable(tableId,dataList,buttons,columns,columnDefs){
     oOverviewTable =$('#'+tableId).dataTable({
				    "dom": "Bfrtip",
				    "buttons":buttons,
		    		"bScrollCollapse": false,
		    	    "bRetrieve": true,
		    		"destroy": true,
		    		"data":	dataList,
		    		"columns": columns,
		    		"columnDefs": columnDefs,
		    		"language" : language,
		    		"order": [[ 0, "ase" ]],
		    		"autoWidth": false
		    	});
}

function makeIdcTable(dataList){
    var columns = [
        {"data":"id"},
        {"data":"zone_name"}
    ]
    var columnDefs = [
        {
                targets: [2],
                render: function(data, type, row, meta) {
                    return '<div class="btn-group  btn-group-xs">' +
                           '<button type="button" name="btn-idc-modf" value="'+ row.id +'" class="btn btn-default"  aria-label="Justify"><span class="fa fa-edit" aria-hidden="true"></span>' +
                           '</button>' +
                           '<button type="button" name="btn-idc-confirm" value="'+ row.id +'" class="btn btn-default" aria-label="Justify"><span class="fa fa-trash" aria-hidden="true"></span>' +
                           '</button>' +
                           '</div>';
                },
                "className": "text-center",
        },
   	]
   	var buttons = [{
            text: '<span class="fa fa-plus"></span>',
            className: "btn-xs",
            action: function ( e, dt, node, config ) {
            	$('#addZoneModal').modal("show");
            }
        }]
   	InitDataTable('zoneAssetsTable',dataList,buttons,columns,columnDefs)
}
$(document).ready(function(){
    var zone_list = requests('get',"/api/zone/")
    $("#show").html(zone_list[1]["zone_name"])
    $.each(zone_list,function(i,item){
        console.log(item["zone_name"]);
    });
    makeIdcTable(zone_list)
});