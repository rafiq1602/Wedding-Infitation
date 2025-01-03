<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $attendance = htmlspecialchars($_POST['attendance']);
    $comment = htmlspecialchars($_POST['comment']);
    
    // Format komentar
    $commentData = "$name|$attendance|$comment\n";
    
    // Simpan komentar ke file
    file_put_contents('comments.txt', $commentData, FILE_APPEND);
    
    // Redirect kembali ke halaman utama
    header("Location: index.html");
    exit();
}
?>