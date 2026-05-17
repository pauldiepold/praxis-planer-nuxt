---
name: nuxtjs-sitemap-skilld
description: "ALWAYS use when writing code importing \"@nuxtjs/sitemap\". Consult for debugging, best practices, or modifying @nuxtjs/sitemap, nuxtjs/sitemap, nuxtjs sitemap, sitemap."
metadata:
  version: 8.0.15
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-05-17
---

# nuxt-modules/sitemap `@nuxtjs/sitemap@8.0.15`
**Tags:** latest: 8.0.15

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @nuxtjs/sitemap` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @nuxtjs/sitemap` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

## Breaking Changes & Deprecations (v8.0.0)

- DEPRECATED: `asSitemapCollection()` — replaced by `defineSitemapSchema()` in v8.0.0. The old API still works but logs a deprecation warning. Use `defineSitemapSchema()` directly in your Nuxt Content collection schema instead [source](./.skilld/releases/v8.0.0.md#breaking-changes)

- BREAKING: `robots` type field in route rules — v8.0.0 changed route rules type definition from `index` to `robots`. Check route rules if using sitemap configuration there [source](./.skilld/releases/v8.0.0.md#bug-fixes)

## New APIs (v8.0.0+)

- NEW: `defineSitemapSchema()` composable — v8 API for Nuxt Content v3 schema integration. Replaces `asSitemapCollection()`. Supports `filter()`, `onUrl()`, and `name` options to control content inclusion and URL transformation [source](./.skilld/releases/v8.0.0.md#defineSitemapSchema-composable)

- NEW: `definePageMeta` sitemap configuration — v8 allows configuring `changefreq`, `priority`, and other sitemap options directly in page components via `definePageMeta()` instead of config-level routes [source](./.skilld/releases/v8.0.0.md#definePageMeta-sitemap-configuration)

- NEW: `/__sitemap__/debug-production.json` endpoint — v8 development-only debugging endpoint to inspect the production sitemap output during development [source](./.skilld/releases/v8.0.0.md#debug-production-endpoint)

- NEW: Nitro hook `'sitemap:sources'` — v8 hook that fires before source resolution, allowing dynamic source modification, header injection, and filtering. Runs at runtime unlike the build-time Nuxt hook [source](./.skilld/references/@nuxtjs/sitemap@8.0.15/docs/content/5.nitro-api/nitro-hooks.md:L109)

- NEW: i18n multi-sitemap expansion — v8 automatically expands custom sitemaps with `includeAppSources: true` into per-locale variants with `{locale}-{name}` format when using @nuxtjs/i18n [source](./.skilld/releases/v8.0.0.md#i18n-multi-sitemap-with-custom-sitemaps)

## Signature Changes & Behavior

- BREAKING: Nuxt Site Config v4 — v8.0.0 bumped internal `@nuxtjs/site-config` to v4.0.0. See Site Config breaking changes for full details; generally no direct effect on sitemap usage [source](./.skilld/releases/v8.0.0.md:L14:19)

**Also changed:** `sitemap:input` Nitro hook · `sitemap:resolved` Nitro hook · `sitemap:index-resolved` Nitro hook · `sitemap:output` Nitro hook · `sitemap:prerender:done` Nuxt hook · `zeroRuntime` config mode · `parseSitemapIndex()` utility function
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Set meaningful `lastmod` dates based on **content changes** only, not code deployments — Google penalizes frequent lastmod updates that don't reflect actual content changes by reducing trust in your dates [source](./.skilld/docs/content/1.guides/6.best-practices.md:L15:32)

- Skip `changefreq` and `priority` entirely — search engines ignore both fields, and `lastmod` alone drives crawl frequency for SEO purposes [source](./.skilld/docs/content/1.guides/6.best-practices.md:L34:40)

- Enable `zeroRuntime: true` for static sites to cut ~50KB from your server bundle by generating sitemaps at build time and tree-shaking generation code from runtime [source](./.skilld/docs/content/1.guides/6.best-practices.md:L42:56)

- Use `defineSitemapSchema()` instead of the deprecated `asSitemapCollection()` for Nuxt Content v3 collections — the new API is cleaner and directly embeds sitemap config in your schema [source](./.skilld/docs/content/5.releases/3.v8.md:L50:75)

- Cache source endpoints with `defineCachedEventHandler` when feeding them into `sources` — every cache miss re-hits your backend, and at large scale this causes thundering herd [source](./.skilld/docs/content/2.advanced/2.performance.md:L69:73)

- Set chunk sizes to 5000–50000 URLs per file (not default 1000) for sites with 100k+ pages — search engines accept 50,000 URLs per file, and larger chunks directly reduce total work and cache entries [source](./.skilld/docs/content/2.advanced/2.performance.md:L70:72)

- Configure `runtimeCacheStorage` with Cloudflare KV binding for distributed caching at massive scale — the default filesystem cache doesn't scale across multiple edge regions [source](./.skilld/docs/content/4.api/0.config.md:L289:132)

- Declare `chunkCount` upfront if you know your dataset size — skipping the index source fetch for cold-start is critical at very large scale where counting itself becomes the bottleneck

```ts
export default defineNuxtConfig({
  sitemap: {
    sitemaps: {
      posts: {
        sources: ['/api/posts'],
        chunks: 5000,
        chunkCount: 100 // Skip fetch in index, still fetches per-chunk on demand
      }
    }
  }
})
```
[source](./.skilld/docs/content/2.advanced/3.chunking-sources.md:L79:97)

- Use `_i18nTransform: true` on dynamic URLs to automatically generate locale variants instead of only appearing in the default locale sitemap [source](./.skilld/docs/content/1.guides/3.i18n.md:L87:100)

- Simplify multi-sitemap URLs with `sitemapsPathPrefix: '/'` to generate `/sitemap-foo.xml` instead of `/__sitemap__/sitemap-foo.xml` — cleaner for user-facing sitemaps [source](./.skilld/docs/content/1.guides/2.multi-sitemaps.md:L69:83)

- Use `includeAppSources: true` on custom sitemaps when you have i18n enabled — the module automatically expands to per-locale sitemaps with format `{locale}-{name}` [source](./.skilld/docs/content/5.releases/3.v8.md:L92:94)

- Wrap prerendered page content in `<main>` tags to enable automatic image and video discovery in your sitemap — images and videos outside `<main>` are ignored [source](./.skilld/docs/content/2.advanced/1.images-videos.md:L64)

- Use `RegExp` objects for `exclude`/`include` patterns when you need to match complex paths that glob syntax can't express — for example, `/foo/**/bar` requires regex [source](./.skilld/docs/content/1.guides/1.filtering-urls.md:L82:96)

- Increase `cacheMaxAgeSeconds` to several hours on high-volume sites instead of accepting the 10-minute default — this directly reduces origin load by extending the SWR cache window [source](./.skilld/docs/content/2.advanced/2.performance.md:L113:114)
<!-- /skilld:best-practices -->
