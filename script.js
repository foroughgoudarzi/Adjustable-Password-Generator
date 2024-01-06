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
  passwordCharSet = [];

  passwordLength = prompt("Enter the length of the password (8 to 128 character)");
  if (passwordLength < 8 || passwordLength > 128)
    alert("Invalid input. Password should be between 8 to 128 (inclusive) characters");
  else {

    // Prompts which characters the password should include and adds those characters to a character set array
    hasUppercase = confirm("Does the password include uppercase?");
    if (hasUppercase) {
      passwordCharSet = passwordCharSet.concat(upperCasedCharacters);
    }
    hasLowercase = confirm("Does the password include lowercase?");
    if (hasLowercase) {
      passwordCharSet = passwordCharSet.concat(lowerCasedCharacters);
    }

    hasSpecialChar = confirm("Does the password include special characters?");
    if (hasSpecialChar) {
      passwordCharSet = passwordCharSet.concat(specialCharacters);
    }

    hasNumber = confirm("Does the password have numbers?");
    if (hasNumber) {
      passwordCharSet = passwordCharSet.concat(numericCharacters);
    }

  }


}

// Function for getting a random element from an array
function getRandom(arr) {

  let ran = Math.floor(Math.random() * arr.length);


  return passwordCharSet[ran];
}

// Function to generate password with user input
function generatePassword() {
  getPasswordOptions();
  let generatedPassword

  if (passwordCharSet.length != 0) {
    do {
      generatedPassword = "";
      for (let i = 0; i < passwordLength; i++) {
        generatedPassword = getRandom(passwordCharSet) + generatedPassword;
      }
      const passwordArray = generatedPassword.split("");
      // check if the generated password includes all the required characters
      var findChar;
      Check: {

        if (hasLowercase) {
          findChar = passwordArray.findIndex(element => lowerCasedCharacters.indexOf(element) > -1);
          if (findChar < 0) break Check;
        }

        if (hasUppercase) {
          findChar = passwordArray.findIndex(element => upperCasedCharacters.indexOf(element) > -1);
          if (findChar < 0) break Check;
        }

        if (hasNumber) {
          findChar = passwordArray.findIndex(element => numericCharacters.indexOf(element) > -1);
          if (findChar < 0) break Check;
        }

        if (hasSpecialChar) {
          findChar = passwordArray.findIndex(element => specialCharacters.indexOf(element) > -1);
          if (findChar < 0) break Check;
        }

      }

    } while (findChar < 0);
    return generatedPassword;
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