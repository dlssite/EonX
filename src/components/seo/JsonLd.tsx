type JsonLdProps = {
  schema: Record<string, unknown>
}

/**
 * Renders a JSON-LD structured data script tag.
 * Place in page or layout components — never in Client Components.
 *
 * @example
 * <JsonLd schema={organizationSchema()} />
 */
export function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
