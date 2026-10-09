(() => {
  "use strict";

  const status = document.querySelector("#status");
  const resultBox = document.querySelector("#result");
  const resultText = document.querySelector("#resultText");
  const historyList = document.querySelector("#historyList");
  const manualForm = document.querySelector("#manualForm");
  const manualInput = document.querySelector("#manualInput");
  const copyBtn = document.querySelector("#copyBtn");
  const clearBtn = document.querySelector("#clearBtn");

  let lastScanned = "";
  let scans = [];
  let scanner = null;
  let lastAcceptedAt = 0;

  function setStatus(message) {
    status.textContent = message;
  }

  function addScan(rawValue) {
    const value = String(rawValue ?? "").trim();
    if (!value) {
      setStatus("Please enter or scan a non-empty code.");
      return;
    }

    // Avoid adding the same code repeatedly while it remains in view.
    const now = Date.now();
    if (value === lastScanned && now - lastAcceptedAt < 1800) return;
    lastScanned = value;
    lastAcceptedAt = now;

    resultText.textContent = value;
    resultBox.hidden = false;
    scans.unshift({ value, time: new Date().toLocaleString() });
    scans = scans.slice(0, 50);
    renderHistory();
    setStatus("Code detected successfully.");
  }

  function renderHistory() {
    historyList.replaceChildren();
    if (!scans.length) {
      const li = document.createElement("li");
      li.className = "muted";
      li.textContent = "No scans yet.";
      historyList.append(li);
      return;
    }

    scans.forEach((scan) => {
      const li = document.createElement("li");
      li.append(document.createTextNode(scan.value));
      const time = document.createElement("span");
      time.className = "scan-time";
      time.textContent = scan.time;
      li.append(time);
      historyList.append(li);
    });
  }

  manualForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addScan(manualInput.value);
    manualInput.value = "";
    manualInput.focus();
  });

  copyBtn.addEventListener("click", async () => {
    if (!lastScanned) return;
    try {
      await navigator.clipboard.writeText(lastScanned);
      setStatus("Result copied to clipboard.");
    } catch {
      setStatus("Clipboard access was blocked. Select the result and copy it manually.");
    }
  });

  clearBtn.addEventListener("click", () => {
    scans = [];
    lastScanned = "";
    resultBox.hidden = true;
    renderHistory();
    setStatus("Scan history cleared.");
  });

  function startScanner() {
    if (typeof Html5Qrcode === "undefined") {
      setStatus("Scanner library did not load. Check your internet connection and reload.");
      return;
    }

    const formats = [
      Html5QrcodeSupportedFormats.QR_CODE,
      Html5QrcodeSupportedFormats.CODE_128,
      Html5QrcodeSupportedFormats.CODE_39,
      Html5QrcodeSupportedFormats.CODE_93,
      Html5QrcodeSupportedFormats.CODABAR,
      Html5QrcodeSupportedFormats.EAN_13,
      Html5QrcodeSupportedFormats.EAN_8,
      Html5QrcodeSupportedFormats.UPC_A,
      Html5QrcodeSupportedFormats.UPC_E,
      Html5QrcodeSupportedFormats.ITF
    ];

    scanner = new Html5Qrcode("reader", { formatsToSupport: formats });
    scanner.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: { width: 280, height: 180 }, aspectRatio: 1.0 },
      (decodedText) => addScan(decodedText),
      () => {} // Normal "not found in this frame" messages are ignored.
    ).then(() => {
      setStatus("Camera is running. Point it at a QR code or barcode.");
    }).catch((error) => {
      console.error(error);
      setStatus("Camera could not start. Allow camera access and open this page using localhost or HTTPS.");
    });
  }

  startScanner();
})();
