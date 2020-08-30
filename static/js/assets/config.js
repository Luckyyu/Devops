
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

function RefreshTable(tableId,urlstr){
    $.getJSON(urlstr,null,function(dataList){
        table = $('#'+tableId).dataTable();
        oSettings = table.fnSettings();
        table.fnClearTable(this);

	  for (var i=0; i<dataList.length; i++)
	  {
	    table.oApi._fnAddData(oSettings, dataList[i]);
	  }

	  oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
	  table.fnDraw();
    });
}

function makeZoneTables(dataList){
    var columns = [
        {"data":"id"},
        {"data":"zone_name"}
    ]
    var columnDefs = [
   	    		        {
	    	    				targets: [2],
	    	    				render: function(data, type, row, meta) {
	    	                        return '<div class="btn-group  btn-group-xs">' +
		    	                           '<button type="button" name="btn-zone-modf" value="'+ row.id +'" class="btn btn-default"  aria-label="Justify"><span class="fa fa-edit" aria-hidden="true"></span>' +
		    	                           '</button>' +
		    	                           '<button type="button" name="btn-zone-confirm" value="'+ row.id +'" class="btn btn-default" aria-label="Justify"><span class="fa fa-trash" aria-hidden="true"></span>' +
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
    makeZoneTables(zone_list)

    $('#zonesubmit').on('click',function(){
        $.ajax({
            cache:true,
            type:"POST",
            url:"/api/zone/",
            contentType : "application/json",
			dataType : "json",
            data:JSON.stringify({
				"zone_name": $('#zone_name').val(),
			}),
            async:false,
            error: function(request) {
            	new PNotify({
                    title: 'Ops Failed!',
                    text: request.responseText,
                    type: 'error',
                    styling: 'bootstrap3'
                });
            },
            success:function(data){
                new PNotify({
                    title:"Success!",
                    text:'区域添加成功',
                    type:'Sueccess',
                    styling:'bootstrap3'
                });
                RefreshTable('zoneAssetsTable', '/api/zone/');
                $('#addZoneModal').modal("hide");
            }
        });
    });

    $('#zoneAssetsTable tbody').on('click',"button[name='btn-zone-modf']", function(){
    	var vIds = $(this).val();
    	var td = $(this).parent().parent().parent().find("td")
    	var zone_name = td.eq(1).text()
        $.confirm({
            icon: 'fa fa-edit',
            type: 'blue',
            title: '修改数据',
            content: '<form  data-parsley-validate class="form-horizontal form-label-left">' +
    		            '<div class="form-group">' +
    		              '<label class="control-label col-md-4 col-sm-3 col-xs-12" for="last-name">区域名称<span class="required">*</span>' +
    		              '</label>' +
    		              '<div class="col-md-6 col-sm-6 col-xs-12">' +
    		                '<input type="text"  name="modf_zone_name" value="'+ zone_name +'" required="required" class="form-control col-md-7 col-xs-12">' +
    		              '</div>' +
    		            '</div>' +
    		          '</form>',
            buttons: {
                '取消': function() {},
                '修改': {
                    btnClass: 'btn-blue',
                    action: function() {
                        var zone_name = this.$content.find("[name='modf_zone_name']").val();
    			    	$.ajax({
    			            cache: true,
    			            type: "PUT",
    			            url:"/api/zone/" + vIds + '/',
    			            data:{
    			            	"zone_name":zone_name,
    			            	},
    			            error: function(request) {
    			            	new PNotify({
    			                    title: 'Ops Failed!',
    			                    text: request.responseText,
    			                    type: 'error',
    			                    styling: 'bootstrap3'
    			                });
    			            },
    			            success: function(data) {
    			            	new PNotify({
    			                    title: 'Success!',
    			                    text: '修改成功',
    			                    type: 'success',
    			                    styling: 'bootstrap3'
    			                });
    			            	RefreshTable('zoneAssetsTable', '/api/zone/');
    			            }
    			    	});
                    }
                }
            }
        });
    });

});