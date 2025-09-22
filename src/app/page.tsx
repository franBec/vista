import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="py-16 md:py-24">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to Municipal Services
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Your Digital Gateway to Local Government Services
          </p>
          <p className="text-lg mb-12">
            Access municipal services, submit requests, and manage your civic
            obligations through our secure online platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={"/sign-in"}>
              <Button>Sign In to Your Account</Button>
            </Link>
            <Link href={"/areas/gov"}>
              <Button variant="outline">Continue Without Signing In</Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-6 max-w-md">
            Note: Some administrative processes require a registered account and
            may not be available to guests.
          </p>
        </div>
      </div>

      <div className="py-16">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Our Digital Services?
          </h2>
          <p className="text-lg text-muted-foreground">
            Improving access to government services for all residents
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border border-border">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M12 2v20" />
                <path d="m17 5-5 5-5-5" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Convenience</h3>
            <p className="text-muted-foreground">
              24/7 access to municipal services from anywhere
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border border-border">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M12 2v20" />
                <path d="m17 5-5 5-5-5" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Efficiency</h3>
            <p className="text-muted-foreground">
              Streamline administrative processes and reduce wait times
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border border-border">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M12 2v20" />
                <path d="m17 5-5 5-5-5" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Transparency</h3>
            <p className="text-muted-foreground">
              Easily track the progress of requests and access information
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border border-border">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M12 2v20" />
                <path d="m17 5-5 5-5-5" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
            <p className="text-muted-foreground">
              A user-friendly interface designed for all citizens
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border border-border">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M12 2v20" />
                <path d="m17 5-5 5-5-5" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Security</h3>
            <p className="text-muted-foreground">
              Secure handling of personal information and government data
            </p>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              About Our Digital Services
            </h2>
            <div className="space-y-6">
              <p className="text-lg">
                Our digital platform provides a modern, user-friendly solution
                designed to streamline interactions between citizens and local
                government services.
              </p>
              <p className="text-lg">
                We aim to empower residents to manage their municipal
                obligations and requests entirely online, eliminating the need
                for physical visits and significantly reducing administrative
                overhead.
              </p>
              <p className="text-lg">
                Our long-term vision is to provide a robust, customizable
                platform that serves the needs of our community and other
                municipalities.
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <div className="bg-card border border-border rounded-lg p-8 w-full max-w-md">
              <h3 className="text-2xl font-semibold mb-4">Service Offerings</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-primary rounded-full p-1 mt-1 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary-foreground"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span>Citizen registration and account management</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary rounded-full p-1 mt-1 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary-foreground"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span>Online permit applications and renewals</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary rounded-full p-1 mt-1 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary-foreground"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span>Utility billing and payments</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary rounded-full p-1 mt-1 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary-foreground"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span>Public records access and requests</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
