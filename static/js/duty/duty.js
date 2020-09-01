     function makeDutyTables(dateStr){

        $.confirm({
            icon: 'fa fa-edit',
            type: 'blue',
            title: '添加数据',
            content: '<form  data-parsley-validate class="form-horizontal form-label-left">' +
    		            '<div class="form-group">' +
    		              '<label class="control-label col-md-4 col-sm-3 col-xs-12" for="last-name">姓名<span class="required">*</span>' +
    		              '</label>' +
    		              '<div class="col-md-6 col-sm-6 col-xs-12">' +
    		                '<input type="text"  name="name" value="'+ '张三' +'" required="required" class="form-control col-md-7 col-xs-12">' +
    		              '</div>' +
    		              '<label class="control-label col-md-4 col-sm-3 col-xs-12" for="last-name">电话<span class="required">*</span>' +
    		              '</label>' +
    		              '<div class="col-md-6 col-sm-6 col-xs-12">' +
    		                '<input type="text"  name="phone" value="'+ '137xxxxxxxx' +'" required="required" class="form-control col-md-7 col-xs-12">' +
    		              '</div>' +
    		              '<label class="control-label col-md-4 col-sm-3 col-xs-12" for="last-name">日期<span class="required">*</span>' +
    		              '</label>' +
    		              '<div class="col-md-6 col-sm-6 col-xs-12">' +
    		                '<input type="text"  name="dateStr" value="'+ dateStr +'" required="required" class="form-control col-md-7 col-xs-12">' +
    		              '</div>' +
    		            '</div>' +
    		          '</form>',
            buttons: {
                '取消': function() {},
                '添加': {
                    btnClass: 'btn-blue',
                    action: function() {
                        var name = this.$content.find("[name='name']").val();
                        var phone = this.$content.find("[name='phone']").val();
                        var dateStr = this.$content.find("[name='dateStr']").val();
    			    	$.ajax({
    			            cache: true,
    			            type: "POST",
    			            url:"/api/duty/",
    			            data:{
    			            	"phone":phone,
    			            	"name":name,
    			            	"start":dateStr,
    			            	},
    			            error: function(request) {
    			            	new PNotify({
    			                    title: 'Devops Failed!',
    			                    text: request.responseText,
    			                    type: 'error',
    			                    styling: 'bootstrap3'
    			                });
    			            },
    			            success: function(data) {
    			            loadfull();
    			            	new PNotify({
    			                    title: 'Success!',
    			                    text: '修改成功',
    			                    type: 'success',
    			                    styling: 'bootstrap3'
    			                });

    			            }
    			    	});
                    }
                }
            }
        });
    }