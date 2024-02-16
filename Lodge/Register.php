<?php
include 'DBConfig.php';

$json = file_get_contents('php://input');
$obj = json_decode($json, true);

$slno = $obj['slno'];
$regno = $obj['regno'];
$rglsino = $obj['rglsino'];
$title = $obj['title'];
$name = $obj['name'];
$password = $obj['password'];
$dob = $obj['dob'];
$stsDt = $obj['stsDt'];
$stsType = $obj['stsType'];
$master = $obj['master'];
$rgRank = $obj['rgRank'];
$gRank = $obj['gRank'];
$mobile = $obj['mobile'];
$email = $obj['email'];
$Address = $obj['Address'];
$memberDegrees = $obj['memberDegrees'];

$CheckSQL = "SELECT * FROM Lodge WHERE Email='$email'";
$check = mysqli_fetch_array(mysqli_query($con, $CheckSQL));

if (isset($check)) {
    $EmailExistMSG = 'Email Already Exist, Please Try Again !!!';
    $EmailExistJson = json_encode($EmailExistMSG);
    echo $EmailExistJson;
} else {
    $Sql_Query = "INSERT INTO Lodge (Sl_no, Reg_No, Name, Password, Mobile, Email, Address, RGLSI_Id, Title, DOB, Sts_Dt, Sts_Type, Master, RG_Rank, G_Rank, member_Degrees) 
                  VALUES ('$slno', '$regno', '$name', '$password', '$mobile', '$email', '$Address', '$rglsino', '$title', '$dob', '$stsDt', '$stsType', '$master', '$rgRank', '$gRank', '$memberDegrees' )";
    
    

   
    $result = mysqli_query($con, $Sql_Query);
    
    if ($result) {
        $MSG = 'User Registered Successfully';
        $json = json_encode($MSG);
        echo $json;
    } else {
        echo 'Error: ' . mysqli_error($con);
    }
}

mysqli_close($con);
?>
