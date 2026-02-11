const CENSUS_API_KEY = '768b50f14b490c1df69d23a336f4c934846914b6';

// Fake data for demonstration
const fakeStateData = {
    'Alabama': 28500, 'Alaska': 45200, 'Arizona': 38900, 'Arkansas': 26800, 'California': 52300,
    'Colorado': 48700, 'Connecticut': 61200, 'Delaware': 44500, 'Florida': 41200, 'Georgia': 35600,
    'Hawaii': 47800, 'Idaho': 32400, 'Illinois': 43900, 'Indiana': 34200, 'Iowa': 36700,
    'Kansas': 37100, 'Kentucky': 29900, 'Louisiana': 31200, 'Maine': 38400, 'Maryland': 58900,
    'Massachusetts': 64100, 'Michigan': 37800, 'Minnesota': 45300, 'Mississippi': 25100, 'Missouri': 36200,
    'Montana': 34800, 'Nebraska': 38200, 'Nevada': 40100, 'New Hampshire': 52700, 'New Jersey': 59400,
    'New Mexico': 30700, 'New York': 56800, 'North Carolina': 37900, 'North Dakota': 41500, 'Ohio': 36900,
    'Oklahoma': 32600, 'Oregon': 42300, 'Pennsylvania': 42100, 'Rhode Island': 48200, 'South Carolina': 33400,
    'South Dakota': 36100, 'Tennessee': 34700, 'Texas': 39800, 'Utah': 38600, 'Vermont': 44900,
    'Virginia': 51200, 'Washington': 49300, 'West Virginia': 27400, 'Wisconsin': 39400, 'Wyoming': 43600
};

const fakeCountyData = {};
const fakeZipData = {};

// Store current SVG and zoom behavior for search highlighting
let currentSvg = null;
let currentZoom = null;
let currentFeatures = null;
let currentLevel = 'state';
let currentG = null; // Store the main group element
let currentProjection = null; // Store the projection

// Color scale
function getColor(value) {
    if (!value) return '#e0e0e0';
    if (value < 30000) return '#ffffcc';
    if (value < 35000) return '#ffeda0';
    if (value < 40000) return '#fed976';
    if (value < 45000) return '#feb24c';
    if (value < 50000) return '#fd8d3c';
    return '#f03b20';
}

window.onload = function() {
    createHeatmap();
};

function createHeatmap() {
    const viewLevel = document.getElementById('view-level');
    const level = viewLevel ? viewLevel.value : 'state';
    currentLevel = level;
    
    if (level === 'county') {
        createCountyHeatmap();
    } else if (level === 'zip') {
        createZipHeatmap();
    } else {
        createStateHeatmap();
    }
}

function createStateHeatmap() {
    const heatmapDiv = document.getElementById('heatmap');
    heatmapDiv.innerHTML = '';

    const width = heatmapDiv.clientWidth;
    const height = heatmapDiv.clientHeight;

    const svg = d3.select('#heatmap')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    currentSvg = svg;

    // Create a group for zooming
    const g = svg.append('g');
    currentG = g;

    // Improved projection settings for better centering
    const projection = d3.geoAlbersUsa()
        .scale(width * 1.2)  // Slightly reduced for better fit
        .translate([width / 2, height / 2]);
    
    currentProjection = projection;

    const path = d3.geoPath().projection(projection);

    // Add zoom behavior
    const zoom = d3.zoom()
        .scaleExtent([1, 8])
        .on('zoom', (event) => {
            g.attr('transform', event.transform);
        });

    svg.call(zoom);
    currentZoom = zoom;

    d3.json('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json')
        .then(function(us) {
            const states = topojson.feature(us, us.objects.states);
            currentFeatures = states.features;

            const paths = g.append('g')
                .selectAll('path')
                .data(states.features)
                .enter()
                .append('path')
                .attr('d', path)
                .attr('fill', function(d) {
                    const stateName = d.properties.name;
                    const value = fakeStateData[stateName];
                    return getColor(value);
                })
                .attr('stroke', '#333')
                .attr('stroke-width', 0.5)
                .attr('class', 'state-path')
                .style('cursor', 'pointer')
                .on('mouseover', function(event, d) {
                    d3.select(this)
                        .attr('stroke-width', 2)
                        .attr('stroke', '#000');
                })
                .on('mouseout', function(event, d) {
                    if (!d3.select(this).classed('highlighted')) {
                        d3.select(this)
                            .attr('stroke-width', 0.5)
                            .attr('stroke', '#333');
                    }
                })
                .on('click', function(event, d) {
                    const stateName = d.properties.name;
                    const value = fakeStateData[stateName];
                    onLocationClick({
                        name: stateName,
                        income: value ? '$' + value.toLocaleString() : 'N/A',
                        isState: true  // Add this flag
                    });
                });

            // Add info panel overlay to SVG
            createInfoPanelOverlay(svg, width, height);
        })
        .catch(function(error) {
            console.error('Error loading map data:', error);
            heatmapDiv.innerHTML = '<div class="instructions">Error loading map. Please refresh the page.</div>';
        });
}

function createCountyHeatmap() {
    const heatmapDiv = document.getElementById('heatmap');
    heatmapDiv.innerHTML = '<div class="instructions">Loading county data...</div>';

    const width = heatmapDiv.clientWidth;
    const height = heatmapDiv.clientHeight;

    const svg = d3.select('#heatmap')
        .html('')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    currentSvg = svg;

    const g = svg.append('g');
    currentG = g;

    // Improved projection for counties
    const projection = d3.geoAlbersUsa()
        .scale(width * 1.2)
        .translate([width / 2, height / 2]);
    
    currentProjection = projection;

    const path = d3.geoPath().projection(projection);

    const zoom = d3.zoom()
        .scaleExtent([1, 16])
        .on('zoom', (event) => {
            g.attr('transform', event.transform);
        });

    svg.call(zoom);
    currentZoom = zoom;

    d3.json('https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json')
        .then(function(us) {
            const counties = topojson.feature(us, us.objects.counties);
            currentFeatures = counties.features;
            
            if (Object.keys(fakeCountyData).length === 0) {
                counties.features.forEach(function(d) {
                    fakeCountyData[d.id] = Math.floor(Math.random() * 50000) + 20000;
                });
            }

            g.append('g')
                .selectAll('path')
                .data(counties.features)
                .enter()
                .append('path')
                .attr('d', path)
                .attr('fill', function(d) {
                    const value = fakeCountyData[d.id];
                    return getColor(value);
                })
                .attr('stroke', '#999')
                .attr('stroke-width', 0.25)
                .attr('class', 'county-path')
                .style('cursor', 'pointer')
                .on('mouseover', function(event, d) {
                    d3.select(this)
                        .attr('stroke-width', 1.5)
                        .attr('stroke', '#000');
                })
                .on('mouseout', function(event, d) {
                    if (!d3.select(this).classed('highlighted')) {
                        d3.select(this)
                            .attr('stroke-width', 0.25)
                            .attr('stroke', '#999');
                    }
                })
                .on('click', function(event, d) {
                    const stateName = d.properties.name;
                    const value = fakeStateData[stateName];
                    onLocationClick({
                        name: stateName,
                        income: value ? '$' + value.toLocaleString() : 'N/A',
                        isState: true   // Add this flag
                    });
                });

            // Add state borders on top
            const states = topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; });
            g.append('path')
                .datum(states)
                .attr('fill', 'none')
                .attr('stroke', '#333')
                .attr('stroke-width', 1)
                .attr('d', path);

            createInfoPanelOverlay(svg, width, height);
        })
        .catch(function(error) {
            console.error('Error loading county map data:', error);
            heatmapDiv.innerHTML = '<div class="instructions">Error loading county map. Please refresh the page.</div>';
        });
}

function createZipHeatmap() {
    const heatmapDiv = document.getElementById('heatmap');
    heatmapDiv.innerHTML = '<div class="instructions">Loading ZIP code data...</div>';

    const width = heatmapDiv.clientWidth;
    const height = heatmapDiv.clientHeight;

    const svg = d3.select('#heatmap')
        .html('')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    currentSvg = svg;

    const g = svg.append('g');
    currentG = g;

    const projection = d3.geoAlbersUsa()
        .scale(width * 1.3)
        .translate([width / 2, height / 2]);

    currentProjection = projection;

    const path = d3.geoPath().projection(projection);

    const zoom = d3.zoom()
        .scaleExtent([1, 20])
        .on('zoom', (event) => {
            g.attr('transform', event.transform);
        });

    svg.call(zoom);
    currentZoom = zoom;

    // Load state boundaries + ZIP Gazetteer
    Promise.all([
        d3.json('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json'),
        d3.text('./2023_Gaz_zcta_national.txt')
    ])
    .then(function([us, zipText]) {

        const states = topojson.feature(us, us.objects.states);

        g.append('g')
            .selectAll('path')
            .data(states.features)
            .enter()
            .append('path')
            .attr('d', path)
            .attr('fill', '#f5f5f5')
            .attr('stroke', '#333')
            .attr('stroke-width', 1);

        const lines = zipText.replace(/\r/g, '').split('\n');
        const headers = lines[0].split('\t').map(h => h.trim());

        console.log("ZIP headers:", headers);

        const zipIndex = headers.indexOf('GEOID');
        const latIndex = headers.indexOf('INTPTLAT');
        const lonIndex = headers.indexOf('INTPTLONG');

        console.log("Indices zip/lat/lon:", zipIndex, latIndex, lonIndex);

        // Cleaning helper: remove garbage characters
        function cleanNum(x) {
            if (!x) return NaN;
            return parseFloat(
                x.replace(/[^\d\.\-\+]/g, '').trim()
            );
        }

        const zipPoints = [];

        for (let i = 1; i < lines.length; i += 3) { // Every thrid Zip code
            const cols = lines[i].split('\t');
            if (cols.length <= Math.max(zipIndex, latIndex, lonIndex)) continue;

            const zipCode = cols[zipIndex];

            const lat = cleanNum(cols[latIndex]);
            const lon = cleanNum(cols[lonIndex]);

            if (!isFinite(lat) || !isFinite(lon)) continue;

            // Project coordinates
            const coords = projection([lon, lat]);

            if (!coords || !isFinite(coords[0]) || !isFinite(coords[1])) continue;

            // Fake income
            const income = Math.floor(Math.random() * 50000) + 20000;

            zipPoints.push({
                zip: zipCode,
                coords,
                income,
                lat,
                lon
            });
        }

        currentFeatures = zipPoints;

        console.log("Loaded ZIP points:", zipPoints.length);

        g.append('g')
            .selectAll('circle')
            .data(zipPoints)
            .enter()
            .append('circle')
            .attr('cx', d => d.coords[0])
            .attr('cy', d => d.coords[1])
            .attr('r', 2)
            .attr('fill', d => getColor(d.income))
            .attr('stroke', '#666')
            .attr('stroke-width', 0.2)
            .attr('opacity', 0.7)
            .attr('class', 'zip-point')
            .style('cursor', 'pointer')
            .on('mouseover', function(event, d) {
                d3.select(this)
                    .attr('r', 5)
                    .attr('stroke-width', 1.5)
                    .attr('stroke', '#000');

                document.getElementById('info-location').textContent = 'ZIP Code: ' + d.zip;
                document.getElementById('info-income').textContent = '$' + d.income.toLocaleString();
            })
            .on('mouseout', function(event, d) {
                if (!d3.select(this).classed('highlighted')) {
                    d3.select(this)
                        .attr('r', 2)
                        .attr('stroke-width', 0.3)
                        .attr('stroke', '#666');
                }
            })
            .on('click', function(event, d) {
                onLocationClick({
                    name: 'ZIP Code: ' + d.zip,
                    income: '$' + d.income.toLocaleString(),
                    zip: d.zip  // This is correct - just the ZIP number
                });
            });

        createInfoPanelOverlay(svg, width, height);

        g.append('text')
            .attr('x', width / 2)
            .attr('y', 30)
            .attr('text-anchor', 'middle')
            .attr('font-size', '18px')
            .attr('font-weight', 'bold');

    })
    .catch(function(error) {
        console.error('Error loading ZIP code data:', error);
        heatmapDiv.innerHTML = '<div class="instructions">Error loading ZIP data. Please refresh the page.</div>';
    });
}

function updateVisualization() {
    const searchLocation = document.getElementById('search-location').value.trim();

    console.log('Updating visualization with:');
    console.log('Search Location:', searchLocation);

    if (searchLocation) {
        searchAndHighlight(searchLocation);
    } else {
        createHeatmap();
    }
}

function searchAndHighlight(searchTerm) {
    if (!currentFeatures || !currentSvg) {
        alert('Please wait for the map to load before searching.');
        return;
    }

    // Remove previous highlights
    currentSvg.selectAll('.state-path, .county-path, .zip-point')
        .classed('highlighted', false)
        .attr('stroke', function() {
            if (d3.select(this).classed('state-path')) return '#333';
            if (d3.select(this).classed('county-path')) return '#999';
            return '#666';
        })
        .attr('stroke-width', function() {
            if (d3.select(this).classed('state-path')) return 0.5;
            if (d3.select(this).classed('county-path')) return 0.25;
            return 0.3;
        })
        .attr('r', function() {
            if (d3.select(this).classed('zip-point')) return 2;
        });

    const searchLower = searchTerm.toLowerCase();
    let found = false;
    let bounds = null;

    if (currentLevel === 'state') {
        // Search states
        currentSvg.selectAll('.state-path')
            .each(function(d) {
                const stateName = d.properties.name.toLowerCase();
                if (stateName.includes(searchLower)) {
                    d3.select(this)
                        .classed('highlighted', true)
                        .attr('stroke', '#000000ff')
                        .attr('stroke-width', 3);
                    
                    // Get bounds for zooming - Fixed: use stored projection
                    const path = d3.geoPath().projection(currentProjection);
                    bounds = path.bounds(d);
                    found = true;

                    // Update info panel
                    const value = fakeStateData[d.properties.name];
                    onLocationClick({
                        name: d.properties.name,
                        income: value ? '$' + value.toLocaleString() : 'N/A'
                    });
                }
            });
    } else if (currentLevel === 'county') {
        // Search counties
        currentSvg.selectAll('.county-path')
            .each(function(d) {
                const countyName = d.properties.name.toLowerCase();
                if (countyName.includes(searchLower)) {
                    d3.select(this)
                        .classed('highlighted', true)
                        .attr('stroke', '#000000ff')
                        .attr('stroke-width', 2);
                    
                    // Fixed: use stored projection
                    const path = d3.geoPath().projection(currentProjection);
                    bounds = path.bounds(d);
                    found = true;

                    // Update info panel
                    const value = fakeCountyData[d.id];
                    onLocationClick({
                        name: d.properties.name,
                        fips: d.id
                    });
                }
            });
    } else if (currentLevel === 'zip') {
        // Search ZIP codes
        currentSvg.selectAll('.zip-point')
            .each(function(d) {
                if (d.zip.includes(searchTerm)) {
                    d3.select(this)
                        .classed('highlighted', true)
                        .attr('stroke', '#000000ff')
                        .attr('stroke-width', 2)
                        .attr('r', 6);
                    
                    bounds = [[d.coords[0] - 50, d.coords[1] - 50], [d.coords[0] + 50, d.coords[1] + 50]];
                    found = true;

                    // Update info panel
                    onLocationClick({
                        name: 'ZIP Code: ' + d.zip,
                        income: '$' + d.income.toLocaleString(),
                        zip: d.zip
                    });
                }
            });
    }

    if (!found) {
        alert(`No results found for "${searchTerm}". Try a different search term.`);
        return;
    }

    // Zoom to the found location - Fixed: get width/height dynamically
    if (bounds && currentZoom && currentSvg) {
        const svgWidth = parseFloat(currentSvg.attr('width'));
        const svgHeight = parseFloat(currentSvg.attr('height'));
        
        const [[x0, y0], [x1, y1]] = bounds;
        const dx = x1 - x0;
        const dy = y1 - y0;
        const x = (x0 + x1) / 2;
        const y = (y0 + y1) / 2;
        const scale = Math.min(8, 0.9 / Math.max(dx / svgWidth, dy / svgHeight));
        const translate = [svgWidth / 2 - scale * x, svgHeight / 2 - scale * y];

        currentSvg.transition()
            .duration(750)
            .call(currentZoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale));
    }
}

function resetFilters() {
    document.getElementById('search-location').value = '';
    const viewLevel = document.getElementById('view-level');
    if (viewLevel) {
        viewLevel.value = 'state';
    }

    // Reset zoom
    if (currentSvg && currentZoom) {
        currentSvg.transition()
            .duration(750)
            .call(currentZoom.transform, d3.zoomIdentity);
    }

    createHeatmap();
    console.log('Filters reset');
}

// Cache to avoid redundant API calls
const populationCache = {
    states: {},
    counties: {},
    zips: {}
};

// Fetch State Population on demand
async function fetchStatePopulation(stateName, year = 2023) {
    const cacheKey = `${stateName}-${year}`;
    
    // Check cache first
    if (populationCache.states[cacheKey]) {
        return populationCache.states[cacheKey];
    }
    
    try {
        console.log(`Fetching population for ${stateName}, year ${year}...`);
        
        // Use ACS 5-year estimates instead of PEP for reliability
        const url = `https://api.census.gov/data/${year}/acs/acs5?get=NAME,B01003_001E&for=state:*&key=${CENSUS_API_KEY}`;
        
        console.log('Fetching from URL:', url);
        const response = await fetch(url);
        
        if (!response.ok) {
            console.error(`API Error: ${response.status} ${response.statusText}`);
            throw new Error(`API Error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Census API response:', data);
        
        // Cache all states from this response
        // data[0] is headers: ["NAME", "B01003_001E", "state"]
        for (let i = 1; i < data.length; i++) {
            const name = data[i][0];
            const population = parseInt(data[i][1]);
            const key = `${name}-${year}`;
            populationCache.states[key] = population;
            console.log(`Cached: ${name} = ${population}`);
        }
        
        // Return the requested state's population
        const result = populationCache.states[cacheKey];
        console.log(`Found population for ${stateName}:`, result);
        return result || null;
        
    } catch (error) {
        console.error('Error fetching state population:', error);
        console.error('Error details:', error.message);
        return null;
    }
}

// Fetch County Population on demand
async function fetchCountyPopulation(countyFIPS, year = 2023) {
    const cacheKey = `${countyFIPS}-${year}`;
    
    // Check cache first
    if (populationCache.counties[cacheKey]) {
        return populationCache.counties[cacheKey];
    }
    
    try {
        console.log(`Fetching population for county FIPS ${countyFIPS}...`);
        
        // Extract state and county FIPS
        const stateFIPS = countyFIPS.substring(0, 2);
        const county = countyFIPS.substring(2);
        
        const url = `https://api.census.gov/data/${year}/pep/population?get=NAME,POP&for=county:${county}&in=state:${stateFIPS}&key=${CENSUS_API_KEY}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.length > 1) {
            const population = parseInt(data[1][1]);
            populationCache.counties[cacheKey] = population;
            return population;
        }
        
        return null;
    } catch (error) {
        console.error('Error fetching county population:', error);
        return null;
    }
}

// Fetch ZIP Code Population on demand
async function fetchZipPopulation(zipCode, year = 2023) {
    const cacheKey = `${zipCode}-${year}`;
    
    // Check cache first
    if (populationCache.zips[cacheKey]) {
        return populationCache.zips[cacheKey];
    }
    
    try {
        console.log(`Fetching population for ZIP ${zipCode}...`);
        
        // Using American Community Survey 5-year estimates
        const url = `https://api.census.gov/data/${year}/acs/acs5?get=NAME,B01003_001E&for=zip%20code%20tabulation%20area:${zipCode}&key=${CENSUS_API_KEY}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.length > 1) {
            const population = parseInt(data[1][1]);
            populationCache.zips[cacheKey] = population;
            return population;
        }
        
        return null;
    } catch (error) {
        console.error('Error fetching ZIP population:', error);
        return null;
    }
}

async function onLocationClick(locationData) {
    // Immediately update with loading state
    document.getElementById('info-location').textContent = locationData.name || 'Unknown';
    document.getElementById('info-income').textContent = locationData.income || '--';
    document.getElementById('info-population').textContent = 'Loading...';
    
    // Update SVG overlay with loading state
    const svgLocation = currentSvg ? currentSvg.select('#svg-info-location') : null;
    const svgIncome = currentSvg ? currentSvg.select('#svg-info-income') : null;
    const svgPopulation = currentSvg ? currentSvg.select('#svg-info-population') : null;
    
    if (svgLocation && !svgLocation.empty()) {
        const locationText = locationData.name || 'Unknown';
        const truncated = locationText.length > 24 ? locationText.substring(0, 24) + '...' : locationText;
        svgLocation.text(truncated);
    }
    if (svgIncome && !svgIncome.empty()) {
        svgIncome.text(locationData.income || '--');
    }
    if (svgPopulation && !svgPopulation.empty()) {
        svgPopulation.text('Loading...');
    }
    
    // Fetch real population based on location type
    let population = null;
    const year = 2023;
    
    try {
        if (locationData.fips) {
            // County data
            console.log('Fetching county population for FIPS:', locationData.fips);
            population = await fetchCountyPopulation(locationData.fips, year);
        } else if (locationData.zip) {
            // ZIP code data - use 2022 for ACS data
            const zipYear = year > 2023 ? 2023 : year;
            // Remove "ZIP Code: " prefix if it exists
            const cleanZip = locationData.zip.toString().replace('ZIP Code: ', '').trim();
            console.log('Fetching ZIP population for:', cleanZip);
            population = await fetchZipPopulation(cleanZip, zipYear);
        } else {
            // State data - this is the default for states
            console.log('Fetching state population for:', locationData.name);
            population = await fetchStatePopulation(locationData.name, year);
        }
        
        // Update with real population
        const popText = population ? population.toLocaleString() : 'N/A';
        document.getElementById('info-population').textContent = popText;
        
        if (svgPopulation && !svgPopulation.empty()) {
            svgPopulation.text(popText);
        }
        
        console.log(`Population for ${locationData.name}: ${popText}`);
    } catch (error) {
        console.error('Error loading population:', error);
        document.getElementById('info-population').textContent = 'Error loading';
        if (svgPopulation && !svgPopulation.empty()) {
            svgPopulation.text('Error');
        }
    }
    
    // Log additional info
    if (locationData.fips) {
        console.log('FIPS Code:', locationData.fips);
    }
    if (locationData.zip) {
        console.log('ZIP Code:', locationData.zip);
    }
}

// Optional: Preload all state populations on page load for faster lookups
async function preloadStatePopulations(year = 2023) {
    try {
        console.log('Preloading state populations...');
        await fetchStatePopulation('Alabama', year); // This will cache all states
        console.log('State populations preloaded!');
    } catch (error) {
        console.error('Error preloading state populations:', error);
    }
}

// Call preload when page loads (optional but recommended)
if (window.addEventListener) {
    window.addEventListener('load', function() {
        preloadStatePopulations();
    });
}

function exportData() {
    alert('Export functionality would generate a CSV/JSON file with the current filtered data.');
    console.log('Export data function called');
}

// Create info panel overlay inside the SVG
function createInfoPanelOverlay(svg, width, height) {
    const panelWidth = 300;
    const panelHeight = 130;  // Reduced height since we removed one row
    const margin = 15;
    
    // Create a group for the info panel (top-right corner)
    const infoGroup = svg.append('g')
        .attr('class', 'info-panel-overlay')
        .attr('transform', `translate(${width - panelWidth - margin}, ${margin})`);
    
    // Background with shadow effect
    infoGroup.append('rect')
        .attr('width', panelWidth)
        .attr('height', panelHeight)
        .attr('fill', 'white')
        .attr('stroke', '#000')
        .attr('stroke-width', 2)
        .attr('rx', 8)
        .attr('ry', 8)
        .attr('opacity', 0.95)
        .style('filter', 'drop-shadow(0px 2px 4px rgba(0,0,0,0.2))');
    
    // Title with background bar
    infoGroup.append('rect')
        .attr('width', panelWidth)
        .attr('height', 35)
        .attr('fill', '#1e3a5f')
        .attr('rx', 8)
        .attr('ry', 8);
    
    infoGroup.append('rect')
        .attr('y', 8)
        .attr('width', panelWidth)
        .attr('height', 27)
        .attr('fill', '#1e3a5f');
    
    infoGroup.append('text')
        .attr('x', panelWidth / 2)
        .attr('y', 23)
        .attr('font-size', '16px')
        .attr('font-weight', 'bold')
        .attr('text-anchor', 'middle')
        .attr('fill', 'white')
        .text('Location Information');
    
    const labelX = 15;
    const valueX = 100;
    const startY = 55;
    const lineHeight = 28;
    
    // Location
    infoGroup.append('text')
        .attr('x', labelX)
        .attr('y', startY)
        .attr('font-size', '13px')
        .attr('font-weight', 'bold')
        .attr('fill', '#333')
        .text('Location:');
    
    infoGroup.append('text')
        .attr('x', valueX)
        .attr('y', startY)
        .attr('font-size', '13px')
        .attr('fill', '#666')
        .attr('id', 'svg-info-location')
        .text('Click on a location');
    
    // Income
    infoGroup.append('text')
        .attr('x', labelX)
        .attr('y', startY + lineHeight)
        .attr('font-size', '13px')
        .attr('font-weight', 'bold')
        .attr('fill', '#333')
        .text('Income:');
    
    infoGroup.append('text')
        .attr('x', valueX)
        .attr('y', startY + lineHeight)
        .attr('font-size', '13px')
        .attr('fill', '#666')
        .attr('id', 'svg-info-income')
        .text('--');
    
    // Population
    infoGroup.append('text')
        .attr('x', labelX)
        .attr('y', startY + lineHeight * 2)
        .attr('font-size', '13px')
        .attr('font-weight', 'bold')
        .attr('fill', '#333')
        .text('Population:');
    
    infoGroup.append('text')
        .attr('x', valueX)
        .attr('y', startY + lineHeight * 2)
        .attr('font-size', '13px')
        .attr('fill', '#666')
        .attr('id', 'svg-info-population')
        .text('--');
}