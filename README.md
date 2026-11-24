# HR GOKUL WORKSPACE

Personal HR Work Management System for Asasi Group. The app uses a browser frontend, Supabase Auth/Postgres/Storage/Edge Functions for live data, and a private Google Drive folder for versioned backups.

## Architecture and folder structure

```text
HR-GOKUL-WORKSPACE/
├── index.html                 # Responsive single-page application shell
├── src/
│   ├── app.js                 # Navigation, views, forms, filters, exports
│   ├── data.js                # Supabase client and data access
│   ├── styles.css             # Dark/light responsive design system
│   └── config.js              # Public Supabase URL/key placeholders only
├── supabase/
│   ├── config.toml
│   ├── migrations/            # Relational schema, indexes, RLS, seed templates
│   └── functions/
│       ├── drive-backup/      # OAuth-backed backup/restore endpoints
│       └── schedule-reminders/# Secured reminder scheduling endpoint
├── .env.example
├── SETUP.md                   # Supabase, auth, deployment and Drive setup
├── USER_GUIDE.md
└── TESTING_CHECKLIST.md
```

### Data flow

The browser authenticates with Supabase Auth and reads/writes records through the Supabase client. Every user-owned table has RLS and `user_id` ownership checks. Database triggers maintain task change history. Edge Functions hold Google OAuth tokens and provider credentials; they create timestamped JSON backups in the user's Drive folder and validate data before restore. Supabase scheduled functions handle reminders; browser timers are not used as a substitute for a backend scheduler.

## Current implementation status

The initial build includes account login/reset, task and activity CRUD, category management, task templates, follow-ups, recurring rules, day summaries, task history, calendar, filters, date-range reports, CSV/JSON exports, theme/settings, notification inbox, database migrations and secured integration scaffolding. Configure external services as described in `SETUP.md` before using cloud features. Drive/email/browser notification delivery and actual scheduled execution require account configuration and must be verified in the checklist.

## Run locally

Serve this directory over HTTP (for example `npx serve .`) and configure the Supabase values in `src/config.js` or replace its placeholders at deployment. Opening `index.html` directly with `file://` will not work with ES modules.
