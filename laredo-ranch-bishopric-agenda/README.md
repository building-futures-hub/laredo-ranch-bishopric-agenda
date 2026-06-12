# Laredo Ranch Ward — Bishopric Meeting Agenda

A standalone web app for the Laredo Ranch Ward Bishopric to build, track, and manage meeting agendas.

---

## What's in the App

- Create and save Bishopric Meeting agendas
- Full LDS hymnal search (341 hymns + 2024 new additions)
- Callings tracking with status progression (To Be Met With → Accepted → Announced → Set Apart)
- Person being released shown directly under person being called
- Open positions with proposed members and approval tracking
- Standalone releases log
- Discussion items with assignments and decisions
- Young Men's issues section
- Print / Save as PDF view
- All data saved locally in the browser (persists between sessions)

---

## How to Deploy (One Time Setup — ~45 minutes)

### Step 1 — GitHub Account
Go to github.com and sign up (free) if you don't have one.

### Step 2 — Create a Repository
1. Click the "+" icon → "New repository"
2. Name it: `laredo-ranch-bishopric-agenda`
3. Set to **Private**
4. Click "Create repository"

### Step 3 — Upload the Files
Your folder structure needs to look exactly like this:

```
laredo-ranch-bishopric-agenda/
  ├── package.json
  ├── public/
  │     └── index.html
  └── src/
        ├── index.jsx
        └── BishopricAgenda.jsx
```

In GitHub:
1. Click "uploading an existing file"
2. Drag all files in — GitHub will preserve the folder structure
3. Click "Commit changes"

### Step 4 — Deploy to Vercel
1. Go to vercel.com
2. Sign up with your GitHub account
3. Click "Add New Project"
4. Select `laredo-ranch-bishopric-agenda`
5. Leave all settings as default — Vercel detects React automatically
6. Click "Deploy"

In about 60 seconds you'll have a live URL like:
`https://laredo-ranch-bishopric-agenda.vercel.app`

Share that URL with Bishop Fox, Matt, Kyle, Bryan, and you're live.

---

## Sharing

Send the URL via text or email. Works on any device — phone, tablet, laptop.
No login required. No app to install. Just open the URL.

---

## Important Note on Data

All agenda data is saved in each person's browser locally. This means:
- If Bishop Fox creates an agenda on his phone, you won't see it on your phone yet
- For now, designate one person (you as Exec Secretary makes sense) as the one who builds and saves agendas
- Everyone else can view the URL and reference it

A shared database (where everyone sees the same data in real time) is planned for a future phase.

---

## Bishopric Members Configured

| Name | Role |
|------|------|
| Bishop Tanner Fox | Bishop |
| Matt Haban | First Counselor |
| Kyle Aylesworth | Second Counselor |
| Bryan Farrow | Ward Clerk |
| Brian Ford | Executive Secretary |

To update names: open `src/BishopricAgenda.jsx` and find the `BISHOPRIC` constant near the top of the file.
