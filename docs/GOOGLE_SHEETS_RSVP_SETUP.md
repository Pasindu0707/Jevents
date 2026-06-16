# Google Sheets RSVP setup

Connect a couple's RSVP form to a Google Sheet so submissions are saved as rows.
No paid services — just a Google account. Do this **once per Sheet** (you can
reuse one Sheet for all couples, since each row records the `coupleSlug`).

The form code lives in [`src/components/common/RSVPForm.tsx`](../src/components/common/RSVPForm.tsx);
the receiver code is [`google-apps-script-rsvp.js`](./google-apps-script-rsvp.js).

---

## Step-by-step

### 1. Create a Google Sheet
Go to [sheets.new](https://sheets.new) and name it, e.g. **“J Events RSVPs”**.

### 2. (Optional) Add column headers
In row 1, add these headers — the script also creates them automatically on the
first submission if the sheet is empty:

| submittedAt | coupleSlug | guestName | phone | attending | guestCount | mealPreference | message |
|-------------|-----------|-----------|-------|-----------|------------|----------------|---------|

### 3. Open the script editor
In the Sheet: **Extensions → Apps Script**.

### 4. Paste the script
Delete the placeholder `myFunction` code and paste the **entire** contents of
[`docs/google-apps-script-rsvp.js`](./google-apps-script-rsvp.js). Click the
save (💾) icon.

### 5. Deploy as a Web App
- **Deploy → New deployment**.
- Click the gear ⚙ next to “Select type” → choose **Web app**.
- Settings:
  - **Description:** `RSVP receiver`
  - **Execute as:** **Me**
  - **Who has access:** **Anyone**
- Click **Deploy**.

### 6. Authorise
Google will prompt for permission the first time. Click **Authorize access**,
pick your account, “Advanced” → “Go to (project) (unsafe)” if shown → **Allow**.
(This is normal for personal Apps Scripts.)

### 7. Copy the Web App URL
After deploying, copy the **Web app URL** — it ends in **`/exec`**, e.g.
`https://script.google.com/macros/s/AKfy.../exec`.

### 8. Paste the URL into the couple JSON
Either via the admin editor (RSVP section → **Google Apps Script URL**) or
directly in `src/data/couples/<slug>.json`:

```json
"rsvp": {
  "enabled": true,
  "googleScriptUrl": "https://script.google.com/macros/s/AKfy.../exec",
  "successMessage": "Thank you! Your RSVP has been received."
}
```
Commit and redeploy the site.

### 9. Test
Open the published invitation, submit the RSVP form, and confirm a new row
appears in the Sheet. Tip: open the `/exec` URL in a browser — it should return
`{"ok":true,"service":"J Events RSVP","status":"running"}` (the `doGet` health
check).

---

## Troubleshooting

**The form says success but nothing appears in the Sheet**
- You edited the script but didn't **redeploy a new version**. Apps Script keeps
  serving the old code until you do **Deploy → Manage deployments → ✏ Edit →
  Version: New version → Deploy**.
- Wrong URL: it must be the **`/exec`** Web App URL, not the `/dev` URL and not
  the script editor URL.

**“Authorization required” / permission errors**
- Re-run the deploy and complete the authorisation prompt (step 6).
- Ensure **Who has access = Anyone** (not “Anyone with Google account”).

**CORS errors in the browser console**
- Expected and harmless. Apps Script Web Apps don't send CORS headers, so the
  form posts with `mode: 'no-cors'`. The row is still written; the browser just
  can't read the response. The form treats a completed request as success.
- Because of this, the form **cannot** detect a server-side error (e.g. a script
  bug) — only a network failure. Verify writes by checking the Sheet.

**Submissions go to the wrong sheet/tab**
- The script writes to the **active sheet** of the bound spreadsheet. Make sure
  the script is bound to the right Sheet (opened via that Sheet's Extensions →
  Apps Script) and the intended tab is active.

**Nothing happens at all**
- Check the couple's `rsvp.googleScriptUrl` is set and the site was redeployed
  after setting it (data is baked in at build time).
- Confirm `rsvp.enabled` is `true`.

---

## Example sheet (after a few RSVPs)

| submittedAt | coupleSlug | guestName | phone | attending | guestCount | mealPreference | message |
|-------------|-----------|-----------|-------|-----------|------------|----------------|---------|
| 2026-06-16T10:20:00.000Z | dewmini-janni | Sahan Perera | 0771234567 | yes | 2 | Chicken | Can't wait! |
| 2026-06-16T11:02:00.000Z | dewmini-janni | Ishara Silva | 0719876543 | no | 0 |  | So sorry to miss it |

---

## Full RSVP flow (summary)

1. Guest opens the published invitation and fills the RSVP form.
2. On submit, `RSVPForm` validates, then `POST`s a JSON payload
   (`coupleSlug, guestName, phone, attending, guestCount, mealPreference,
   message, submittedAt`) to the couple's `rsvp.googleScriptUrl`.
3. The Apps Script `doPost(e)` parses the JSON and appends a row to the Sheet
   (adding headers on first use), then returns a JSON response.
4. The form shows the success message; you read responses in the Google Sheet.

No database, no server of your own — Google hosts the script and the data.
