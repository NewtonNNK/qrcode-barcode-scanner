# QR & Barcode Reader — MVC Version 1

This beginner-friendly PHP project uses a simple MVC structure.

## Folder structure

```text
qr_barcode_mvc/
├── index.php
├── config/
│   └── config.php
├── app/
│   ├── controllers/
│   │   └── ScannerController.php
│   ├── models/
│   │   └── Scan.php
│   └── views/
│       └── scanner/
│           └── index.php
├── public/
│   └── assets/
│       ├── css/style.css
│       └── js/scanner.js
└── README.md
```

## Run using XAMPP

1. Extract this folder into `C:\xampp\htdocs\`.
2. Start **Apache** in XAMPP.
3. Open `http://localhost/qr_barcode_mvc/` in Chrome.
4. Allow camera permission.
5. Point the camera at a QR code or supported barcode.

You need an internet connection for the scanner library CDN in this version.

## How MVC is used

- **Model** — `app/models/Scan.php`: scan-related data operations. The first version uses in-memory browser history and does not yet save to a database.
- **View** — `app/views/scanner/index.php`: the HTML page.
- **Controller** — `app/controllers/ScannerController.php`: prepares data and loads the view.
- **Front controller** — `index.php`: entry point for the application.
- **Assets** — JavaScript camera/scanning behavior and CSS styling.

## Next milestone

Add MySQL tables and a PHP model/API so a scanned product barcode can look up a product name, price, and stock quantity. This is intentionally not connected to a database yet.
