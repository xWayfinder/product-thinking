# product-thinking

A collection of mental models that help with product management.

## Link previews (email, Slack, social)

The app sets **Open Graph** and **Twitter Card** metadata so pasted links can show a title, description, and image.

1. **Production URL** — Set `NEXT_PUBLIC_SITE_URL` to your deployed origin with **no trailing slash** (see [`.env.example`](.env.example)). GitHub Actions sets this automatically to `https://<repository_owner>.github.io/product-thinking` during deploy. Without it, builds still work locally, but share previews may point at `http://localhost:3000`, which crawlers cannot use.

2. **Preview image** — [`public/og.png`](public/og.png) is referenced as `og:image`. Replace that file if you want different artwork (roughly 1200×630 works well; current asset is slightly larger).

3. **Validate after deploy** — Caches are aggressive; use official debuggers to refresh and inspect:

   - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
   - [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
   - [Twitter/X Card Validator](https://cards-dev.twitter.com/validator) (availability varies)
