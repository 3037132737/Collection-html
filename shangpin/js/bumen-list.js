var size=8;
var total=null;
var coun=null;


		function exportExcel() {
			//alert("开始")
			$.ajax({
				type: "POST",
				url: "http://localhost:8080/Maven_Project/record/exportExcel.action",
				success: function(data) {
					//alert("导出成功")
					window.location.href = encodeURI("http://localhost:8080/Maven_Project/record/exportExcel.action");
				},
				//请求失败，包含具体的错误信息
				error: function(e) {
					//alert("导出异常")
				}
			});
		}
	function queryDepAll(page,size){
			$("#tab").append("")
			$.ajax({
				//请求方式
				type: "GET",
				//请求头
				dataType: "json",
				//请求地址
		
				url: "http://localhost:8080/Maven_Project/record/all.action",
				data:{
					"page":page,
					"size":size
				},
				//数据，json字符串
				//请求成功
				success: function(data) {
//					let recent = data;
					let recent  = data.data.list;
					console.log(recent)
					coun=recent.length;
					//alert(coun)
					for(let i = 0; i < recent.length; i++) {
						if(i<=size){
						$("#tab").append(shuzhi((i + 1), recent[i].cr_id, recent[i].uName, recent[i].cr_money, recent[i].w_name, recent[i].cr_time, recent[i].cr_remark))
						}
					}
				},
				//请求失败，包含具体的错误信息
				error: function(e) {
					console.log(e)
				}
			});
		
		
	}

		function chaxun(page,size) {
//			alert("条件查询")
			document.getElementById("tab").innerHTML = "";
			$.ajax({
				type: "POST",
				url: "http://localhost:8080/Maven_Project/record/queryByName.action",
				data: {
					"uName": $("#uName").val(),
					"page":page,
					"size":size
				},
				success: function(data) {
					let recent = data.list;
					//alert(recent)
					console.log(recent)
					//alert(recent.data.list.length)
					
					for(let i = 0; i < recent.length; i++) {
					$("#tab").append(shuzhi((i + 1), recent[i].cr_id, recent[i].uName, recent[i].cr_money, recent[i].w_name, recent[i].cr_time, recent[i].cr_remark));	 
					}
				},
				//请求失败，包含具体的错误信息
				error: function(e) {
					alert("没有该用户")
				}
			});
		}

		function shuzhi(num, cr_id, uName, cr_money, w_name, cr_time, cr_remark) {

			var data = "<tr>\n" +
				"<td id='cr_id'>" + num + '</td>' +
				"<td>" + uName + '</td>' +
				"<td>" + cr_money + "</td>" +
				"<td>" + w_name + "</td>" +
				"<td>" + cr_time + "</td>" +
				"<td>" + cr_remark + "</td>" +
				"<td>" + 
//				"<a class='layui-btn layui-btn-warm' href='javascript:edit(" + cr_id + ")' >修改</a>" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
				"<a class='layui-btn layui-btn-danger'  href=\"javascript:remove('" + cr_id + "')\"  >删除<\a>"+ "</td>" +
				"\n</tr>"

			//$("#tab").append(data);
			return data;

		}
		
		/*获取修改id并跳转页面*/
		function edit(cr_id) {
			var idValue = cr_id;
			window.sessionStorage.setItem("cr_id", idValue);
			// 转跳至修改界面
			window.location.href = "admin-edit.html"
		}

		function remove(cr_id) {
//			alert("shanchu")
			if(confirm("确定删除数据吗？")) {

				$.ajax({
					type: "get",
					url: "http://localhost:8080/Maven_Project/record/delete.action",
					async: true,
					data: {
						"cr_id": cr_id
					},
					success: function(data) {
						location.reload();
						//getPage(1);
					},

				});
			}
		}

		/*用户-停用*/
		function member_stop(obj, id) {
			layer.confirm('确认要停用吗？',
				function(index) {

					if($(obj).attr('title') == '启用') {

						//发异步把用户状态进行更改
						$(obj).attr('title', '停用');
						$(obj).find('i').html('&#xe62f;');

						$(obj).parents("tr").find(".td-status").find('span').addClass('layui-btn-disabled').html('已停用');
						layer.msg('已停用!', {
							icon: 5,
							time: 1000
						});

					} else {
						$(obj).attr('title', '启用');
						$(obj).find('i').html('&#xe601;');

						$(obj).parents("tr").find(".td-status").find('span').removeClass('layui-btn-disabled').html('已启用');
						layer.msg('已启用!', {
							icon: 5,
							time: 1000
						});
					}

				});
		}

		/*用户-删除*/
		function member_del(obj, id) {
			layer.confirm('确认要删除吗？',
				function(index) {
					//发异步删除数据
					$(obj).parents("tr").remove();
					layer.msg('已删除!', {
						icon: 1,
						time: 1000
					});
				});
		}









layui.use(['laypage', 'layer'], function() {
		var laypage = layui.laypage //分页 
		var layer = layui.layer //弹层
//		queryDepAll(1,size);
		
		//分页
		laypage.render({
			elem: 'pageDemo', //分页容器的id
			count: 20, //数据总数量
			limit: size,
			skin: '#1E9FFF', //自定义选中色值
			//,skip: true //开启跳页
			jump: function(obj, first) {
				$("#tab").empty();
				queryDepAll(obj.curr, size)
				if (!first) {
					layer.msg('第' + obj.curr + '页', {
						offset: 'b'
					});
				}
			}
		});
		

});


function forpage(page,size){
	
		var laypage = layui.laypage //分页 
		var layer = layui.layer //弹层
//		queryDepAll(1,size);
		chaxun(page,size);
		//分页
		laypage.render({
			elem: 'pageDemo', //分页容器的id
			count: 20, //数据总数量
			limit: size,
			skin: '#1E9FFF', //自定义选中色值
			//,skip: true //开启跳页
			jump: function(obj, first) {
				$("#tab").empty();
				chaxun(obj.curr, size)
				if (!first) {
					layer.msg('第' + obj.curr + '页', {
						offset: 'b'
					});
				}
			}
		});
	
}
