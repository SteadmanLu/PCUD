let allDishes = [];
let currentFilter = 'makeable';
let currentSearchTerms = [];
let shoppingList = [];

// Load menu data from JSON file
let menuData = { dishes: [] };

async function loadMenuData() {
    try {
        const response = await fetch('./data/menu-data.json');
        menuData = await response.json();
        allDishes = menuData.dishes;
        filterAndDisplayRecipes();
    } catch (error) {
        console.error('Error loading menu data:', error);
    }
}

// Initialize on page load
loadMenuData();


function toggleShoppingList() {
    const shoppingListEl = document.getElementById('shopping-list');
    shoppingListEl.classList.toggle('open');
}

function addToShoppingList(dish) {
    const existingIndex = shoppingList.findIndex(item => item.name === dish.name);
    
    if (existingIndex > -1) {
        shoppingList.splice(existingIndex, 1);
    } else {
        shoppingList.push(dish);
    }
    
    updateShoppingListDisplay();
    updateListCount();
    filterAndDisplayRecipes();
}

function removeFromShoppingList(dishName) {
    shoppingList = shoppingList.filter(item => item.name !== dishName);
    updateShoppingListDisplay();
    updateListCount();
    filterAndDisplayRecipes();
}

function clearShoppingList() {
    if (confirm('Clear all items from shopping list?')) {
        shoppingList = [];
        updateShoppingListDisplay();
        updateListCount();
        filterAndDisplayRecipes();
    }
}

function updateListCount() {
    document.getElementById('list-count').textContent = shoppingList.length;
}

function updateShoppingListDisplay() {
    const selectedRecipesList = document.getElementById('selected-recipes-list');
    const shoppingIngredients = document.getElementById('shopping-ingredients');
    const clearBtn = document.getElementById('clear-btn');
    
    if (shoppingList.length === 0) {
        selectedRecipesList.innerHTML = '<div class="empty-list-message">No recipes selected</div>';
        shoppingIngredients.innerHTML = '<div class="empty-list-message">Add recipes to see ingredients</div>';
        clearBtn.style.display = 'none';
        return;
    }
    
    clearBtn.style.display = 'block';
    
    selectedRecipesList.innerHTML = shoppingList.map(dish => `
        <div class="selected-recipe-item">
            <span>${dish.name}</span>
            <button class="remove-recipe" onclick="removeFromShoppingList('${dish.name}')">×</button>
        </div>
    `).join('');
    
    const allIngredients = {};
    shoppingList.forEach(dish => {
        // Combine ingredients and toppings
        const allItems = [...(dish.ingredients || []), ...(dish.toppings || [])];
        allItems.forEach(ingredientObj => {
            const ingredientName = ingredientObj.name;
            const ingredientDisplay = ingredientObj.quantity && ingredientObj.unit 
                ? `${ingredientObj.quantity} ${ingredientObj.unit} ${ingredientName}` 
                : ingredientName;
            
            if (!allIngredients[ingredientName]) {
                allIngredients[ingredientName] = { display: ingredientDisplay, dishes: [] };
            }
            allIngredients[ingredientName].dishes.push(dish.name);
        });
    });
    
    const ingredientsList = Object.entries(allIngredients)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([ingredientName, data]) => {
            const dishList = data.dishes.length > 1 ? ` (${data.dishes.join(', ')})` : '';
            return `<li>${data.display}${dishList}</li>`;
        })
        .join('');
    
    shoppingIngredients.innerHTML = `<ul>${ingredientsList}</ul>`;
}

function isInShoppingList(dishName) {
    return shoppingList.some(item => item.name === dishName);
}

function openRecipeModal(dish) {
    const modal = document.getElementById('recipe-modal');
    const modalName = document.getElementById('modal-recipe-name');
    const modalBody = document.getElementById('modal-recipe-body');
    
    modalName.textContent = dish.name;
    
    let bodyHTML = `
        <div class="cuisine-category">
            <span class="category-badge category-${dish.category}">${dish.category}</span>
            <span class="cuisine-type">${dish.cuisine}</span>
        </div>
        <p style="font-style: italic; margin: 15px 0;">${dish.description}</p>
    `;
    
    // Add timing info
    if (dish.servings || dish.prepTime || dish.cookTime) {
        bodyHTML += '<div class="recipe-info" style="display: flex; gap: 20px; margin: 15px 0; font-size: 0.9em;">';
        if (dish.servings) bodyHTML += `<div>Servings: ${dish.servings}</div>`;
        if (dish.prepTime) bodyHTML += `<div>Prep: ${dish.prepTime}</div>`;
        if (dish.cookTime) bodyHTML += `<div>Cook: ${dish.cookTime}</div>`;
        bodyHTML += '</div>';
    }
    
    if (dish.ingredients && dish.ingredients.length > 0) {
        bodyHTML += '<h3>Ingredients</h3><ul>';
        dish.ingredients.forEach(ingredient => {
            const ingredientDisplay = ingredient.quantity && ingredient.unit 
                ? `${ingredient.quantity} ${ingredient.unit} ${ingredient.name}` 
                : ingredient.name;
            bodyHTML += `<li>${ingredientDisplay}</li>`;
        });
        bodyHTML += '</ul>';
    }
    
    // Add toppings/optional ingredients
    if (dish.toppings && dish.toppings.length > 0) {
        bodyHTML += '<h3>Optional Toppings</h3><ul>';
        dish.toppings.forEach(topping => {
            const toppingDisplay = topping.quantity && topping.unit 
                ? `${topping.quantity} ${topping.unit} ${topping.name}` 
                : topping.name;
            bodyHTML += `<li>${toppingDisplay}</li>`;
        });
        bodyHTML += '</ul>';
    }
    
    if (dish.instructions) {
        bodyHTML += '<h3>Instructions</h3>';
        if (Array.isArray(dish.instructions)) {
            bodyHTML += '<ol>';
            dish.instructions.forEach(step => {
                bodyHTML += `<li>${step}</li>`;
            });
            bodyHTML += '</ol>';
        } else {
            bodyHTML += `<p>${dish.instructions}</p>`;
        }
    }
    
    modalBody.innerHTML = bodyHTML;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeRecipeModal() {
    const modal = document.getElementById('recipe-modal');
    modal.classList.remove('open');
    document.body.style.overflow = 'auto';
}

document.getElementById('recipe-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeRecipeModal();
    }
});

function analyzeRecipeMatch(dish, searchTerms) {
    if (searchTerms.length === 0) {
        return { type: 'all', missingIngredients: [], matchedIngredients: [], requiredMissing: [] };
    }

    // Get ingredient names from objects
    const dishIngredientsLower = (dish.ingredients || []).map(i => i.name.toLowerCase());
    const toppingNamesLower = (dish.toppings || []).map(t => t.name.toLowerCase());
    const optionalIngredientsLower = toppingNamesLower;
    
    const matchedIngredients = [];
    const missingFromSearch = [];
    const requiredMissing = [];

    searchTerms.forEach(term => {
        const found = dishIngredientsLower.some(ingredient => 
            ingredient.includes(term)
        );
        if (found) {
            matchedIngredients.push(term);
        }
    });

    dishIngredientsLower.forEach((ingredientLower, index) => {
        const ingredientName = (dish.ingredients[index] || {}).name || ingredientLower;
        const isOptional = optionalIngredientsLower.some(opt => opt === ingredientLower);
        const matched = searchTerms.some(term => 
            ingredientLower.includes(term)
        );
        if (!matched) {
            missingFromSearch.push(ingredientName);
            if (!isOptional) {
                requiredMissing.push(ingredientName);
            }
        }
    });

    const requiredMissingCount = requiredMissing.length;

    if (requiredMissingCount === 0) {
        return { type: 'exact', missingIngredients: missingFromSearch, matchedIngredients, requiredMissing: [] };
    } else if (requiredMissingCount <= 2) {
        return { type: 'close', missingIngredients: missingFromSearch, matchedIngredients, requiredMissing };
    } else {
        return { type: 'far', missingIngredients: missingFromSearch, matchedIngredients, requiredMissing };
    }
}

function displayMenu(dishes, searchTerms = [], filter = 'all') {
    const menuGrid = document.getElementById('menu-grid');
    const noResults = document.getElementById('no-results');
    const resultsInfo = document.getElementById('results-info');
    
    menuGrid.innerHTML = '';
    
    if (dishes.length === 0) {
        noResults.style.display = 'block';
        menuGrid.style.display = 'none';
        resultsInfo.innerHTML = '';
        return;
    }
    
    noResults.style.display = 'none';
    menuGrid.style.display = 'grid';
    
    let infoText = '';
    if (searchTerms.length > 0) {
        const exactMatches = dishes.filter(d => d.matchInfo.type === 'exact').length;
        const closeMatches = dishes.filter(d => d.matchInfo.type === 'close').length;
        const makeableCount = exactMatches + closeMatches;
        
        if (filter === 'makeable') {
            infoText = `${makeableCount} recipe${makeableCount !== 1 ? 's' : ''} you can make`;
            if (closeMatches > 0) {
                infoText += '<br><span class="missing-info">Some recipes missing 1-2 key ingredients (shown in orange)</span>';
            }
        } else {
            infoText = `All ${dishes.length} recipes`;
        }
    } else {
        infoText = `All ${dishes.length} recipes`;
    }
    resultsInfo.innerHTML = infoText;
    
    dishes.forEach(dish => {
        const card = document.createElement('div');
        card.className = 'menu-card';
        if (dish.matchInfo && dish.matchInfo.type === 'close') {
            card.className += ' close-match';
        }
        
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('add-to-list-btn')) {
                openRecipeModal(dish);
            }
        });
        
        const ingredientsHTML = (dish.ingredients || []).map(ingredientObj => {
            const ingredientName = ingredientObj.name;
            let displayIngredient = ingredientName;
            let isMissing = false;
            
            if (dish.matchInfo && dish.matchInfo.missingIngredients.includes(ingredientName)) {
                isMissing = true;
            }
            
            if (searchTerms.length > 0 && !isMissing) {
                searchTerms.forEach(term => {
                    const regex = new RegExp(`(${term})`, 'gi');
                    displayIngredient = displayIngredient.replace(regex, '<span class="match-highlight">$1</span>');
                });
            }
            
            const className = isMissing ? ' class="missing-ingredient"' : '';
            return `<li${className}>${displayIngredient}</li>`;
        }).join('');

        let missingNote = '';
        if (dish.matchInfo && dish.matchInfo.requiredMissing && dish.matchInfo.requiredMissing.length > 0) {
            const missingList = dish.matchInfo.requiredMissing.join(', ');
            missingNote = `<div class="missing-note">You'll need: ${missingList}</div>`;
        }

        const isAdded = isInShoppingList(dish.name);
        const addButtonText = isAdded ? 'Remove from List' : 'Add to Shopping List';
        const addButtonClass = isAdded ? 'add-to-list-btn added' : 'add-to-list-btn';
        
        const firstLetter = dish.name.charAt(0).toUpperCase();
        
        card.innerHTML = `
            <div class="card-image">${firstLetter}</div>
            <div class="card-content">
                <h3 class="dish-name">${dish.name}</h3>
                <div class="cuisine-category">
                    <span class="category-badge category-${dish.category}">${dish.category}</span>
                    <span class="cuisine-type">${dish.cuisine}</span>
                </div>
                <p class="dish-description">${dish.description}</p>
                <div class="ingredients-section">
                    <h4>Ingredients</h4>
                    <ul class="ingredients-list">
                        ${ingredientsHTML}
                    </ul>
                </div>
                ${missingNote}
                <button class="${addButtonClass}" onclick='event.stopPropagation(); addToShoppingList(${JSON.stringify(dish).replace(/'/g, "&#39;")})'>${addButtonText}</button>
            </div>
        `;
        
        menuGrid.appendChild(card);
    });
}

function filterAndDisplayRecipes() {
    let searchTerms = [];
    const searchText = document.getElementById('ingredient-search').value;
    
    if (searchText.trim()) {
        searchTerms = searchText
            .toLowerCase()
            .split(/[,\s]+/)
            .filter(term => term.length > 0);
    }

    currentSearchTerms = searchTerms;

    let dishesWithMatchInfo = allDishes.map(dish => {
        const matchInfo = analyzeRecipeMatch(dish, searchTerms);
        return { ...dish, matchInfo };
    });

    let filteredDishes = dishesWithMatchInfo;

    if (searchTerms.length > 0) {
        if (currentFilter === 'makeable') {
            filteredDishes = dishesWithMatchInfo.filter(d => 
                d.matchInfo.type === 'exact' || d.matchInfo.type === 'close'
            );
        }

        filteredDishes.sort((a, b) => {
            if (a.matchInfo.type === 'exact' && b.matchInfo.type !== 'exact') return -1;
            if (a.matchInfo.type !== 'exact' && b.matchInfo.type === 'exact') return 1;
            return a.matchInfo.requiredMissing.length - b.matchInfo.requiredMissing.length;
        });
    }

    displayMenu(filteredDishes, searchTerms, currentFilter);
}

const searchInput = document.getElementById('ingredient-search');
searchInput.addEventListener('input', filterAndDisplayRecipes);

const filterTabs = document.querySelectorAll('.filter-tab');
filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentFilter = tab.dataset.filter;
        filterAndDisplayRecipes();
    });
});