var size=10;
var total=null;


// 部门查询
function queryDepAll(page,size){
	$("#depsTbody").html("");
	$.ajax({
	    url: "http://localhost:8080/SchoolAssets/dep/all/"+page+"/"+size,
	    type:"GET",
	    data:{},
		dataType:"json",
	    timeout: 5000, //超时时间设置， 单位毫秒
	    async: false, //是否异步
	    success: function(data){
	    	console.log(data);
	    	total=data.data.total;
	    	console.log(total);
			data.data.list.forEach(item =>{
				$("#depsTbody").append(insertElements(item.dep_id,item.dep_name,item.dep_des));
			})
		},
	    error: function(e) {
	        console.log(e)
	    }
	});
}
//喷数据
function insertElements(dep_id,dep_name,dep_des){
	var tab=['<tr>',
'            <td>',
'              <div class="layui-unselect layui-form-checkbox" lay-skin="primary" data-id=\'2\'><i class="layui-icon">&#xe605;</i></div>',
'            </td>',
'            <td>'+dep_id+'</td>',
'            <td>'+dep_name+'</td>',
'            <td>'+dep_des+'</td>',
'            <td class="td-manage">',
'              <a onclick="x_admin_show(\'修改\',\'bumen-eidit.html?dep_id='+dep_id+'\',600,400)" title="密码" href="javascript:;">',
'                <i class="layui-icon">&#xe631;</i>',
'              </a>',
'              <a title="删除" onclick="dep_del(this,\''+dep_id+'\')" href="javascript:;">',
'                <i class="layui-icon">&#xe640;</i>',
'              </a>',
'            </td>',
'          </tr>'].join("");
          return tab;
}

//删除
function dep_del(obj,id){
  layer.confirm('确认要删除吗？',function(index){
	  //发异步删除数据
	  
	  $.ajax({
	      url: "http://localhost:8080/SchoolAssets/dep/" + id,
	      type:"POST",
	      data:{_method:"DELETE"},
		  dataType:"json",
	      timeout: 5000, //超时时间设置， 单位毫秒
	      async: true, //是否异步
	      success: function(data){
			  console.log(data)
		  },
	      error: function(e) {
	          console.log(e)
	      }
	  });
	  $(obj).parents("tr").remove();
	  layer.msg('已删除!',{icon:1,time:1000});
  });
}

layui.use(['laypage', 'layer'], function() {
		var laypage = layui.laypage //分页 
		var layer = layui.layer //弹层
		queryDepAll(1,size);
		
		//分页
		laypage.render({
			elem: 'pageDemo', //分页容器的id
			count: total, //数据总数量
			limit: size,
			skin: '#1E9FFF', //自定义选中色值
			//,skip: true //开启跳页
			jump: function(obj, first) {
				$("#empsTbody").empty();
				queryDepAll(obj.curr, size)
				if (!first) {
					layer.msg('第' + obj.curr + '页', {
						offset: 'b'
					});
				}
			}
		});
		
});