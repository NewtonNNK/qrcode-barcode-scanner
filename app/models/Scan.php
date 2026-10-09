<?php
declare(strict_types=1);

/**
 * Model for scan records.
 * Version 1 keeps history in the browser; database persistence comes in the
 * next stage. This class prepares a safe, empty server-side history source.
 */
class Scan
{
    public function getRecent(int $limit = 10): array
    {
        // No database is required for the first MVC milestone.
        return [];
    }
}
