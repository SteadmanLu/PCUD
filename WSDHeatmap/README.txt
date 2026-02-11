# WSDHeatmap - Investment Income Visualization


## Table of Contents

- [Team Members](#team-members)
- [Project Overview](#project-overview)
- [Core Features](#core-features)
  - [Interactive Heatmap](#interactive-heatmap)
  - [User Interactions](#user-interactions)
  - [Control Panel](#control-panel)
  - [Responsive Design](#responsive-design)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Key Implementation Details](#key-implementation-details)
  - [Core Functions (`heatmap.js`)](#core-functions-`heatmap.js`)
  - [Data Binding](#data-binding)
  - [Event Handling](#event-handling)
- [Color Scheme](#color-scheme)
- [Data Sources](#data-sources)
  - [Geographic Data](#geographic-data)
  - [Investment Income Data](#investment-income-data)
  - [Citation](#citation)
- [Known Issues](#known-issues)
  - [Current Limitations](#current-limitations)
  - [Data Accuracy](#data-accuracy)
- [Future Development](#future-development)
  - [Planned Features](#planned-features)
- [Running the Project](#running-the-project)
  - [Prerequisites](#prerequisites)
  - [Setup Instructions](#setup-instructions)
- [Learning Objectives](#learning-objectives)
- [External Resources](#external-resources)
- [Notes](#notes)

**Group 7 — Business Analytics Inc.**

A web-based data visualization tool that maps U.S. investment income through interactive D3.js heatmaps. Developed for the Web Science & System Development course at RPI.

##  Team Members

- Paul Kellermann
- Jake Hascup
- Henry Travis
- Lucas Steadman

##  Project Overview

This application demonstrates data-driven visualizations using geographic datasets (TopoJSON and US Atlas) to create an interactive heatmap of investment income across all 50 U.S. states.

##  Core Features

### Interactive Heatmap
- Displays all 50 states color-coded by income range ($25k–$65k)
- Smooth geographic rendering using D3.js geoAlbersUsa() projection
- Six-tier color gradient for income visualization

### User Interactions
- **Hover Effects:** Highlight states on mouseover
- **Click Events:** Display detailed state information (income, year, population)
- **Info Panel:** Real-time data display for selected states

### Control Panel
- Year dropdown selector (2020–2024)
- Location search functionality
- Update/Reset/Export buttons
- Responsive filter controls

### Responsive Design
- Flexible SVG layout adapts to screen size
- Color legend for income ranges
- Professional info panel layout

##  Technologies

- **HTML5** - Structure and semantic markup
- **CSS3** - Styling and responsive design
- **JavaScript** - Application logic and interactivity
- **D3.js v7** - Data visualization and SVG manipulation
- **TopoJSON** - Efficient geographic data encoding
- **US Atlas** - U.S. state boundary data

##  Project Structure

```
WSDHeatmap/
 about_us_section/     # Team information pages
 heatmap_section/      # Core visualization components
    heatmap.js       # Main visualization logic
 login/               # User authentication system
 index.php            # Main entry point
 README.txt           # Original project documentation
```

##  Key Implementation Details

### Core Functions (`heatmap.js`)

**`createFakeHeatmap()`**
- Initializes SVG map container
- Loads geographic data from `us-atlas@3/states-10m.json`
- Applies geoAlbersUsa() projection for proper U.S. map rendering
- Generates placeholder income data for demonstration

**`getColor(value)`**
- Maps income values to six hex-coded colors
- Creates visual hierarchy for income ranges
- Returns appropriate color codes for state coloring

**`updateVisualization()`**
- Placeholder filter logic for map updates
- Designed for future integration with real data filtering
- Handles year and region selection

**`resetFilters()`**
- Clears all user selections
- Reloads map to initial state
- Resets control panel to defaults

**`onLocationClick(state)`**
- Updates info panel with clicked state data
- Displays income, year, and population statistics
- Provides detailed state-level information

### Data Binding
```javascript
// D3 data join pattern
svg.selectAll("path")
    .data(features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("fill", d => getColor(d.properties.income))
```

### Event Handling
```javascript
// Interactive hover and click events
.on("mouseover", function(event, d) {
    d3.select(this).attr("opacity", 0.7);
})
.on("mouseout", function(event, d) {
    d3.select(this).attr("opacity", 1);
})
.on("click", function(event, d) {
    onLocationClick(d.properties);
})
```

##  Color Scheme

Income ranges are represented by six distinct colors:
- **Lowest:** Light blue/teal
- **Low-Mid:** Medium blue
- **Mid:** Blue-green
- **Mid-High:** Green-yellow
- **High:** Yellow-orange
- **Highest:** Orange-red

##  Data Sources

### Geographic Data
- Loaded from **US Atlas** TopoJSON files
- State boundaries from `us-atlas@3/states-10m.json`

### Investment Income Data
- **Source:** IPUMS CPS (Current Population Survey)
- **Documentation:** 
  - [Sampling Information](https://usa.ipums.org/usa/chapter2/chapter2.shtml)
  - [Three-Eighths Sample](https://cps.ipums.org/cps/three_eighths.shtml)

### Citation
```
Sarah Flood, Miriam King, Renae Rodgers, Steven Ruggles, J. Robert Warren, 
Daniel Backman, Etienne Breton, Grace Cooper, Julia A. Rivera Drew, 
Stephanie Richards, David Van Riper, and Kari C.W. Williams. 
IPUMS CPS: Version 13.0 [dataset]. Minneapolis, MN: IPUMS, 2025. 
https://doi.org/10.18128/D030.V13.0
```

##  Known Issues

### Current Limitations
- **Placeholder Data:** Using generated fake data instead of real IPUMS integration
- **Incomplete Features:** Timeline visualization not yet implemented
- **Export Functionality:** Data export feature in development
- **Authentication:** User login system needs integration with main app

### Data Accuracy
- Current income values are for demonstration purposes only
- Real IPUMS data integration pending
- No actual county-level granularity available yet

##  Future Development

### Planned Features
1. **Real Data Integration**
   - Connect to IPUMS CPS API
   - Implement actual income data retrieval
   - Add data caching for performance

2. **Enhanced Filtering**
   - County-level granularity
   - Regional grouping options
   - Multiple data dimensions (age, occupation, etc.)

3. **Timeline Visualization**
   - Animated year-over-year changes
   - Trend line charts
   - Historical data comparison

4. **User Features**
   - Account authentication
   - Saved filter preferences
   - Custom data exports (CSV, JSON)

5. **Performance Optimization**
   - Lazy loading for large datasets
   - Improved rendering for mobile devices
   - Client-side data caching

##  Running the Project

### Prerequisites
- PHP-enabled web server (XAMPP, MAMP, or similar)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Setup Instructions

1. **Clone or Download** the project files

2. **Start Web Server:**
   ```bash
   # Using PHP built-in server
   php -S localhost:8000
   ```

3. **Access Application:**
   - Navigate to `http://localhost:8000/index.php`
   - Or open `index.php` through your server setup

4. **Explore Features:**
   - Hover over states to see highlighting
   - Click states to view detailed information
   - Use year dropdown to filter data
   - Try the search functionality

##  Learning Objectives

This project demonstrates proficiency in:
- **D3.js Data Visualization:** Creating interactive SVG graphics
- **Geographic Data Handling:** Working with TopoJSON and projections
- **Event-Driven Programming:** Mouse interactions and state management
- **Responsive Web Design:** Flexible layouts and mobile support
- **Data Processing:** Parsing and transforming complex datasets
- **Team Collaboration:** Multi-developer project coordination

##  External Resources

- [D3.js Documentation](https://d3js.org/)
- [TopoJSON Specification](https://github.com/topojson/topojson)
- [US Atlas Repository](https://github.com/topojson/us-atlas)
- [IPUMS CPS Database](https://cps.ipums.org/)

##  Notes

This project was developed as part of RPI's Web Science & System Development curriculum, focusing on practical application of data visualization techniques and modern web technologies.

---

**Business Analytics Inc. - Group 7** | RPI Web Science Project