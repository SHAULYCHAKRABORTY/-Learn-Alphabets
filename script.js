const submitBtn = document.getElementById('submitBtn');
const alphabetInput = document.getElementById('alphabetInput');
const displayContainer = document.getElementById('displayContainer');
const backgroundMusic = document.getElementById('backgroundMusic');
const startMusicBtn = document.getElementById('startMusicBtn');
const wordBtn = document.getElementById('wordBtn');
const wordDisplay = document.getElementById('wordDisplay');

// Function to play background music
function playBackgroundMusic() {
    backgroundMusic.volume = 0.2;  // Set low volume for background music
    backgroundMusic.play().catch(error => {
        console.log("Background music playback failed: ", error);
    });
}

// Add event listener to start music button
startMusicBtn.addEventListener('click', playBackgroundMusic);

// Function to play sound for a given letter
function playLetterSound(letter) {
    const audio = new Audio(`sounds/${letter}.wav`); // Assuming sounds are named as 'A.wav', 'B.wav', etc.
    audio.play().catch(error => {
        console.log("Letter sound playback failed: ", error);
    });
}

// Function to handle letter input
function handleLetterInput() {
    const letter = alphabetInput.value.trim().toUpperCase();

    if (letter && letter.length === 1 && /^[A-Z]$/.test(letter)) {
        displayContainer.textContent = letter;
        playLetterSound(letter);
        triggerAnimation();

        // Display related words
        displayRelatedWords(letter);
    } else {
        displayContainer.textContent = "Please enter a valid letter (A-Z).";
    }
}

// Function to display related words with animation
function displayRelatedWords(letter) {
    const wordList = {
        A: ["Apple", "Ant", "Axe", "Astronaut", "Apricot"],
        B: ["Ball", "Bat", "Bee", "Banana", "Bicycle"],
        C: ["Cat", "Car", "Cup", "Cow", "Carrot"],
        D: ["Dog", "Doll", "Drum", "Duck", "Dinosaur"],
        E: ["Elephant", "Egg", "Eagle", "Engine", "Envelope"],
        F: ["Fish", "Frog", "Fan", "Feather", "Flag"],
        G: ["Giraffe", "Goat", "Grapes", "Globe", "Guitar"],
        H: ["Hat", "House", "Horse", "Helicopter", "Hammer"],
        I: ["Ice", "Igloo", "Insect", "Iron", "Island"],
        J: ["Juice", "Jaguar", "Jelly", "Jeans", "Jigsaw"],
        K: ["Kite", "Kangaroo", "Key", "King", "Kettle"],
        L: ["Lion", "Lamp", "Leaf", "Lemon", "Ladder"],
        M: ["Monkey", "Moon", "Mouse", "Mango", "Motorcycle"],
        N: ["Nest", "Nose", "Nut", "Nail", "Notebook"],
        O: ["Owl", "Orange", "Ox", "Octopus", "Oven"],
        P: ["Pig", "Pen", "Parrot", "Pumpkin", "Piano"],
        Q: ["Queen", "Quilt", "Quail", "Quarter", "Question"],
        R: ["Rabbit", "Rain", "Ring", "Robot", "Rainbow"],
        S: ["Sun", "Star", "Snake", "Shark", "Sheep"],
        T: ["Tiger", "Train", "Tree", "Turtle", "Table"],
        U: ["Umbrella", "Unicorn", "Urn", "Uniform", "Utensil"],
        V: ["Violin", "Vase", "Van", "Vegetable", "Volcano"],
        W: ["Whale", "Water", "Wolf", "Window", "Watch"],
        X: ["Xylophone", "X-ray", "Xenon", "Xerox", "Xerox machine"],
        Y: ["Yak", "Yogurt", "Yacht", "Yarn", "Yellow"],
        Z: ["Zebra", "Zoo", "Zero", "Zip", "Zucchini"]
    };

    const words = wordList[letter] || [];
    wordDisplay.innerHTML = '';  // Clear previous words

    words.forEach((word, index) => {
        const wordElement = document.createElement('div');
        wordElement.textContent = word;
        wordElement.className = 'animated-word';
        wordElement.style.animationDelay = `${index * 0.3}s`; // Delay animation for each word
        wordDisplay.appendChild(wordElement);
    });
}

// Function to trigger animation
function triggerAnimation() {
    // Reset animation by removing and re-adding the class
    displayContainer.classList.remove('animate');
    void displayContainer.offsetWidth; // Trigger reflow
    displayContainer.classList.add('animate');
}

// Add event listener for keyup event
document.addEventListener('keyup', (event) => {
    const letter = event.key.toUpperCase();
    if (/^[A-Z]$/.test(letter)) { // Check if the key is a valid letter
        alphabetInput.value = letter; // Set the input value
        handleLetterInput(); // Call the function to handle letter input
    }
});
