# Publish on GitHub Pages

1. Create a new GitHub repository named `hr-gokul-workspace`. Keep it public if you want anyone to open the dashboard page.
2. Upload every file in this `HR-GOKUL-WORKSPACE` folder to the repository root. Do not upload `.env` files or any secret key.
3. In the GitHub repository, open **Settings**, then **Pages**. Under **Build and deployment**, select **Deploy from a branch**, choose `main` and `/(root)`, then save.
4. GitHub will publish the site at `https://YOUR-GITHUB-USERNAME.github.io/hr-gokul-workspace/` within a few minutes.
5. In Supabase Authentication settings, add that exact Pages address to **Redirect URLs**. Then insert your Supabase project URL and anonymous key into `src/config.js` and commit the change.

GitHub Pages makes the dashboard page publicly reachable. Your HR records remain private only when Supabase Row Level Security is enabled and each person uses their own authenticated account. If this is a personal workspace, leave sign-up disabled in Supabase after creating your account.
