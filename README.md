# VISTA - Virtual Integrated System for Town Administration

**Your Digital Gateway to Seamless Municipal Management**

---

## Table of Contents

1.  [About VISTA](#about-vista)
2.  [Inspiration, Philosophy, & Learning Goals](#inspiration-philosophy--learning-goals)
3.  [Initial Key Features](#initial-key-features)
4.  [Why VISTA?](#why-vista)
5.  [Getting Started](#getting-started)
6.  [Technology Stack](#technology-stack)
7.  [License](#license)
8.  [Creator & Contact](#creator--contact)

---

## 1. About VISTA

**VISTA** stands for **Virtual Integrated System for Town Administration**. This is my personal project to build a modern, user-friendly digital platform designed to streamline interactions between citizens and their local government. VISTA aims to empower residents to manage their municipal obligations and requests entirely online, eliminating the need for physical visits and significantly reducing administrative overhead.

My long-term vision is for VISTA to potentially serve as a robust, customizable template that other organizations can adapt for their specific municipal needs. However, the short-term goal for this project is focused on personal practice, exploration, and learning new technologies.

## 2. Inspiration, Philosophy, & Learning Goals

VISTA is directly inspired by the functionality and vision of [**SIGEM**](https://sigem.sanluislaciudad.gob.ar/), the official Digital Management Platform of the Municipality of San Luis, Argentina.

My direct experience developing and maintaining digital solutions for the San Luis city government, including the original SIGEM platform, during my time as a Fullstack Developer at runaID (Sep 2021 – Oct 2022), provides a unique foundation for this project. This firsthand knowledge of the challenges and successes of such a system fuels my aim to create an equally intuitive and efficient system.

Beyond merely replicating robust functionality, VISTA serves as a personal demonstration of a core philosophy: **software doesn't need to be overly complicated to be effective.** My journey in software development has often highlighted the frustrations of slow progress caused by fragmented codebases, excessive microservice architectures where a well-structured monolith would thrive, and the pursuit of complexity over clarity. I firmly believe that "not everything needs to be a microservice" and that a well-architected system, ideally within a unified codebase and language, fosters easier understanding, faster development, and better maintainability. VISTA embodies the principle that **good code solves the problem and doesn't suck to read**. It's about delivering mature solutions, anticipating potential failures, and acknowledging that while AI excels at writing code, it's the developers who remain the essential "human glue" – the problem-solvers who translate ambiguous needs into tangible, efficient digital realities.

This project is also a dedicated effort to **step out of my comfort zone and practice technologies I don't typically use in my day-to-day work**. A major focus will be the functional programming paradigm and type-safe utilities provided by [**effect-ts**](https://effect.website/). Additionally, I'll be deepening my skills with [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), [shadcn](https://ui.shadcn.com/), [Clerk](https://clerk.com/) for authentication, [Drizzle](https://orm.drizzle.team/) for ORM, [PostgreSQL](https://www.postgresql.org/), and [Coolify](https://coolify.io/) for self-hosted VPS deployment.

VISTA is a continuous learning ground, allowing me to explore, experiment, and push my boundaries as a developer.

## 3. Initial Key Features

VISTA is currently a very focused project. My immediate objective is to successfully recreate the **citizen registration process**, allowing users to create accounts and get set up within the system.

Future features will be added incrementally based on my personal interest and evolving criteria, building out a more comprehensive suite of municipal services as the project progresses.

## 4. Why VISTA?

*   **Convenience:** The ultimate goal is to provide 24/7 access to municipal services from anywhere.
*   **Efficiency:** Streamline administrative processes and reduce wait times.
*   **Transparency:** Easily track the progress of requests and access information.
*   **Accessibility:** A user-friendly interface designed for all citizens.
*   **Sustainability:** Contribute to a paperless environment and reduced carbon footprint.

## 5. Getting Started

This section will provide instructions on how to set up and run VISTA locally for development and testing purposes.

1.  **Prerequisites:** Ensure you have Node.js (with npm or yarn) installed on your system.
2.  **Clone the Repository:**
    ```bash
    git clone [repository-url]
    cd vista
    ```
3.  **Install Dependencies:**
    ```bash
    npm install # or yarn install
    ```
4.  **Run the Application:**
    ```bash
    npm run dev # or yarn dev
    ```
    VISTA should now be running locally, typically on `http://localhost:3000`.

*(Detailed instructions and specific commands will be refined as the project progresses.)*

## 6. Technology Stack

VISTA is being developed as a Next.js monolith, leveraging a modern and robust stack to ensure scalability, security, and a great user experience, while also serving as a learning playground for new technologies:

*   **Application Framework:** Next.js (Full-stack capabilities)
*   **Core Libraries:** effect-ts
*   **Database:** PostgreSQL
*   **ORM:** Drizzle
*   **Authentication:** Clerk (for user management and authentication)
*   **Styling:** Tailwind CSS
*   **Deployment:** Managed on a Virtual Private Server (VPS) via Coolify (self-hosted Heroku/Netlify alternative)

## 7. License

This project is licensed under the **MIT License** - see the `LICENSE` file for details.

## 8. Creator & Contact

VISTA is a personal project by **Franco Exequiel Becvort**.

*   **Email:** [franbecvort@gmail.com](mailto:franbecvort@gmail.com)
*   **Website:** [pollito.dev](https://pollito.dev/)
*   **LinkedIn:** [linkedin.com/in/franco-becvort](https://linkedin.com/in/franco-becvort)
