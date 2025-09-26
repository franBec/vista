# VISTA Roadmap

**Virtual Integrated System for Town Administration**

This document outlines the planned development tasks and milestones for the
VISTA project. It serves as a guide for tracking progress and setting future
goals.

## Initial Setup

- [x] AI md preferences file
- [x] MIT License
- [x] Use src directory structure
- [x] Prettier
- [x] Setup shadcn/ui components
  - [x] Dark mode
  - [x] Tweak shadcn theme with "Modern Minimal" theme from tweakcn.com
  - [x] Add `src/components/theme` and `src/components/ui` to prettier ignore
- [x] Landing page
- [x] A "citizen area" page
- [x] Extract components and implement layout for consistent structure across
      pages
- [x] Create a "route" file in which I declare the routes structure, with some
      content (title, description), if it requires login to be viewed, if it
      should be displayed in sidebar, etc. (add things as needed)
  - [x] Create a Sidebar that reads the routes
- [x] Setup vitest
  - [x] Determine what to test and what not 

## Auth: Clerk Initial Setup

- [x] Follow Clerk "Next.js Quickstart (App Router)" -
      [Clerk Docs](https://clerk.com/docs/quickstarts/nextjs)
  - [x] Make "/" and citizen area public routes
- [x] Follow Clerk "Build your own sign-in-or-up page for your Next.js app with
      Clerk" -
      [Clerk Docs](https://clerk.com/docs/references/nextjs/custom-sign-in-or-up-page)
  - [x] Follow up with "Clerk Build your own sign-up page for your Next.js app
        with Clerk" -
        [Clerk Docs](https://clerk.com/docs/references/nextjs/custom-sign-up-page)
  - [x] Customize `src/app/sign-in/[[...sign-in]]/page.tsx` and
        `src/app/sign-up/[[...sign-up]]/page.tsx`
- [x] Create a private page
  - [x] For example: "/areas/personal"

## Database and ORM

- [x] Create a dev folder. In it create a docker-compose.yaml which will contain
      a postgres db and pgadmin4
  - [x] Configure a user with access limited to the public schema for the
        application to use
- [x] Create in dev folder a .env example
- [x] Indicate in README.md the existence of this folder
- [x] Define initial tables
  - [x] Save this init.sql in dev/scripts
- [x] Setup Drizzle

## Effect

- [ ] Setup Effect - [Effect Docs](https://effect.website/docs)
- [ ] Create in `src/backend/features/onboarding` a ports and adapters logic for
      onboarding a citizen (except front form, save info in database, update
      clerk metadata to indicate this citizen is now onboarded)
  - [ ] Setup error handling
  - [ ] Improve logs, basic telemetry maybe?
- [ ] Unit testing
- [ ] Mutation testing

## Account Onboarding

- [ ] Follow Clerk "Add custom onboarding to your authentication flow" -
      [Clerk Docs](https://clerk.com/docs/references/nextjs/add-onboarding-flow)
- [ ] Create an onboarding form
  - [ ] Call the action previously defined
  - [ ] Redirect user to his personal area "/areas/personal"

## VPS Deployment

- [ ] Deploy this project to Coolify

## Citizen Proof of Identity

This is by no intent an automated proof thing. Is meant to be manual review by
an admin so it can avoid fake citizen profiles

- [ ] Improve the onboarding so now it asks for the citizen ID front and back
      photos
  - [ ] No idea where to save these photos. Considering doing file management in
        my own VPS (some kind of Coolify S3 clone) or using a third-party like
        UploadThing
- [ ] The citizen even though is onboarded, now is also in a state of "pending
      verification"
- [ ] Create the admin role
- [ ] Create an admin flow where it can manually approve or reject the citizen
      onboarding
  - [ ] If rejected, citizen can retry onboarding
  - [ ] If approved, flag of citizen verified is set

## Improve CI/CD Processes
