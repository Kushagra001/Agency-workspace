# 🚀 Deployment Guides — Agency Workspace

This document provides step-by-step instructions for deploying each of the five projects within the `agency-workspace` monorepo. All projects are built with **Next.js 15** and are optimized for deployment on **Vercel**.

---

## 📦 General Monorepo Setup (Vercel)

Since all projects reside in a single pnpm workspace, follow these steps for **every** project:

1. **Connect Repository**: Import your GitHub/GitLab/Bitbucket repository to Vercel.
2. **Framework Preset**: Select **Next.js**.
3. **Root Directory**: Click "Edit" and select the specific project folder (e.g., `projects/01-saas-landing`).
4. **Build & Development Settings**:
   - **Build Command**: `pnpm build` (Vercel handles pnpm automatically if a `pnpm-lock.yaml` is present in the workspace root).
   - **Install Command**: `pnpm install`
5. **Environment Variables**: Add the specific variables listed for each project below.

---

## 01. SaaS Landing — Flōw
**A high-conversion landing page with glassmorphism and smooth animations.**

### 🔗 Integrations
- **Make.com / Zapier**: Used for handling form submissions via webhooks.

### 🔑 Environment Variables
| Variable | Description |
| :--- | :--- |
| `NEXT_PUBLIC_WEBHOOK_URL` | Your Make.com or Zapier webhook URL for lead capture. |

---

## 02. Agency Site — Studio Helix
**A minimalist, editorial-grade agency portfolio.**

### 🔗 Integrations
- **Sanity.io**: (Optional) Headless CMS for managing case studies and team members.

### 🔑 Environment Variables
| Variable | Description |
| :--- | :--- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID. |
| `NEXT_PUBLIC_SANITY_DATASET` | Usually `production`. |

---

## 03. Local Business — Medica Health Centre
**A production-ready healthcare landing page with appointment booking.**

### 🔗 Integrations
- **Airtable**: Used as the database for patient appointments.
- **Twilio**: (Optional) For sending WhatsApp booking confirmations.

### 🔑 Environment Variables
| Variable | Description |
| :--- | :--- |
| `AIRTABLE_BASE_ID` | The ID of your Airtable base. |
| `AIRTABLE_API_KEY` | Your Airtable Personal Access Token (PAT). |
| `TWILIO_ACCOUNT_SID` | Your Twilio Account SID (for WhatsApp). |
| `TWILIO_AUTH_TOKEN` | Your Twilio Auth Token. |
| `TWILIO_WHATSAPP_FROM` | Your Twilio WhatsApp sender number (e.g., `whatsapp:+14155238886`). |

---

## 04. Ecommerce — Kern
**A premium D2C storefront for high-end furniture/home goods.**

### 🔗 Integrations
- **Shopify Storefront API**: Powers the product catalog and checkout.

### 🔑 Environment Variables
| Variable | Description |
| :--- | :--- |
| `SHOPIFY_STORE_DOMAIN` | Your `.myshopify.com` domain. |
| `SHOPIFY_STOREFRONT_TOKEN` | Public Storefront API access token. |

---

## 05. Coach Funnel — Axiom
**A high-ticket coaching funnel with lead magnets and strategy call booking.**

### 🔗 Integrations
- **Resend**: Transactional emails for lead magnet delivery.
- **Calendly**: For booking strategy calls.
- **Airtable**: For logging leads and audit requests.

### 🔑 Environment Variables
| Variable | Description |
| :--- | :--- |
| `RESEND_API_KEY` | Your Resend API key. |
| `AIRTABLE_API_KEY` | Your Airtable PAT. |
| `AIRTABLE_BASE_ID` | Airtable Base ID for CRM. |
| `AIRTABLE_TABLE_ID` | Specific Table ID for Leads. |
| `NEXT_PUBLIC_CALENDLY_URL` | Your Calendly booking link. |
| `NEXT_PUBLIC_LEAD_MAGNET_DOWNLOAD_URL` | Public URL to your hosted PDF guide. |

---

## 🛠️ Post-Deployment Checklist

1. **Domain Configuration**: Point your custom domains to Vercel's nameservers.
2. **SSL**: Vercel automatically provisions SSL certificates.
3. **Analytics**: Enable **Vercel Analytics** in the dashboard for real-time traffic insights.
4. **Speed Insights**: Enable **Vercel Speed Insights** to monitor Core Web Vitals.
