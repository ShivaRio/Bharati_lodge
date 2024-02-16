<?php
include 'DBConfig.php';

$sql = "SELECT * FROM Lodge";
$result = $con->query($sql);

// Check if there are results
if ($result->num_rows > 0) {
    $members = array();

    // Fetch data and store it in an array
    while ($row = $result->fetch_assoc()) {
        $members[] = $row;
    }

    // Return the data as JSON
    echo json_encode($members);
} else {
    // If no data is found, return an empty array
    echo json_encode(array());
}

// Close the database connection
$con->close();



?>
 