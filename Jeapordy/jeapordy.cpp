#include <iostream>      // For input/output operations
#include <fstream>       // For file operations
#include <vector>        // For dynamic arrays
#include <string>        // For string handling
#include <map>           // For key-value pairs (player scores)
#include <iomanip>       // For formatting output
#include <cstdlib>       // For general utilities
#include <climits>       // For integer limits
#include <ctime>         // For time functions
#include <algorithm>     // For algorithms like max()
#include "json.hpp"      // JSON parsing library

using json = nlohmann::json;  // Simplify JSON namespace
using namespace std;          // Use standard namespace

// Structure to hold individual question data
struct Question {
    int value;              // Point value of the question
    string question;        // The actual question text
    string answer;          // The correct answer
    bool used;              // Whether this question has been asked
    bool doubleJeopardy;    // Whether this is a Daily Double

    // Default constructor - initialize all values
    Question() : value(0), used(false), doubleJeopardy(false) {}
};

// Structure to hold a category with its questions
struct Category {
    string name;                // Category name (e.g., "History")
    vector<Question> questions; // All questions in this category
};

// Structure for the final jeopardy round
struct FinalJeopardy {
    string question;  // Final jeopardy question
    string answer;    // Final jeopardy answer
};

// Main data structure containing all game information
struct JeopardyData {
    vector<Category> categories;  // All game categories
    FinalJeopardy finalJeopardy;  // Final jeopardy data
};

// Class responsible for parsing JSON game data files
class JSONParser {
public:
    // Static method to parse JSON file and return game data
    static JeopardyData parseJeopardyJSON(const string& filename) {
        JeopardyData data;  // Create empty data structure
        
        try {
            // Attempt to open the JSON file
            ifstream file(filename);
            if (!file.is_open()) {
                cerr << "Error: Could not open file " << filename << endl;
                return data;  // Return empty data on failure
            }
            
            // Parse JSON from file
            json jsonData;
            file >> jsonData;
            
            // Process each category in the JSON
            for (const auto& cat : jsonData["categories"]) {
                Category category;          // Create new category
                category.name = cat["name"]; // Set category name
                
                // Process each question in the category
                for (const auto& q : cat["questions"]) {
                    Question question;              // Create new question
                    question.value = q["value"];    // Set point value
                    question.question = q["question"]; // Set question text
                    question.answer = q["answer"];  // Set answer text
                    question.used = false;          // Mark as unused
                    
                    // Check if this is a Daily Double (optional field)
                    question.doubleJeopardy = q.contains("doubleJeopardy") ? 
                                              q["doubleJeopardy"].get<bool>() : false;
                    
                    // Add question to category
                    category.questions.push_back(question);
                }
                
                // Add category to game data
                data.categories.push_back(category);
            }
            
            // Load final jeopardy data
            data.finalJeopardy.question = jsonData["finalJeopardy"]["question"];
            data.finalJeopardy.answer = jsonData["finalJeopardy"]["answer"];
            
        } catch (const exception& e) {
            // Handle any JSON parsing errors
            cerr << "Error parsing JSON: " << e.what() << endl;
        }
        
        return data;  // Return parsed data (empty if failed)
    }
};

// Main game class that manages the Jeopardy game flow
class JeopardyGame {
private:
    JeopardyData gameData;        // All game questions and categories
    vector<string> players;       // List of player names
    map<string, int> scores;      // Player scores (name -> score)
    bool gameOver;                // Flag to track if game is finished
    
public:
    // Constructor - initialize game state
    JeopardyGame() : gameOver(false) {}
    
    // Load game data from JSON file
    bool loadGameData(const string& filename) {
        gameData = JSONParser::parseJeopardyJSON(filename);
        return !gameData.categories.empty();  // Return true if data loaded
    }
    
    // Get player information and initialize scores
    void setupPlayers() {
        int numPlayers;  // Number of players in the game
        cout << "How many players? ";
        cin >> numPlayers;
        cin.ignore();  // Clear the newline character from input buffer
        
        // Get each player's name and initialize their score
        for (int i = 0; i < numPlayers; i++) {
            string name;
            cout << "Enter name for Player " << (i + 1) << ": ";
            getline(cin, name);          // Get full name (with spaces)
            players.push_back(name);     // Add to player list
            scores[name] = 0;            // Initialize score to zero
        }
    }
    
    // Display the current game board with categories and available questions
    void displayBoard() {
        cout << "\n===== JEOPARDY BOARD =====\n\n";
        
        // Display category headers across the top
        for (int i = 0; i < gameData.categories.size(); i++) {
            string name = gameData.categories[i].name;
            
            // Truncate long category names to fit display
            if (name.length() > 18) {
                name = name.substr(0, 15) + "...";
            }
            
            // Center the category name in a 20-character field
            int spaces = (20 - name.length()) / 2;
            cout << string(spaces, ' ') << name << string(20 - spaces - name.length(), ' ');
        }
        cout << endl;
        
        // Display question values in rows (up to 5 questions per category)
        for (int valueIndex = 0; valueIndex < 5; valueIndex++) {
            // Go through each category for this row
            for (int catIndex = 0; catIndex < gameData.categories.size(); catIndex++) {
                string value;
                
                // Check if this category has a question at this index
                if (valueIndex < gameData.categories[catIndex].questions.size()) {
                    // Show "---" if question already used, otherwise show point value
                    if (gameData.categories[catIndex].questions[valueIndex].used) {
                        value = "---";
                    } else {
                        value = to_string(gameData.categories[catIndex].questions[valueIndex].value);
                    }
                } else {
                    value = "---";  // No question at this position
                }
                
                // Center the value in a 20-character field
                int spaces = (20 - value.length()) / 2;
                cout << string(spaces, ' ') << value << string(20 - spaces - value.length(), ' ');
            }
            cout << endl;
        }
        
        // Display current player scores
        cout << "\nScores:\n";
        for (const auto& player : players) {
            cout << player << ": $" << scores[player] << endl;
        }
    }
    
    // Handle player selection of a question
    bool selectQuestion(int& catIndex, int& valueIndex, int& currentPlayerIndex) {
        // Prompt current player to select a question
        cout << "\n" << players[currentPlayerIndex] << ", select a question.\n";
        cout << "Category (1-" << gameData.categories.size() << "): ";
        cin >> catIndex;
        catIndex--;  // Convert to 0-based indexing for arrays
        
        // Validate category selection
        if (catIndex < 0 || catIndex >= gameData.categories.size()) {
            cout << "Invalid category selection.\n";
            return false;
        }
        
        // Find all unused questions in the selected category
        vector<int> availableValues;  // Point values that are available
        vector<int> indices;          // Corresponding question indices
        
        for (int i = 0; i < gameData.categories[catIndex].questions.size(); i++) {
            if (!gameData.categories[catIndex].questions[i].used) {
                availableValues.push_back(gameData.categories[catIndex].questions[i].value);
                indices.push_back(i);
            }
        }
        
        // Check if any questions are available in this category
        if (availableValues.empty()) {
            cout << "No questions available in this category.\n";
            return false;
        }
        
        // Show available point values to the player
        cout << "Select value (";
        for (int i = 0; i < availableValues.size(); i++) {
            cout << availableValues[i];
            if (i < availableValues.size() - 1) {
                cout << ", ";  // Add comma between values
            }
        }
        cout << "): ";
        
        // Get player's value selection
        int selectedValue;
        cin >> selectedValue;
        
        // Find the question index that matches the selected value
        valueIndex = -1;
        for (int i = 0; i < gameData.categories[catIndex].questions.size(); i++) {
            if (gameData.categories[catIndex].questions[i].value == selectedValue &&
                !gameData.categories[catIndex].questions[i].used) {
                valueIndex = i;
                break;  // Found the matching question
            }
        }
        
        // Validate that a valid question was found
        if (valueIndex == -1) {
            cout << "Invalid value selection.\n";
            return false;
        }
        
        return true;  // Selection successful
    }
    
    // Present a question to the player and handle scoring
    void askQuestion(int catIndex, int valueIndex, int playerIndex) {
        // Get reference to the selected question
        Question& question = gameData.categories[catIndex].questions[valueIndex];
        string currentPlayer = players[playerIndex];  // Current player's name
        
        // Display question information
        cout << "\nCategory: " << gameData.categories[catIndex].name << endl;
        cout << "Value: $" << question.value << endl;
        
        // Handle Daily Double questions with wagering
        int wager = question.value;  // Default wager is question value
        if (question.doubleJeopardy) {
            cout << "DOUBLE JEOPARDY!" << endl;
            
            // Player can wager up to their current score or question value (whichever is higher)
            int maxWager = max(question.value, scores[currentPlayer]);
            cout << currentPlayer << ", make your wager (up to $" << maxWager << "): ";
            cin >> wager;
            
            // Ensure wager is within valid range
            if (wager < 0 || wager > maxWager) {
                cout << "Invalid wager. Setting to $" << question.value << endl;
                wager = question.value;
            }
        }
        
        // Display the actual question
        cout << "\nQuestion: " << question.question << endl;
        
        // Give player time to think before answering
        cout << "\nPress Enter when ready to answer...";
        cin.ignore();  // Clear input buffer
        cin.get();     // Wait for Enter key
        
        // Get player's answer
        cout << "What is your answer? ";
        string playerAnswer;
        getline(cin, playerAnswer);
        
        // Show the correct answer
        cout << "\nCorrect Answer: " << question.answer << endl;
        
        // Ask if the player's answer was correct (manual scoring)
        cout << "Did " << currentPlayer << " answer correctly? (y/n): ";
        char correct;
        cin >> correct;
        
        // Update player's score based on correctness
        if (tolower(correct) == 'y') {
            cout << "Correct! Adding $" << wager << " to " << currentPlayer << "'s score.\n";
            scores[currentPlayer] += wager;  // Add points for correct answer
        } else {
            cout << "Incorrect! Subtracting $" << wager << " from " << currentPlayer << "'s score.\n";
            scores[currentPlayer] -= wager;  // Subtract points for wrong answer
        }
        
        // Mark this question as used so it can't be selected again
        question.used = true;
        
        cin.ignore();  // Clear input buffer for next input
    }
    
    // Check if all questions in the game have been used
    bool allQuestionsUsed() {
        // Go through every category
        for (const auto& category : gameData.categories) {
            // Check every question in the category
            for (const auto& question : category.questions) {
                if (!question.used) {
                    return false;  // Found an unused question
                }
            }
        }
        return true;  // All questions have been used
    }
    
    // Conduct the Final Jeopardy round
    void playFinalJeopardy() {
        cout << "\n===== FINAL JEOPARDY =====\n";
        cout << "Category: " << "Final Jeopardy" << endl;
        
        // Maps to store each player's wager and correctness
        map<string, int> wagers;
        map<string, bool> correctAnswers;
        
        // Get wagers from all players
        for (const auto& player : players) {
            cout << "\n" << player << ", your current score is $" << scores[player] << ".\n";
            cout << "Make your Final Jeopardy wager: $";
            int wager;
            cin >> wager;
            
            // Validate wager (can't wager more than current score or negative amount)
            if (wager < 0 || wager > scores[player]) {
                cout << "Invalid wager. Setting to $0.\n";
                wager = 0;
            }
            
            wagers[player] = wager;  // Store the wager
            cin.ignore();            // Clear input buffer
        }
        
        // Show the Final Jeopardy question to all players
        cout << "\nFinal Jeopardy Question: " << gameData.finalJeopardy.question << endl;
        cout << "\nPlayers, write down your answers. Press Enter when ready...";
        cin.get();  // Wait for all players to be ready
        
        // Get each player's answer and determine correctness
        for (const auto& player : players) {
            cout << "\n" << player << ", what is your answer? ";
            string answer;
            getline(cin, answer);
            
            // Ask if this player's answer was correct
            cout << "Was " << player << "'s answer correct? (y/n): ";
            char correct;
            cin >> correct;
            correctAnswers[player] = (tolower(correct) == 'y');  // Store correctness
            cin.ignore();  // Clear input buffer
        }
        
        // Reveal the correct answer
        cout << "\nCorrect Answer: " << gameData.finalJeopardy.answer << endl;
        
        // Update all player scores based on their Final Jeopardy performance
        for (const auto& player : players) {
            if (correctAnswers[player]) {
                scores[player] += wagers[player];  // Add wager for correct answer
                cout << player << " answered correctly! Adding $" << wagers[player] << ".\n";
            } else {
                scores[player] -= wagers[player];  // Subtract wager for wrong answer
                cout << player << " answered incorrectly. Subtracting $" << wagers[player] << ".\n";
            }
        }
    }
    
    // Determine and announce the game winner
    void determineWinner() {
        // Clear screen for final results
        cout << "\033[2J\033[H";
        
        string winner;                // Name of the winning player
        int highestScore = INT_MIN;   // Highest score found so far
        
        // Find the player with the highest score
        for (const auto& [player, score] : scores) {
            if (score > highestScore) {
                highestScore = score;
                winner = player;
            }
        }
        
        // Display dramatic game over screen
        cout << "\033[1;31m";
        cout << "╔══════════════════════════════════════════════════════════════════════════════════════════════════╗\n";
        cout << "║                                    🎮 GAME OVER! 🎮                                              ║\n";
        cout << "╚══════════════════════════════════════════════════════════════════════════════════════════════════╝\033[0m\n\n";
        
        // Display final scoreboard
        cout << "\033[1;36m";
        cout << "┌─────────────────────────── 📊 FINAL SCOREBOARD 📊 ───────────────────────────┐\n";
        cout << "\033[0m";
        
        // Sort players by score for better presentation
        vector<pair<string, int>> sortedScores;
        for (const auto& player : players) {
            sortedScores.push_back({player, scores.at(player)});
        }
        sort(sortedScores.begin(), sortedScores.end(), 
             [](const auto& a, const auto& b) { return a.second > b.second; });
        
        // Display scores with rankings
        for (int i = 0; i < sortedScores.size(); i++) {
            const auto& [player, score] = sortedScores[i];
            cout << "\033[1;36m│ \033[0m";
            
            // Add position indicator
            if (i == 0) {
                cout << "\033[1;33m🥇 1st: \033[0m";
            } else if (i == 1) {
                cout << "\033[1;37m🥈 2nd: \033[0m";
            } else if (i == 2) {
                cout << "\033[1;31m🥉 3rd: \033[0m";
            } else {
                cout << "\033[1;34m" << (i + 1) << "th: \033[0m";
            }
            
            // Format player name and score
            string scoreText = player + " - $" + to_string(score);
            cout << "\033[1;37m" << left << setw(58) << scoreText << "\033[0m";
            
            cout << "\033[1;36m │\033[0m\n";
        }
        
        cout << "\033[1;36m└────────────────────────────────────────────────────────────────────────────┘\033[0m\n\n";
        
        // Dramatic winner announcement
        cout << "\033[1;35m";
        cout << "🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊\n";
        cout << "🎊                                                            🎊\n";
        cout << "🎊                    🏆 WINNER! 🏆                          🎊\n";
        cout << "🎊                                                            🎊\n";
        
        // Center the winner's name
        string winnerText = winner + " with $" + to_string(highestScore) + "!";
        int padding = (54 - winnerText.length()) / 2;
        cout << "🎊" << string(padding, ' ') << "\033[1;33m" << winnerText << "\033[1;35m" << string(54 - padding - winnerText.length(), ' ') << "🎊\n";
        
        cout << "🎊                                                            🎊\n";
        cout << "🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊\033[0m\n\n";
        
        cout << "\033[1;36mThank you for playing Jeopardy! 🎯\033[0m\n";
    }
    
    // Main game loop that controls the flow of the game
    void play() {
        // Ensure game data was loaded successfully
        if (gameData.categories.empty()) {
            cout << "No game data loaded. Exiting.\n";
            return;
        }
        
        setupPlayers();              // Get player information
        int currentPlayerIndex = 0;  // Start with first player
        
        // Main game loop - continue until game is over
        while (!gameOver) {
            displayBoard();  // Show current board state
            
            // Try to get a valid question selection
            int catIndex, valueIndex;
            if (selectQuestion(catIndex, valueIndex, currentPlayerIndex)) {
                // Ask the selected question
                askQuestion(catIndex, valueIndex, currentPlayerIndex);
                
                // Move to next player for next turn
                currentPlayerIndex = (currentPlayerIndex + 1) % players.size();
            }
            
            // Check if we should end the regular game and play Final Jeopardy
            if (allQuestionsUsed()) {
                playFinalJeopardy();  // Conduct Final Jeopardy round
                gameOver = true;      // End the game
            }
        }
        
        determineWinner();  // Announce the winner
    }
};

// Main function - entry point of the program
int main(int argc, char* argv[]) {
    srand(time(nullptr));  // Initialize random number generator
    
    JeopardyGame game;  // Create a new game instance
    string filename;    // Name of JSON file containing game data
    
    // Check if filename was provided as command line argument
    if (argc > 1) {
        filename = argv[1];  // Use command line argument
    } else {
        // Ask user for filename
        cout << "Enter the path to the JSON file: ";
        getline(cin, filename);
    }
    
    // Try to load game data and start the game
    if (game.loadGameData(filename)) {
        cout << "Game data loaded successfully!\n";
        game.play();  // Start the game
    } else {
        cout << "Failed to load game data. Exiting.\n";
        return 1;  // Exit with error code
    }
    
    return 0;  // Successful program termination
}