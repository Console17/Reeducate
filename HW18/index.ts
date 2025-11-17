type Rectangle = {
  width: number;
  height: number;
};

type Circle = {
  radius: number;
};

function calculateRectangleArea(rectangle: Rectangle): number {
  return rectangle.width * rectangle.height;
}

function calculateRectanglePerimeter(rectangle: Rectangle): number {
  return 2 * (rectangle.width + rectangle.height);
}

function calculateCircleArea(circle: Circle): number {
  return Math.PI * Math.pow(circle.radius, 2);
}

function calculateCirclePerimeter(circle: Circle): number {
  return 2 * Math.PI * circle.radius;
}

// Independent Functions

function addNumbers(a: number, b: number): number {
  return a + b;
}

function multiplyNumbers(a: number, b: number): number {
  return a * b;
}

function capitalizeString(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function filterEvenNumbers(numbers: number[]): number[] {
  return numbers.filter((num) => num % 2 === 0);
}

function findMax(numbers: number[]): number {
  return Math.max(...numbers);
}

function isPalindrome(str: string): boolean {
  const cleanStr = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
  const reversedStr = cleanStr.split("").reverse().join("");
  return cleanStr === reversedStr;
}

function calculateFactorial(n: number): number {
  if (n === 0 || n === 1) {
    return 1;
  } else {
    return n * calculateFactorial(n - 1);
  }
}

// Test Cases

// it is desired to create rectangle and circle classes and add methods
const rectangle: Rectangle = { width: 5, height: 8 };
const circle: Circle = { radius: 3 };

const rectangleArea = calculateRectangleArea(rectangle);
const rectanglePerimeter = calculateRectanglePerimeter(rectangle);

const circleArea = calculateCircleArea(circle);
const circlePerimeter = calculateCirclePerimeter(circle);

console.log(
  `Rectangle Area: ${rectangleArea}, Perimeter: ${rectanglePerimeter}`
);
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
  private accountNumber: string;
  private balance: number;
  private transactionHistory: string[];

  constructor(accountNumber: string, initialBalance: number) {
    this.accountNumber = accountNumber;
    this.balance = initialBalance;
    this.transactionHistory = [];
    this.recordTransaction(`Created successfuly`);
  }

  getAccountInfo(): string {
    return `Account Number: ${this.accountNumber} Balance: ${this.balance}`;
  }

  deposit(amount: number): void {
    this.balance += amount;
    this.recordTransaction(`Deposited ${amount} balance: ${this.balance}`);
  }

  withdraw(amount: number): void {
    if (amount > this.balance) {
      this.recordTransaction(`Do not have enough balance`);
      return;
    }
    this.balance -= amount;
    this.recordTransaction(`Withdrew ${amount} balance: ${this.balance}`);
  }

  transferFunds(amount: number, recipient: BankAccount): void {
    if (amount > this.balance) {
      this.recordTransaction(`Do not have enough balance`);
      return;
    }

    this.balance -= amount;
    recipient.balance += amount;

    this.recordTransaction(
      `transferred ${amount} to account ${recipient.accountNumber}`
    );
    recipient.recordTransaction(
      `received ${amount} from account ${this.accountNumber}`
    );
  }

  getTransactionHistory(): string[] {
    return this.transactionHistory;
  }

  private recordTransaction(description: string): void {
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
