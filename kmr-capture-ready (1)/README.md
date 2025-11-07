# KMR Client Capture – Ready to Deploy (with app pre-inserted)

## Local run
```bash
npm i
npm run dev
```

## Configure Supabase (optional, enables cloud sync + backups)
- Create a `.env` (based on `.env.example`) **or** add meta tags in `index.html`:
```html
<meta name="SUPABASE_URL" content="https://YOUR.supabase.co" />
<meta name="SUPABASE_ANON_KEY" content="YOUR_ANON_KEY" />
```

## Deploy (Vercel/Netlify)
Import this folder, add env vars if using `.env`, and deploy. Your public URL can then be embedded into Hocoos:

```html
<iframe
  src="https://YOUR_DEPLOYED_URL"
  width="100%"
  height="1500"
  style="border:0; overflow:hidden;"
  scrolling="no"
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"
></iframe>
<script>
  // Optional auto-resize (works if Hocoos allows JS below the iframe)
  window.addEventListener("message", (e) => {
    if (e?.data?.kmrEmbedHeight && Number.isFinite(e.data.kmrEmbedHeight)) {
      const ifr = document.currentScript.previousElementSibling;
      if (ifr && ifr.tagName === "IFRAME") {
        ifr.style.height = Math.max(900, e.data.kmrEmbedHeight) + "px";
      }
    }
  });
</script>
```
