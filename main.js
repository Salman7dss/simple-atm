#! /usr/bin/env node
import inquirer from "inquirer";
// Shuruaati balance aur PIN
let myBalance = 10000;
let myPin = 1234;
const main = async () => {
    // PIN ka input lena
    let pinanswer = await inquirer.prompt([
        {
            name: "pin",
            message: "Enter your PIN:",
            type: "number",
        },
    ]);
    // Agar PIN sahi hai
    if (pinanswer.pin === myPin) {
        console.log("Correct PIN!");
        // Operation select karna
        let operationAns = await inquirer.prompt([
            {
                name: "operation",
                message: "Please select an operation:",
                type: "list",
                choices: ["Withdraw", "Check Balance"],
            },
        ]);
        // Balance check karna
        if (operationAns.operation === "Check Balance") {
            console.log("Your balance is: $" + myBalance);
        }
        // Paisa nikalna
        if (operationAns.operation === "Withdraw") {
            let amountOptions = [500, 1000, 2000, 5000, 10000, "Enter custom amount"];
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    message: "Select the amount to withdraw:",
                    type: "list",
                    choices: amountOptions,
                },
            ]);
            // Agar custom amount select kiya gaya hai
            if (amountAns.amount === "Enter custom amount") {
                let customAmount = await inquirer.prompt([
                    {
                        name: "customAmount",
                        message: "Enter the custom amount to withdraw:",
                        type: "number",
                        validate: function (input) {
                            // Shart lagana ke custom amount myBalance se zyada nahi hona chahiye
                            if (input > myBalance) {
                                return "Insufficient funds!";
                            }
                            return true;
                        },
                    },
                ]);
                myBalance -= customAmount.customAmount;
            }
            else {
                myBalance -= amountAns.amount;
            }
            console.log("Your remaining balance is: $" + myBalance);
        }
    }
    else {
        console.log("Incorrect PIN number");
    }
};
// Main function call
main();
