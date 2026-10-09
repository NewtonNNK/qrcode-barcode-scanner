<?php
declare(strict_types=1);

class ScannerController
{
    public function index(): void
    {
        $model = new Scan();
        $recentScans = $model->getRecent(10);

        require APP_ROOT . '/app/views/scanner/index.php';
    }
}
