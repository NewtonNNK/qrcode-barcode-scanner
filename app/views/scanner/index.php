<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= htmlspecialchars(APP_NAME, ENT_QUOTES, 'UTF-8') ?></title>
    <link rel="stylesheet" href="public/assets/css/style.css">
    <script src="https://unpkg.com/html5-qrcode" type="text/javascript"></script>
    <script defer src="public/assets/js/scanner.js"></script>
</head>
<body>
<main class="container">
    <section class="panel">
        <header>
            <p class="eyebrow">MVC starter project</p>
            <h1><?= htmlspecialchars(APP_NAME, ENT_QUOTES, 'UTF-8') ?></h1>
            <p class="muted">Scan QR codes and common product barcodes with your camera.</p>
        </header>

        <div id="reader" aria-label="Camera scanner"></div>
        <p id="status" class="status" role="status" aria-live="polite">
            Loading scanner…
        </p>

        <section id="result" class="result" hidden>
            <h2>Last result</h2>
            <p id="resultText" class="result-value"></p>
            <button id="copyBtn" type="button">Copy result</button>
        </section>

        <form id="manualForm" class="manual-form">
            <label for="manualInput">Enter a code manually</label>
            <div class="manual-row">
                <input id="manualInput" name="code" autocomplete="off" placeholder="e.g. 123456789012">
                <button type="submit">Add code</button>
            </div>
        </form>

        <section class="history">
            <div class="history-heading">
                <h2>Scan history</h2>
                <button id="clearBtn" type="button" class="button-muted">Clear</button>
            </div>
            <p class="muted small">History is kept in this page's memory for this first version.</p>
            <ol id="historyList"><li class="muted">No scans yet.</li></ol>
        </section>
    </section>
    <footer>Version 1 · Camera permission is required for live scanning.</footer>
</main>
</body>
</html>
