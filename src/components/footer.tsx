export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold">Municipal Services</h3>
            <p className="text-muted-foreground">Digital Government Platform</p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <p className="text-muted-foreground">
              Provided by the Department of Innovation
            </p>
            <div className="flex gap-4 mt-2">
              <a
                href="mailto:support@municipal.gov"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact Support
              </a>
              <a
                href="/privacy"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Municipal Government. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
