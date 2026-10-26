# Runaway9 personal openGym

This is a personal, non-commercial fork of [openGym by Duarte Santos](https://github.com/DuarteSantos8/openGym), preserving its AGPL source licence and third-party notices.

The GitHub Pages edition starts with **empty records**, defaults to Simplified Chinese, and stores training data in the current browser. It has no account, cloud sync, server notifications or AI coach. Plans, sets, body weight, statistics and manual backups use the original openGym features. Settings → Data & backup provides export and import; export before changing devices, browsers or clearing website data. Custom photos and videos should use the backup option that includes media.

## Build and preview

Use Node.js 22.12 or newer:

```powershell
cd frontend
npm ci
npm run build:pages
npm run preview -- --host 127.0.0.1
```

The personal build reads `frontend/.env.personal`. It uses `VITE_LOCAL_WEB=1`, independently of the upstream demo mode. It does not generate sample workouts, and opening or updating the app never resets saved records.

The PWA can be added to a phone's home screen from its browser. Offline use requires a successful first load and completed app caching; uncached exercise videos still need a connection. Background timer sounds depend on the phone browser and operating system.

## Publish

The target source repository is `Runaway9/openGym`. The expected Pages URL, **once successfully published**, is `https://runaway9.github.io/openGym/`.

After pushing to `main`, enable the `pages.yml` workflow and configure Pages to use GitHub Actions. That workflow runs `npm run build:pages`, packages the original unmodified 180 px exercise media, and publishes `frontend/dist`. This fork does not require upstream release, CLA or container-publishing workflows.

The GitHub connector's account connection and the local GitHub CLI login are separate. Creating a fork, enabling Pages and pushing via local Git require an authenticated supported channel. Never place a GitHub token in source, workflow files or documentation.

The exercise media have a separate licence: keep `NOTICE.md` and `catalogue/media/NOTICE.md`. The upstream notice permits a non-commercial openGym fork to retain unmodified 180 px media; commercial or independent use requires a separate Gym visual licence.
