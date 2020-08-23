
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

$(document).ready(function(){
    var zone_list = requests('get',"/api/zone/")
    $("#show").html(zone_list["zone_name"])
});