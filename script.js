// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

// Global variables declaration
var passwordLength;        // Length of the password
var passwordCharSet;       // An array to store all the characters that are allowed in the password
var hasLowercase;          // A boolean to store user's choice on including lowercase chracters in the password
var hasUppercase;          // A boolean to store user's choice on including uppercase chracters in the password
var hasNumber;             // A boolean to store user's choice on including numbers in the password
var hasSpecialChar;        // A boolean to store user's choice on including special characters in the password

// Function to prompt user for password options
function getPasswordOptions() {
  // Initialises the array containing allowed characters
  passwordCharSet = [];

  // Promps and stores password length
  passwordLength = prompt("Enter the length of the password (8 to 128 character)");

  // Checks if password length is valid
  if (passwordLength == null) alert("The program canceled.");
  else if (passwordLength < 8 || passwordLength > 128) {
    alert("Invalid input. Password should be between 8 to 128 (inclusive) characters");
    passwordLength = null;  // To prevent the last alert in the caller function 
  }
  else {
    // Prompts which characters the password should include and adds those characters to passwordCharSet array
    hasUppercase = confirm("Does the password include uppercase characters?");
    if (hasUppercase) {
      passwordCharSet = passwordCharSet.concat(upperCasedCharacters);
    }

    hasLowercase = confirm("Does the password include lowercase characters?");
    if (hasLowercase) {
      passwordCharSet = passwordCharSet.concat(lowerCasedCharacters);
    }

    hasSpecialChar = confirm("Does the password include special characters?");
    if (hasSpecialChar) {
      passwordCharSet = passwordCharSet.concat(specialCharacters);
    }

    hasNumber = confirm("Does the password include numbers?");
    if (hasNumber) {
      passwordCharSet = passwordCharSet.concat(numericCharacters);
    }

  }
}

// Function for getting a random element from an array
function getRandom(arr) {

  // Generates a random integer between 0 to arr.length-1 and returns the element with that index
  let ran = Math.floor(Math.random() * arr.length);
  return arr[ran];
}

// Function to generate password with user input
function generatePassword() {

  // Calls a function that prompts user for options
  getPasswordOptions();

  let generatedPassword;   // Stores the generated password

  if (passwordLength != null) {
    if (passwordCharSet.length != 0) {
      do {
        generatedPassword = "";

        // Generates a random string from the password character set
        for (let i = 0; i < passwordLength; i++) {
          generatedPassword += getRandom(passwordCharSet);
        }

        // Creates an array from the generated password string
        const passwordArray = generatedPassword.split("");

        // Checking if the generated password includes all the required characters
        var findChar;

        if (hasLowercase) {
          // Checks if the generated password has at least one lowercase character
          findChar = passwordArray.findIndex(element => lowerCasedCharacters.indexOf(element) > -1);
        }

        if (findChar >= 0 && hasUppercase) {
          // Checks if the generated password has at least one uppercase character
          findChar = passwordArray.findIndex(element => upperCasedCharacters.indexOf(element) > -1);
        }

        if (findChar >= 0 && hasNumber) {
          // Checks if the generated password has at least one numeric character
          findChar = passwordArray.findIndex(element => numericCharacters.indexOf(element) > -1);
        }

        if (findChar >= 0 && hasSpecialChar) {
          // Checks if the generated password has at least one special character
          findChar = passwordArray.findIndex(element => specialCharacters.indexOf(element) > -1);
        }

      } while (findChar < 0);   // If the generated password does not include all the selected character types, generate the password again

      return generatedPassword;

    } else {
      // Alerts an error if no character type is selected
      alert("Error! at least one character type should be selected.")
    }
  }
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);