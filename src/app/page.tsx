import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            VISTA
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl">
            Your Digital Gateway to Seamless Municipal Management
          </p>
          <p className="text-lg mb-12 max-w-3xl">
            A modern, user-friendly digital platform designed to streamline interactions between citizens and their local government.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors">
              Get Started
            </button>
            <button className="px-6 py-3 border border-input rounded-md font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Why VISTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why VISTA?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transforming municipal services for the digital age
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border border-border">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M12 2v20"/>
                <path d="m17 5-5 5-5-5"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Convenience</h3>
            <p className="text-muted-foreground">
              24/7 access to municipal services from anywhere
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border border-border">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M12 2v20"/>
                <path d="m17 5-5 5-5-5"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Efficiency</h3>
            <p className="text-muted-foreground">
              Streamline administrative processes and reduce wait times
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border border-border">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M12 2v20"/>
                <path d="m17 5-5 5-5-5"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Transparency</h3>
            <p className="text-muted-foreground">
              Easily track the progress of requests and access information
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border border-border">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M12 2v20"/>
                <path d="m17 5-5 5-5-5"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
            <p className="text-muted-foreground">
              A user-friendly interface designed for all citizens
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border border-border">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M12 2v20"/>
                <path d="m17 5-5 5-5-5"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
            <p className="text-muted-foreground">
              Contribute to a paperless environment and reduced carbon footprint
            </p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About VISTA</h2>
            <p className="text-lg mb-6">
              <strong>VISTA</strong> stands for <strong>Virtual Integrated System for Town Administration</strong>. 
              This is a personal project to build a modern, user-friendly digital platform designed to 
              streamline interactions between citizens and their local government.
            </p>
            <p className="text-lg mb-6">
              VISTA aims to empower residents to manage their municipal obligations and requests entirely 
              online, eliminating the need for physical visits and significantly reducing administrative overhead.
            </p>
            <p className="text-lg">
              My long-term vision is for VISTA to potentially serve as a robust, customizable template that 
              other organizations can adapt for their specific municipal needs.
            </p>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <div className="bg-card border border-border rounded-lg p-8 w-full max-w-md">
              <h3 className="text-2xl font-semibold mb-4">Project Goals</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-primary rounded-full p-1 mt-1 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <span>Recreate citizen registration process</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary rounded-full p-1 mt-1 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <span>Modern UI with Tailwind CSS and shadcn</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary rounded-full p-1 mt-1 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <span>Secure authentication with Clerk</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary rounded-full p-1 mt-1 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <span>PostgreSQL database with Drizzle ORM</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold">VISTA</h3>
              <p className="text-muted-foreground">Virtual Integrated System for Town Administration</p>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <p className="text-muted-foreground">A project by Franco Exequiel Becvort</p>
              <div className="flex gap-4 mt-2">
                <a href="mailto:franbecvort@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
                  Email
                </a>
                <a href="https://pollito.dev/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  Website
                </a>
                <a href="https://linkedin.com/in/franco-becvort" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>Licensed under the MIT License</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
