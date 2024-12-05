Job Listing Frontend

Overview
The Job Listing Frontend is a robust and interactive web application designed to provide users with an efficient way to browse and manage job opportunities. Built with Next.js, styled using Tailwind CSS, and enhanced with TypeScript, this project offers advanced features like filtering, pagination, and bookmark functionality.
With a focus on performance and user experience, the application ensures seamless navigation and dynamic job listing updates.

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
    NEXT_PUBLIC_API_URL=<your-api-url>

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
├── app/
│   ├── components/         # Reusable UI components
│   │   ├── Card.tsx          # Renders individual job cards
│   │   ├── Container.tsx     # Layout wrapper
│   │   ├── FetchJobData.tsx  # Handles API calls for job data
│   │   ├── Filter.tsx        # Filtering functionality
│   │   ├── Footer.tsx        # Footer component
│   │   ├── Loading.tsx       # Loading spinner
│   │   ├── Navigation.tsx    # Top navigation bar
│   │   └── parseHTMLData.tsx # Parses HTML data for rendering
│   ├── fonts/              # Custom fonts (if applicable)
│   ├── styles/             # Global and component-level styles
│   │   └── globals.css       # Tailwind CSS and global styling
│   ├── layout.tsx          # Root layout structure
│   ├── page.tsx            # Main job listing page1. User Authentication:



2. Allow users to create accounts, log in, and sync their bookmarks across devices.
Job Alerts and Notifications:

3. Add the ability to subscribe to job alerts based on filters like location or job type.
Enhanced Bookmark Management:

4. Introduce folders or tags to organize bookmarked jobs more effectively.
Offline Support:

5. Add multi-language support to cater to a global audience.