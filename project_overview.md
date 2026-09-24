# Project Overview: Chapter Four Uganda Website & CMS

Based on an analysis of the repository, this project is a modern web application designed for an NGO (likely Chapter Four Uganda) with a fully custom Content Management System (CMS).

## 🛠 Technology Stack
- **Backend framework**: Laravel (PHP)
- **Frontend framework**: React (with TypeScript)
- **Bridge**: Inertia.js (allows building single-page apps using classic server-side routing without a separate API)
- **Styling**: Tailwind CSS
- **Animations & Graphics**:
  - `framer-motion` for smooth UI transitions and micro-interactions
  - `lottie-react` for rendering After Effects animations
  - `three` & `@react-three/fiber` for 3D web graphics
- **UI Primitives**: Radix UI (headless components for accessibility) & Lucide React (icons)

## 🏢 Public Website Architecture

The public-facing website is structured around the core informational needs of an NGO:

- **Home (`/`)**: Main landing page with a dynamic Hero Slider.
- **About (`/about/...`)**: Detailed organizational info including Who We Are, Our Team, Board of Trustees, Beneficiaries, Partnerships, Core/Cross-Cutting Activities, and Vacancies.
- **What We Do (`/what-we-do/...`)**: Highlights the NGO's mission through Thematic Areas, Approach to Programming, Key Interventions, and Reports. Dynamic routes (e.g. `/what-we-do/{slug}`) handle individual thematic area details.
- **Resources (`/resources`, `/news`)**: A library of downloadable publications, reports, and news updates.
- **Projects (`/projects`)**: Dedicated pages for specific initiatives.
- **Engagement**: Forms for Contact Us (`/contact`), Newsletter Subscriptions (`/newsletter/subscribe`), and a "Get Involved" page.
- **Legal/Compliance**: Privacy, Terms, and Safeguarding pages.

## ⚙️ Content Management System (CMS) Architecture

The backend (`/admin`) is a robust, bespoke CMS built to manage all dynamic aspects of the website. It handles CRUD (Create, Read, Update, Delete) operations for a wide array of data models:

### 1. Organizational & Impact Data
- **Team Members (`TeamMember`)**: Manages staff and board profiles.
- **Partners (`Partner`)**: Manages institutional partners and donors.
- **Statistics (`ImpactStatistic`)**: Manages key impact numbers displayed on the frontend.
- **Timeline Events (`TimelineEvent`)**: Manages the NGO's historical timeline.

### 2. Programmatic Content
- **Thematic Areas (`ThematicArea`)**: The core pillars of the NGO's work.
- **Projects (`Project`)**: Specific projects linked to thematic areas.
- **Interventions (`Intervention`)**: Key actions taken by the NGO.
- **Beneficiary Groups (`BeneficiaryGroup`)**: Target demographics the NGO assists.
- **HRBA Principles (`HrbaPrinciple`)**: Human Rights Based Approach principles.

### 3. Media & Resources
- **Resources (`Resource` & `ResourceTag`)**: Manages file uploads (reports, publications) and their categorization.
- **Hero Slides (`HeroSlide`)**: Controls the homepage banner content.

### 4. User Engagement
- **Inquiries (`Inquiry`)**: Inbox for contact form submissions, including status tracking and admin notes.
- **Newsletter (`NewsletterSubscriber`)**: Manages email subscribers (with export functionality).
- **Vacancies (`Vacancy`)**: Job board management.

### 5. System Administration
- **Users & Roles (`User`, Roles/Permissions)**: Role-based access control for CMS administrators.
- **Site Settings (`SiteSetting`)**: Global configuration variables (e.g., contact emails, social links).
- **SEO (`SeoMetadata`)**: Search Engine Optimization metadata management.
- **Audit Logs (`AuditLog`)**: Security tracking for actions performed within the CMS.

## 💡 Summary of Implementation
The developers opted for a "Monolith" architecture (Laravel + Inertia + React) rather than a decoupled headless CMS. This provides a fast, App-like frontend experience (via React) while retaining the simplicity and security of Laravel's backend routing and authentication. The inclusion of libraries like Framer Motion and Three.js indicates a strong focus on a visually rich, engaging, and premium user experience.
