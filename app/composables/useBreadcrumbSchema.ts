// BreadcrumbList JSON-LD für Unterseiten der öffentlichen Website.
// Auf der Startseite nicht aufrufen (Google empfiehlt dort keine Breadcrumbs).
export function useBreadcrumbSchema(items: Array<{ name: string, item: string }>) {
  useSchemaOrg([
    defineBreadcrumb({
      itemListElement: [
        { name: 'Startseite', item: '/' },
        ...items,
      ],
    }),
  ])
}
