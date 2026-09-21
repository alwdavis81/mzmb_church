# Sanity Write Token & Form Submission Setup Guide

This guide walks you through generating and configuring the **`SANITY_WRITE_TOKEN`** when the Mt. Zion MBC website is ready for launch.

The write token enables the serverless API endpoint ([`/api/submit-form`](file:///c:/Users/mrmil/.gemini/antigravity-ide/scratch/mzmb_church/app/api/submit-form/route.ts)) to ingest public Contact Form and Prayer Request submissions directly into your Sanity dataset.

---

## 1. Generate the Token in Sanity

1. Go to the [Sanity Project Management Console for mzmbchurch](https://www.sanity.io/manage/project/0vl0p2sp/api#tokens).
2. Click **API** in the top navigation tab.
3. Under the **Tokens** section, click **+ Add API token**.
4. Configure the token:
   - **Name**: `mzmb-form-submissions` (or any descriptive name)
   - **Permissions**: Select **Editor** (allows creating and updating documents, but not managing project settings or billing).
5. Click **Save**.
6. **Copy the generated token immediately** (it begins with `sk...`). *Sanity will only display this secret once.*

---

## 2. Configure for Local Testing

When testing form submissions on `localhost:3000`:

1. Open your local [`.env.local`](file:///c:/Users/mrmil/.gemini/antigravity-ide/scratch/mzmb_church/.env.local) file.
2. Paste the copied token into the `SANITY_WRITE_TOKEN` variable:
   ```env
   SANITY_WRITE_TOKEN=skYourSecretTokenHere
   ```
3. Restart your development server if it was running:
   ```bash
   npm run dev
   ```

> [!NOTE]
> `.env.local` is already listed in `.gitignore` and will never be committed to GitHub.

---

## 3. Configure for Netlify (Production)

To enable form submissions on the live website:

1. Log in to your [Netlify Dashboard](https://app.netlify.com/).
2. Select your site (**`mzmbchurch`**).
3. Navigate to **Site configuration** > **Environment variables**.
4. Click **Add a variable** > **Add a single variable**:
   - **Key**: `SANITY_WRITE_TOKEN`
   - **Values**: Paste your secret token (`sk...`)
   - **Scopes**: Select **All scopes** (or at least **Builds** and **Functions**).
5. Click **Create variable**.
6. Trigger a new deploy (or push a commit) so Netlify rebuilds with the new environment variable active:
   - Go to **Deploys** > **Trigger deploy** > **Deploy site**.

---

## 4. How to Verify It Works

Once configured, verify the submission pipeline:

### A. Test Prayer Requests
1. Navigate to [`/prayer`](http://localhost:3000/prayer) (or `https://mzmbchurch.netlify.app/prayer`).
2. Fill out a test prayer request and submit.
3. You should see the confirmation message: *"Thank you for sharing your prayer request..."*.

### B. Test Contact Inquiries
1. Navigate to [`/contact`](http://localhost:3000/contact) (or `https://mzmbchurch.netlify.app/contact`).
2. Fill in a test name, email, subject, and message.
3. Submit and confirm success.

### C. View Ingested Submissions in Sanity Studio
1. Open the Studio at [`/studio`](http://localhost:3000/studio) or `https://mzmbchurch.netlify.app/studio`.
2. In the desk navigation, you will find:
   - **Contact Submissions** (`contactSubmission`): Lists sender name, email, subject, message, and timestamp.
   - **Prayer Requests** (`prayerRequest`): Lists prayer request text, name (or anonymous flag), and timestamp.

---

## 5. Security Checklist

- [ ] Never paste the `SANITY_WRITE_TOKEN` into client-facing code (e.g., files starting with `"use client"` or with `NEXT_PUBLIC_` prefix).
- [ ] Do not commit the token to Git (keep it only in `.env.local` and the Netlify UI).
- [ ] If a token is ever accidentally exposed, immediately revoke it in the [Sanity API dashboard](https://www.sanity.io/manage/project/0vl0p2sp/api#tokens) and create a replacement.
