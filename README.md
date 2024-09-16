Image Generation Web Application. Deployed under: https://kemelgeneration.vercel.app/

This project is a Next.js-based web application for AI image generation. It allows users to input prompts and parameters to generate images using AI models. The application integrates with Supabase for data storage and retrieval.

Key Components:

1. Main Page (app/page.tsx):
   - Renders the main layout of the application.
   - Includes AlertBox and PinnedComment components for important information.
   - Contains ImageGenerationForm and OutputDisplay components.

2. ImageGenerationForm (components/ImageGenerationForm.tsx):
   - Allows users to input prompts and adjust generation parameters.
   - Handles image generation requests to the backend API.
   - Implements a polling mechanism to fetch generated images.

3. OutputDisplay (components/OutputDisplay.tsx):
   - Displays the generated image and its details.
   - Provides options to download the image and copy the prompt.

4. ExamplesSection (components/ExamplesSection.tsx):
   - Fetches and displays example images from Supabase.
   - Implements infinite scrolling to load more examples.

5. AlertBox and PinnedComment (components/AlertBox.tsx, components/PinnedComment.tsx):
   - Display important information about the application's status and features.

6. API Route (app/api/generate/route.ts):
   - Handles image generation requests.
   - Communicates with the Flask backend for image processing.

7. Supabase Integration (lib/supabaseClient.ts):
   - Sets up the Supabase client for database operations.

8. UI Components:
   - Utilizes Shadcn UI components for a consistent and responsive design.

9. Styling:
   - Uses Tailwind CSS for styling, with a custom configuration.

10. Layout and Fonts (app/layout.tsx):
    - Sets up the overall layout and custom font loading.

Key Features:
- Real-time image generation with customizable parameters.
- Display of generated images and example gallery.
- Responsive design for various screen sizes.
- Integration with Supabase for data persistence.
- Server-side and client-side rendering optimization.

The application is designed to be scalable and maintainable, with a clear separation of concerns between components. It leverages Next.js features for optimal performance and SEO.