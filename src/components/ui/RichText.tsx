import type { SerializedEditorState } from 'lexical'
import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import { cn } from '@/lib/utils'

type RichTextProps = {
  content: SerializedEditorState
  className?: string
}

/**
 * Renders a Payload Lexical rich-text field (SerializedEditorState) as HTML.
 * Wraps the Payload-provided RichText component with project-level prose styles.
 */
export function RichText({ content, className }: RichTextProps): React.ReactElement {
  return (
    <LexicalRichText
      data={content}
      className={cn(
        // Base typography
        'text-base-100/75 text-body-sm sm:text-body leading-relaxed',
        // Headings within rich text
        '[&_h2]:font-display [&_h2]:font-bold [&_h2]:text-h3 [&_h2]:text-base-100 [&_h2]:mb-3 [&_h2]:mt-6',
        '[&_h3]:font-display [&_h3]:font-semibold [&_h3]:text-h4 [&_h3]:text-base-100 [&_h3]:mb-2 [&_h3]:mt-5',
        // Paragraphs
        '[&_p]:mb-4 last:[&_p]:mb-0',
        // Lists
        '[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ul_li]:mb-1',
        '[&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_ol_li]:mb-1',
        // Links
        '[&_a]:text-brand-400 [&_a]:underline [&_a]:underline-offset-2 [&_a]:transition-colors [&_a]:duration-fast hover:[&_a]:text-brand-300',
        // Inline code
        '[&_code]:font-mono [&_code]:text-body-sm [&_code]:bg-base-900 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded',
        // Blockquote
        '[&_blockquote]:border-l-2 [&_blockquote]:border-brand-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-base-100/60',
        // Strong / emphasis
        '[&_strong]:text-base-100 [&_strong]:font-semibold',
        className,
      )}
    />
  )
}
