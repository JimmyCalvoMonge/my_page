# Personal Web Page
### Jimmy Calvo-Monge

Hey there! I'm Jimmy

Welcome to my personal webpage. Here I upload mathematics material and some blogs about things I enjoy!

## Overview

This repository contains the source code for my personal website, built with React. The site serves as a platform to share my academic work, including mathematics lecture notes, research publications, and interactive mathematical visualizations.

## Features

- **Interactive Mathematical Visualizations**: Dynamic fractal generators including Cantor sets, Koch curves, and number spirals (Sacks and Ulam spirals)
- **Blog System**: Display research publications and essays with detailed information
- **Lecture Notes Repository**: Curated collection of mathematics course materials
- **Responsive Design**: Mobile-friendly interface using Bootstrap grid system
- **Client-Side Routing**: Seamless navigation using React Router

## Repository Structure

```
my_page/
├── public/                  # Static assets
│   ├── index.html          # HTML template
│   ├── manifest.json       # PWA manifest
│   └── robots.txt          # SEO configuration
├── src/
│   ├── Pages/              # React components for each route
│   │   ├── Home.js         # Landing page with interactive spirals
│   │   ├── Aboutme.js      # About section
│   │   ├── Notes.js        # Lecture notes listing
│   │   ├── NotesList.js    # Notes components
│   │   ├── Blogs.js        # Blog/publication listings
│   │   ├── BlogList.js     # Blog list component
│   │   ├── BlogDetails.js  # Individual blog/publication view
│   │   ├── FunFractals.js  # Interactive fractal gallery
│   │   ├── Cantor.js       # Cantor set visualization
│   │   ├── Fractal.js      # General fractal component
│   │   ├── KochPure.js     # Koch curve implementation
│   │   ├── NoMonotonica.js # Non-monotonic function visualization
│   │   ├── Spirals.js      # Number spirals (Sacks, Ulam)
│   │   ├── Download.js     # Download functionality
│   │   └── Navbar.js       # Navigation component
│   ├── data/               # JSON data files
│   │   ├── BlogData.json   # Blog posts and publications metadata
│   │   └── NotesDescriptions.json # Lecture notes metadata
│   ├── App.js              # Main application component with routing
│   ├── App.css             # Application styles
│   ├── index.js            # React entry point
│   ├── index.css           # Global styles
│   ├── Spirals.css         # Spiral visualization styles
│   └── useFetch.js         # Custom hook for data fetching
├── package.json            # Dependencies and scripts
├── webpack.config.js       # Webpack configuration
└── README.md              # This file
```

## Technologies Used

- **React** (v17.0.2) - UI framework
- **React Router DOM** (v5.3.0) - Client-side routing
- **Framer Motion** (v5.5.5) - Animation library
- **Styled Components** (v5.3.3) - CSS-in-JS styling
- **React LaTeX** (v2.0.0) - Mathematical notation rendering
- **React PDF** (v5.7.0) - PDF handling
- **AWS SDK** (v2.1499.0) - Cloud integration
- **Bootstrap** - Responsive grid system

## Pages and Routes

- **/** - Home page featuring interactive number spirals (Sacks and Ulam)
- **/aboutme** - Personal information and background
- **/notes** - Collection of mathematics lecture notes including:
  - Differential Equations for Engineering
  - Elementary Abstract Algebra
  - Calculus in One Variable (Honors)
  - Introduction to Number Theory
- **/blogs** - Research publications and essays covering topics in:
  - Galois Theory and Algebra
  - Mathematical Biology and Epidemiology
  - Machine Learning Foundations
- **/blogs/:id** - Detailed view of individual publications
- **/funfractals** - Interactive mathematical visualizations including fractals and special functions

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm build
```

Builds the app for production to the `build` folder

### Testing

```bash
npm test
```

Launches the test runner in interactive watch mode

## Data Management

Content is managed through JSON files in the `src/data/` directory:

- **BlogData.json**: Contains metadata for publications including titles, summaries, links, and dates
- **NotesDescriptions.json**: Contains information about lecture notes with titles, summaries, colors, and download links

## Interactive Features

The site includes several interactive mathematical visualizations:

- **Number Spirals**: Animated Sacks and Ulam spirals highlighting prime number patterns
- **Fractals**: Interactive Cantor sets and Koch curves with adjustable parameters
- **Mathematical Functions**: Visualizations of special mathematical objects and functions