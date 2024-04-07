import Link from 'next/link';

export default function LinkButton({ text, href }: { text: string, href: string }) {
  return (
    <div
      className="flex h-8 items-end space-x-1"
      aria-live="polite"
      aria-atomic="true"
    >
      <Link href={href} className="text-sm text-blue-500">
        {text}
      </Link>
    </div>
  );
}
