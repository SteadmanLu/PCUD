# My Recipes - Ingredient-Based Recipe Finder


## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
  - [Ingredient Search](#ingredient-search)
  - [Filter Modes](#filter-modes)
  - [Shopping List](#shopping-list)
  - [Recipe Details](#recipe-details)
  - [Responsive Design](#responsive-design)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
  - [Application Flow](#application-flow)
  - [Core Functionality](#core-functionality)
- [Recipe Data Structure](#recipe-data-structure)
- [UI Components](#ui-components)
  - [Search Section](#search-section)
  - [Recipe Grid](#recipe-grid)
  - [Shopping List Panel](#shopping-list-panel)
  - [Recipe Modal](#recipe-modal)
- [Getting Started](#getting-started)
  - [Quick Start](#quick-start)
  - [No Installation Required!](#no-installation-required!)
- [Usage Examples](#usage-examples)
  - [Example 1: What Can I Make?](#example-1:-what-can-i-make?)
  - [Example 2: Almost There](#example-2:-almost-there)
  - [Example 3: Meal Planning](#example-3:-meal-planning)
- [Customization](#customization)
  - [Adding New Recipes](#adding-new-recipes)
  - [Styling Changes](#styling-changes)
  - [Feature Extensions](#feature-extensions)
- [Learning Objectives](#learning-objectives)
- [Future Enhancements](#future-enhancements)
  - [Planned Features](#planned-features)
  - [Backend Integration Possibilities](#backend-integration-possibilities)
- [Browser Compatibility](#browser-compatibility)
- [Known Issues](#known-issues)
- [Notes](#notes)
- [Acknowledgments](#acknowledgments)

A smart recipe finder web application that helps you discover what you can cook based on the ingredients you already have in your kitchen. No more wondering what to make for dinner!

##  Overview

My Recipes is an interactive web app that allows users to search for recipes by entering available ingredients. The application filters recipes in real-time, showing you what you can make right now and what recipes you're just a few ingredients away from completing.

##  Key Features

### Ingredient Search
- **Comma-Separated Input:** Enter multiple ingredients like "egg, rice, chicken"
- **Real-Time Filtering:** Results update instantly as you type
- **Smart Matching:** Finds recipes that match your available ingredients

### Filter Modes
- **Can Make Now:** Shows only recipes you have all ingredients for
- **All Recipes:** Displays entire recipe collection with missing ingredient counts
- **Missing Ingredients Indicator:** See exactly what you need to buy

### Shopping List
- **Recipe Selection:** Add recipes to your shopping list with one click
- **Consolidated Ingredients:** Automatically combines ingredients from multiple recipes
- **Persistent Badge:** Shows count of selected recipes
- **Easy Management:** Clear individual recipes or entire list

### Recipe Details
- **Modal View:** Click any recipe for full details
- **Step-by-Step Instructions:** Clear cooking directions
- **Complete Ingredient Lists:** All measurements and quantities
- **Visual Organization:** Clean, easy-to-read format

### Responsive Design
- **Mobile-Friendly:** Works seamlessly on phones and tablets
- **Grid Layout:** Attractive recipe cards in responsive grid
- **Modern UI:** Clean, contemporary design aesthetic

##  Technologies

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)** - Interactive functionality
- **JSON** - Recipe data storage and management

##  Project Structure

```
Recipes/
 index.html           # Main application page
 data/
    recipes.json    # Recipe database
 resources/
    css/
       style.css   # Stylesheet
    js/
        menu.js     # Application logic
 README.md           # This file
```

##  How It Works

### Application Flow

1. **User enters ingredients** in the search box
2. **JavaScript parses** comma-separated input
3. **Filter algorithm** checks each recipe:
   - Counts matching ingredients
   - Calculates missing ingredients
   - Determines "can make now" status
4. **DOM updates** with filtered results
5. **User interactions** trigger shopping list or modal views

### Core Functionality

**Ingredient Matching:**
```javascript
// Checks if recipe can be made with available ingredients
function canMakeRecipe(recipe, availableIngredients) {
    return recipe.ingredients.every(ingredient => 
        availableIngredients.some(available => 
            ingredient.toLowerCase().includes(available.toLowerCase())
        )
    );
}
```

**Shopping List Management:**
```javascript
// Adds recipe to shopping list
function addToShoppingList(recipe) {
    selectedRecipes.push(recipe);
    updateShoppingListUI();
    updateBadgeCount();
}
```

**Dynamic Filtering:**
```javascript
// Filters recipes based on active tab
function filterRecipes(mode) {
    if (mode === 'makeable') {
        return recipes.filter(r => canMakeRecipe(r, userIngredients));
    }
    return recipes; // Return all
}
```

##  Recipe Data Structure

Each recipe in the JSON database contains:

```json
{
    "name": "Recipe Name",
    "ingredients": [
        "2 cups flour",
        "1 egg",
        "1 cup milk"
    ],
    "instructions": "Step-by-step cooking directions...",
    "servings": 4,
    "prepTime": "15 minutes",
    "cookTime": "30 minutes"
}
```

##  UI Components

### Search Section
- Large search input with placeholder text
- Helper text for user guidance
- Filter tab switcher (Can Make Now / All Recipes)

### Recipe Grid
- Responsive card layout
- Recipe name and preview
- Ingredient count indicator
- "View Recipe" and "Add to List" buttons
- Missing ingredients badge (when applicable)

### Shopping List Panel
- Slide-in side panel
- Selected recipes section
- Consolidated ingredients list
- Clear all functionality
- Recipe count badge

### Recipe Modal
- Full-screen overlay
- Complete recipe details
- Scrollable content
- Close button

##  Getting Started

### Quick Start

1. **Download/Clone** the project files

2. **Open in Browser:**
   ```bash
   # Simply open index.html in your browser
   # Or use a local server:
   python -m http.server 8000
   # Navigate to http://localhost:8000
   ```

3. **Start Cooking:**
   - Type ingredients you have (comma-separated)
   - Browse recipes you can make
   - Add favorites to shopping list
   - Click recipes for detailed instructions

### No Installation Required!

This is a client-side web application - no backend server or database needed. Just open the HTML file in any modern web browser.

##  Usage Examples

### Example 1: What Can I Make?
```
You have: egg, flour, milk, butter
Enter: "egg, flour, milk, butter"
Results: Pancakes, French Toast, Crepes, etc.
```

### Example 2: Almost There
```
You have: chicken, rice
Enter: "chicken, rice"
View: "All Recipes" tab
See: Recipes missing just 1-2 ingredients
Plan: Shopping list for missing items
```

### Example 3: Meal Planning
```
1. Search for "chicken" recipes
2. Add 3 favorites to shopping list
3. View consolidated ingredients
4. Shop for unique items only
```

##  Customization

### Adding New Recipes

Edit `data/recipes.json`:
```json
{
    "name": "Your Recipe Name",
    "ingredients": [
        "ingredient 1",
        "ingredient 2"
    ],
    "instructions": "How to make it...",
    "servings": 4,
    "prepTime": "10 min",
    "cookTime": "20 min"
}
```

### Styling Changes

Modify `resources/css/style.css`:
- Change color scheme
- Adjust card layouts
- Update typography
- Customize animations

### Feature Extensions

The modular JavaScript in `menu.js` makes it easy to add:
- Recipe ratings
- Dietary filters (vegetarian, gluten-free, etc.)
- Difficulty levels
- Cooking time filters
- Favorite recipes persistence (localStorage)

##  Learning Objectives

This project demonstrates:
- **DOM Manipulation:** Dynamic content updates
- **Event Handling:** User interactions and state management
- **Data Filtering:** Array methods and search algorithms
- **Responsive Design:** Mobile-first CSS approach
- **Modular JavaScript:** Clean, maintainable code structure
- **User Experience:** Intuitive interface design

##  Future Enhancements

### Planned Features
- [ ] Save favorite recipes (localStorage)
- [ ] Recipe ratings and reviews
- [ ] Dietary restriction filters
- [ ] Cooking time estimates
- [ ] Print recipe cards
- [ ] Share recipes via social media
- [ ] Advanced search (AND/OR logic)
- [ ] Recipe recommendations
- [ ] Nutritional information
- [ ] Meal planning calendar

### Backend Integration Possibilities
- User accounts and saved preferences
- Recipe submission system
- Community ratings and comments
- Personal recipe collections
- Shopping list export to grocery apps

##  Browser Compatibility

Tested and working on:
-  Chrome 90+
-  Firefox 88+
-  Safari 14+
-  Edge 90+
-  Mobile browsers (iOS Safari, Chrome Mobile)

##  Known Issues

- Search is case-insensitive but exact match only
- No partial ingredient matching (e.g., "chick" won't find "chicken")
- Shopping list resets on page reload (no persistence yet)

##  Notes

Created as a practical solution to the age-old question: "What should I make with what I have?" Perfect for college students, busy professionals, and anyone looking to reduce food waste by using available ingredients.

##  Acknowledgments

- Recipe data compiled from various cooking resources
- UI inspired by modern recipe websites
- Built with vanilla JavaScript for maximum compatibility

---

**My Recipes** - Simple cooking with what you have 

*A personal project by Lucas Steadman*