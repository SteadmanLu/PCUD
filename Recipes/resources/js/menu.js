let allDishes = [];
let currentFilter = 'makeable';
let currentSearchTerms = [];
let shoppingList = [];

// Your menu data goes here - paste from the menu.js file
const menuData = {
    "dishes": [
    {
      "name": "Bagels",
      "description": "Homemade chewy bagels with your choice of toppings - perfect for breakfast or anytime",
      "category": "vegetarian",
      "cuisine": "American",
      "ingredients": ["Warm water", "Active dry yeast", "Bread flour", "Sugar", "Salt", "Sesame seeds", "Poppy seeds", "Everything seasoning"],
      "optionalIngredients": ["Sesame seeds", "Poppy seeds", "Everything seasoning"],
      "instructions": ["Activate yeast by mixing warm water and yeast, let sit 5 min until foamy.", "Make dough by adding sugar, salt, and flour. Knead until smooth (8-10 min).", "Rise covered and let rise 1-1.5 hrs until doubled.", "Shape by dividing into 8 pieces, shape into balls, poke holes in the center. Let rest 10 min.", "Boil bagels in water for 1 min per side.", "Top and bake with toppings if desired, then bake at 425F for 20-25 min until golden."]
    },
    {
      "name": "Baguette",
      "description": "Crusty French bread with a chewy interior - authentic artisan style",
      "category": "vegan",
      "cuisine": "French",
      "ingredients": ["All-purpose flour", "Warm water", "Salt", "Active dry yeast"],
      "optionalIngredients": [],
      "instructions": ["Mix flour, salt, yeast, and water into shaggy dough.", "Cover and rest 12-18 hours at room temp.", "Divide dough into 2-3 pieces and gently shape into baguette forms.", "Rest for 45-60 min, covered.", "Slash tops and bake at 475F with steam (tray of water or spray bottle) for 20-25 min until golden and crusty.", "Let cool on rack before slicing."]
    },
    {
      "name": "Basic Meatballs",
      "description": "Classic Italian-style meatballs - baked or pan-fried to perfection",
      "category": "non-vegetarian",
      "cuisine": "Italian",
      "ingredients": ["Ground beef", "Breadcrumbs", "Parmesan", "Egg", "Garlic", "Parsley", "Salt", "Pepper", "Dried oregano"],
      "optionalIngredients": ["Parsley", "Dried oregano"],
      "instructions": ["Preheat oven to 400F or heat a large skillet with oil for pan-frying.", "In a bowl, combine all ingredients. Mix gently with hands until combined - don't overmix.", "Form into 1-1.5 inch balls.", "To bake: place on lined baking sheet and bake 15-20 minutes until browned and cooked through. To pan-fry: cook in batches in skillet, turning to brown all sides and cook through (8-10 minutes).", "Serve with sauce of choice (marinara, BBQ, gravy, etc.) or in sandwiches."]
    },
    {
      "name": "Beef & Cheese Quesadillas",
      "description": "Crispy tortillas filled with seasoned beef and melted cheese",
      "category": "non-vegetarian",
      "cuisine": "Mexican",
      "ingredients": ["Ground beef", "Chili powder", "Cumin", "Salt", "Pepper", "Shredded cheese", "Flour tortillas", "Oil or butter"],
      "optionalIngredients": ["Chili powder", "Cumin"],
      "instructions": ["In a skillet over medium heat, cook ground beef with chili powder, cumin, salt & pepper until browned. Drain excess fat.", "Heat a clean skillet over medium heat. Add a little oil or butter.", "Place a tortilla in the skillet. Sprinkle half with cheese, then beef, then more cheese. Fold tortilla over.", "Cook 2-3 minutes per side until golden and crisp.", "Repeat with remaining tortillas. Slice & serve."]
    },
    {
      "name": "Beer Cheese Dip",
      "description": "Rich and creamy cheese dip with a hint of beer - perfect for pretzels or chips",
      "category": "vegetarian",
      "cuisine": "American",
      "ingredients": ["Butter", "All-purpose flour", "Whole milk", "Beer", "Dijon mustard", "Worcestershire sauce", "Garlic powder", "Paprika", "Sharp cheddar cheese", "Pepper Jack cheese", "Salt", "Pepper"],
      "optionalIngredients": ["Paprika", "Pepper Jack cheese"],
      "instructions": ["In a saucepan over medium heat, melt butter. Add flour and whisk constantly for 1-2 minutes to make a roux.", "Slowly whisk in milk and beer, stirring until smooth. Bring to a gentle simmer and cook for 2-3 minutes until slightly thickened.", "Stir in mustard, Worcestershire sauce, garlic powder, and paprika.", "Lower the heat and gradually add cheeses, stirring constantly until fully melted and smooth.", "Season with salt and pepper to taste. Serve warm."]
    },
    {
      "name": "Breakfast Burrito",
      "description": "Hearty morning wrap filled with eggs, meat, cheese, and potatoes",
      "category": "non-vegetarian",
      "cuisine": "Mexican",
      "ingredients": ["Flour tortillas", "Eggs", "Milk", "Cheddar cheese", "Breakfast sausage", "Hash browns", "Salt", "Pepper", "Hot sauce", "Salsa", "Sour cream"],
      "optionalIngredients": ["Hot sauce", "Salsa", "Sour cream"],
      "instructions": ["Whisk eggs with milk, salt, and pepper. Cook in a skillet over medium heat until soft and just set.", "Heat tortillas briefly in a dry pan or microwave.", "Divide eggs, meat, cheese, and potatoes among tortillas. Add extras like salsa or hot sauce.", "Roll burritos and sear seam-side down in a hot skillet until golden if desired.", "Serve with sour cream, hot sauce, or wrapped to-go."]
    },
    {
      "name": "Buffalo Chicken Mac & Cheese",
      "description": "Spicy buffalo chicken meets creamy mac and cheese in this comfort food mashup",
      "category": "non-vegetarian",
      "cuisine": "American",
      "ingredients": ["Elbow macaroni", "Cooked chicken", "Butter", "Flour", "Milk", "Cheddar", "Pepper jack", "Buffalo sauce", "Salt", "Pepper", "Ranch dressing", "Blue cheese"],
      "optionalIngredients": ["Ranch dressing", "Blue cheese", "Pepper jack"],
      "instructions": ["Cook pasta to al dente and drain.", "Melt butter, whisk in flour for 1 min. Slowly whisk in milk and simmer till thick.", "Stir in cheddar, pepper jack, and buffalo sauce.", "Combine pasta, sauce, and chicken.", "Optional: Top with breadcrumbs and bake at 375F for 15 min.", "Serve hot with drizzle of ranch or blue cheese if desired."]
    },
    {
      "name": "Buffalo Chicken Wraps",
      "description": "Quick and easy wraps with spicy buffalo chicken, fresh lettuce, and creamy dressing",
      "category": "non-vegetarian",
      "cuisine": "American",
      "ingredients": ["Cooked chicken breasts", "Buffalo wing sauce", "Tortillas", "Lettuce", "Shredded cheese", "Ranch dressing", "Blue cheese dressing"],
      "optionalIngredients": ["Blue cheese dressing"],
      "instructions": ["Toss shredded chicken with Buffalo sauce.", "Lay tortillas flat. Add lettuce, chicken, cheese, and drizzle with dressing.", "Roll up tightly and serve."]
    },
    {
      "name": "Chicken Alfredo",
      "description": "Classic creamy pasta with tender chicken in rich Parmesan sauce",
      "category": "non-vegetarian",
      "cuisine": "Italian",
      "ingredients": ["Fettuccine", "Butter", "Garlic", "Heavy cream", "Parmesan", "Cooked chicken breasts", "Salt", "Pepper"],
      "optionalIngredients": [],
      "instructions": ["Cook fettuccine according to package directions. Reserve 1/2 cup pasta water.", "In a skillet, melt butter. Add garlic and cook 1 minute.", "Add cream and simmer 2-3 minutes. Stir in Parmesan until melted.", "Toss pasta and chicken with sauce. Use reserved pasta water to thin as needed. Season with salt & pepper."]
    },
    {
      "name": "Chicken Burritos with Black Beans",
      "description": "Flavorful chicken and black bean burritos with Mexican spices",
      "category": "non-vegetarian",
      "cuisine": "Mexican",
      "ingredients": ["Flour tortillas", "Chicken breast", "Black beans", "Rice", "Shredded cheese", "Salsa", "Sour cream", "Chili powder", "Cumin", "Garlic powder", "Onion powder", "Salt", "Pepper", "Oil", "Avocado", "Lettuce", "Cilantro", "Lime"],
      "optionalIngredients": ["Avocado", "Lettuce", "Cilantro", "Lime"],
      "instructions": ["Season chicken breast with chili powder, cumin, garlic powder, onion powder, salt, and pepper.", "Heat oil in a pan over medium heat. Cook chicken until fully cooked and browned on both sides. Let rest, then slice or shred.", "Warm black beans in a small pan or microwave. Season lightly with salt and pepper.", "Warm tortillas in a dry pan or microwave.", "Assemble burritos: spread sour cream, add rice, black beans, chicken, salsa, cheese, and any optional toppings.", "Fold sides of tortilla in, then roll tightly from the bottom up.", "Optional: place burrito seam-side down in a hot pan to toast and seal.", "Serve hot, with lime wedges if desired."]
    },
    {
      "name": "Chicken Pot Pie",
      "description": "Comforting homemade pot pie with chicken and vegetables in creamy sauce",
      "category": "non-vegetarian",
      "cuisine": "American",
      "ingredients": ["Butter", "Onion", "Carrot", "Peas", "Cooked chicken", "Flour", "Chicken broth", "Milk", "Salt", "Pepper", "Puff pastry"],
      "optionalIngredients": [],
      "instructions": ["Preheat oven to 400F.", "Sauté onions and carrots in butter. Stir in flour, then broth and milk. Simmer until thick. Add peas and chicken.", "Pour filling into a greased pie dish. Top with pastry. Cut slits to vent.", "Bake 30-35 min until golden. Rest 5-10 min before serving."]
    },
    {
      "name": "Chicken Tortilla Soup",
      "description": "Hearty Mexican-inspired soup with chicken, beans, corn, and tortilla strips",
      "category": "non-vegetarian",
      "cuisine": "Mexican",
      "ingredients": ["Oil", "Onion", "Garlic", "Cumin", "Chili powder", "Paprika", "Diced tomatoes", "Chicken broth", "Cooked chicken", "Black beans", "Corn", "Salt", "Pepper", "Tortilla strips", "Cheese", "Sour cream", "Avocado", "Lime"],
      "optionalIngredients": ["Tortilla strips", "Cheese", "Sour cream", "Avocado", "Lime"],
      "instructions": ["Sauté onion and garlic in oil until soft.", "Add spices, tomatoes, broth, chicken, beans, and corn. Simmer 15-20 min.", "Adjust seasoning, then serve with tortilla strips and toppings."]
    },
    {
      "name": "Creamy Pasta with Crispy Mushrooms",
      "description": "Elegant pasta dish featuring golden crispy mushrooms in a lemon cream sauce",
      "category": "vegetarian",
      "cuisine": "Italian",
      "ingredients": ["Olive oil", "Mixed mushrooms", "Salt", "Shallots", "Spaghetti", "Heavy cream", "Parsley", "Lemon", "Butter", "Parmesan", "Black pepper", "Mushroom bouillon"],
      "optionalIngredients": ["Mushroom bouillon"],
      "instructions": ["Heat 2 tbsp of olive oil in a large pot over medium-high heat. Add half the mushrooms in a single layer. Cook, undisturbed, until edges are browned and starting to crisp, about 3 minutes. Toss and cook until all sides are golden and crisp, about 5 more minutes. Remove with a slotted spoon and season with salt. Repeat with remaining 2 tbsp olive oil and mushrooms.", "Reduce heat to medium-low. Return all mushrooms to the pot and add shallots. Cook, stirring often, until shallots are translucent and softened, about 2 minutes.", "Meanwhile, cook pasta in a large pot of boiling salted water until very al dente, about 2 minutes less than package directions. Reserve 1 cup pasta water.", "Using tongs, transfer pasta to the mushroom pot. Add cream and 1 cup reserved pasta water. Bring to a simmer over medium heat. Cook, tossing constantly, until sauce is slightly thickened and pasta is al dente, about 3 minutes.", "Remove from heat. Stir in lemon zest and juice, parsley, butter, Parmesan, and lots of black pepper. Toss to combine. Adjust salt as needed.", "Serve topped with more Parmesan and black pepper."]
    },
    {
      "name": "Crescent Sausage Rolls",
      "description": "Easy breakfast rolls made with crescent dough and fully cooked sausage",
      "category": "non-vegetarian",
      "cuisine": "American",
      "ingredients": ["Crescent Dough Sheet", "Fully Cooked Sausage Links", "Egg", "Mustard", "Shredded cheese"],
      "optionalIngredients": ["Mustard", "Shredded cheese"],
      "instructions": ["Preheat oven to 375F. Line a baking sheet with parchment paper.", "Roll out the Crescent Dough Sheet on a lightly floured surface or directly on parchment.", "If using sausage links, cut the dough into strips wide enough to wrap each link. If using patties, you can cut the dough into rectangles to fully enclose them or make mini parcels.", "If desired, spread a little mustard on the dough or sprinkle with cheese before adding sausage.", "Place fully cooked sausage on dough. Roll up tightly and place seam-side down on baking sheet.", "Beat the egg and brush over the tops of the rolls.", "Bake for 12-15 minutes, or until pastry is golden brown and puffed.", "Let cool slightly and serve warm."]
    },
    {
      "name": "Crispy Chicken Thighs",
      "description": "Perfectly golden and crispy skin with juicy, tender meat underneath",
      "category": "non-vegetarian",
      "cuisine": "American",
      "ingredients": ["Chicken thighs", "Oil", "Salt", "Pepper", "Garlic powder", "Smoked paprika", "Thyme", "Rosemary"],
      "optionalIngredients": ["Garlic powder", "Smoked paprika", "Thyme", "Rosemary"],
      "instructions": ["Preheat oven to 425F.", "Season chicken thighs generously on both sides.", "Sear skin-side down in oven-safe skillet over medium-high heat with oil. Let them crisp without moving (6-8 min).", "Flip and transfer skillet to oven. Roast 15-20 min until internal temp hits 165F.", "Rest 5 min, then serve."]
    },
    {
      "name": "Crispy Pan-Fried Gnocchi with Cheese",
      "description": "Golden crispy gnocchi topped with your favorite melted cheese",
      "category": "vegetarian",
      "cuisine": "Italian",
      "ingredients": ["Gnocchi", "Olive oil", "Salt", "Pepper", "Grated cheese", "Fresh herbs"],
      "optionalIngredients": ["Fresh herbs"],
      "instructions": ["Heat 1 tbsp oil in a large skillet over medium-high heat.", "Add gnocchi in a single layer. Cook for 3-5 minutes without stirring, until bottoms are golden and crisp.", "Flip or stir and cook another 2-4 minutes until other sides are crisp and gnocchi are tender inside.", "Season with salt & pepper to taste.", "Remove from heat. Sprinkle with cheese and herbs if using.", "Serve hot."]
    },
    {
      "name": "Crispy Smash Burgers",
      "description": "Ultra-thin, super crispy burger patties with caramelized edges",
      "category": "non-vegetarian",
      "cuisine": "American",
      "ingredients": ["Ground beef", "Salt", "Pepper", "Burger buns", "Cheese slices", "Pickles", "Onions", "Burger sauce"],
      "optionalIngredients": ["Pickles", "Onions", "Burger sauce"],
      "instructions": ["Preheat skillet over high heat.", "Form loose balls of beef (about 2 oz each).", "Smash onto hot skillet with spatula. Season. Cook 2-3 min until crispy, then flip and add cheese.", "Toast buns, assemble with toppings."]
    },
    {
      "name": "Cuban Sandwich",
      "description": "Classic pressed sandwich with ham, roast pork, Swiss cheese, and pickles",
      "category": "non-vegetarian",
      "cuisine": "Cuban",
      "ingredients": ["Cuban bread", "Mustard", "Swiss cheese", "Dill pickles", "Ham", "Roast pork", "Butter"],
      "optionalIngredients": [],
      "instructions": ["Assemble sandwich with bread, mustard, cheese, pickles, ham, pork, cheese, and top bread.", "Butter bread outsides and grill in panini press or skillet with weight.", "Press and toast until golden and melty (4-6 min). Slice and serve."]
    },
    {
      "name": "French Onion Soup",
      "description": "Rich beef broth with caramelized onions, topped with crusty bread and melted cheese",
      "category": "vegetarian",
      "cuisine": "French",
      "ingredients": ["Yellow onions", "Butter", "Olive oil", "Sugar", "Salt", "White wine", "Beef broth", "Chicken broth", "Worcestershire sauce", "Pepper", "Baguette", "Gruyère cheese"],
      "optionalIngredients": ["White wine", "Gruyère cheese"],
      "instructions": ["In large pot, melt butter with oil. Add onions, salt, and sugar. Cook on medium-low, stirring often, 30-40 min until deeply golden.", "Deglaze with wine if using, then add broths and Worcestershire. Simmer 20 min.", "Toast baguette slices until golden.", "Ladle soup into oven-safe bowls, top with toast and cheese.", "Broil until bubbly and browned. Serve hot."]
    },
    {
      "name": "Fried Cheese Ravioli",
      "description": "Crispy golden ravioli with a melty cheese center - perfect appetizer",
      "category": "vegetarian",
      "cuisine": "Italian",
      "ingredients": ["Frozen cheese ravioli", "All-purpose flour", "Eggs", "Milk", "Italian breadcrumbs", "Parmesan cheese", "Garlic powder", "Salt", "Vegetable oil", "Marinara sauce"],
      "optionalIngredients": [],
      "instructions": ["Bring a pot of salted water to a boil. Add ravioli and cook for 1-2 minutes less than package directions. Drain and pat dry thoroughly.", "Set up dredging station with three bowls containing flour, beaten eggs with milk, and breadcrumbs mixed with Parmesan, garlic powder, and salt.", "Dredge each ravioli in flour, then egg mixture, then breadcrumbs. Press lightly to ensure a full coating.", "Heat 1-2 inches of oil in a deep skillet or saucepan to 350F.", "Fry ravioli in batches, 1-2 minutes per side, until golden brown. Do not overcrowd the pan.", "Transfer to a paper towel-lined plate to drain.", "Serve warm with marinara sauce for dipping."]
    },
    {
      "name": "Garlic Butter Mussels",
      "description": "Tender mussels steamed in a rich garlic butter broth - perfect with crusty bread",
      "category": "non-vegetarian",
      "cuisine": "French",
      "ingredients": ["Fresh mussels", "Butter", "Olive oil", "Garlic", "Shallot", "Chicken broth", "Red pepper flakes", "Parsley", "Lemon", "Salt", "Black pepper", "Crusty bread"],
      "optionalIngredients": ["Red pepper flakes", "Crusty bread"],
      "instructions": ["Clean mussels thoroughly, discarding any cracked ones or those that don't close when tapped.", "In a large pot, heat butter and olive oil over medium heat.", "Add garlic and shallot, cooking until softened and fragrant (2-3 min).", "Pour in broth, season lightly with salt, pepper, and red pepper flakes. Bring to a simmer.", "Add mussels, cover, and steam 5-7 min, shaking the pot occasionally, until shells open (discard any that stay shut).", "Sprinkle with fresh parsley.", "Serve hot with lemon wedges and crusty bread for dipping."]
    },
    {
      "name": "Garlic Knots",
      "description": "Soft, buttery garlic knots made from pizza dough - irresistible!",
      "category": "vegetarian",
      "cuisine": "Italian",
      "ingredients": ["Pizza dough", "Butter", "Garlic", "Parsley", "Salt", "Parmesan cheese"],
      "optionalIngredients": ["Parmesan cheese"],
      "instructions": ["Preheat oven to 400F. Line a baking sheet with parchment paper.", "On a lightly floured surface, divide pizza dough into 12 equal pieces.", "Roll each piece into an 8-inch rope. Tie into a knot and place on baking sheet.", "Bake for 12-15 minutes or until golden brown.", "While knots bake, melt butter in a small saucepan over low heat. Add minced garlic and cook for 1-2 minutes until fragrant. Remove from heat.", "Brush baked knots generously with garlic butter. Sprinkle with parsley and salt. Add Parmesan if desired.", "Serve warm."]
    },
    {
      "name": "Hibachi Noodles",
      "description": "Restaurant-style garlic butter noodles with that signature hibachi flavor",
      "category": "vegan",
      "cuisine": "Japanese",
      "ingredients": ["Lo mein noodles", "Neutral oil", "Butter", "Garlic", "Soy sauce", "Teriyaki sauce", "Oyster sauce", "Sesame oil", "Sugar", "Green onions", "Sesame seeds"],
      "optionalIngredients": ["Oyster sauce", "Sesame seeds"],
      "instructions": ["Cook noodles according to package directions until just al dente. Drain and toss lightly with a little oil to prevent sticking.", "Heat 2 Tbsp butter and neutral oil in a large skillet or wok over medium-high heat.", "Add garlic and sauté for 30 seconds until fragrant.", "Add noodles to the pan and toss in the garlic butter.", "Stir in soy sauce, teriyaki sauce, oyster sauce (if using), sugar, and sesame oil. Toss until noodles are coated and lightly caramelized (about 3-4 min).", "Add last 1 Tbsp butter and toss until glossy.", "Garnish with sliced green onions and sesame seeds."]
    },
    {
      "name": "Ligurian Focaccia",
      "description": "The ultimate Italian flatbread - crispy bottom, airy inside, olive oil perfection",
      "category": "vegan",
      "cuisine": "Italian",
      "ingredients": ["Lukewarm water", "Active dry yeast", "Honey", "All-purpose flour", "Kosher salt", "Extra-virgin olive oil", "Flaky salt"],
      "optionalIngredients": [],
      "instructions": ["In a medium bowl, stir together water, yeast, and honey to dissolve.", "In a very large bowl, whisk flour and salt together. Add yeast mixture and olive oil. Stir with a rubber spatula until just incorporated. Scrape the sides of the bowl clean and cover with plastic wrap.", "Leave at room temperature to ferment for 12 to 14 hours, until at least doubled in volume.", "Spread 2 to 3 tablespoons olive oil evenly onto an 18-by-13-inch rimmed baking sheet.", "When dough is ready, use a spatula or hand to release it from the sides of the bowl and fold it onto itself gently. Pour onto prepared pan.", "Pour an additional 2 tablespoons olive oil over the dough and gently spread across. Gently stretch the dough to the edges of the sheet by placing hands underneath and pulling outward. Repeat stretching once or twice over 30 minutes.", "Dimple the dough by pressing the pads of your first three fingers in at an angle.", "Make the brine by stirring salt and water until salt is dissolved. Pour brine over dough to fill dimples.", "Proof focaccia for 45 minutes until the dough is light and bubbly.", "Thirty minutes into this proof, adjust oven rack to center position and preheat oven to 450F. Place a baking stone or an inverted sturdy baking sheet on the rack and allow to preheat.", "Sprinkle focaccia with flaky salt. Bake for 15 to 20 minutes directly on top of stone or inverted pan until bottom crust is crisp and golden brown.", "To finish browning top crust, move focaccia to upper rack and bake for 3 to 6 minutes more.", "Remove from oven and brush or douse with 2 to 3 tablespoons olive oil over the surface. Let cool for 5 minutes, then release focaccia from pan and transfer to a cooling rack.", "Serve warm or at room temperature."]
    },
    {
      "name": "Loaded Nachos",
      "description": "Ultimate party food - crispy chips piled high with cheese, meat, and toppings",
      "category": "non-vegetarian",
      "cuisine": "Mexican",
      "ingredients": ["Tortilla chips", "Cheddar cheese", "Ground beef", "Taco seasoning", "Jalapeños", "Black beans", "Sour cream", "Salsa", "Guacamole", "Scallions"],
      "optionalIngredients": ["Jalapeños", "Black beans", "Sour cream", "Salsa", "Guacamole", "Scallions"],
      "instructions": ["Prepare toppings: Cook beef with taco seasoning OR make cheese sauce (melt butter, whisk in flour, add milk, melt cheese).", "Layer chips on a baking sheet. Add cheese and toppings.", "Broil 2-3 min until cheese melts.", "Serve hot with cold toppings on the side."]
    },
    {
      "name": "Meatball Subs",
      "description": "Classic Italian-American sandwich with meatballs, marinara, and melted cheese",
      "category": "non-vegetarian",
      "cuisine": "Italian",
      "ingredients": ["Cooked meatballs", "Marinara sauce", "Sub rolls", "Mozzarella cheese"],
      "optionalIngredients": [],
      "instructions": ["Heat meatballs in marinara sauce until hot.", "Preheat broiler. Split sub rolls.", "Place meatballs and sauce in rolls. Top with cheese.", "Broil 2-3 minutes until cheese melts and browns. Serve."]
    },
    {
      "name": "Pan-Fried Pork Dumplings",
      "description": "Crispy-bottomed dumplings with juicy pork filling - restaurant quality at home",
      "category": "non-vegetarian",
      "cuisine": "Chinese",
      "ingredients": ["Dumpling wrappers", "Ground pork", "Soy sauce", "Sesame oil", "Ginger", "Scallions", "Oil", "Water"],
      "optionalIngredients": [],
      "instructions": ["In a bowl, mix pork, soy sauce, sesame oil, ginger, and scallions.", "Place filling in center of wrapper. Wet edges and fold to seal.", "Heat oil in skillet. Arrange dumplings flat-side down. Fry 2-3 minutes until bottoms are golden.", "Add 1/4 cup water to pan, cover, and steam 3-4 minutes. Uncover and cook another 1-2 minutes to crisp.", "Serve with soy sauce."]
    },
    {
      "name": "Pan-Fried Rice with Scallions & Wasabi Peas",
      "description": "Elevated fried rice with a crunchy wasabi pea twist",
      "category": "vegetarian",
      "cuisine": "Asian Fusion",
      "ingredients": ["Cooked white rice", "Soy sauce", "Onion powder", "Garlic powder", "Ground ginger", "Neutral oil", "Eggs", "Frozen peas and carrots", "Salt", "Pepper", "Sesame oil", "Scallions", "Wasabi peas"],
      "optionalIngredients": ["Wasabi peas"],
      "instructions": ["Prepare the rice.", "Heat 1 tablespoon of oil in a large pan or wok over medium-high heat.", "If using eggs, crack them into the pan, scramble until set, then remove and set aside.", "Add another splash of oil if needed. Add veggies. Stir-fry until heated through and caramelized.", "Add the cold rice to the pan. Break it apart with a spatula and stir-fry to mix.", "Sprinkle in onion powder, garlic powder, and ginger. Pour in soy sauce and stir to combine. Fry for a few minutes until some rice gets crispy.", "Return the scrambled eggs to the pan. Drizzle with sesame oil. Taste and adjust seasoning with salt, pepper, or more soy sauce.", "Sprinkle in crushed wasabi peas. Stir gently once or twice.", "Top with scallions and serve hot."]
    },
    {
      "name": "Pasta Carbonara",
      "description": "Roman classic - silky egg and cheese sauce with crispy pancetta",
      "category": "non-vegetarian",
      "cuisine": "Italian",
      "ingredients": ["Spaghetti", "Eggs", "Parmesan", "Pancetta", "Salt", "Pepper"],
      "optionalIngredients": [],
      "instructions": ["Cook spaghetti according to package directions. Reserve 1/2 cup pasta water.", "In a bowl, whisk eggs and Parmesan.", "Cook pancetta in skillet until crisp.", "Toss hot pasta with pancetta and fat. Off heat, quickly stir in egg mixture, tossing constantly. Add pasta water as needed for creamy sauce.", "Season with salt & pepper. Serve."]
    },
    {
      "name": "Pepper Jack Mac and Cheese",
      "description": "Creamy, spicy mac and cheese with a crunchy breadcrumb topping",
      "category": "vegetarian",
      "cuisine": "American",
      "ingredients": ["Elbow macaroni", "Butter", "All-purpose flour", "Whole milk", "Pepper Jack cheese", "Salt", "Pepper", "Bread crumbs", "Paprika", "Cayenne"],
      "optionalIngredients": ["Paprika", "Cayenne"],
      "instructions": ["Preheat oven to 375F.", "Cook pasta in salted water according to package directions. Drain and set aside.", "In a large saucepan, melt 2 tablespoons butter over medium heat. Whisk in flour and cook for 1-2 minutes until bubbling and light golden.", "Gradually whisk in milk. Bring to a simmer, stirring constantly, until thickened (about 5 minutes).", "Lower heat. Add shredded pepper Jack cheese. Stir until cheese is melted and sauce is smooth. Season with salt and pepper to taste.", "Add cooked pasta to the sauce and stir to combine.", "Pour mac and cheese into a greased baking dish.", "In a small bowl, mix bread crumbs with melted butter. Sprinkle evenly over the top of the mac and cheese.", "Bake for 15-20 minutes until topping is golden and edges are bubbling.", "Optional: broil for 1-2 minutes at the end for extra crisp topping.", "Let cool slightly before serving."]
    }
  ]
};

allDishes = menuData.dishes;

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
        dish.ingredients.forEach(ingredient => {
            if (!allIngredients[ingredient]) {
                allIngredients[ingredient] = [];
            }
            allIngredients[ingredient].push(dish.name);
        });
    });
    
    const ingredientsList = Object.entries(allIngredients)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([ingredient, dishes]) => {
            const dishList = dishes.length > 1 ? ` (${dishes.join(', ')})` : '';
            return `<li>${ingredient}${dishList}</li>`;
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
    
    if (dish.ingredients && dish.ingredients.length > 0) {
        bodyHTML += '<h3>Ingredients</h3><ul>';
        dish.ingredients.forEach(ingredient => {
            bodyHTML += `<li>${ingredient}</li>`;
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

    const dishIngredientsLower = dish.ingredients.map(i => i.toLowerCase());
    const optionalIngredientsLower = (dish.optionalIngredients || []).map(i => i.toLowerCase());
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

    dish.ingredients.forEach(ingredient => {
        const ingredientLower = ingredient.toLowerCase();
        const isOptional = optionalIngredientsLower.some(opt => opt === ingredientLower);
        const matched = searchTerms.some(term => 
            ingredientLower.includes(term)
        );
        if (!matched) {
            missingFromSearch.push(ingredient);
            if (!isOptional) {
                requiredMissing.push(ingredient);
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
        
        const ingredientsHTML = dish.ingredients.map(ingredient => {
            let displayIngredient = ingredient;
            let isMissing = false;
            
            if (dish.matchInfo && dish.matchInfo.missingIngredients.includes(ingredient)) {
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

// Initialize - you need to paste your menuData here with all the recipes
filterAndDisplayRecipes();