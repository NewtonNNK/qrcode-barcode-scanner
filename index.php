<?php
declare(strict_types=1);

// Tiny front controller: all requests enter here.
require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/app/models/Scan.php';
require_once __DIR__ . '/app/controllers/ScannerController.php';

$controller = new ScannerController();
$controller->index();
