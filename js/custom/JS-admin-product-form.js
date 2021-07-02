function toggleDisableSttInput(){
	if(document.getElementById("sttSelection1").checked){
		document.getElementById("product-form").stt.disabled = true;
	}
	if(document.getElementById("sttSelection2").checked){
		document.getElementById("product-form").stt.disabled = false;
	}
}
function addProduct(){
	var name = document.getElementById("product-form").name;
	var type = document.getElementById("product-form").type;
	var quantity = document.getElementById("product-form").quantity;
	var NoP = document.getElementById("product-form").NoP;
	var NoPsg = document.getElementById("product-form").NoPsg;
	var time = document.getElementById("product-form").time;
	var age = document.getElementById("product-form").age;
	var description = document.getElementById("product-form").description;
	var price = document.getElementById("product-form").price;
	var status = document.getElementById("product-form").status;
	var image = document.getElementById("product-form").image;
	var category = document.getElementById("product-form").category;
	
	var form_data = new FormData();
	
	if (name.value==""){
		alert("Tên sản phẩm không được để trống!");
		name.focus();
		return;
	}

	if (quantity.value==""){
		alert("Số lượng sản phẩm không được để trống!");
		quantity.focus();
		return;
	} else {
		var format = /^([0-9]{1,10})$/;
		if(format.test(quantity.value)==false){
			alert("Số lượng sản phẩm không hợp lệ");
			quantity.focus();
			return;	
		}
	}

	if (NoP.value==""){
		alert("Số người chơi không được để trống!");
		NoP.focus();
		return;
	} else {
		var format = /(^([0-9]{1,2})$)|(^([0-9]{1,2} - [0-9]{1,3})$)/;
		if(format.test(NoP.value)==false){
			alert("Số người chơi không hợp lệ! VD: 2 - 5");
			NoP.focus();
			return;	
		}
	}
	
	if (NoPsg.value==""){
		alert("Số người chơi lý tưởng không được để trống!");
		NoPsg.focus();
		return;
	} else {
		var format = /(^([0-9]{1,2})$)|(^([0-9]{1,2} - [0-9]{1,3})$)/;
		if(format.test(NoPsg.value)==false){
			alert("Số người chơi lý tưởng không hợp lệ! VD: 2 - 5");
			NoPsg.focus();
			return;	
		}
	}
	
	if (time.value==""){
		alert("Thời gian chơi không được để trống!");
		time.focus();
		return;
	} else {
		var format = /(^([0-9]{1,3})$)|(^([0-9]{1,3}-[0-9]{1,3})$)|(^(...)$)/;
		if(format.test(time.value)==false){
			alert("Thời gian chơi không hợp lệ");
			time.focus();
			return;	
		}
	}
	
	if (age.value==""){
		alert("Độ tuổi không được để trống! ");
		age.focus();
		return;
	} else {
		var format = /^([0-9]{1,2})[+]$/;
		if(format.test(age.value)==false){
			alert("Độ tuổi không hợp lệ! VD: 8+");
			age.focus();
			return;	
		}
	}

	if (description.value==""){
		alert("Mô tả sản phẩm không được để trống!");
		description.focus();
		return;
	}
	
	if (price.value==""){
		alert("Giá sản phẩm không được để trống!");
		price.focus();
		return;
	} else {
		var format = /^([0-9]{1,10})$/;
		if(format.test(price.value)==false){
			alert("Giá sản phẩm không hợp lệ");
			price.focus();
			return;	
		}
	}
	
	if ( image.files.length == 0 ||  image.files.length > 1){
		alert("Xin chọn 1 ảnh");
		image.focus();
		return;
	} else {
		var test_value = image.files[0].name;
		var extension = test_value.split('.').pop().toLowerCase();

		if ($.inArray(extension, ['png', 'gif', 'jpeg', 'jpg']) == -1) {
		  alert("File ảnh không hợp lệ!");
		  image.focus();
		  return;
		}
	}
	
	var file_data = document.getElementById("image").files[0];
	
	form_data.append('action','addProduct');
	form_data.append('file', file_data);
	form_data.append('name',name.value);
	form_data.append('type',type.value);
	form_data.append('quantity',quantity.value);
	form_data.append('NoP',NoP.value);
	form_data.append('NoPsg',NoPsg.value);
	form_data.append('time',time.value);
	form_data.append('age',age.value);
	form_data.append('price',price.value);
	form_data.append('status',status.value);
	form_data.append('category',category.value);
	form_data.append('description',description.value);
	
	jQuery.ajax({
		type: "POST",
		url: '../php/PHP-admin-product.php',
		dataType: 'text',
		cache: false,
		contentType: false,
		processData: false,
		data : form_data,
		success:function(res){
			switch(res){
				case "0":{
					alert("Thêm sản phẩm thành công!");
					document.getElementById("product-form").reset();
					window.location.href = "product.php";
				}break;
			}
		}
	});
	
}

function editProduct(){
	var id = document.getElementById("product-form").id;
	var name = document.getElementById("product-form").name;
	var type = document.getElementById("product-form").type;
	var quantity = document.getElementById("product-form").quantity;
	var NoP = document.getElementById("product-form").NoP;
	var NoPsg = document.getElementById("product-form").NoPsg;
	var time = document.getElementById("product-form").time;
	var age = document.getElementById("product-form").age;
	var description = document.getElementById("product-form").description;
	var price = document.getElementById("product-form").price;
	var status = document.getElementById("product-form").status;
	var image = document.getElementById("product-form").image;
	var category = document.getElementById("product-form").category;
	
	var form_data = new FormData();
	
	if (name.value==""){
		alert("Tên sản phẩm không được để trống!");
		name.focus();
		return;
	}

	if (quantity.value==""){
		alert("Số lượng sản phẩm không được để trống!");
		quantity.focus();
		return;
	} else {
		var format = /^([0-9]{1,10})$/;
		if(format.test(quantity.value)==false){
			alert("Số lượng sản phẩm không hợp lệ");
			quantity.focus();
			return;	
		}
	}

	if (NoP.value==""){
		alert("Số người chơi không được để trống!");
		NoP.focus();
		return;
	} else {
		var format = /(^([0-9]{1,2})$)|(^([0-9]{1,2} - [0-9]{1,3})$)/;
		if(format.test(NoP.value)==false){
			alert("Số người chơi không hợp lệ! VD: 1 hoặc 2 - 5");
			NoP.focus();
			return;	
		}
	}
	
	if (NoPsg.value==""){
		alert("Số người chơi lý tưởng không được để trống!");
		NoPsg.focus();
		return;
	} else {
		var format = /(^([0-9]{1,2})$)|(^([0-9]{1,2} - [0-9]{1,3})$)/;
		if(format.test(NoPsg.value)==false){
			alert("Số người chơi lý tưởng không hợp lệ! VD: 1 hoặc 2 - 5");
			NoPsg.focus();
			return;	
		}
	}
	
	if (time.value==""){
		alert("Thời gian chơi không được để trống!");
		time.focus();
		return;
	} else {
		var format = /(^([0-9]{1,3})$)|(^([0-9]{1,3} - [0-9]{1,3})$)|(^(...)$)/;
		if(format.test(time.value)==false){
			alert("Thời gian chơi không hợp lệ");
			time.focus();
			return;	
		}
	}
	
	if (age.value==""){
		alert("Độ tuổi không được để trống! ");
		age.focus();
		return;
	} else {
		var format = /^([0-9]{1,2})[+]$/;
		if(format.test(age.value)==false){
			alert("Độ tuổi không hợp lệ! VD: 8+");
			age.focus();
			return;	
		}
	}

	if (description.value==""){
		alert("Mô tả sản phẩm không được để trống!");
		description.focus();
		return;
	}
	
	if (price.value==""){
		alert("Giá sản phẩm không được để trống!");
		price.focus();
		return;
	} else {
		var format = /^([0-9]{1,10})$/;
		if(format.test(price.value)==false){
			alert("Giá sản phẩm không hợp lệ");
			price.focus();
			return;	
		}
	}

	
	if ( image.files.length == 1){
		var test_value = image.files[0].name;
		var extension = test_value.split('.').pop().toLowerCase();
		if ($.inArray(extension, ['png','jpeg', 'jpg']) == -1) {
		  alert("File ảnh không hợp lệ! Ảnh phải là file PNG, JPEG, JPG");
		  image.focus();
		  return;
		}
		var file_data = document.getElementById("image").files[0];
		form_data.append('havePic','true');
	} else {
		var file_data = "";
		form_data.append('havePic','false');
	}
	
	form_data.append('action','editProduct');
	form_data.append('file', file_data);
	form_data.append('id',id.value);
	form_data.append('name',name.value);
	form_data.append('type',type.value);
	form_data.append('quantity',quantity.value);
	form_data.append('NoP',NoP.value);
	form_data.append('NoPsg',NoPsg.value);
	form_data.append('time',time.value);
	form_data.append('age',age.value);
	form_data.append('price',price.value);
	form_data.append('status',status.value);
	form_data.append('category',category.value);
	form_data.append('description',description.value);
	
	jQuery.ajax({
		type: "POST",
		url: '../php/PHP-admin-product.php',
		dataType: 'text',
		cache: false,
		contentType: false,
		processData: false,
		data : form_data,
		success:function(res){
			switch(res){
				case "0":{
					alert("Lưu thông tin thành công!");
					document.getElementById("product-form").reset();
					window.location.href = "product.php";
				}break;
			}
		}
	});
	
}
function deleteProduct(id){
	var r = confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?");
	if (r == true) {
		var form_data = new FormData();
		form_data.append('id',id);
		form_data.append('action','deleteProduct');
		
		jQuery.ajax({
			type: "POST",
			url: '../php/PHP-admin-product.php',
			dataType: 'text',
			cache: false,
			contentType: false,
			processData: false,
			data : form_data,
			success:function(res){
				switch(res){
					case "0":{
						alert("Xóa sản phẩm thành công!");
						if(window.location.href.includes("productform.php")){
							document.getElementById("product-form").reset();
							window.location.href = "product.php";
						} else {
							location.reload();
						}
					}break;
				}
			}
		});
	} else {}
}
function toggleActive(status,id){
	if (status == 0)
		var r = confirm("Bạn có chắc chắn muốn bất hoạt sản phẩm này không?");
	else 
		var r = confirm("Bạn có chắc chắn muốn kích hoạt sản phẩm này không?");
	if (r == true) {
		var form_data = new FormData();
		form_data.append('id',id);
		form_data.append('status',status);
		form_data.append('action','toggleActive');
		
		jQuery.ajax({
			type: "POST",
			url: '../php/PHP-admin-product.php',
			dataType: 'text',
			cache: false,
			contentType: false,
			processData: false,
			data : form_data,
			success:function(res){
				switch(res){
					case "0":{
						if (trangthai == 0)
							alert("Bất hoạt sản phẩm thành công!");
						else 
							alert("Kích hoạt sản phẩm thành công!");
						location.reload();
					}break;
				}
			}
		});
	} else {}
}