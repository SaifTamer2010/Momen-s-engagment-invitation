/**
 * Engagement invitation backend — paste into your Google Sheet:
 *   Extensions → Apps Script → replace everything with this file → Deploy (see README.md).
 *
 * Tabs are created automatically:
 *   RSVP       Time | Name | Attending | Guests | Phone | Message
 *   Guestbook  Time | Name | Message | Show
 * In the Guestbook tab, set Show to FALSE to hide a wish from the page.
 */

const TABS = {
  rsvp: { name: "RSVP", headers: ["Time", "Name", "Attending", "Guests", "Phone", "Message"] },
  wish: { name: "Guestbook", headers: ["Time", "Name", "Message", "Show"] },
};

function tab_(key) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const t = TABS[key];
  let sh = ss.getSheetByName(t.name);
  if (!sh) {
    sh = ss.insertSheet(t.name);
    sh.appendRow(t.headers);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, t.headers.length).setFontWeight("bold");
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

const clip_ = (v, n) => String(v == null ? "" : v).trim().slice(0, n);

/** GET ?action=wishes → visible guestbook wishes, newest first */
function doGet(e) {
  const action = (e && e.parameter && e.parameter.action) || "";
  if (action !== "wishes") return json_({ ok: true });
  const rows = tab_("wish").getDataRange().getValues().slice(1);
  const wishes = rows
    .filter((r) => r[1] && r[2] && String(r[3]).toUpperCase() !== "FALSE")
    .map((r) => ({ time: new Date(r[0]).toISOString(), name: String(r[1]), message: String(r[2]) }))
    .reverse()
    .slice(0, 200);
  return json_({ ok: true, wishes });
}

/** POST {type:"rsvp"|"wish", ...} as text/plain JSON */
function doPost(e) {
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return json_({ ok: false, error: "bad json" });
  }
  if (data.website) return json_({ ok: true }); // honeypot field: bots fill it, people don't

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    if (data.type === "rsvp") {
      const name = clip_(data.name, 100);
      if (!name) return json_({ ok: false, error: "name required" });
      tab_("rsvp").appendRow([
        new Date(),
        name,
        data.attending ? "Yes" : "No",
        data.attending ? Math.max(1, Math.min(20, Number(data.guests) || 1)) : 0,
        clip_(data.phone, 40),
        clip_(data.message, 1000),
      ]);
      return json_({ ok: true });
    }
    if (data.type === "wish") {
      const name = clip_(data.name, 100);
      const message = clip_(data.message, 1000);
      if (!name || !message) return json_({ ok: false, error: "name and message required" });
      tab_("wish").appendRow([new Date(), name, message, true]);
      return json_({ ok: true });
    }
    return json_({ ok: false, error: "unknown type" });
  } finally {
    lock.releaseLock();
  }
}
