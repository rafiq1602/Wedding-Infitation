<?php
if (file_exists('comments.txt')) {
    $comments = file('comments.txt');
    foreach ($comments as $comment) {
        list($name, $attendance, $text) = explode('|', trim($comment));
        echo "<div>";
        echo "<strong>" . htmlspecialchars($name) . "</strong> <em>(" . htmlspecialchars($attendance) . ")</em>";
        echo "<p>" . htmlspecialchars($text) . "</p>";
        echo "</div>";
    }
} else {
    echo "Tidak ada komentar.";
}
?>