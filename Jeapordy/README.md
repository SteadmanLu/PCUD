# Jeopardy Game Engine - C++ Implementation


## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
  - [Complete Game Flow](#complete-game-flow)
  - [Multi-Player Support](#multi-player-support)
  - [JSON-Powered Questions](#json-powered-questions)
  - [Game Mechanics](#game-mechanics)
  - [User Interface](#user-interface)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
  - [Data Structures](#data-structures)
  - [Core Classes](#core-classes)
- [JSON Question Format](#json-question-format)
  - [File Structure](#file-structure)
  - [Example Category](#example-category)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Compilation](#compilation)
  - [Running the Game](#running-the-game)
- [How to Play](#how-to-play)
  - [Game Setup](#game-setup)
  - [Playing Rounds](#playing-rounds)
  - [Controls](#controls)
- [Example Game Session](#example-game-session)
- [Key Implementation Details](#key-implementation-details)
  - [JSON Parsing](#json-parsing)
  - [Answer Validation](#answer-validation)
  - [Score Management](#score-management)
- [Creating Custom Question Files](#creating-custom-question-files)
  - [Step-by-Step Guide](#step-by-step-guide)
  - [Template](#template)
- [Learning Objectives](#learning-objectives)
- [Future Enhancements](#future-enhancements)
  - [Planned Features](#planned-features)
  - [Advanced Features](#advanced-features)
- [Known Issues & Limitations](#known-issues--limitations)
- [Profiling & Optimization](#profiling--optimization)
  - [Using gprof](#using-gprof)
  - [Performance Notes](#performance-notes)
- [Sample Question Database](#sample-question-database)
- [Tips for Question Writers](#tips-for-question-writers)
  - [Good Questions](#good-questions)
  - [Avoid](#avoid)
  - [Daily Double Placement](#daily-double-placement)
- [Code Structure](#code-structure)
- [Contributing Ideas](#contributing-ideas)

A feature-complete command-line Jeopardy game written in C++17 with JSON-powered questions, multi-player support, Daily Double mechanics, and Final Jeopardy. Perfect for trivia nights or testing your knowledge!

##  Overview

This C++ Jeopardy implementation recreates the classic TV game show experience in your terminal. With structured JSON question databases, multiple categories, point values, Daily Doubles, and a Final Jeopardy round, it's a comprehensive trivia game engine.

##  Key Features

### Complete Game Flow
- **Regular Jeopardy:** Main game board with categories and point values
- **Daily Doubles:** Hidden high-risk, high-reward questions
- **Final Jeopardy:** Wagering round with single question
- **Score Tracking:** Real-time point calculation per player

### Multi-Player Support
- **Unlimited Players:** Add as many contestants as you want
- **Individual Scoring:** Track each player's points separately
- **Turn Management:** Fair rotation through players
- **Leaderboard:** Real-time standings display

### JSON-Powered Questions
- **External Data:** Questions loaded from JSON files
- **Easy Updates:** Add new categories without recompiling
- **Structured Format:** Organized categories and point values
- **Scalable:** Add unlimited questions and categories

### Game Mechanics
- **Point Values:** Traditional 200-1000 point scale
- **Question Selection:** Pick by category and value
- **Answer Validation:** Case-insensitive checking
- **Used Questions:** Tracks answered questions
- **Wagering:** Final Jeopardy betting system

### User Interface
- **Game Board Display:** ASCII art grid of categories
- **Clear Formatting:** Organized, readable terminal output
- **Color Support:** (Can be added with ANSI codes)
- **Input Validation:** Error handling for user inputs

##  Technologies

- **C++17** - Modern C++ features
- **nlohmann/json** - JSON parsing library
- **STL Containers** - Vector, map, string
- **File I/O** - Reading JSON question files
- **OOP Design** - Structured classes and methods

##  Project Structure

```
Jeapordy/
 jeapordy.cpp        # Main game engine (530 lines)
 jeapordy            # Compiled binary
 json.hpp           # nlohmann JSON library
 freshmen.json      # Sample question database
 gmon.out          # Profiling data
 README.md         # This file
```

##  Architecture

### Data Structures

**Question Structure:**
```cpp
struct Question {
    int value;              // Point value (200-1000)
    string question;        // Question text
    string answer;          // Correct answer
    bool used;             // Already asked?
    bool doubleJeopardy;   // Is this a Daily Double?
};
```

**Category Structure:**
```cpp
struct Category {
    string name;                // Category name
    vector<Question> questions; // All questions in category
};
```

**Game Data:**
```cpp
struct JeopardyData {
    vector<Category> categories;  // All categories
    FinalJeopardy finalJeopardy; // Final round data
};
```

### Core Classes

**JSONParser:**
- Loads and parses JSON question files
- Validates data structure
- Handles parsing errors
- Returns structured game data

**Game Engine:**
- Manages game state
- Controls turn flow
- Validates answers
- Updates scores
- Displays board

##  JSON Question Format

### File Structure
```json
{
    "categories": [
        {
            "name": "Category Name",
            "questions": [
                {
                    "value": 200,
                    "question": "Question text?",
                    "answer": "Correct answer",
                    "doubleJeopardy": false
                }
            ]
        }
    ],
    "finalJeopardy": {
        "question": "Final question?",
        "answer": "Final answer"
    }
}
```

### Example Category
```json
{
    "name": "Computer Science",
    "questions": [
        {
            "value": 200,
            "question": "This language was created by Bjarne Stroustrup",
            "answer": "C++",
            "doubleJeopardy": false
        },
        {
            "value": 400,
            "question": "The O in OOP stands for this",
            "answer": "Object",
            "doubleJeopardy": false
        },
        {
            "value": 600,
            "question": "This data structure is LIFO",
            "answer": "Stack",
            "doubleJeopardy": true
        }
    ]
}
```

##  Getting Started

### Prerequisites
- **C++17 Compiler** (g++, clang++)
- **nlohmann/json** library (included as json.hpp)
- **Terminal** with standard I/O

### Compilation

```bash
# Basic compilation
g++ -std=c++17 jeapordy.cpp -o jeapordy

# With optimization
g++ -std=c++17 -O2 jeapordy.cpp -o jeapordy

# With debugging symbols
g++ -std=c++17 -g jeapordy.cpp -o jeapordy

# With profiling
g++ -std=c++17 -pg jeapordy.cpp -o jeapordy
```

### Running the Game

```bash
# Run with default question file
./jeapordy

# The program looks for freshmen.json by default
# Make sure it's in the same directory
```

##  How to Play

### Game Setup
1. **Launch:** Run the compiled executable
2. **Enter Players:** Input player names when prompted
3. **View Board:** See categories and point values

### Playing Rounds

**Regular Jeopardy:**
1. Select category and point value
2. Read the question
3. Enter your answer
4. Points added/deducted based on correctness
5. Continue until board is complete

**Daily Doubles:**
1. If selected, enter wager amount
2. Answer the question alone
3. Win or lose the wagered amount

**Final Jeopardy:**
1. All players enter wagers
2. Single question revealed
3. All players answer
4. Final scores calculated
5. Winner announced!

### Controls
```
During game:
- Enter category number
- Enter point value
- Type answer (case-insensitive)
- Enter wager for Daily Double/Final Jeopardy

Answer format:
- Just type the answer
- No need for "What is..."
- Case doesn't matter
```

##  Example Game Session

```
Welcome to Jeopardy!

Enter number of players: 2
Player 1 name: Alice
Player 2 name: Bob

===========================================
         JEOPARDY GAME BOARD
===========================================
| Computer Science | History | Math | Science | Literature |
|       200        |   200   | 200  |   200   |    200    |
|       400        |   400   | 400  |   400   |    400    |
|       600        |   600   | 600  |   600   |    600    |
|       800        |   800   | 800  |   800   |    800    |
|      1000        |  1000   | 1000 |  1000   |   1000    |
===========================================

Current Scores:
Alice: $0
Bob: $0

Alice's turn!
Select category (1-5): 1
Select value (200-1000): 200

Question for $200:
This language was created by Bjarne Stroustrup

Your answer: C++
Correct! +$200

Current Scores:
Alice: $200
Bob: $0
```

##  Key Implementation Details

### JSON Parsing
```cpp
static JeopardyData parseJeopardyJSON(const string& filename) {
    ifstream file(filename);
    json jsonData;
    file >> jsonData;
    
    // Parse categories and questions
    for (const auto& cat : jsonData["categories"]) {
        Category category;
        category.name = cat["name"];
        
        for (const auto& q : cat["questions"]) {
            Question question;
            question.value = q["value"];
            question.question = q["question"];
            question.answer = q["answer"];
            question.doubleJeopardy = q.value("doubleJeopardy", false);
            
            category.questions.push_back(question);
        }
        data.categories.push_back(category);
    }
    
    return data;
}
```

### Answer Validation
```cpp
bool checkAnswer(string userAnswer, string correctAnswer) {
    // Convert to lowercase
    transform(userAnswer.begin(), userAnswer.end(), 
              userAnswer.begin(), ::tolower);
    transform(correctAnswer.begin(), correctAnswer.end(), 
              correctAnswer.begin(), ::tolower);
    
    // Remove whitespace
    userAnswer.erase(remove_if(userAnswer.begin(), userAnswer.end(), 
                    ::isspace), userAnswer.end());
    correctAnswer.erase(remove_if(correctAnswer.begin(), correctAnswer.end(), 
                       ::isspace), correctAnswer.end());
    
    return userAnswer == correctAnswer;
}
```

### Score Management
```cpp
class ScoreTracker {
private:
    map<string, int> scores;
    
public:
    void addPoints(string player, int points) {
        scores[player] += points;
    }
    
    void subtractPoints(string player, int points) {
        scores[player] -= points;
    }
    
    int getScore(string player) {
        return scores[player];
    }
    
    string getLeader() {
        auto leader = max_element(scores.begin(), scores.end(),
            [](const auto& a, const auto& b) {
                return a.second < b.second;
            });
        return leader->first;
    }
};
```

##  Creating Custom Question Files

### Step-by-Step Guide

1. **Create JSON file** (e.g., `my_questions.json`)
2. **Add categories** with descriptive names
3. **Add 5 questions per category** (200, 400, 600, 800, 1000)
4. **Mark 1-2 Daily Doubles** per game
5. **Add Final Jeopardy** question
6. **Save and test**

### Template
```json
{
    "categories": [
        {
            "name": "Your Category 1",
            "questions": [
                {"value": 200, "question": "?", "answer": "", "doubleJeopardy": false},
                {"value": 400, "question": "?", "answer": "", "doubleJeopardy": false},
                {"value": 600, "question": "?", "answer": "", "doubleJeopardy": true},
                {"value": 800, "question": "?", "answer": "", "doubleJeopardy": false},
                {"value": 1000, "question": "?", "answer": "", "doubleJeopardy": false}
            ]
        }
    ],
    "finalJeopardy": {
        "question": "Final question?",
        "answer": "Final answer"
    }
}
```

##  Learning Objectives

This project demonstrates:
- **File I/O:** Reading external JSON files
- **JSON Parsing:** Using third-party libraries
- **Data Structures:** Vectors, maps, structs
- **OOP Design:** Classes and encapsulation
- **Error Handling:** Try-catch blocks, validation
- **Game Logic:** State management, turn flow
- **String Processing:** Case-insensitive comparison
- **Algorithm Design:** Question selection, scoring

##  Future Enhancements

### Planned Features
- [ ] Save/load game state
- [ ] Timer for questions
- [ ] Sound effects
- [ ] Color-coded categories
- [ ] Difficulty levels
- [ ] Statistics tracking
- [ ] High score table
- [ ] Network multiplayer
- [ ] GUI version
- [ ] Question editor

### Advanced Features
- [ ] AI opponents
- [ ] Custom scoring rules
- [ ] Tournament mode
- [ ] Question difficulty ratings
- [ ] Hint system
- [ ] Multiple question databases
- [ ] Random question selection
- [ ] Category shuffling

##  Known Issues & Limitations

- No input timeout (players can think indefinitely)
- Answer must be exact match (minor spelling errors fail)
- No undo functionality
- Terminal-only interface
- Single-threaded (no concurrent play)
- No persistent high scores

##  Profiling & Optimization

### Using gprof
```bash
# Compile with profiling
g++ -std=c++17 -pg jeapordy.cpp -o jeapordy

# Run the program
./jeapordy

# Generate profile report
gprof jeapordy gmon.out > analysis.txt
```

### Performance Notes
- JSON parsing is one-time cost at startup
- O(1) question lookup by category/value
- O(n) player iteration for scoring
- Minimal memory footprint

##  Sample Question Database

The included `freshmen.json` contains:
- **5 Categories:** Tailored for freshmen
- **25 Questions:** Full game board
- **2-3 Daily Doubles:** Strategically placed
- **1 Final Jeopardy:** Challenging final question

Perfect for:
- College orientation events
- Freshman welcome activities
- Study groups
- General knowledge testing

##  Tips for Question Writers

### Good Questions
 Clear and unambiguous
 Single correct answer
 Appropriate difficulty for point value
 Interesting and educational

### Avoid
 Multiple valid answers
 Subjective questions
 Overly obscure topics
 Trick questions

### Daily Double Placement
- Usually higher values (600-1000)
- 2-3 per full game board
- Spread across categories

##  Code Structure

```
jeapordy.cpp (530 lines)
 Headers & Includes (Lines 1-14)
 Data Structures (Lines 15-44)
    Question struct
    Category struct
    FinalJeopardy struct
    JeopardyData struct
 JSONParser Class (Lines 45-100)
    parseJeopardyJSON()
 Game Engine (Lines 101-400)
    displayBoard()
    selectQuestion()
    checkAnswer()
    dailyDouble()
    finalJeopardy()
 Score Management (Lines 401-450)
 Main Game Loop (Lines 451-530)
```

##  Contributing Ideas

Ways to extend this project:
- Add more question databases
- Implement GUI with Qt or ncurses
- Create web interface
- Add difficulty levels
- Include hints system
- Network multiplayer support

---

**Jeopardy Game Engine** - Where trivia meets C++! 

*A personal project by Lucas Steadman*