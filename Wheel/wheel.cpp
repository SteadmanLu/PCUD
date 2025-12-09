#include <iostream>
#include <vector>
#include <string>
#include <random>
#include <chrono>
#include <limits>
#include <thread>
#include <cstdlib>
#include <iomanip>
#include <cmath>
#include <algorithm>
#include <map>

// ANSI color codes for fancy terminal output
namespace Color {
    const std::string RESET = "\033[0m";
    const std::string BOLD = "\033[1m";
    const std::string BLACK = "\033[30m";
    const std::string RED = "\033[31m";
    const std::string GREEN = "\033[32m";
    const std::string YELLOW = "\033[33m";
    const std::string BLUE = "\033[34m";
    const std::string MAGENTA = "\033[35m";
    const std::string CYAN = "\033[36m";
    const std::string WHITE = "\033[37m";
    const std::string BG_BLACK = "\033[40m";
    const std::string BG_RED = "\033[41m";
    const std::string BG_GREEN = "\033[42m";
    const std::string BG_YELLOW = "\033[43m";
    const std::string BG_BLUE = "\033[44m";
    const std::string BG_MAGENTA = "\033[45m";
    const std::string BG_CYAN = "\033[46m";
    const std::string BG_WHITE = "\033[47m";

    // Fancy text formatting
    const std::string UNDERLINE = "\033[4m";
    const std::string BLINK = "\033[5m";
    const std::string REVERSE = "\033[7m";
    
    // Get a random color from the list
    std::string getRandomColor() {
        static const std::vector<std::string> colors = {RED, GREEN, YELLOW, BLUE, MAGENTA, CYAN};
        return colors[rand() % colors.size()];
    }
    
    // Get a random background color
    std::string getRandomBgColor() {
        static const std::vector<std::string> bgColors = {BG_RED, BG_GREEN, BG_YELLOW, BG_BLUE, BG_MAGENTA, BG_CYAN};
        return bgColors[rand() % bgColors.size()];
    }
}

// ASCII Art and fancy text generators
namespace FancyText {
    std::string centerText(const std::string& text, int width) {
        int padding = (width - text.length()) / 2;
        return std::string(padding, ' ') + text + std::string(padding, ' ');
    }
    
    void printTitle() {
        std::cout << "\n\n";
        std::cout << Color::BOLD << Color::CYAN;
        std::cout << "    ██████╗ ██╗   ██╗██████╗ ███████╗██████╗     ██╗    ██╗██╗  ██╗███████╗███████╗██╗     \n";
        std::cout << "    ██╔══██╗██║   ██║██╔══██╗██╔════╝██╔══██╗    ██║    ██║██║  ██║██╔════╝██╔════╝██║     \n";
        std::cout << "    ██████╔╝██║   ██║██████╔╝█████╗  ██████╔╝    ██║ █╗ ██║███████║█████╗  █████╗  ██║     \n";
        std::cout << "    ██╔══██╗██║   ██║██╔═══╝ ██╔══╝  ██╔══██╗    ██║███╗██║██╔══██║██╔══╝  ██╔══╝  ██║     \n";
        std::cout << "    ██████╔╝╚██████╔╝██║     ███████╗██║  ██║    ╚███╔███╔╝██║  ██║███████╗███████╗███████╗\n";
        std::cout << "    ╚═════╝  ╚═════╝ ╚═╝     ╚══════╝╚═╝  ╚═╝     ╚══╝╚══╝ ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝\n";
        std::cout << Color::RESET << "\n";
        
        std::cout << Color::BOLD << Color::YELLOW;
        std::cout << "    ╔═══════════════════════════════════════════════════════════════════════════════╗\n";
        std::cout << "    ║                           " << Color::MAGENTA << "SUPER DELUXE EDITION" << Color::YELLOW << "                                ║\n";
        std::cout << "    ╚═══════════════════════════════════════════════════════════════════════════════╝\n";
        std::cout << Color::RESET << "\n";
        
        std::cout << Color::GREEN << "                        ✨ Created with pride by STEADS CORPS ✨\n" << Color::RESET;
        std::cout << "\n";
    }
    
    void printSpinningWheel(int progress, int maxProgress, const std::string& currentChoice) {
        const int wheelSize = 40;
        const double angle = 2.0 * M_PI * progress / maxProgress;
        
        std::cout << Color::BOLD << Color::CYAN << "\r                                                                              \r";
        
        // Draw a circular indicator for spinning
        int indicatorPos = static_cast<int>(wheelSize * 0.5 * (1.0 + sin(angle)));
        std::string indicator = std::string(indicatorPos, ' ') + "◈";
        std::cout << "[" << indicator << std::string(wheelSize - indicatorPos - 1, ' ') << "]";
        
        // Display the current choice with a random color
        std::cout << " " << Color::getRandomColor() << currentChoice << Color::RESET;
        std::cout.flush();
    }
    
    void showConfetti() {
        std::cout << "\n\n";
        for (int i = 0; i < 5; i++) {
            std::cout << "\r                                                                       \r";
            for (int j = 0; j < 70; j++) {
                if (rand() % 5 == 0) {
                    std::cout << Color::getRandomColor() << "*" << Color::RESET;
                } else if (rand() % 7 == 0) {
                    std::cout << Color::getRandomColor() << "•" << Color::RESET;
                } else if (rand() % 10 == 0) {
                    std::cout << Color::getRandomColor() << "+" << Color::RESET;
                } else if (rand() % 13 == 0) {
                    std::cout << Color::getRandomColor() << "✦" << Color::RESET;
                } else {
                    std::cout << " ";
                }
            }
            std::cout.flush();
            std::this_thread::sleep_for(std::chrono::milliseconds(100));
        }
        std::cout << "\n";
    }
    
    void drawProgressBar(double percentage, int width = 50) {
        int pos = width * percentage;
        std::cout << " [";
        for (int i = 0; i < width; ++i) {
            if (i < pos) std::cout << Color::GREEN << "█" << Color::RESET;
            else std::cout << " ";
        }
        std::cout << "] " << std::fixed << std::setprecision(1) << (percentage * 100.0) << "%";
    }
}

// Animation utilities
namespace Animation {
    void typeText(const std::string& text, int delayMs = 20) {
        for (char c : text) {
            std::cout << c << std::flush;
            std::this_thread::sleep_for(std::chrono::milliseconds(delayMs));
        }
        std::cout << std::endl;
    }
    
    void loadingBar(const std::string& message, int timeMs = 1500) {
        std::cout << message;
        int steps = 20;
        for (int i = 0; i <= steps; i++) {
            std::cout << "\r" << message << " ";
            FancyText::drawProgressBar(static_cast<double>(i) / steps);
            std::cout.flush();
            std::this_thread::sleep_for(std::chrono::milliseconds(timeMs / steps));
        }
        std::cout << std::endl;
    }
    
    void spinnerAnimation(const std::string& message, int timeMs = 1500) {
        const std::vector<std::string> spinChars = {"⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"};
        int spinIdx = 0;
        int steps = timeMs / 50; // 50ms per step
        
        for (int i = 0; i < steps; i++) {
            std::cout << "\r" << Color::CYAN << spinChars[spinIdx] << " " << message << Color::RESET << std::flush;
            spinIdx = (spinIdx + 1) % spinChars.size();
            std::this_thread::sleep_for(std::chrono::milliseconds(50));
        }
        std::cout << "\r" << message << " ✓                 " << std::endl;
    }
}

class FancyWheelSpinner {
private:
    std::vector<std::string> choices;
    std::vector<double> weights;
    std::vector<std::string> choiceColors;
    std::mt19937 generator;
    std::string lastWinner;
    std::map<std::string, int> history;
    
    // New properties for enhanced features
    bool useAnimations;
    bool showConfetti;
    int spinSpeed;
    int spinningTime;
    
public:
    FancyWheelSpinner() {
        // Seed the random number generator with current time
        unsigned seed = std::chrono::system_clock::now().time_since_epoch().count();
        generator = std::mt19937(seed);
        srand(seed);
        
        // Default settings
        useAnimations = true;
        showConfetti = true;
        spinSpeed = 80; // milliseconds
        spinningTime = 3000; // milliseconds
    }
    
    void addChoice(const std::string& choice, double weight) {
        choices.push_back(choice);
        weights.push_back(weight);
        choiceColors.push_back(Color::getRandomColor());
        
        if (useAnimations) {
            Animation::spinnerAnimation("Adding choice '" + choice + "'", 500);
        } else {
            std::cout << "Choice added successfully!" << std::endl;
        }
    }
    
    void clearChoices() {
        if (choices.empty()) {
            Animation::typeText(Color::YELLOW + "There are no choices to clear!" + Color::RESET);
            return;
        }
        
        int count = choices.size();
        choices.clear();
        weights.clear();
        choiceColors.clear();
        
        if (useAnimations) {
            Animation::loadingBar("Clearing " + std::to_string(count) + " choices", 1000);
            std::cout << Color::GREEN << "All choices have been cleared successfully!" << Color::RESET << std::endl;
        } else {
            std::cout << "All choices cleared." << std::endl;
        }
    }
    
    std::string spin() {
        if (choices.empty()) {
            std::cout << Color::RED << "⚠ Error: No choices available to spin! Please add some choices first." << Color::RESET << std::endl;
            return "";
        }

        // Calculate final result using the weighted distribution
        std::discrete_distribution<int> distribution(weights.begin(), weights.end());
        int finalIndex = distribution(generator);
        
        // Fancy spinning animation
        if (useAnimations) {
            std::cout << Color::CYAN << Color::BOLD << "\n🎡 SPINNING THE SUPER WHEEL 🎡\n" << Color::RESET << std::endl;
            
            // Initial delay with dots
            std::cout << "Preparing";
            for (int i = 0; i < 3; i++) {
                std::cout << "." << std::flush;
                std::this_thread::sleep_for(std::chrono::milliseconds(300));
            }
            std::cout << std::endl;
            
            // Calculate how many animation frames we need
            int totalFrames = spinningTime / spinSpeed;
            
            // Fast spinning phase
            for (int i = 0; i < totalFrames / 2; i++) {
                int randomIndex = rand() % choices.size();
                FancyText::printSpinningWheel(i, totalFrames / 2, choices[randomIndex]);
                std::this_thread::sleep_for(std::chrono::milliseconds(spinSpeed));
            }
            
            // Slowing down phase (gradually approaching the final result)
            for (int i = 0; i < totalFrames / 2; i++) {
                // As we get closer to the end, increase the chance of showing the final choice
                double progressRatio = static_cast<double>(i) / (totalFrames / 2);
                int randomIndex;
                
                if ((rand() % 100) / 100.0 < progressRatio) {
                    randomIndex = finalIndex;
                } else {
                    randomIndex = rand() % choices.size();
                }
                
                FancyText::printSpinningWheel(totalFrames / 2 + i, totalFrames, choices[randomIndex]);
                
                // Gradually slow down the spinning
                int currentDelay = spinSpeed + static_cast<int>(progressRatio * spinSpeed * 3);
                std::this_thread::sleep_for(std::chrono::milliseconds(currentDelay));
            }
            
            // Show the final result with some pizzazz
            std::cout << "\n\n";
            
            if (showConfetti) {
                FancyText::showConfetti();
            }
            
            std::string resultText = "🏆 THE WHEEL HAS STOPPED AT: ";
            Animation::typeText(Color::YELLOW + Color::BOLD + resultText + Color::RESET, 20);
            
            std::string winnerText = choices[finalIndex];
            std::cout << Color::BG_MAGENTA << Color::WHITE << Color::BOLD;
            Animation::typeText("    " + winnerText + "    ", 30);
            std::cout << Color::RESET << std::endl;
            
            // Display some fun facts about the choice
            if (history.find(winnerText) != history.end()) {
                history[winnerText]++;
                std::cout << Color::CYAN << "This choice has won " << history[winnerText] << " times!" << Color::RESET << std::endl;
            } else {
                history[winnerText] = 1;
                std::cout << Color::CYAN << "First win for this choice!" << Color::RESET << std::endl;
            }
            
            // Show the probability of this result
            double totalWeight = 0;
            for (double w : weights) {
                totalWeight += w;
            }
            double probability = (weights[finalIndex] / totalWeight) * 100;
            std::cout << "Probability of this result: " << Color::GREEN << std::fixed << std::setprecision(2) 
                      << probability << "%" << Color::RESET << std::endl;
                      
            // Add some more fancy elements
            if (probability < 20) {
                std::cout << Color::YELLOW << "Wow! That was quite unlikely! 🎯" << Color::RESET << std::endl;
            } else if (probability > 50) {
                std::cout << Color::BLUE << "A highly probable outcome. As expected! 📊" << Color::RESET << std::endl;
            }
            
            // Remember the last winner
            lastWinner = winnerText;
        } else {
            // Simple version without animations
            std::cout << "\nSpinning the wheel..." << std::endl;
            std::cout << "Result: " << choices[finalIndex] << std::endl;
        }
        
        return choices[finalIndex];
    }
    
    void displayChoices() {
        if (choices.empty()) {
            std::cout << Color::YELLOW << "No choices available. Add some choices first!" << Color::RESET << std::endl;
            return;
        }
        
        double totalWeight = 0;
        for (double w : weights) {
            totalWeight += w;
        }
        
        // Sort choices by weight for better visualization
        std::vector<size_t> indices(choices.size());
        std::iota(indices.begin(), indices.end(), 0);
        std::sort(indices.begin(), indices.end(), [this](size_t a, size_t b) {
            return weights[a] > weights[b];
        });
        
        // Fancy header
        std::cout << "\n" << Color::BG_BLUE << Color::WHITE << Color::BOLD << " 📋 CURRENT CHOICES AND PROBABILITIES 📋 " << Color::RESET << std::endl;
        std::cout << Color::CYAN << "╔═════╦════════════════════════════════╦═══════════╦════════════╗" << Color::RESET << std::endl;
        std::cout << Color::CYAN << "║" << Color::BOLD << " ID  ║ CHOICE                         ║ WEIGHT    ║ PROBABILITY " << Color::RESET << Color::CYAN << "║" << Color::RESET << std::endl;
        std::cout << Color::CYAN << "╠═════╬════════════════════════════════╬═══════════╬════════════╣" << Color::RESET << std::endl;
        
        for (size_t i = 0; i < indices.size(); ++i) {
            size_t idx = indices[i];
            double probability = (weights[idx] / totalWeight) * 100;
            std::string probStr = std::to_string(probability);
            probStr = probStr.substr(0, probStr.find('.') + 3) + "%";
            
            std::string choiceDisplay = choices[idx];
            if (choiceDisplay.length() > 30) {
                choiceDisplay = choiceDisplay.substr(0, 27) + "...";
            }
            
            // Highlight the last winner
            std::string highlightStart = "", highlightEnd = "";
            if (!lastWinner.empty() && choices[idx] == lastWinner) {
                highlightStart = Color::BG_YELLOW + Color::BLACK;
                highlightEnd = Color::RESET + Color::CYAN;
            }
            
            std::cout << Color::CYAN << "║" << Color::RESET << " " << std::setw(3) << (i + 1) << " " 
                      << Color::CYAN << "║" << Color::RESET << " " << highlightStart << std::left << std::setw(30) << choiceDisplay << highlightEnd << " "
                      << Color::CYAN << "║" << Color::RESET << " " << std::right << std::setw(9) << weights[idx] << " "
                      << Color::CYAN << "║" << Color::RESET << " " << std::right << std::setw(10) << probStr << " "
                      << Color::CYAN << "║" << Color::RESET << std::endl;
        }
        
        std::cout << Color::CYAN << "╚═════╩════════════════════════════════╩═══════════╩════════════╝" << Color::RESET << std::endl;
        std::cout << "\nTotal number of choices: " << Color::BOLD << choices.size() << Color::RESET << std::endl;
    }
    
    void displayPieChart() {
        if (choices.empty()) {
            std::cout << Color::YELLOW << "No choices available to display chart!" << Color::RESET << std::endl;
            return;
        }
        
        double totalWeight = 0;
        for (double w : weights) {
            totalWeight += w;
        }
        
        std::cout << "\n" << Color::BG_MAGENTA << Color::WHITE << Color::BOLD << " 📊 PROBABILITY DISTRIBUTION CHART 📊 " << Color::RESET << std::endl;
        
        // Simple ASCII pie chart (horizontal bar chart)
        const int chartWidth = 50;
        int usedWidth = 0;
        
        std::cout << "\n";
        for (size_t i = 0; i < choices.size(); ++i) {
            double probability = (weights[i] / totalWeight) * 100;
            int barWidth = std::max(1, static_cast<int>((probability / 100) * chartWidth));
            
            if (i == choices.size() - 1 && usedWidth + barWidth < chartWidth) {
                barWidth = chartWidth - usedWidth;
            }
            
            usedWidth += barWidth;
            
            std::string choiceDisplay = choices[i];
            if (choiceDisplay.length() > 20) {
                choiceDisplay = choiceDisplay.substr(0, 17) + "...";
            }
            
            std::cout << std::left << std::setw(22) << choiceDisplay << " ";
            std::cout << Color::BOLD << choiceColors[i];
            
            for (int j = 0; j < barWidth; j++) {
                std::cout << "█";
            }
            
            std::cout << Color::RESET << " " << std::fixed << std::setprecision(1) << probability << "%" << std::endl;
        }
        std::cout << "\n";
    }
    
    void toggleAnimations() {
        useAnimations = !useAnimations;
        if (useAnimations) {
            Animation::typeText(Color::GREEN + "🎬 Animations enabled! Enjoy the show!" + Color::RESET);
        } else {
            std::cout << Color::YELLOW << "Animations disabled. App will run in simple mode." << Color::RESET << std::endl;
        }
    }
    
    void toggleConfetti() {
        showConfetti = !showConfetti;
        if (showConfetti) {
            if (useAnimations) {
                Animation::typeText(Color::GREEN + "🎊 Confetti effects enabled! Let's celebrate!" + Color::RESET);
            } else {
                std::cout << Color::GREEN << "Confetti effects enabled!" << Color::RESET << std::endl;
            }
        } else {
            std::cout << Color::YELLOW << "Confetti effects disabled." << Color::RESET << std::endl;
        }
    }
    
    void adjustSpinSpeed(int newSpeed) {
        if (newSpeed < 10) newSpeed = 10;
        if (newSpeed > 500) newSpeed = 500;
        
        spinSpeed = newSpeed;
        std::cout << Color::CYAN << "Spin speed adjusted to " << spinSpeed << "ms" << Color::RESET << std::endl;
    }
    
    void importChoices(const std::vector<std::string>& newChoices, const std::vector<double>& newWeights) {
        if (newChoices.size() != newWeights.size()) {
            std::cout << Color::RED << "Error: Choices and weights arrays must have the same size!" << Color::RESET << std::endl;
            return;
        }
        
        Animation::loadingBar("Importing choices", 1000);
        
        for (size_t i = 0; i < newChoices.size(); i++) {
            choices.push_back(newChoices[i]);
            weights.push_back(newWeights[i]);
            choiceColors.push_back(Color::getRandomColor());
        }
        
        std::cout << Color::GREEN << "Successfully imported " << newChoices.size() << " choices!" << Color::RESET << std::endl;
    }
    
    void displayHelp() {
        std::cout << "\n" << Color::BG_GREEN << Color::BLACK << Color::BOLD << " 📚 HELP & INSTRUCTIONS 📚 " << Color::RESET << std::endl;
        std::cout << "\nThe Super Wheel allows you to spin a weighted wheel of fortune.\n";
        std::cout << "- Add choices with different weights to control their probabilities\n";
        std::cout << "- Higher weights mean higher chances of winning\n";
        std::cout << "- Visualize probabilities with pie charts\n";
        std::cout << "- Customize spinning animations and effects\n\n";
        
        std::cout << Color::YELLOW << "📌 MAIN COMMANDS:" << Color::RESET << std::endl;
        std::cout << "1. Add a choice with weight - Add a new item to the wheel\n";
        std::cout << "2. Spin the wheel - Spin the wheel to get a random result based on weights\n";
        std::cout << "3. Display all choices - View all current choices with their probabilities\n";
        std::cout << "4. Show probability chart - View a graphical representation of probabilities\n";
        std::cout << "5. Clear all choices - Remove all choices from the wheel\n";
        std::cout << "6. Settings - Adjust animations, speed, and visual effects\n";
        std::cout << "7. Import sample choices - Add a predefined set of sample choices\n";
        std::cout << "8. Help - Display this help information\n";
        std::cout << "9. Exit - Quit the application\n";
        
        std::cout << "\n" << Color::CYAN << "🔧 TIPS:" << Color::RESET << std::endl;
        std::cout << "- You can adjust the spin speed in the Settings menu\n";
        std::cout << "- For performance reasons, you can disable animations in Settings\n";
        std::cout << "- The pie chart helps visualize relative probabilities\n";
        std::cout << "- The last winner is highlighted in the choices list\n";
        
        std::cout << "\n" << Color::GREEN << "Press Enter to return to the menu..." << Color::RESET;
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
        std::cin.get();
    }
    
    void showSettings() {
        while (true) {
            system("clear");
            std::cout << "\n" << Color::BG_CYAN << Color::BLACK << Color::BOLD << " ⚙️  SETTINGS MENU ⚙️  " << Color::RESET << std::endl;
            std::cout << "\n1. " << (useAnimations ? Color::GREEN + "Disable" : Color::YELLOW + "Enable") << " animations" << Color::RESET;
            std::cout << "\n2. " << (showConfetti ? Color::GREEN + "Disable" : Color::YELLOW + "Enable") << " confetti effects" << Color::RESET;
            std::cout << "\n3. Adjust spin speed (current: " << spinSpeed << "ms)";
            std::cout << "\n4. Adjust spinning time (current: " << spinningTime << "ms)";
            std::cout << "\n5. Back to main menu";
            std::cout << "\n\nEnter option: ";
            
            int option;
            while (!(std::cin >> option) || option < 1 || option > 5) {
                std::cin.clear();
                std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
                std::cout << "Invalid option. Please enter a number between 1-5: ";
            }
            
            switch (option) {
                case 1:
                    toggleAnimations();
                    break;
                case 2:
                    toggleConfetti();
                    break;
                case 3:
                    std::cout << "Enter new spin speed (10-500ms, lower = faster): ";
                    int newSpeed;
                    std::cin >> newSpeed;
                    adjustSpinSpeed(newSpeed);
                    break;
                case 4:
                    std::cout << "Enter new spinning time (1000-10000ms): ";
                    std::cin >> spinningTime;
                    if (spinningTime < 1000) spinningTime = 1000;
                    if (spinningTime > 10000) spinningTime = 10000;
                    std::cout << "Spinning time set to " << spinningTime << "ms" << std::endl;
                    break;
                case 5:
                    return;
            }
            
            std::cout << "\nPress Enter to continue...";
            std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
            std::cin.get();
        }
    }
    
    void importSampleChoices() {
        std::vector<std::string> sampleChoices = {
            "Arran", "Jaiden", "Colin", "Lucas", "Max", "Anton"
        };
        
        std::vector<double> sampleWeights = {20, 20, 20, 20, 20, 20};
        
        importChoices(sampleChoices, sampleWeights);
    }
};

void clearScreen() {
    #ifdef _WIN32
        system("cls");
    #else
        system("clear");
    #endif
}

int main() {
    FancyWheelSpinner spinner;
    std::string choice;
    double weight;
    int option;
    
    // Set terminal to support colors and UTF-8 characters
    #ifdef _WIN32
        system("chcp 65001");
    #endif
    
    clearScreen();
    FancyText::printTitle();
    
    std::cout << "Press Enter to continue...";
    std::cin.get();
    
    while (true) {
        clearScreen();
        FancyText::printTitle();
        
        std::cout << Color::BOLD << Color::BLUE << "\n📋 MAIN MENU 📋\n" << Color::RESET << std::endl;
        std::cout << Color::CYAN << "1. " << Color::RESET << "Add a choice with weight" << std::endl;
        std::cout << Color::CYAN << "2. " << Color::RESET << "Spin the wheel 🎡" << std::endl;
        std::cout << Color::CYAN << "3. " << Color::RESET << "Display all choices" << std::endl;
        std::cout << Color::CYAN << "4. " << Color::RESET << "Show probability chart 📊" << std::endl;
        std::cout << Color::CYAN << "5. " << Color::RESET << "Clear all choices" << std::endl;
        std::cout << Color::CYAN << "6. " << Color::RESET << "Settings ⚙️" << std::endl;
        std::cout << Color::CYAN << "7. " << Color::RESET << "Import sample choices" << std::endl;
        std::cout << Color::CYAN << "8. " << Color::RESET << "Help 📚" << std::endl;
        std::cout << Color::CYAN << "9. " << Color::RESET << "Exit" << std::endl;
        std::cout << Color::YELLOW << "\nEnter option: " << Color::RESET;
        
        while (!(std::cin >> option) || option < 1 || option > 9) {
            std::cin.clear();
            std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
            std::cout << Color::RED << "Invalid option. Please enter a number between 1-9: " << Color::RESET;
        }
        
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
        
        switch (option) {
            case 1: {
                std::cout << "\n" << Color::BG_GREEN << Color::BLACK << " ➕ ADD NEW CHOICE ➕ " << Color::RESET << std::endl;
                std::cout << "\nEnter choice name: ";
                std::getline(std::cin, choice);
                
                std::cout << "Enter weight (higher = more likely): ";
                while (!(std::cin >> weight) || weight <= 0) {
                    std::cin.clear();
                    std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
                    std::cout << Color::RED << "Invalid weight. Please enter a positive number: " << Color::RESET;
                }
                
                spinner.addChoice(choice, weight);
                break;
            }
                
            case 2:
                spinner.spin();
                std::cout << "\nPress Enter to continue...";
                std::cin.get();
                break;
                
            case 3:
                spinner.displayChoices();
                std::cout << "\nPress Enter to continue...";
                std::cin.get();
                break;
                
            case 4:
                spinner.displayPieChart();
                std::cout << "\nPress Enter to continue...";
                std::cin.get();
                break;
                
            case 5:
                spinner.clearChoices();
                std::cout << "\nPress Enter to continue...";
                std::cin.get();
                break;
                
            case 6:
                spinner.showSettings();
                break;
                
            case 7:
                spinner.importSampleChoices();
                std::cout << "\nPress Enter to continue...";
                std::cin.get();
                break;
                
            case 8:
                spinner.displayHelp();
                break;
                
            case 9: {
                clearScreen();
                std::cout << "\n\n";
                std::cout << Color::CYAN << Color::BOLD;
                std::cout << "    ████████╗██╗  ██╗ █████╗ ███╗   ██╗██╗  ██╗    ██╗   ██╗ ██████╗ ██╗   ██╗██╗\n";
                std::cout << "    ╚══██╔══╝██║  ██║██╔══██╗████╗  ██║██║ ██╔╝    ╚██╗ ██╔╝██╔═══██╗██║   ██║██║\n";
                std::cout << "       ██║   ███████║███████║██╔██╗ ██║█████╔╝      ╚████╔╝ ██║   ██║██║   ██║██║\n";
                std::cout << "       ██║   ██╔══██║██╔══██║██║╚██╗██║██╔═██╗       ╚██╔╝  ██║   ██║██║   ██║╚═╝\n";
                std::cout << "       ██║   ██║  ██║██║  ██║██║ ╚████║██║  ██╗       ██║   ╚██████╔╝╚██████╔╝██╗\n";
                std::cout << "       ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝       ╚═╝    ╚═════╝  ╚═════╝ ╚═╝\n";
                std::cout << Color::RESET << "\n";
                
                std::cout << Color::MAGENTA << "\n           Thank you for using the Super Deluxe Wheel Spinner!" << Color::RESET << std::endl;
                std::cout << Color::GREEN << "\n                     Created with pride by STEADS CORPS" << Color::RESET << std::endl;
                std::cout << "\n\n";
                return 0;
            }
        }
    }
    
    return 0;
}