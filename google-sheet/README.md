# Connect RSVP + Guestbook to a Google Sheet

Takes about 5 minutes. Free, no API keys.

1. Create a new Google Sheet (e.g. "Engagement RSVP").
2. In the sheet: **Extensions → Apps Script**.
3. Delete what's there, paste everything from [`Code.gs`](./Code.gs), click **Save**.
4. Click **Deploy → New deployment**
   - Type (gear icon): **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy**, allow the permissions (Advanced → Go to project → Allow).
5. Copy the **Web app URL** (ends with `/exec`).
6. In this project create `.env.local`:

   ```
   NEXT_PUBLIC_SHEET_URL=https://script.google.com/macros/s/XXXX/exec
   ```

   (or paste it into `sheetUrl` in `data/wedding.ts`). Restart `npm run dev`.

The `RSVP` and `Guestbook` tabs are created on the first reply.

- **Hide a wish:** in the Guestbook tab set the **Show** column to `FALSE`.
- **Changed Code.gs later?** Deploy → Manage deployments → edit → Version: *New version* (keeps the same URL).
- Not connected yet? The page still works: replies just stay on the page and example wishes are shown.
