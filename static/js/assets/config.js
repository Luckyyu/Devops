
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

function makeSelect(ids,key,name,dataList){
	//var userHtml = '<select required="required" class="form-control" name="'+ name +'" autocomplete="off">'
	var selectHtml = '';
	for (var i=0; i <dataList.length; i++){
		selectHtml += '<option name="'+ name +'"value="'+ dataList[i]["id"] +'">'+ dataList[i][key] +'</option>'
	};
	//userHtml =  userHtml + selectHtml + '</select>';
	//document.getElementById(ids).innerHTML= userHtml;
	document.getElementById(ids).innerHTML= selectHtml;
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
    var idc_list = requests('get','/api/idc/')
    $.each(idc_list,function(i,item){
        console.log(item["idc_name"]);
    });


//显示idc表格，以及获取数据
function makeIDCTables(dataList){
    var columns = [
        {"data":"id"},
        {"data":"zone_name"},
        {"data":"idc_name"},
        {"data":"idc_bandwidth"},
        {"data":"idc_contact"},
        {"data":"idc_phone"},
        {"data":"idc_address"},
        {"data":"idc_network"},
        {"data":"idc_desc"},
    ]
    var columnDefs = [
   	    		        {
	    	    				targets: [9],
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
                zone_list = requests('get',"/api/zone/");
                makeSelect("zone_idc_select","zone_name","zone",zone_list);
            	$('#addIDCModal').modal("show");
            }
        }]
   	InitDataTable('idcAssetsTable',dataList,buttons,columns,columnDefs)
}
    makeZoneTables(zone_list);
    makeIDCTables(idc_list);

//主页面按钮，机房添加
    $('#idcsubmit').on('click',function(){
        $.ajax({
            cache:true,
            type:"POST",
            url:"/api/idc/",
            contentType : "application/json",
			dataType : "json",
            data:JSON.stringify({
				"zone": $('#zone_idc_select option:selected').val(),
				"idc_name":$('#idc_name').val(),
				"idc_name":$('#idc_name').val(),
				"idc_bandwidth":$('#idc_bandwidth').val(),
				"idc_contact":$('#idc_contact').val(),
				"idc_phone":$('#idc_phone').val(),
				"idc_address":$('#idc_address').val(),
				"idc_network":$('#idc_network').val(),
				"idc_desc":$('#idc_desc').val()
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
                    text:'机房添加成功',
                    type:'Sueccess',
                    styling:'bootstrap3'
                });
                RefreshTable('idcAssetsTable', '/api/idc/');
                $('#addIDCModal').modal("hide");
            }
        });
    });

    //机房修改
    $('#idcAssetsTable tbody').on('click',"button[name='btn-idc-modf']", function(){
    	var vIds = $(this).val();
    	var td = $(this).parent().parent().parent().find("td")
    	var zone = td.eq(1).text();
    	var idc_name = td.eq(2).text();
    	var idc_bandwidth = td.eq(3).text();
    	var idc_contact = td.eq(4).text();
    	var idc_phone = td.eq(5).text();
    	var idc_address = td.eq(6).text();
    	var idc_network = td.eq(7).text();
    	var idc_desc = td.eq(8).text();
        $.confirm({
            icon: 'fa fa-edit',
            type: 'blue',
            title: '修改数据',
            content: '<form  data-parsley-validate class="form-horizontal form-label-left">' +
    		            '<div class="form-group">' +
    		              '<label class="control-label col-md-4 col-sm-3 col-xs-12" for="last-name">机房名称<span class="required">*</span>' +
    		              '</label>' +
    		              '<div class="col-md-6 col-sm-6 col-xs-12">' +
    		                '<input type="text"  name="modf_idc_name" value="'+ idc_name +'" required="required" class="form-control col-md-7 col-xs-12">' +
    		              '</div>' +
    		            '</div>' +
    		             '<div class="form-group">' +
    		              '<label class="control-label col-md-4 col-sm-3 col-xs-12" for="last-name">机房带宽<span class="required">*</span>' +
    		              '</label>' +
    		              '<div class="col-md-6 col-sm-6 col-xs-12">' +
    		                '<input type="text"  name="modf_idc_bandwidth" value="'+ idc_bandwidth +'" required="required" class="form-control col-md-7 col-xs-12">' +
    		              '</div>' +
    		            '</div>' +
    		            '<div class="form-group">' +
    		              '<label class="control-label col-md-4 col-sm-3 col-xs-12" for="last-name">联系人<span class="required">*</span>' +
    		              '</label>' +
    		              '<div class="col-md-6 col-sm-6 col-xs-12">' +
    		                '<input type="text"  name="modf_idc_contact" value="'+ idc_contact +'" required="required" class="form-control col-md-7 col-xs-12">' +
    		              '</div>' +
    		            '</div>' +
    		            '<div class="form-group">' +
    		              '<label class="control-label col-md-4 col-sm-3 col-xs-12" for="last-name">联系电话<span class="required">*</span>' +
    		              '</label>' +
    		              '<div class="col-md-6 col-sm-6 col-xs-12">' +
    		                '<input type="text"  name="modf_idc_phone" value="'+ idc_phone +'" required="required" class="form-control col-md-7 col-xs-12">' +
    		              '</div>' +
    		            '</div>' +
    		            '<div class="form-group">' +
    		              '<label class="control-label col-md-4 col-sm-3 col-xs-12" for="last-name">机房地址<span class="required">*</span>' +
    		              '</label>' +
    		              '<div class="col-md-6 col-sm-6 col-xs-12">' +
    		                '<input type="text"  name="modf_idc_address" value="'+ idc_address +'" required="required" class="form-control col-md-7 col-xs-12">' +
    		              '</div>' +
    		            '</div>' +
    		            '<div class="form-group">' +
    		              '<label class="control-label col-md-4 col-sm-3 col-xs-12" for="last-name">IP地址段<span class="required">*</span>' +
    		              '</label>' +
    		              '<div class="col-md-6 col-sm-6 col-xs-12">' +
    		                '<input type="text"  name="modf_idc_network" value="'+ idc_network +'" required="required" class="form-control col-md-7 col-xs-12">' +
    		              '</div>' +
    		            '</div>' +
    		            '<div class="form-group">' +
    		              '<label class="control-label col-md-4 col-sm-3 col-xs-12" for="last-name">备注<span class="required">*</span>' +
    		              '</label>' +
    		              '<div class="col-md-6 col-sm-6 col-xs-12">' +
    		                '<input type="text"  name="modf_idc_desc" value="'+ idc_desc +'" required="required" class="form-control col-md-7 col-xs-12">' +
    		              '</div>' +
    		            '</div>' +
    		          '</form>',
            buttons: {
                '取消': function() {},
                '修改': {
                    btnClass: 'btn-blue',
                    action: function() {
                        var zone = this.$content.find("[name='modf_zone_name']").val();
                        var idc_name = this.$content.find("[name='modf_idc_name']").val();
                        var idc_bandwidth = this.$content.find("[name='modf_idc_bandwidth']").val();
                        var idc_contact = this.$content.find("[name='modf_idc_contact']").val();
                        var idc_phone = this.$content.find("[name='modf_idc_phone']").val();
                        var idc_address = this.$content.find("[name='modf_idc_address']").val();
                        var idc_network = this.$content.find("[name='modf_idc_network']").val();
                        var idc_desc = this.$content.find("[name='modf_idc_desc']").val();


    			    	$.ajax({
    			            cache: true,
    			            type: "PUT",
    			            url:"/api/idc/" + vIds + '/',
    			            data:{
    			            	"zone":zone,
    			            	"idc_name":idc_name,
    			            	"idc_bandwidth":idc_bandwidth,
    			            	"idc_contact":idc_contact,
    			            	"idc_phone":idc_phone,
    			            	"idc_address":idc_address,
    			            	"idc_network":idc_network,
                                "idc_desc":idc_desc
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
    			            	RefreshTable('idcAssetsTable', '/api/idc/');
    			            }
    			    	});
                    }
                }
            }
        });
    });

        //机房删除
    $('#idcAssetsTable tbody').on('click',"button[name='btn-idc-confirm']", function(){
    	var vIds = $(this).val();
    	var idcName = $(this).parent().parent().parent().find("td").eq(2).text();
        $.confirm({
            icon: 'fa fa-edit',
            type: 'red',
            title: '删除确认',
            content: "删除标签：【"+idcName+"】",
            buttons: {
                '取消': function() {},
                '确认': {
                    btnClass: 'btn-blue',
                    action: function() {
    			    	$.ajax({
    			            cache: true,
    			            type: "DELETE",
    			            url:"/api/idc/" + vIds + '/',
    			            error: function(request) {
    			            	new PNotify({
    			                    title: 'Devops Failed!',
    			                    text: request.responseText,
    			                    type: 'error',
    			                    styling: 'bootstrap3'
    			                });
    			            },
    			            success: function(data) {
    			            	new PNotify({
    			                    title: 'Success!',
    			                    text: '机房删除成功',
    			                    type: 'success',
    			                    styling: 'bootstrap3'
    			                });
    			            	RefreshTable('idcAssetsTable', '/api/idc/');
    			            }
    			    	});
                    }
                }
            }
        });
    });

//区域添加
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

//区域修改
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

    //区域删除
    $('#zoneAssetsTable tbody').on('click',"button[name='btn-zone-confirm']", function(){
    	var vIds = $(this).val();
    	var zoneName = $(this).parent().parent().parent().find("td").eq(1).text();
        $.confirm({
            icon: 'fa fa-edit',
            type: 'red',
            title: '删除确认',
            content: "删除标签：【"+zoneName+"】",
            buttons: {
                '取消': function() {},
                '确认': {
                    btnClass: 'btn-blue',
                    action: function() {
    			    	$.ajax({
    			            cache: true,
    			            type: "DELETE",
    			            url:"/api/zone/" + vIds + '/',
    			            error: function(request) {
    			            	new PNotify({
    			                    title: 'Devops Failed!',
    			                    text: request.responseText,
    			                    type: 'error',
    			                    styling: 'bootstrap3'
    			                });
    			            },
    			            success: function(data) {
    			            	new PNotify({
    			                    title: 'Success!',
    			                    text: '区域删除成功',
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

    //显示idel表格，以及获取数据
function makeIdelTables(dataList){
//设置模板数据
    var columns = [
        {"data":"id"},
        {"data":"idc_name"},
        {"data":"assets_name"},
        {"data":"account"},
        {"data":"recorder"},
        {"data":"desc"},
        {"data":"record_time"},
    ]
    var columnDefs = [
   	    		        {
	    	    				targets: [7],
	    	    				render: function(data, type, row, meta) {
	    	                        return '<div class="btn-group  btn-group-xs">' +
		    	                           '<button type="button" name="btn-idel-modf" value="'+ row.id +'" class="btn btn-default"  aria-label="Justify"><span class="fa fa-edit" aria-hidden="true"></span>' +
		    	                           '</button>' +
		    	                           '<button type="button" name="btn-idel-confirm" value="'+ row.id +'" class="btn btn-default" aria-label="Justify"><span class="fa fa-trash" aria-hidden="true"></span>' +
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
                idc_list = requests('get',"/api/idc/");
                makeSelect("idc_idle_select","idc_name","idc",idc_list);
            	$('#addIdleModal').modal("show");
            }
        }]
        //设备模板数据后，调用InitDataTable()渲染页面
        InitDataTable('idleAssetsTable',dataList,buttons,columns,columnDefs)
     }
     var idelList = requests('get','/api/idel/');
     makeIdelTables(idelList);
//主页面按钮，idel添加
    $('#idlesubmit').on('click',function(){
        $.ajax({
            cache:true,
            type:"POST",
            url:"/api/idel/",
            contentType : "application/json",
			dataType : "json",
            data:JSON.stringify({
				"idc": $('#idc_idle_select option:selected').val(),
				"assets_name":$('#idle_name').val(),
				"account":$('#idle_number').val(),
				"desc":$('#idle_desc').val(),
			}),
            async:false,
            error: function(request) {
            	new PNotify({
                    title: 'Devops Failed!',
                    text: request.responseText,
                    type: 'error',
                    styling: 'bootstrap3'
                });
            },
            success:function(data){
                new PNotify({
                    title:"Success!",
                    text:'Idel添加成功',
                    type:'Sueccess',
                    styling:'bootstrap3'
                });
                RefreshTable('idleAssetsTable', '/api/idel/');
                $('#addIdleModal').modal("hide");
            }
        });
    });

});