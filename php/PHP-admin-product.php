<?php
require_once 'DataProvider.php';
if(isset($_POST['action']) && !empty($_POST['action'])) {
    $action = $_POST['action'];
    switch($action) {
		case 'addProduct': addProduct();break;
		case 'editProduct': editProduct();break;
		case 'deleteProduct': deleteProduct();break;
		case 'uploadImage': uploadImage();break;
		case 'deleteImage': deleteImage();break;
		case 'toggleActive': toggleActive();break;
		
    }
}

function addProduct(){
	$name = addslashes($_POST['name']);
	$type = addslashes($_POST['type']);
	$quantity = addslashes($_POST['quantity']);
	$NoP = addslashes($_POST['NoP']);
	$NoPsg = addslashes($_POST['NoPsg']);
	$time = addslashes($_POST['time']);
	$age = addslashes($_POST['age']);
	$description = addslashes($_POST['description']);
	$price = addslashes($_POST['price']);
	$status = addslashes($_POST['status']);
	$category = addslashes($_POST['category']);
	
	$extension = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
	$filename = md5(time().$_FILES['file']['name']);
	$filename = $filename .".". $extension;
	
	move_uploaded_file($_FILES['file']['tmp_name'], '../img/sanpham/'.$filename);
	$sql = "INSERT INTO product(Name, Category, Price, NoP, NoPsg, Time, Age, Description, Type, Quantity , Pic, Status) VALUES(" .
			"'" .$name. "'," . 
			"'" .$category. "'," . 
			"'" .$price. "'," . 
			"'" .$NoP. "'," . 
			"'" .$NoPsg. "'," . 
			"'" .$time. "',".
			"'" .$age. "',".
			"'" .$description. "',".
			"'" .$type. "',".
			"'" .$quantity. "',".
			"'" .$filename. "',".
			"'" .$status. "')";
	DataProvider::executeQuery($sql);
	die("0");
}
function editProduct(){
	$id = addslashes($_POST['id']);
	$name = addslashes($_POST['name']);
	$type = addslashes($_POST['type']);
	$quantity = addslashes($_POST['quantity']);
	$NoP = addslashes($_POST['NoP']);
	$NoPsg = addslashes($_POST['NoPsg']);
	$time = addslashes($_POST['time']);
	$age = addslashes($_POST['age']);
	$category = addslashes($_POST['category']);
	$description = addslashes($_POST['description']);
	$price = addslashes($_POST['price']);
	$status = addslashes($_POST['status']);
	$havePic = $_POST['havePic'];
	
	$sql = "UPDATE product SET" .
		" Name='". $name . "',".
		" Category='". $category . "',".
		" Price='" . $price . "'," . 
		" NoP='" . $NoP . "'," . 
		" NoPsg='" . $NoPsg . "'," . 
		" Time='" . $time . "',".
		" Age='". $age . "',".
		" Description='". $description . "',".
		" Type='". $type . "',".
		" Quantity='". $quantity . "',".
		" Status='". $status . "'";
	
	if( $havePic == "true"){
		$extension = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
		$filename = md5(time().$_FILES['file']['name']);
		$filename = $filename .".". $extension;
		
		move_uploaded_file($_FILES['file']['tmp_name'], '../img/sanpham/'.$filename);
		$sql .=", Pic='".$filename."'";
	}
	
	$sql .=" WHERE ID='" . $id . "';";
	DataProvider::executeQuery($sql);
	die("0");
}
function deleteProduct(){
	$id = addslashes($_POST['id']);
	$sql =" DELETE FROM product where ID='" . $id . "';";
	DataProvider::executeQuery($sql);
	die("0");
}
function uploadImage(){
	$productID = addslashes($_POST['productID']);
	$countfiles = count($_FILES['files']['name']);
	$sql ="INSERT INTO images(ID, ProductID, Image) VALUES";
	for($i = 0;$i < $countfiles;$i++){
		//Change name each of image
		$extension = pathinfo($_FILES['files']['name'][$i], PATHINFO_EXTENSION);
		$filename = md5(time().$_FILES['files']['name'][$i]);
		$filename = $filename .".". $extension;

		move_uploaded_file($_FILES['files']['tmp_name'][$i], '../img/sanpham/'.$filename);
		$sql .="(NULL, '".$productID."', '".$filename."')";
		if( $i != $countfiles-1)
			$sql .=",";
	}
	DataProvider::executeQuery($sql);
	$sql = "SELECT * FROM images Where ProductID='".$productID."' order by ID asc";
	$result = DataProvider::executeQuery($sql);
	$allPictures = array();
	while ($row = mysqli_fetch_array($result))
	{
		$allPictures[] = array(
			"ProductID" => $row['ProductID'],
			"ID" => $row['ID'],
			"Image" => $row['Image']
		);
	}
	echo json_encode($allPictures);
}
function deleteImage(){
	$id = addslashes($_POST['id']);
	$productID = addslashes($_POST['productID']);
	$sql =" DELETE FROM hinh where ID='" . $id . "';";
	DataProvider::executeQuery($sql);

	$sql = "SELECT * FROM images Where ProductID='".$productID."' order by ID asc";
	$result = DataProvider::executeQuery($sql);
	while ($row = mysqli_fetch_array($result))
	{
		$allPictures[] = array(
			"ProductID" => $row['ProductID'],
			"ID" => $row['ID'],
			"Image" => $row['Image']
		);
	}
	echo json_encode($allPictures);
}
function toggleActive(){
	$status = addslashes($_POST['status']);
	$id = addslashes($_POST['id']);
	$sql =" UPDATE product set Status = ".$status." where ID='".$id."'";
	DataProvider::executeQuery($sql);
	die('0');
}

?>
