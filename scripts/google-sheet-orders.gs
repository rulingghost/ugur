/**
 * MARBAR sipariş kaydı — Google Sheet'e yapıştırın:
 * 1) Yeni bir Google Sheet açın
 * 2) Uzantılar > Apps Script
 * 3) Bu dosyanın içeriğini yapıştırın
 * 4) WEBHOOK_SECRET değerini Vercel'deki ORDER_WEBHOOK_SECRET ile aynı yapın
 * 5) Dağıt > Yeni dağıtım > Tür: Web uygulaması
 *    - Açıklama: MARBAR sipariş
 *    - Yürütülen hesap: Ben
 *    - Erişimi olanlar: Herkes
 * 6) Dağıt'a basın, çıkan URL'yi Vercel ORDER_WEBHOOK_URL olarak ekleyin
 */

const WEBHOOK_SECRET = "MARBAR_GIZLI_ANAHTAR";
const NOTIFY_EMAIL = "05316005047@icloud.com";

const HEADERS = [
  "Tarih",
  "Sipariş No",
  "Tür",
  "Ad Soyad",
  "Telefon",
  "E-posta",
  "İl/İlçe",
  "Adres",
  "Ödeme",
  "Tutar",
  "Ürünler",
  "Not",
];

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function isAuthorized_(e, data) {
  const fromBody = data && data.secret ? String(data.secret) : "";
  const fromQuery = e && e.parameter && e.parameter.secret ? String(e.parameter.secret) : "";
  return fromBody === WEBHOOK_SECRET || fromQuery === WEBHOOK_SECRET;
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (!isAuthorized_(e, data)) {
      return json_({ ok: false, error: "unauthorized" });
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    ensureHeaders_(sheet);

    const customer = data.customer || {};
    sheet.appendRow([
      data.tarih || new Date().toLocaleString("tr-TR"),
      data.siparisNo || data.orderNumber || "",
      data.tur || (data.type === "lead" ? "Teklif" : "Sipariş"),
      data.adSoyad || customer.fullName || "",
      data.telefon || customer.phone || "",
      data.email || customer.email || "",
      data.konum || [customer.city, customer.district].filter(Boolean).join(" / "),
      data.adres || customer.address || "",
      data.odeme || data.paymentMethod || "",
      data.tutar || data.total || "",
      data.urunler || "",
      data.not || data.note || data.message || "",
    ]);

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject:
          "MARBAR " +
          (data.tur || (data.type === "lead" ? "Teklif" : "Sipariş")) +
          " " +
          (data.siparisNo || data.orderNumber || ""),
        body: data.message || data.not || JSON.stringify(data),
      });
    }

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet(e) {
  try {
    if (!isAuthorized_(e, null)) {
      return json_({ ok: false, error: "unauthorized" });
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    ensureHeaders_(sheet);

    const values = sheet.getDataRange().getValues();
    if (values.length < 2) {
      return json_({ ok: true, orders: [] });
    }

    const orders = [];
    for (var i = values.length - 1; i >= 1; i--) {
      var row = values[i];
      orders.push({
        tarih: String(row[0] || ""),
        siparisNo: String(row[1] || ""),
        tur: String(row[2] || ""),
        adSoyad: String(row[3] || ""),
        telefon: String(row[4] || ""),
        email: String(row[5] || ""),
        konum: String(row[6] || ""),
        adres: String(row[7] || ""),
        odeme: String(row[8] || ""),
        tutar: String(row[9] || ""),
        urunler: String(row[10] || ""),
        not: String(row[11] || ""),
      });
    }

    return json_({ ok: true, orders: orders.slice(0, 200) });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}
