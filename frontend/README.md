# SellHive Frontend (React + Vite)

## Setup
```bash
cp .env.example .env
npm install
npm run dev
```

## Folder guide
- `components/layout`  -> Header, Footer, Nav (har page pe common)
- `components/ui`      -> reusable buttons/cards
- `components/sections`-> homepage ke 13 sections (Hero, Services, FAQ, etc.)
- `components/forms`   -> AuditForm, ContactForm
- `pages`              -> route-level pages (Home, About, Services, Results, Contact, Audit)
- `admin`              -> admin panel screens (login, dashboard, leads table, CMS editor)
- `services`           -> API call functions (axios wrappers)
- `routes`             -> React Router config
