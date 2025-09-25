import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold">Municipal Services</h3>
            <p className="text-muted-foreground">
              VISTA - Virtual Integrated System for Town Administration
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <p className="text-muted-foreground">
              Made by{" "}
              <Link
                href="https://pollito.dev/"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pollito
              </Link>{" "}
              with Next.js and ❤
            </p>
            <div className="flex gap-4 mt-2">
              <a
                href="mailto:franbecvort@gmail.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact Creator
              </a>
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>COPYRIGHT LOLOLOL</p>
        </div>
      </div>
    </footer>
  );
}
