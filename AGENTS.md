# Vishit Journey — Project Configuration & Deployment Rules

## 🌐 Live Infrastructure Details
* **Domain (GoDaddy)**: `vishitjourney.com` / `www.vishitjourney.com`
* **Vercel Hosting**: Connected to GitHub repository `rewadiasuraj-cell/vishitjourney`
* **GitHub Repository**: `https://github.com/rewadiasuraj-cell/vishitjourney.git` (Branch: `main`)
* **Supabase Realtime Cloud DB**:
  - Project URL: `https://vpydlvmukxfqnwceelrl.supabase.co`
  - Anon/Publishable Key: `sb_publishable_mJhQqeCY-qu-UCJ5cQcdYg_yzhpmEq3`
  - Integration script: `assets/js/supabase_client.js`

## 🛠 Deployment & Workflow Rules
1. **Instant Live Updates**: Whenever changes or fixes are made to the codebase, always run `git add .`, `git commit -m "<descriptive message>"`, and `git push origin main` so Vercel automatically deploys the changes live.
2. **Clean URLs**: Maintain `vercel.json` rewrite rules so pages (`/admin`, `/about`, `/contact`, etc.) load without `.html` extension.
3. **Site Integrity**: Always verify image references and link consistency after editing.
