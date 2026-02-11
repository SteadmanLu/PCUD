Investment Income Visualization Project
Group 7 — Business Analytics Inc.
Team Members:
    Paul Kellermann • Jake Hascup • Henry Travis • Lucas Steadman

Overview
    A web-based data visualization tool that maps U.S. investment income through interactive D3.js heatmaps. The project demonstrates data-driven visualizations using geographic datasets (TopoJSON and US Atlas).

Technologies
    HTML5 • CSS3 • JavaScript • D3.js v7 • TopoJSON • US Atlas

Core Features
    Interactive Heatmap: Displays all 50 states, color-coded by income range ($25k–$65k).
    Hover & Click Events: Highlight states and show detailed info (income, year, population).
    Control Panel: Year dropdown (2020–2024), location search, update/reset/export buttons.
    Responsive Design: Flexible SVG layout with color legend and info panel.

Key Logic (heatmap.js)
    createFakeHeatmap(): Initializes SVG map using geoAlbersUsa() projection and fake income data.
    getColor(value): Maps income values to six hex-coded colors.
    updateVisualization(): Placeholder filter logic for map updates.
    resetFilters(): Clears all selections and reloads the map.
    onLocationClick(): Updates info panel with clicked state data.

Implementation Details
    Geographic data loaded from us-atlas@3/states-10m.json.
    D3 data join binds GeoJSON features to SVG <path> elements.
    Interactivity handled via D3 event listeners (mouseover, mouseout, click).

Known Issues
    Placeholder fake data (no real IPUMS integration).
    Timeline and export features not yet implemented.

Future Work
    Integrate real IPUMS data and filtering.
    Add timeline chart, authentication, and data export.
    Enable county-level granularity and regional filters.

References
D3.js Docs • TopoJSON • US Atlas • IPUMS Data

Notes: 

For sampling information go to 
    https://usa.ipums.org/usa/chapter2/chapter2.shtml
    https://cps.ipums.org/cps/three_eighths.shtml
    

Cite "Sarah Flood, Miriam King, Renae Rodgers, Steven Ruggles, J. Robert Warren, Daniel Backman, 
Etienne Breton, Grace Cooper, Julia A. Rivera Drew, Stephanie Richards, David Van Riper, and Kari C.W. Williams. 
IPUMS CPS: Version 13.0 [dataset]. Minneapolis, MN: IPUMS, 2025. https://doi.org/10.18128/D030.V13.0"

