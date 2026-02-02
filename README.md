# Scrubmarine CRM

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-cyan)](https://tailwindcss.com/)

> Customer Relationship Management system for SCRUBMARINE.CA - Professional Hull Cleaning & Diving Services

![SCRUBMARINE.CA](https://img.shields.io/badge/SCRUBMARINE.CA-e53935?style=for-the-badge&logoColor=white)

## 🚀 Overview

Scrubmarine CRM is a modern web application built with Next.js 16, TypeScript, and Tailwind CSS. It provides a streamlined customer onboarding experience with a multi-step form process.

## ✨ Features

- **Modern Stack**: Next.js 16 App Router, TypeScript, Tailwind CSS v4
- **Responsive Design**: Mobile-first approach with clean UI
- **Form Validation**: Client-side validation with required field indicators
- **Progress Tracking**: Visual progress bar for multi-step forms
- **Brand Identity**: Custom SCRUBMARINE.CA branding with signature red theme

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.x | React Framework |
| React | 19.x | UI Library |
| TypeScript | 5.x | Type Safety |
| Tailwind CSS | 4.x | Styling |
| ESLint | 9.x | Code Quality |

## 📁 Project Structure

```
scrubmarinecrm/
├── app/
│   ├── page.tsx          # Main landing page with form
│   ├── layout.tsx        # Root layout with metadata
│   └── globals.css       # Global styles
├── public/               # Static assets
├── package.json          # Dependencies
├── next.config.ts        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
└── tailwind.config.ts    # Tailwind CSS configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/scrubmarine-code/scrubmarinecrm.git
cd scrubmarinecrm
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

## 📝 Development Workflow

### Branch Naming Convention

- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

### Commit Message Format

```
type(scope): subject

body (optional)

footer (optional)
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example:
```
feat(form): add phone number validation

- Implement regex validation for phone formats
- Add error messaging for invalid inputs
```

## 🤝 Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is proprietary software for SCRUBMARINE.CA

## 📞 Contact

- Website: [scrubmarine.ca](https://scrubmarine.ca)
- Services: Hull Cleaning • Diving Services

---

<p align="center">Built with ❤️ for SCRUBMARINE.CA</p>
