# BarSite - Cocktail Recipe Database


## Table of Contents

- [Overview](#overview)
- [Features](#features)
  - [Comprehensive Recipe Collection](#comprehensive-recipe-collection)
  - [Recipe Categories](#recipe-categories)
  - [Rich Metadata](#rich-metadata)
- [Technology](#technology)
- [Data Structure](#data-structure)
  - [Recipe Schema](#recipe-schema)
  - [Example Entry](#example-entry)
- [Recipe Categories](#recipe-categories)
  - [Classic Cocktails](#classic-cocktails)
  - [Whiskey-Based](#whiskey-based)
  - [Gin Cocktails](#gin-cocktails)
  - [Vodka Drinks](#vodka-drinks)
  - [Rum Selections](#rum-selections)
  - [Tequila Creations](#tequila-creations)
- [Flavor Profile Tags](#flavor-profile-tags)
  - [Common Descriptors](#common-descriptors)
- [Sample Recipes](#sample-recipes)
  - [Old Fashioned (Classic)](#old-fashioned-classic)
  - [Mojito (Refreshing)](#mojito-refreshing)
  - [Espresso Martini (Modern)](#espresso-martini-modern)
- [Usage Examples](#usage-examples)
  - [Basic Web Integration](#basic-web-integration)
  - [Search by Ingredient](#search-by-ingredient)
  - [Filter by Flavor](#filter-by-flavor)
  - [Random Cocktail Selector](#random-cocktail-selector)
- [Potential Features](#potential-features)
  - [Web Interface Ideas](#web-interface-ideas)
  - [Advanced Features](#advanced-features)
- [Mixing Techniques](#mixing-techniques)
  - [Common Methods (from recipes)](#common-methods-from-recipes)
  - [Pro Tips](#pro-tips)
- [Glassware Guide](#glassware-guide)
  - [Glass Types Mentioned](#glass-types-mentioned)
- [Future Enhancements](#future-enhancements)
  - [Data Expansion](#data-expansion)
  - [Feature Additions](#feature-additions)
  - [Technical Improvements](#technical-improvements)
- [Project Ideas Using This Data](#project-ideas-using-this-data)
  - [Web Applications](#web-applications)
  - [Mobile Apps](#mobile-apps)
- [Contributing Recipe Format](#contributing-recipe-format)
  - [Quality Guidelines](#quality-guidelines)
- [Educational Value](#educational-value)
- [Recipe Organization](#recipe-organization)
  - [By Base Spirit](#by-base-spirit)
  - [By Preparation Style](#by-preparation-style)
  - [By Difficulty](#by-difficulty)
- [External Resources](#external-resources)
  - [Recommended Reading](#recommended-reading)
  - [Online Communities](#online-communities)

A comprehensive cocktail recipe collection featuring classic drinks, modern creations, and everything in between. Perfect for home bartenders, cocktail enthusiasts, or anyone looking to expand their mixology knowledge!

##  Overview

BarSite is a structured JSON database of cocktail recipes containing detailed information about ingredients, mixing instructions, and flavor profiles. Whether you're a professional bartender or just hosting friends, this collection has you covered.

##  Features

### Comprehensive Recipe Collection
- **50+ Cocktail Recipes:** From classics to modern favorites
- **Detailed Ingredients:** Exact measurements for each component
- **Mixing Instructions:** Step-by-step preparation guides
- **Flavor Profiles:** Descriptive taste characteristics

### Recipe Categories
- **Cocktails:** Mixed alcoholic beverages
- **Shots:** Quick, strong drinks
- **Mocktails:** Non-alcoholic alternatives
- **Classic Drinks:** Time-tested recipes
- **Modern Creations:** Contemporary interpretations

### Rich Metadata
- **Type Classification:** Cocktail, shot, or mocktail
- **Flavor Tags:** Multiple descriptors per drink
- **Ingredient Lists:** Complete with measurements
- **Preparation Methods:** Shake, stir, muddle, layer, etc.

##  Technology

- **JSON Format** - Structured, parseable data
- **Standardized Schema** - Consistent recipe format
- **Easy Integration** - Compatible with any web framework

##  Data Structure

### Recipe Schema
```json
{
    "name": "Cocktail Name",
    "type": "Cocktail|Shot|Mocktail",
    "flavor": ["Descriptor1", "Descriptor2", "Descriptor3"],
    "ingredients": [
        "2oz Spirit",
        "1oz Mixer",
        "Garnish"
    ],
    "mix": "Detailed preparation instructions..."
}
```

### Example Entry
```json
{
    "name": "Old Fashioned",
    "type": "Cocktail",
    "flavor": ["Boozy", "Slightly Sweet", "Citrusy"],
    "ingredients": [
        "2oz Bourbon or Rye Whiskey",
        "1 Sugar Cube",
        "2-3 Dashes Angostura Bitters",
        "Orange Twist"
    ],
    "mix": "Muddle the sugar cube and bitters in a glass. Add whiskey and stir to combine, add ice. Express an orange twist over glass and drop it in."
}
```

##  Recipe Categories

### Classic Cocktails
- **Old Fashioned** - The timeless whiskey cocktail
- **Manhattan** - Sophisticated whiskey and vermouth
- **Negroni** - Bitter, bold, and balanced
- **Martini** - The iconic gin (or vodka) cocktail
- **Margarita** - Tequila's greatest creation

### Whiskey-Based
- **Whiskey Sour** - Tart and balanced
- **Irish Coffee** - Warm and comforting
- **Cold Brew Irish Coffee** - Modern cold variant
- **Mint Julep** - Southern classic

### Gin Cocktails
- **Tom Collins** - Refreshing and fizzy
- **Gin & Tonic** - Simple perfection
- **Aviation** - Floral and sophisticated
- **French 75** - Champagne cocktail

### Vodka Drinks
- **Cosmopolitan** - Pink and stylish
- **Moscow Mule** - Ginger and lime
- **White Russian** - Creamy and sweet
- **Espresso Martini** - Coffee meets cocktail

### Rum Selections
- **Mojito** - Minty and refreshing
- **Daiquiri** - Simple rum and lime
- **Piña Colada** - Tropical paradise
- **Dark & Stormy** - Dark rum and ginger

### Tequila Creations
- **Margarita** - Classic lime cocktail
- **Paloma** - Grapefruit refresher
- **Tequila Sunrise** - Colorful gradient
- **El Diablo** - Spicy and complex

##  Flavor Profile Tags

### Common Descriptors
- **Boozy** - Strong alcohol presence
- **Sweet** - Sugar-forward taste
- **Tart** - Sour/acidic notes
- **Bitter** - Complex, acquired taste
- **Refreshing** - Light and crisp
- **Creamy** - Smooth, rich texture
- **Spicy** - Heat or spice notes
- **Fruity** - Fruit-forward flavors
- **Herbal** - Botanical notes
- **Smoky** - Mezcal or smoked elements

##  Sample Recipes

### Old Fashioned (Classic)
**Flavor:** Boozy, Slightly Sweet, Citrusy
```
2oz Bourbon or Rye Whiskey
1 Sugar Cube
2-3 Dashes Angostura Bitters
Orange Twist

Method: Muddle sugar and bitters, add whiskey and ice, 
express orange twist over glass and drop it in.
```

### Mojito (Refreshing)
**Flavor:** Minty, Sweet, Lime-forward
```
2oz White Rum
1oz Fresh Lime Juice
2 tsp Sugar
Fresh Mint Leaves
Soda Water

Method: Muddle mint with sugar and lime juice, add rum 
and ice, top with soda water, garnish with mint sprig.
```

### Espresso Martini (Modern)
**Flavor:** Bold, Sweet, Coffee-forward
```
2oz Vodka
1oz Fresh Espresso
0.5oz Coffee Liqueur
0.5oz Simple Syrup

Method: Shake all ingredients vigorously with ice, 
strain into chilled martini glass, garnish with 
coffee beans.
```

##  Usage Examples

### Basic Web Integration
```javascript
// Fetch and parse cocktails
fetch('cocktails.json')
    .then(response => response.json())
    .then(data => {
        const cocktails = data.cocktails;
        displayCocktails(cocktails);
    });
```

### Search by Ingredient
```javascript
function findByIngredient(cocktails, ingredient) {
    return cocktails.filter(cocktail => 
        cocktail.ingredients.some(ing => 
            ing.toLowerCase().includes(ingredient.toLowerCase())
        )
    );
}

// Find all gin cocktails
const ginDrinks = findByIngredient(cocktails, 'gin');
```

### Filter by Flavor
```javascript
function findByFlavor(cocktails, flavor) {
    return cocktails.filter(cocktail =>
        cocktail.flavor.some(f => 
            f.toLowerCase().includes(flavor.toLowerCase())
        )
    );
}

// Find all refreshing drinks
const refreshing = findByFlavor(cocktails, 'refreshing');
```

### Random Cocktail Selector
```javascript
function randomCocktail(cocktails) {
    const index = Math.floor(Math.random() * cocktails.length);
    return cocktails[index];
}

// Get today's special
const todaysSpecial = randomCocktail(cocktails);
```

##  Potential Features

### Web Interface Ideas
- **Search Bar:** Find drinks by name
- **Ingredient Filter:** What can I make with X?
- **Flavor Filter:** Show me all "refreshing" drinks
- **Favorite System:** Save your go-to recipes
- **Rating System:** Community drink ratings
- **Shopping List:** Generate ingredient shopping lists

### Advanced Features
- **Substitution Suggestions:** Out of bourbon? Try rye!
- **Difficulty Ratings:** Easy, medium, complex
- **Glassware Guide:** Proper serving vessels
- **Garnish Library:** How to prepare garnishes
- **Video Tutorials:** Step-by-step mixing videos
- **Bar Tool Guide:** Essential equipment

##  Mixing Techniques

### Common Methods (from recipes)
- **Stirring:** Gentle mixing for spirit-forward drinks
- **Shaking:** Vigorous mixing for citrus/juice drinks
- **Muddling:** Crushing herbs/fruit to release flavors
- **Layering:** Creating visual separation in shots
- **Building:** Assembling directly in the glass
- **Floating:** Carefully layering cream on top

### Pro Tips
- Shake drinks with citrus or cream
- Stir drinks that are all spirits
- Use fresh ingredients when possible
- Measure accurately for consistency
- Chill glassware for better temperature
- Express citrus oils over the drink

##  Glassware Guide

### Glass Types Mentioned
- **Old Fashioned Glass:** Short, wide tumbler
- **Martini Glass:** Classic V-shaped cocktail glass
- **Collins Glass:** Tall, narrow glass
- **Shot Glass:** Small, 1-2oz capacity
- **Highball Glass:** Medium-tall tumbler
- **Coupe Glass:** Shallow, wide-rimmed glass
- **Hurricane Glass:** Tall, curved tropical glass

##  Future Enhancements

### Data Expansion
- [ ] Add 100+ more recipes
- [ ] Include regional variations
- [ ] Add historical context
- [ ] Include creator/origin stories
- [ ] Add difficulty ratings
- [ ] Include ABV calculations

### Feature Additions
- [ ] Seasonal drink suggestions
- [ ] Batch recipe scaling
- [ ] Mocktail alternatives for each recipe
- [ ] Common substitutions database
- [ ] Garnish preparation guides
- [ ] Equipment recommendations

### Technical Improvements
- [ ] Add recipe IDs for referencing
- [ ] Include nutritional information
- [ ] Add preparation time estimates
- [ ] Include cost estimates
- [ ] Add tags for dietary restrictions
- [ ] Support multiple languages

##  Project Ideas Using This Data

### Web Applications
1. **Cocktail Recipe App:** Search and display all recipes
2. **What Can I Make:** Input available ingredients
3. **Bartender's Assistant:** Random drink generator
4. **Mixology School:** Learn recipes step-by-step
5. **Party Planner:** Create cocktail menus for events

### Mobile Apps
1. **Pocket Bartender:** Offline recipe access
2. **Shake to Random:** Random drink on phone shake
3. **Ingredient Scanner:** Scan bottles, get recipes
4. **Social Cocktails:** Share your creations
5. **Virtual Bar:** AR cocktail visualization

##  Contributing Recipe Format

To add new recipes to cocktails.json:

```json
{
    "name": "Your Cocktail Name",
    "type": "Cocktail",
    "flavor": ["Flavor1", "Flavor2", "Flavor3"],
    "ingredients": [
        "Xoz Ingredient1",
        "Xoz Ingredient2",
        "Garnish"
    ],
    "mix": "Detailed mixing instructions here."
}
```

### Quality Guidelines
- Use standard measurements (oz, dashes, tsp, tbsp)
- Include all ingredients, including garnishes
- Write clear, step-by-step instructions
- Add 2-4 flavor descriptors
- Specify exact glassware if important
- Note any special techniques

##  Educational Value

This database is perfect for:
- **Bartending Students:** Learn classic recipes
- **Home Enthusiasts:** Expand your repertoire
- **Developers:** Practice data manipulation
- **Hospitality Training:** Professional preparation
- **Event Planning:** Menu creation and planning

##  Recipe Organization

### By Base Spirit
- **Whiskey:** 15+ recipes
- **Gin:** 12+ recipes
- **Vodka:** 10+ recipes
- **Rum:** 10+ recipes
- **Tequila:** 8+ recipes
- **Other/Mixed:** Various spirits

### By Preparation Style
- **Shaken:** ~40% of cocktails
- **Stirred:** ~30% of cocktails
- **Built:** ~20% of cocktails
- **Blended:** ~10% of cocktails

### By Difficulty
- **Beginner:** Simple, 3-4 ingredients
- **Intermediate:** 5-6 ingredients, special techniques
- **Advanced:** Complex, multiple steps, unusual ingredients

##  External Resources

### Recommended Reading
- The Joy of Mixology by Gary Regan
- Death & Co cocktail book
- Smuggler's Cove (Tiki drinks)
- Liquid Intelligence by Dave Arnold

### Online Communities
- r/cocktails on Reddit
- CocktailChemistry YouTube channel
- Difford's Guide website
- Punch drink publication

---

**BarSite** - Your digital cocktail companion! 

*A personal project by Lucas Steadman*