# SKdesigns Portfolio Website

## Current State
New project. No existing code or backend.

## Requested Changes (Diff)

### Add
- Multi-page luxury portfolio website for SKdesigns design brand
- Pages: Home (/), Web Design (/web-design), Graphic Design (/graphic-design), UI/UX Design (/ui-ux-design), Video Creation (/video-creation), Contact (/contact)
- Hero section with large bold headline, subheadline, and two CTA buttons
- Services section with 4 cards (Web Design, Graphic Design, UI/UX Design, Video Creation) with hover animations
- Featured Work section with 6 mock project showcases with dark overlays
- About SKdesigns section with professional statement
- Contact form (Name, Email, Project Type, Message) with backend storage
- Sticky transparent header that turns solid on scroll
- Professional footer with navigation links and social links

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan
1. Backend: Motoko canister to store contact form submissions (name, email, project type, message, timestamp)
2. Frontend assets: Generate hero background, logo mark, and 6 project preview images
3. Frontend: React app with React Router for multi-page routing
   - Global layout with sticky header and footer
   - Home page with all 5 sections
   - Individual service pages (Web Design, Graphic Design, UI/UX, Video Creation) with service details
   - Contact page with form wired to backend
4. Design: Deep matte black (#0B0B0B) background, white/soft gray text, metallic gold (#C6A75E) accents, modern sans-serif typography
5. Animations: Smooth page transitions, gold hover effects on cards and buttons, subtle motion in hero
