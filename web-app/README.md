# XFSolutions - React Application

A modern, client-side React web application showcasing XForce Solutions' services and portfolio. Built with Vite, React, React Router, and Tailwind CSS.

## Features

- **Client-side only**: Pure React frontend with no backend required
- **React + Vite**: Fast, modern development experience
- **Tailwind CSS**: Utility-first CSS framework for styling
- **React Router**: Client-side routing with browser history
- **Dark/Light Mode**: Theme toggle with localStorage persistence
- **EmailJS Integration**: Contact form ready for EmailJS configuration
- **GitHub Pages**: Automatic deployment via GitHub Actions

## Project Structure

```
xforcesolutions/
├── .github/workflows/  # GitHub Actions deployment workflow
├── public/             # Static assets (images, docs)
│   ├── images/         # Project images
│   └── docs/           # Architecture documentation
├── src/
│   ├── components/     # Reusable components (Navbar)
│   ├── contexts/       # React contexts (ThemeContext)
│   ├── pages/          # Page components
│   │   └── roadmap/    # Roadmap sub-pages
│   ├── App.jsx         # Main App with routing
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── index.html          # HTML entry point
├── package.json        # Dependencies
├── vite.config.js      # Vite configuration
└── tailwind.config.js  # Tailwind CSS configuration
```

## Pages

- **About** (`/`) - Profile page with social links
- **Home** (`/home`) - Hero section with call-to-action
- **Projects** (`/projects`) - Portfolio showcase (Fundraisely, Yew Scaffold, XFTerminal, etc.)
- **Contact** (`/contact`) - Contact form with validation
- **Proposal** (`/proposal`) - Grant proposal with carousel
- **Architecture** (`/architecture`) - Documentation links
- **Contracts** (`/contracts`) - Smart contract documentation
- **Documentation** (`/documentation`) - Links to documentation
- **Status** (`/status`) - XFTerminal status and features
- **Roadmap** (`/roadmap`) - Development roadmap with month details
  - Month 1, Month 2, Month 3, Month 4

## Development

### Prerequisites

- Node.js 20+ and npm

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:5173/xforcesolutions/`

### Build for Production

```bash
npm run build
```

This creates a `dist` folder with the production build.

## EmailJS Configuration

The contact form uses EmailJS to send emails. To configure:

1. Create a free account at [EmailJS](https://www.emailjs.com/)
2. Set up an email service (Gmail, Outlook, etc.)
3. Create an email template with the following variables:
   - `from_name`: Sender's name
   - `from_email`: Sender's email
   - `message`: Message content
   - `to_email`: Recipient email

4. Update the EmailJS credentials in [`src/pages/Contact.jsx`](src/pages/Contact.jsx):
   - Replace `YOUR_SERVICE_ID` with your EmailJS service ID
   - Replace `YOUR_TEMPLATE_ID` with your EmailJS template ID
   - Replace `YOUR_PUBLIC_KEY` with your EmailJS public key

## Deployment

### GitHub Pages

The site is automatically deployed to GitHub Pages via GitHub Actions when you push to the `main` branch.

1. Enable GitHub Pages in your repository settings:
   - Go to Settings → Pages
   - Source: GitHub Actions

2. Push to `main` branch - the workflow will automatically:
   - Build the React application
   - Deploy to GitHub Pages

The site will be available at `https://trilltino.github.io/xforcesolutions/`

### Manual Deployment

You can also deploy manually using:

```bash
npm run deploy
```

This requires the `gh-pages` package (already included in devDependencies).

## Technologies Used

- **React 18** - UI library
- **React Router 6** - Client-side routing
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **EmailJS** - Email service for contact form

## License

MIT License - Open source and free to use.
