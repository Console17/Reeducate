"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calculateRectangleArea(rectangle) {
    return rectangle.width * rectangle.height;
}
function calculateRectanglePerimeter(rectangle) {
    return 2 * (rectangle.width + rectangle.height);
}
function calculateCircleArea(circle) {
    return Math.PI * Math.pow(circle.radius, 2);
}
function calculateCirclePerimeter(circle) {
    return 2 * Math.PI * circle.radius;
}
// Independent Functions
function addNumbers(a, b) {
    return a + b;
}
function multiplyNumbers(a, b) {
    return a * b;
}
function capitalizeString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function filterEvenNumbers(numbers) {
    return numbers.filter((num) => num % 2 === 0);
}
function findMax(numbers) {
    return Math.max(...numbers);
}
function isPalindrome(str) {
    const cleanStr = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
    const reversedStr = cleanStr.split("").reverse().join("");
    return cleanStr === reversedStr;
}
function calculateFactorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    else {
        return n * calculateFactorial(n - 1);
    }
}
// Test Cases
// it is desired to create rectangle and circle classes and add methods
const rectangle = { width: 5, height: 8 };
const circle = { radius: 3 };
const rectangleArea = calculateRectangleArea(rectangle);
const rectanglePerimeter = calculateRectanglePerimeter(rectangle);
const circleArea = calculateCircleArea(circle);
const circlePerimeter = calculateCirclePerimeter(circle);
console.log(`Rectangle Area: ${rectangleArea}, Perimeter: ${rectanglePerimeter}`);
console.log(`Circle Area: ${circleArea}, Perimeter: ${circlePerimeter}`);
const sumResult = addNumbers(5, 3);
const multiplicationResult = multiplyNumbers(4, 7);
const capitalizedString = capitalizeString("javascript is fun");
const evenNumbers = filterEvenNumbers([1, 2, 3, 4, 5, 6, 7, 8]);
console.log(`Sum: ${sumResult}`);
console.log(`Multiplication: ${multiplicationResult}`);
console.log(`Capitalized String: ${capitalizedString}`);
console.log(`Even Numbers: ${evenNumbers}`);
const maxNumber = findMax([23, 56, 12, 89, 43]);
const isPalindromeResult = isPalindrome("A man, a plan, a canal, Panama");
const factorialResult = calculateFactorial(5);
console.log(`Max Number: ${maxNumber}`);
console.log(`Is Palindrome: ${isPalindromeResult}`);
console.log(`Factorial: ${factorialResult}`);
// 2
class BankAccount {
    accountNumber;
    balance;
    transactionHistory;
    constructor(accountNumber, initialBalance) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
        this.transactionHistory = [];
        this.recordTransaction(`Created successfuly`);
    }
    getAccountInfo() {
        return `Account Number: ${this.accountNumber} Balance: ${this.balance}`;
    }
    deposit(amount) {
        this.balance += amount;
        this.recordTransaction(`Deposited ${amount} balance: ${this.balance}`);
    }
    withdraw(amount) {
        if (amount > this.balance) {
            this.recordTransaction(`Do not have enough balance`);
            return;
        }
        this.balance -= amount;
        this.recordTransaction(`Withdrew ${amount} balance: ${this.balance}`);
    }
    transferFunds(amount, recipient) {
        if (amount > this.balance) {
            this.recordTransaction(`Do not have enough balance`);
            return;
        }
        this.balance -= amount;
        recipient.balance += amount;
        this.recordTransaction(`transferred ${amount} to account ${recipient.accountNumber}`);
        recipient.recordTransaction(`received ${amount} from account ${this.accountNumber}`);
    }
    getTransactionHistory() {
        return this.transactionHistory;
    }
    recordTransaction(description) {
        this.transactionHistory.push(description);
    }
}
const acc1 = new BankAccount("222", 1000);
const acc2 = new BankAccount("888", 500);
acc1.deposit(200);
acc1.withdraw(100);
acc1.transferFunds(300, acc2);
acc2.deposit(50);
acc2.withdraw(30);
// Print histories
console.log("Account 1:", acc1.getTransactionHistory());
console.log("Account 2:", acc2.getTransactionHistory());
//# sourceMappingURL=index.js.map