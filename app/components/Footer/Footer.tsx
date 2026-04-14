import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="w-full border-t border-zinc-200 bg-zinc-50 py-8 px-4"
      aria-label="Información del producto"
    >
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm text-zinc-600">
          Un producto de{" "}
          <Link
            href="https://edi-developer.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-zinc-900 underline underline-offset-2 transition-colors hover:text-blue-700"
          >
            EdiDev
          </Link>
        </p>
      </div>
    </footer>
  );
}
