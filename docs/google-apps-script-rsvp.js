/**
 * J Events — RSVP receiver (Google Apps Script Web App)
 * =====================================================
 *
 * Receives RSVP submissions from the public invitation page (RSVPForm.tsx) and
 * appends each one as a row in the bound Google Sheet.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * HOW TO DEPLOY
 * ──────────────────────────────────────────────────────────────────────────
 * 1. Create a Google Sheet (e.g. "J Events RSVPs"). Optionally add a header row
 *    matching HEADERS below.
 * 2. In that Sheet: Extensions → Apps Script. Delete the sample code and paste
 *    this whole file in. Save.
 * 3. Click Deploy → New deployment → type "Web app".
 *      - Description: "RSVP receiver"
 *      - Execute as:  Me
 *      - Who has access: Anyone
 *    Click Deploy and authorise when prompted.
 * 4. Copy the "Web app URL" (ends with /exec).
 *
 * ──────────────────────────────────────────────────────────────────────────
 * WHERE TO PASTE THE URL
 * ──────────────────────────────────────────────────────────────────────────
 * Put it in the couple's JSON (src/data/couples/<slug>.json) under
 *   rsvp.googleScriptUrl: "https://script.google.com/macros/s/XXXX/exec"
 * RSVPForm reads it from there and POSTs to it. The URL is public (safe in the
 * frontend); the Sheet stays private to your Google account.
 *
 * Note: each time you change this script, create a *new version* of the
 * deployment (Deploy → Manage deployments → Edit → New version) or the live URL
 * keeps running the old code.
 */

// Column order written to the sheet. Keep in sync with the header row.
var HEADERS = [
  'submittedAt',
  'coupleSlug',
  'guestName',
  'phone',
  'attending',
  'guestCount',
  'mealPreference',
  'message',
]

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error('No POST body received')
    }

    var data = JSON.parse(e.postData.contents)

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()

    // Add a header row the first time the sheet is used.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS)
    }

    var row = HEADERS.map(function (key) {
      return key in data ? data[key] : ''
    })
    sheet.appendRow(row)

    return jsonResponse({ ok: true })
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) })
  }
}

// Simple health check when the URL is opened in a browser (GET).
function doGet() {
  return jsonResponse({ ok: true, service: 'J Events RSVP', status: 'running' })
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  )
}
