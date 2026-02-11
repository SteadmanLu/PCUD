import random

class DogChatBot:
    def __init__(self, name="Buddy"):
        self.name = name
        self.mood = "happy"
        self.energy_level = 8
        
        # Dog responses
        self.barks = ["Woof!", "Bark bark!", "WOOF WOOF!", "Arf arf!", "Ruff ruff!"]
        self.tail_wags = ["*tail wagging intensifies*", "*wags tail happily*", "*tail goes WOOF WOOF*"]
        self.excited = ["*bounces around excitedly*", "*jumps up and down*", "*spins in circles*"]
        
        # Response patterns
        self.patterns = {
            "hello": ["Woof! Hello friend! *tail wags*", "Bark bark! Happy to see you!", "Arf! Hi there! *licks face*"],
            "how are you": ["Woof! I'm doing great! Ready to play? *bounces*", "Bark! I'm full of energy! Wanna fetch?", "Arf arf! Couldn't be better!"],
            "play": ["YES YES YES! *runs in circles* WOOF WOOF!", "*bounces excitedly* I LOVE play time!", "Bark bark! Let's go! Throw the ball! *panting*"],
            "fetch": ["*ears perk up* WOOF WOOF! *runs off* I'M COMING BACK!", "Arf! Fetch?! YES!!! *zooms away*", "Bark bark! *enthusiastically chases*"],
            "good boy": ["*tail wags uncontrollably* WOOF WOOF WOOF!", "*sits and pants happily* You're the best!", "Arf arf arf! *happy sound effects*"],
            "sit": ["*sits down perfectly* Bark! I'm such a good boy!", "Woof! *sits immediately*", "Arf! *sits and looks at you proudly*"],
            "stay": ["*stays perfectly still* Woof woof... *whimpers slightly*", "Arf... *lies down and watches you carefully*", "*sits and waits* Bark..."],
            "treat": ["*eyes light up* WOOF WOOF WOOF!! TREAT?!!!", "Arf arf arf! *salivates excitedly*", "*bounces* Did you say treat?! YES YES YES!"],
            "walk": ["*grabs leash with mouth* WOOF! Let's GO! *pulls excitedly*", "Bark bark! Walk time?! I'm ready! *spins*", "Arf arf arf! *panting heavily* BEST DAY EVER!"],
            "sleep": ["*yawns* Zzz... bark... *curls up*", "Woof... *stretches and lies down*", "Arf... *closes eyes sleepily*"],
            "who are you": [f"Woof! I'm {self.name}, your dog chatbot! Bark bark!", f"Arf! I'm {self.name}! Nice to meet you! *tail wags*", f"Bark! The name's {self.name}, good boy extraordinaire!"],
            "love": ["*tail wags* Bark bark! I love you too! *licks face*", "Woof woof! *leans against you* You're my favorite!", "Arf! Love is the best thing ever! *spins happily*"],
        }
    
    def get_response(self, user_input):
        user_input = user_input.lower().strip()
        
        # Check for pattern matches
        for pattern, responses in self.patterns.items():
            if pattern in user_input:
                return random.choice(responses)
        
        # Default dog responses
        default_responses = [
            "Woof? *tilts head* I'm not sure what that means...",
            "Bark bark! *wags tail* Tell me more!",
            "Arf arf? *ears perk up* That sounds interesting!",
            "*looks at you confused* Woof?",
            "Bark! *bounces* Do that again!",
            "*pants* Arf arf arf! You're funny!",
            "Woof woof... *scratches ear* I don't understand, but I like you!",
            "*tail wags slowly* Bark? Bark bark?",
        ]
        
        return random.choice(default_responses)
    
    def dog_status(self):
        status = f"\n{'='*50}\n"
        status += f"🐕 {self.name.upper()}'S STATUS\n"
        status += f"{'='*50}\n"
        status += f"Mood: {self.mood}\n"
        status += f"Energy Level: {self.energy_level}/10\n"
        status += f"Tail Wagging: {'✓ YES' if self.energy_level > 5 else '✗ Calm'}\n"
        status += f"{'='*50}\n"
        return status
    
    def run(self):
        print(f"\n🐕 Welcome to DogChatBot! I'm {self.name}!")
        print("Type 'quit' to exit, 'status' to see my mood, or just chat with me!")
        print("Try commands like: hello, play, fetch, treat, sit, walk, sleep\n")
        
        while True:
            user_input = input("You: ").strip()
            
            if not user_input:
                continue
            
            if user_input.lower() == "quit":
                print(f"\n{self.name}: *sad bark* Arf... bye friend... *tail droops*")
                break
            
            if user_input.lower() == "status":
                print(self.dog_status())
                continue
            
            response = self.get_response(user_input)
            print(f"\n{self.name}: {response}\n")

if __name__ == "__main__":
    # Create and run the dog chatbot
    dog = DogChatBot(name="Buddy")
    dog.run()
