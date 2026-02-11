# HomeSite - Personal Portfolio Hub


## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
  - [Professional Portfolio Layout](#professional-portfolio-layout)
  - [Interactive Project Cards](#interactive-project-cards)
  - [Smart File Explorer](#smart-file-explorer)
  - [Technology Highlighting](#technology-highlighting)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Design Elements](#design-elements)
  - [Color Scheme](#color-scheme)
  - [Typography](#typography)
  - [Layout](#layout)
- [Responsive Breakpoints](#responsive-breakpoints)
- [Featured Projects](#featured-projects)
  - [WSD Heatmap](#wsd-heatmap)
  - [Recipe Finder](#recipe-finder)
  - [Spin Wheel](#spin-wheel)
  - [Jeopardy Game](#jeopardy-game)
  - [Cocktail Database](#cocktail-database)
- [Code Structure](#code-structure)
  - [HTML Architecture](#html-architecture)
  - [CSS Organization](#css-organization)
  - [JavaScript Functionality](#javascript-functionality)
- [Styling Guide](#styling-guide)
  - [Project Card Template](#project-card-template)
  - [Tech Tag Styling](#tech-tag-styling)
  - [File Window Design](#file-window-design)
- [Getting Started](#getting-started)
  - [Quick Start](#quick-start)
  - [Customization](#customization)
- [Adding New Projects](#adding-new-projects)
  - [Project Card Template](#project-card-template)
- [Learning Objectives](#learning-objectives)
- [Future Enhancements](#future-enhancements)
  - [Planned Features](#planned-features)
  - [Advanced Features](#advanced-features)
- [SEO Optimization](#seo-optimization)
  - [Meta Tags](#meta-tags)
  - [Structured Data](#structured-data)
- [Color Palette Reference](#color-palette-reference)
- [Browser Compatibility](#browser-compatibility)
- [Known Issues](#known-issues)
- [Maintenance Tips](#maintenance-tips)
  - [Adding Projects](#adding-projects)
  - [Updating Styles](#updating-styles)
  - [Performance](#performance)
- [Navigation Structure](#navigation-structure)
- [Professional Use](#professional-use)
- [Best Practices](#best-practices)
  - [Content](#content)
  - [Design](#design)
  - [Code](#code)

A clean, professional portfolio website that serves as the central hub for showcasing all PCUD projects. Features responsive design, project cards with file previews, and modern web aesthetics.

##  Overview

HomeSite is the landing page for Lucas Steadman's project portfolio, providing an organized, visually appealing way to explore various web development, game design, and programming projects. It acts as the main navigation point for the entire PCUD repository.

##  Key Features

### Professional Portfolio Layout
- **Hero Section:** Clean header with name and tagline
- **About Me:** Personal introduction and background
- **Projects Grid:** Organized showcase of all projects
- **Responsive Design:** Mobile-friendly layout
- **Modern Aesthetics:** Contemporary web design

### Interactive Project Cards
- **Project Headers:** Color-coded titles
- **Descriptions:** Clear explanations of each project
- **Technology Tags:** Visual tech stack indicators
- **Direct Links:** Navigation to live projects
- **File Previews:** Expandable file structure views

### Smart File Explorer
- **Collapsible File Lists:** Click to expand/collapse
- **Directory Indicators:** Folder icons for directories
- **Item Counts:** Shows number of files/folders
- **Clean Hierarchy:** Easy-to-read structure
- **Toggle Functionality:** Show/hide file trees

### Technology Highlighting
- **Tech Tags:** Colored badges for technologies used
- **Stack Visibility:** Immediate tech stack understanding
- **Consistent Styling:** Uniform tag appearance
- **Quick Recognition:** Visual technology identification

##  Technologies

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with Grid and Flexbox
- **JavaScript** - Interactive file toggles
- **Responsive Design** - Mobile-first approach

##  Project Structure

```
HomeSite/
 index.html           # Main portfolio page
 resources/
    css/
       style.css   # Stylesheet
    js/
        script.js   # Toggle functionality
 README.md           # This file
```

##  Design Elements

### Color Scheme
- **Primary:** Clean whites and light grays
- **Accents:** Project-specific colors
- **Tech Tags:** Varied colors per technology
- **Text:** Professional dark grays
- **Links:** Highlighted blue with hover effects

### Typography
- **Headers:** Large, bold, attention-grabbing
- **Body:** Clean, readable sans-serif
- **Tags:** Small, uppercase, distinctive
- **Links:** Underlined on hover

### Layout
- **Container:** Centered max-width content area
- **Grid:** Responsive project card grid
- **Cards:** Shadowed, bordered project containers
- **Sections:** Clear visual separation

##  Responsive Breakpoints

```css
/* Desktop */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
}

/* Tablet */
@media (max-width: 768px) {
    grid-template-columns: 1fr;
}

/* Mobile */
@media (max-width: 480px) {
    /* Optimized mobile layout */
}
```

##  Featured Projects

### WSD Heatmap
**Investment Income Data Visualization**
- D3.js interactive mapping
- State-level data visualization
- Year filtering (2020-2024)

**Tech Stack:** PHP, JavaScript, HTML/CSS

### Recipe Finder
**Ingredient-Based Recipe Search**
- Smart filtering system
- Shopping list functionality
- Dynamic recipe cards

**Tech Stack:** JavaScript, JSON, HTML/CSS

### Spin Wheel
**Interactive Decision Maker**
- Canvas-based animations
- Weighted probabilities
- Statistics tracking

**Tech Stack:** JavaScript, Canvas API, CSS

### Jeopardy Game
**C++ Trivia Game Engine**
- Multi-player support
- JSON-powered questions
- Daily Double mechanics

**Tech Stack:** C++, JSON, Game Logic

### Cocktail Database
**Recipe Collection**
- Comprehensive drink database
- Flavor profile filtering
- Detailed instructions

**Tech Stack:** JSON, Data Management

##  Code Structure

### HTML Architecture
```html
<body>
    <header>
        <!-- Name and tagline -->
    </header>
    
    <main class="container">
        <section class="about-me">
            <!-- Personal introduction -->
        </section>
        
        <section class="projects-grid">
            <!-- Project cards -->
            <div class="project-card">
                <div class="project-header">
                <div class="project-content">
                    <p>Description</p>
                    <div class="tech-tags">
                    <a class="project-link">
                    <div class="file-window">
                </div>
            </div>
        </section>
    </main>
    
    <footer>
        <!-- Copyright and credits -->
    </footer>
</body>
```

### CSS Organization
```css
/* Global Styles */
* { margin: 0; padding: 0; }

/* Layout */
.container { max-width: 1200px; }

/* Components */
.project-card { /* Card styling */ }
.tech-tag { /* Technology badges */ }
.file-window { /* File explorer */ }

/* Interactive */
.toggle-files { cursor: pointer; }

/* Responsive */
@media (max-width: 768px) { /* Mobile */ }
```

### JavaScript Functionality
```javascript
function toggleFiles(fileWindowId) {
    const fileWindow = document.getElementById(fileWindowId);
    const toggleBtn = event.target;
    
    if (fileWindow.style.display === 'none') {
        fileWindow.style.display = 'block';
        toggleBtn.textContent = '- Hide Files';
    } else {
        fileWindow.style.display = 'none';
        toggleBtn.textContent = '+ Show Files';
    }
}
```

##  Styling Guide

### Project Card Template
```css
.project-card {
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: transform 0.2s;
}

.project-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}
```

### Tech Tag Styling
```css
.tech-tag {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    margin: 0.25rem;
    background: #e3f2fd;
    color: #1976d2;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 600;
}
```

### File Window Design
```css
.file-window {
    background: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 1rem;
    margin-top: 1rem;
    font-family: monospace;
}

.file-list {
    list-style: none;
    padding-left: 1rem;
}

.folder::before {
    content: " ";
}
```

##  Getting Started

### Quick Start
```bash
# Clone or download the repository
cd HomeSite

# Open in browser
open index.html

# Or use local server
python -m http.server 8000
# Navigate to http://localhost:8000
```

### Customization
1. **Edit HTML:** Update project descriptions and links
2. **Modify CSS:** Change colors and styling
3. **Update Projects:** Add/remove project cards
4. **Adjust Layout:** Modify grid and spacing

##  Adding New Projects

### Project Card Template
```html
<div class="project-card">
    <div class="project-header">Your Project Name</div>
    <div class="project-content">
        <p>Project description here...</p>
        
        <div class="tech-tags">
            <span class="tech-tag">Technology1</span>
            <span class="tech-tag">Technology2</span>
        </div>
        
        <a href="../YourProject/" class="project-link">
            View Project →
        </a>
        
        <div class="file-window" id="files-yourproject">
            <div class="file-window-header">
                 Project Files
                <span>X items</span>
            </div>
            <ul class="file-list">
                <li class="folder">folder/</li>
                <li>file.html</li>
            </ul>
        </div>
        
        <span class="toggle-files" 
              onclick="toggleFiles('files-yourproject')">
            + Show Files
        </span>
    </div>
</div>
```

##  Learning Objectives

This project demonstrates:
- **Semantic HTML:** Proper structure and tags
- **CSS Grid/Flexbox:** Modern layout techniques
- **Responsive Design:** Mobile-first approach
- **JavaScript DOM:** Interactive elements
- **Clean Code:** Maintainable structure
- **Portfolio Design:** Professional presentation

##  Future Enhancements

### Planned Features
- [ ] Dark mode toggle
- [ ] Animated transitions
- [ ] Search functionality
- [ ] Filter by technology
- [ ] Project categories/tags
- [ ] Live project previews
- [ ] Contact form
- [ ] Blog integration

### Advanced Features
- [ ] CMS integration
- [ ] Dynamic project loading
- [ ] GitHub API integration
- [ ] Analytics tracking
- [ ] Social media links
- [ ] Resume download
- [ ] Skill visualization
- [ ] Timeline view

##  SEO Optimization

### Meta Tags
```html
<meta name="description" 
      content="Lucas Steadman's portfolio of web development projects">
<meta name="keywords" 
      content="web development, portfolio, projects, RPI">
<meta name="author" content="Lucas Steadman">
```

### Structured Data
```json
{
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Lucas Steadman",
    "jobTitle": "Web Developer",
    "url": "https://yoursite.com"
}
```

##  Color Palette Reference

```css
/* Primary Colors */
--background: #ffffff;
--text-primary: #333333;
--text-secondary: #666666;

/* Accent Colors */
--link-color: #1976d2;
--link-hover: #1565c0;

/* Tech Tag Colors */
--tag-blue: #e3f2fd;
--tag-green: #e8f5e9;
--tag-orange: #fff3e0;
--tag-purple: #f3e5f5;
```

##  Browser Compatibility

Tested on:
-  Chrome 90+
-  Firefox 88+
-  Safari 14+
-  Edge 90+
-  Mobile Safari
-  Chrome Mobile

##  Known Issues

- File windows start hidden (intended design)
- No lazy loading for project images
- Fixed width container (responsive within limits)
- Manual project updates required

##  Maintenance Tips

### Adding Projects
1. Create new project card HTML
2. Add unique ID to file window
3. Update toggle function call
4. Test responsive layout

### Updating Styles
1. Modify CSS variables for global changes
2. Use browser dev tools for testing
3. Check mobile breakpoints
4. Validate HTML/CSS

### Performance
- Optimize images
- Minify CSS/JavaScript
- Use CDN for libraries
- Enable caching

##  Navigation Structure

```
HomeSite (You are here)
 WSDHeatmap/
    index.php
 Recipes/
    index.html
 Wheel/
    wheel.html
 Jeapordy/
    jeapordy
 BarSite/
    cocktails.json
 DogChatBot/
     bot.py
```

##  Professional Use

Perfect for:
- **Job Applications:** Showcase your work
- **Interviews:** Discussion material
- **Networking:** Share your projects
- **Learning:** Track your progress
- **Inspiration:** For other students

##  Best Practices

### Content
- Keep descriptions concise and clear
- Highlight key features, not implementation details
- Use action-oriented language
- Include clear call-to-actions

### Design
- Maintain consistent spacing
- Use whitespace effectively
- Ensure readability
- Test on multiple devices

### Code
- Write semantic HTML
- Use CSS variables
- Comment complex sections
- Keep JavaScript minimal

---

**HomeSite** - Your project portfolio, professionally presented 

*A personal project by Lucas Steadman*