let screen = 0; // Variable to track the current screen
let score = 0; // Variable to track score
let timeLimit = 60; // Time limit in seconds
let timeRemaining;
let timerActive = false;
let playButton, backButton, easyButton, hardButton, backButton2, playAgainButton; // Button variables
let question; // Current question
let correctAnswer; // Correct answer for the current question
let userInput; // User's input for the answer
let feedback = ""; // Variable to store feedback message
let currentDifficulty; // Variable to store current difficulty
let soundtrack; // Variable to hold the soundtrack
let addition, subtract, divide, multiplication;

function preload() {
  addition = loadImage("assets/addition.png"); // Load image
  subtract = loadImage("assets/subtract.png"); // Load image
  divide = loadImage("assets/divide.png"); // Load image
  multiplication = loadImage("assets/multiplication.png"); // Load image
}

function setup() {
  createCanvas(400, 400);
  image(addition, 25, 90, 100, 100);
  image(multiplication, 105, 90, 100, 100);
  image(subtract, 185, 90, 100, 100);
  image(divide, 280, 90, 100, 100);

  // Create Play button
  playButton = createButton("Play");
  playButton.textSize = 100;
  playButton.position(125, 190);
  playButton.size(150, 75);
  playButton.style("background-color", "white");
  playButton.mousePressed(setupScreen1); // Call setupScreen1 on button press
  playButton.mouseOver(() => playButton.style("background-color", "lightgrey"));
  playButton.mouseOut(() => playButton.style("background-color", "white"));
}


// Function to check the user's answer
function checkAnswer() {
  let userAnswer = int(userInput.value());
  if (isNaN(userAnswer)) {
    feedback = "Please enter a valid number!"; // Check for valid number input
  } else if (userAnswer === correctAnswer) {
    feedback = "Correct!"; // Provide feedback for correct answer
    score += 1; // Increment score for correct answer
    generateQuestion(screen === 2 ? "easy" : "hard"); // Generate a new question
    
    
  } else {
    feedback = "Wrong! The correct answer was " + correctAnswer; // Provide feedback for incorrect answer
    generateQuestion(screen === 2 ? "easy" : "hard"); // Generate a new question
    
  }
  userInput.value(""); // Clear the input field
}

function setupScreen1() {
  screen = 1; // Set the screen to 1 (indicating setupScreen1 is active)

  // Clear any existing buttons
  removeAllButtons();

  // Create Easy button
  easyButton = createButton("Easy Mode");
  easyButton.position(130, 135);
  easyButton.size(125, 75);
  easyButton.style("background-color", "lightgreen");
  easyButton.mousePressed(() => {
    screen = 2; // Set screen to 2 for Easy Mode
    currentDifficulty = "easy"; // Store current difficulty
    startGame("easy"); // Start the game with easy mode
    generateQuestion("easy"); // Generate a question for easy mode
  });
  easyButton.mouseOver(() => easyButton.style("background-color", "green"));
  easyButton.mouseOut(() => easyButton.style("background-color", "lightgreen"));

  // Create Hard button
  hardButton = createButton("Hard Mode");
  hardButton.position(130, 225);
  hardButton.size(125, 75);
  hardButton.style("background-color", "salmon");
  hardButton.mousePressed(() => {
    screen = 3; // Set screen to 3 for Hard Mode
    currentDifficulty = "hard"; // Store current difficulty
    startGame("hard"); // Start the game with hard mode
    generateQuestion("hard"); // Generate a question for hard mode
  });
  hardButton.mouseOver(() => hardButton.style("background-color", "darkred"));
  hardButton.mouseOut(() => hardButton.style("background-color", "salmon"));

  // Create a new back button
  backButton = createButton("Back to Menu");
  backButton.position(5, 370);
  backButton.style("background-color", "white");
  backButton.mouseOver(() => backButton.style("background-color", "lightgrey"));
  backButton.mouseOut(() => backButton.style("background-color", "white"));

  userInput = createInput();
  userInput.position(50, 200);
  userInput.size(100);

  backButton.mousePressed(() => {
    screen = 0; // Reset screen variable to go back to main menu
    removeAllButtons(); // Remove all buttons
  });

  // Create back button for easy/hard mode
  backButton2 = createButton("Back to Difficulty Selection");
  backButton2.position(5, 370);
  backButton2.style("background-color", "white");
  backButton2.mouseOver(() =>
    backButton2.style("background-color", "lightgrey")
  );
  backButton2.mouseOut(() => backButton2.style("background-color", " white"));
  backButton2.mousePressed(() => {
    screen = 1; // Go back to difficulty selection
    backButton2.hide(); // Hide the back button for easy/hard mode
  });

  backButton2.hide(); // Initially hide this button

  // Create Play Again button
  playAgainButton = createButton("Play Again");
  playAgainButton.position(125, 200);
  playAgainButton.size(150, 75);
  playAgainButton.style("background-color", "lightblue");
  playAgainButton.mouseOver(() =>
    playAgainButton.style("background-color", "darkblue")
  );
  playAgainButton.mouseOut(() =>
    playAgainButton.style("background-color", "lightblue")
  );
  playAgainButton.mousePressed(() => {
    screen = currentDifficulty === "easy" ? 2 : 3; // Stay on the same difficulty screen
    startGame(currentDifficulty); // Restart the game with the same difficulty
    generateQuestion(currentDifficulty); // Generate a new question
    playAgainButton.hide(); // Hide the play again button
    userInput.show();
  });
}

function draw() {
  background(255); // Default background color
  if (screen === 0) {
    // Main menu screen
    background(0, 0, 255); // Blue background
    textSize(50);
    fill("black");
    text("Math Machine", 50, 90);
    playButton.show(); // Show the play button

    // Draw images for operations
    image(addition, 25, 90, 100, 100);
    image(multiplication, 105, 90, 100, 100);
    image(subtract, 185, 90, 100, 100);
    image(divide, 280, 90, 100, 100);
  } else if (screen === 1) {
    // Screen 1
    background(100, 200, 100); // Light green background
    textSize(28);
    fill("black");
    text("Choose Difficulty:", 10, 45);

    easyButton.show(); // Show the easy button
    hardButton.show(); // Show the hard button
    backButton.show(); // Show the back button
    playAgainButton.hide(); // Hide the play again button
    userInput.hide(); // Hide the user input slot
    playButton.hide(); // Hide the play button
  } else if (screen === 2) {
    // Easy Mode Screen
    background(200, 255, 200); // Light green background
    textSize(32);
    fill("black");
    text("Easy Mode", 118, 65);
    backButton2.show(); // Show the back button
    userInput.show(); // Show the user input
    easyButton.hide(); // Hide the easy button
    hardButton.hide(); // Hide the hard button
    if (timerActive) {
      updateTimer();
      displayScore();
      displayTimer();
    }

    // Display the question and input field
    textSize(24);
    fill("black");
    text(question, 50, 150);

    
    textSize(18);
   
    text(feedback, 50, 250); // Display feedback message
    
  } else if (screen === 3) {
    // Hard Mode Screen
    background(200, 10, 10); // Light red background
    textSize(32);
    fill("black");
    text("Hard Mode", 118, 65);
    backButton2.show(); // Show the back button
    userInput.show(); // Show user input
    easyButton.hide(); // Hide the easy button
    hardButton.hide(); // Hide the hard button
    if (timerActive) {
      updateTimer();
      displayScore();
      displayTimer();
    }

    // Display the question and input field
    textSize(18);
    text(feedback, 50, 250); // Display feedback message
    textSize(24);
    text(question, 50, 150);
  } else if (screen === 4) {
    // Game Over Screen
    if (currentDifficulty === "easy") {
      background(200, 255, 200); // Light green for easy mode
    } else if (currentDifficulty === "hard") {
      background(200, 10, 10); // Light red for hard mode
    }
    textSize(24);
    fill(0);
    text(`Game Over! Your score: ${score}`, 60, 135);
    playAgainButton.show(); // Show the play again button
  }
}

// Function to generate a random math question
function generateQuestion(difficulty) {
  let num1, num2;
  if (difficulty === "easy") {
    // Randomly choose between addition and subtraction
    let operation = random(["+", "-"]);
    num1 = floor(random(1, 20));
    num2 = floor(random(1, num1 + 1));

    if (operation === "+") {
      question = `${num1} + ${num2} = ?`;
      correctAnswer = num1 + num2; // Set correct answer for addition
    } else {
      question = `${num1} - ${num2} = ?`;
      correctAnswer = num1 - num2; // Set correct answer for subtraction
    }
  } else {
    // Randomly choose between multiplication and division
    let operation = random(["*", "/"]);
    num1 = floor(random(1, 12)); // Start from 1 to avoid division by zero
    num2 = floor(random(1, 12)); // Ensure num2 is not zero

    if (operation === "*") {
      question = `${num1} x ${num2} = ?`;
      correctAnswer = num1 * num2; // Set correct answer for multiplication
    } else {
      // Ensure num1 is divisible by num2 for clean division
      num1 = num1 * num2; // Make num1 a multiple of num2
      question = `${num1} ÷ ${num2} = ?`;
      correctAnswer = num1 / num2; // Set correct answer for division
    }
  }
}


function updateTimer() {
  if (timeRemaining > 0) {
    timeRemaining -= deltaTime / 1000; // Convert milliseconds to seconds
  } else {
    timerActive = false;
    endGame(); // Call the end game function when time runs out
  }
}

function startGame(difficulty) {
  score = 0;
  timeRemaining = timeLimit;
  timerActive = true;
  generateQuestion(difficulty); // Generate the first question
}

function displayTimer() {
  textSize(16);
  fill(0);
  text(`Time Remaining: ${Math.ceil(timeRemaining)}s`, 10, 20);
}

function displayScore() {
  textSize(16);
  fill(0);
  text(`Score: ${score}`, 325, 20);
}

function endGame() {
  screen = 4; // Set screen to game over
  question = "";
  clearFeedback();
  userInput.hide();
  playAgainButton.show(); // Show the play again button
}

function clearFeedback() {
  feedback = ""; // Clear the feedback message
}

function keyPressed() {
  if (keyCode === ENTER && (screen === 2 || screen === 3)) {
    checkAnswer(); // Call checkAnswer when Enter is pressed
  } else if (keyCode !== ENTER && (screen === 2 || screen === 3)) {
    clearFeedback(); // Clear feedback when user starts typing
  }
}

function mousePressed() {
  clearFeedback(); // Clear feedback when user clicks
}

function removeAllButtons() {
  if (easyButton) easyButton.remove();
  if (hardButton) hardButton.remove();
  if (backButton) backButton.remove();
  if (userInput) userInput.remove(); // Optionally remove the input field
  if (backButton2) backButton2.remove(); // Remove back button for difficulty selection
  if (playAgainButton) playAgainButton.remove(); // Remove play again button
}