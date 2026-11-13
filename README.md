# SKALA website – prototype (RFT SKALA-JK/032/RFT/2026)

Bilingual (Bahasa Indonesia / English) prototype of the new SKALA website. **Sample content only – not the official SKALA site.**

## Run locally
```bash
npm install
npm run dev        # http://localhost:3000  (redirects to /id or /en)
```

## Deploy
1. Create a **private** GitHub repo, then:
   ```bash
   git remote add origin https://github.com/<you>/skala-prototype.git
   git push -u origin main
   ```
2. On vercel.com: **Add New → Project → Import** the repo → framework preset **Next.js** → **Deploy**. No settings needed.

## What's in it
| Area | URL |
| --- | --- |
| Home (map, outcomes, data systems, podcast, testimonials) | `/id`, `/en` |
| Publication repository: search + type/theme/province/year filters, filters kept in the URL | `/en/publications` |
| Publication detail: PDF preview, downloads, SKALA One ID, related items | `/en/publications/<slug>` |
| Activity updates and announcements | `/en/activities` |
| Site-wide search (publications, news, glossary) | `/en/search?q=data` |
| Glossary with instant search, A–Z, Suggest a term | `/en/glossary` |
| About, Governance cycle, Podcasts & Videos, Opportunities, Contact | menu |
| Read-only open data API (v1) and RSS | `/api/v1/publications?lang=en`, `/rss.xml` |
| CMS editor preview (workflow, roles, ID/EN status) | `/en/admin` |

Accessibility: skip link, keyboard menus, text-size control, ARIA labels, `lang` per page.
Search engines blocked via `robots.txt` and `noindex`.

## Stack
Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4. Content lives in `src/lib/data.ts`, shaped like the proposed headless CMS models.
