Job Listing Frontend

Overview
The Job Listing Frontend is an interactive web app built with Next.js, Tailwind CSS, and TypeScript, offering features like filtering, pagination, and bookmarking. It now includes location detection through geolocation to provide localized job listings, enhancing user relevance. Additionally, data caching improves performance by reducing redundant API calls, ensuring faster load times and a seamless user experience. These enhancements, combined with a focus on usability and efficiency, make the platform dynamic and user-friendly.

Setup Instructions

Prerequisites
Ensure you have 
1. Node.js installed (version 14 or later is recommended).
2. Have a package manager like npm or yarn installed.
Installation
1. Clone the repository:
   git clone <repository-url>

2. Navigate to the project directory:
   cd job-listing-frontend

3. Install dependencies:
   npm install

4. Set up environment variables:
    Create a .env.local file in the root directory.
    Add the following environment variables:
    NEXT_PUBLIC_API_URL
    NEXT_PUBLIC_GEOCODE_API_KEY

5. Start the development server:
   npm start

The app will be accessible at http://localhost:3000.Deployment Information
The project is deployed using Vercel. 
To deploy:
1. Push the repository to GitHub.
2. Connect the GitHub repository to Vercel.
3. Add the .env.local variables to the Vercel project settings.
4. Deploy the project, and Vercel will provide a live URL.Frontend Architecture Explanation

Tech Stack:
Next.js: React-based framework for server-side rendering and static site generation.
Tailwind CSS: Utility-first CSS framework for styling.


TypeScript: For type safety and better development experience.src/
  src/
  app/
    api/                    # Centralized folder for API logic
      fetchJobData.ts       # Handles API calls for job data
    components/             # UI components
      Card/                 # Job card component
        Card.tsx
      Container/            # Layout wrapper
        Container.tsx
      Navigation/           # Navigation-related components
        Navigation.tsx
      filters/              # Components related to filtering
        Filter.tsx
      shared/               # General-purpose reusable components
        Loading.tsx
        Footer.tsx
    fonts/                  # Custom fonts (if applicable)
    styles/                 # Global and component-level styles
      globals.css           # Tailwind CSS and other global styles
    layout.tsx              # Root layout structure
    page.tsx                # Main job listing page



Future Improvements

1. Allow users to create accounts, log in, and sync their bookmarks across devices.
Job Alerts and Notifications:

2. Add the ability to subscribe to job alerts based on filters like location or job type.
Enhanced Bookmark Management:

3. Introduce folders or tags to organize bookmarked jobs more effectively.
Offline Support:

4. Add multi-language support to cater to a global audience.