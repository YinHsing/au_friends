# au-friends

A React application built with Vite.

## Project Setup

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run preview`: Locally previews the production build.

## Deployment

This project is configured to deploy to GitHub Pages automatically using GitHub Actions.

1. Push your changes to the `main` branch.
2. The `Deploy to GitHub Pages` workflow will run automatically.
3. Ensure you have enabled GitHub Pages in your repository settings (Settings > Pages > Source: GitHub Actions).

## Configuration

- **.gitignore**: Configured to ignore system files, logs, and dependencies.
- **package.json**: dependencies and scripts setup.

## Note
Environment variables should be placed in `.env` (not committed to git).
