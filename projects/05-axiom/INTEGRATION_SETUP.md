# Production Integration Setup Guide

All scaffolding for **Resend**, **Airtable**, and **Calendly** is complete. Follow these steps to activate integrations:

---

## 1. Create `.env.local`

Copy from `.env.local.example`:

```bash
cp .env.local.example .env.local
```

Then populate with your actual credentials (see sections below).

---

## 2. Resend (Email Delivery)

**Get your API key:**
1. Go to [resend.com](https://resend.com)
2. Sign up (free tier available)
3. Copy your API key from Settings → API Keys
4. Save as `RESEND_API_KEY=re_xxxxxxxxxxxxx` in `.env.local`

**What happens:**
- When a lead submits the form, they receive an email with:
  - Warm welcome from "Axiom Strategy"
  - Link to download the 90-day-growth-audit-framework.pdf
  - Link to book a call on Calendly
- Email sent from: `onboarding@resend.dev` (Resend sandbox)
- For production, add your verified domain to Resend

**Test locally:**
```bash
pnpm dev
# Fill form → should see console log of Resend response
```

---

## 3. Airtable (Lead Logging)

**Note:** You chose Supabase as the lead store. The Airtable instructions are left here for reference but are optional.

## Supabase (Recommended)

**Get your credentials:**

1. Go to [supabase.com](https://supabase.com) and create a free project
2. Open the SQL editor and create a table `leads` with columns:
   - `id` (uuid, default: gen_random_uuid())
   - `name` (text)
   - `email` (text)
   - `company` (text)
   - `budget` (text)
   - `created_at` (timestamp with time zone, default: now())

3. Get your project URL and service role key:
   - Project → Settings → API → copy `Project URL` → `SUPABASE_URL`
   - Project → Settings → API → copy `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

4. Save to `.env.local`:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=service_role_xxxxxxxxxxxxx
```

**What happens:**
- Each lead is inserted into your Supabase `leads` table from the server-side API route
- Use the Supabase dashboard to view incoming records in real-time

**Test locally:**
```bash
pnpm dev
# Fill form → check Supabase table for new record
```

---

## 4. Calendly (Booking Link)

**Get your Calendly URL:**
1. Go to [calendly.com](https://calendly.com) (or your existing account)
2. Create/find your booking page (e.g., calendly.com/rohan)
3. Grab your full URL: `https://calendly.com/your-username`
4. Save as `NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username`

**What happens:**
- BookCall section displays your Calendly embed
- LeadMagnetEmail includes a link to book on Calendly
- Visitors can schedule time with you directly

**Test locally:**
```bash
pnpm dev
# Scroll to BookCall section → embed should appear
# Email from Resend should include your Calendly link
```

---

## 5. Lead Magnet PDF

**Upload your 90-day-growth-audit-framework.pdf:**
1. Prepare your framework PDF (or use a placeholder)
2. Upload to a CDN:
   - **Option A (Free):** GitHub Release asset, then use raw.githubusercontent.com URL
   - **Option B (Recommended):** AWS S3, Cloudflare R2, Firebase Storage, etc.
   - **Option C (Dev only):** Store in `/public/` folder locally

3. Save the public URL as:
   ```
   NEXT_PUBLIC_LEAD_MAGNET_DOWNLOAD_URL=https://your-cdn.com/90-day-growth-audit-framework.pdf
   ```

**What happens:**
- Email from Resend includes a download button linking to your PDF
- Visitors get instant access to your framework

---

## 6. Validate Setup

**Run TypeScript check:**
```bash
pnpm tsc --noEmit
```
Expected: 0 errors

**Start dev server:**
```bash
pnpm dev
```
Expected: App runs on localhost:3000, no console errors

**Test full flow:**
1. Go to http://localhost:3000
2. Scroll to Lead Magnet section
3. Fill form (name/email/company/budget)
4. Click submit
5. Check:
   - ✓ Success message appears ("Check your inbox")
   - ✓ Resend email received (check spam folder)
   - ✓ Airtable record created (open your base)
   - ✓ Console has no errors

---

## 7. Production Deployment

**Prepare for production:**

1. **Build locally:**
   ```bash
   pnpm build
   ```
   Expected: Build succeeds, 0 errors

2. **Set environment variables in your host:**
   - **Vercel:** Settings → Environment Variables
   - **Railway/Netlify:** Similar process
   - Copy all 6 vars from `.env.local` to your production environment

3. **Deploy:**
   ```bash
   pnpm deploy  # or git push (depending on your host)
   ```

4. **Verify production:**
   - Test form submission on production URL
   - Verify email arrives from production Resend setup
   - Check Airtable for lead record
   - Test Calendly booking link

---

## 8. Troubleshooting

**Email not arriving?**
- Check spam folder
- Verify RESEND_API_KEY is set and valid
- Check console for Resend error message
- Note: Resend sandbox domain (`onboarding@resend.dev`) works but verify domain for production

**Airtable record not created?**
- Verify AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_ID are all set
- Check table column names match exactly (Name, Email, Company, Budget, Timestamp)
- Check console for Airtable error message

**Calendly embed not showing?**
- Verify NEXT_PUBLIC_CALENDLY_URL is set and valid
- Check that URL is public (not password-protected)
- Hard refresh browser (Ctrl+Shift+R)

**Form won't submit?**
- Check browser console for JavaScript errors
- Verify form validation passes (all fields filled correctly)
- Try submitting form locally with `pnpm dev` to see full error

---

## 9. Checklist

- [ ] `.env.local` created from `.env.local.example`
- [ ] RESEND_API_KEY set and tested
- [ ] AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_ID set and tested
- [ ] NEXT_PUBLIC_CALENDLY_URL set to your Calendly page
- [ ] NEXT_PUBLIC_LEAD_MAGNET_DOWNLOAD_URL set to your PDF CDN URL
- [ ] `pnpm tsc --noEmit` returns 0 errors
- [ ] `pnpm dev` runs without errors
- [ ] Form submission tested locally (email + Airtable + Calendly working)
- [ ] Production build (`pnpm build`) succeeds
- [ ] Production environment variables set in your host
- [ ] Production deployment verified (all integrations working live)

---

## Next Steps

Once all integrations are live:
1. Run **Lighthouse audit** (target: 90+ Performance/A11y/Best Practices/SEO)
2. Test on **mobile** (375px, 768px, 1024px viewports)
3. Monitor **Airtable base** for incoming leads
4. Set up **Resend webhook** (optional) to receive email delivery status
5. Enable **Calendly reminders** (optional) so leads don't no-show

Good luck! 🚀
