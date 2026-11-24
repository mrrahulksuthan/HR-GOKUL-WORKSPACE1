# Setup

## 1. Create a Supabase project

Create a project, then run `supabase/migrations/001_workspace.sql` in its SQL editor. In Authentication, enable Email and password sign-in and add your deployed dashboard URL to Redirect URLs.

Copy the project URL and anonymous key into `src/config.js`. The anonymous key is safe in a frontend only because the migration enables Row Level Security. Never use a service role key in the dashboard.

## Email and password accounts

In Supabase, open **Authentication → Providers → Email** and keep email/password sign-in enabled. In **Authentication → URL Configuration**, add your GitHub Pages URL, such as `https://YOUR-GITHUB-USERNAME.github.io/hr-gokul-workspace/`, to Redirect URLs. This lets account-confirmation and password-reset emails return users to the dashboard.

## 2. Run the dashboard

Host the `HR-GOKUL-WORKSPACE` folder using any static server. The app uses ES modules, so do not open `index.html` directly from the file system.

## 3. Google Drive backups

Create a Google OAuth Web application and configure its redirect URI to your deployed Supabase Edge Function endpoint. Store OAuth credentials only as Supabase Edge Function secrets. Deploy a server-side `drive-backup` function that creates a private `HR GOKUL WORKSPACE BACKUPS` folder, writes versioned JSON exports, validates uploads and takes a safety backup before restore. The dashboard intentionally reports “Not connected” until OAuth succeeds.

## 4. Scheduled reminders

Deploy a secured scheduled function that queries active tasks, calculates the 3 day, 1 day and due reminders in Asia/Dubai, moves Sunday reminder delivery to Saturday and avoids duplicate entries. Configure email delivery in that function only. Browser notification permission should be requested from a user action.

## Operational notes

Use the dashboard's JSON export before any manual import. Completed records are preserved. The migration records task changes through a database trigger.
