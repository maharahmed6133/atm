import { input, password, select, confirm } from "@inquirer/prompts";
import chalk from "chalk";
async function start() {
    while (true) {
        let mybalance = 11000; //DOllERS
        console.log(chalk.green(`your current balance is:${mybalance}`));
        let mypin = 9955;
        let pin = await password({ message: chalk.blue("Please enter your pin") });
        let pinNumber = parseInt(pin, 10);
        if (pinNumber === mypin) {
            console.log(chalk.green("correct pin"));
            let data = await select({
                message: chalk.blue("what do you want to do?"),
                choices: [
                    { name: "withdraw", value: "withdraw" },
                    { name: "check_balance", value: "check balance" }
                ]
            });
            if (data === "withdraw") {
                let withdrawAmount = await input({
                    message: chalk.blue("Enter the amount you want to withdraw:"),
                    validate: (input) => {
                        let amount = parseInt(input, 10);
                        if (isNaN(amount) || amount <= 0) {
                            return "Please enter a valid positive number";
                        }
                        else if (amount > mybalance) {
                            return "Insufficient balance";
                        }
                        return true;
                    }
                });
                let amount = parseInt(withdrawAmount, 10);
                mybalance -= amount;
                console.log(chalk.green(`You have sucessfully withdraw ${withdrawAmount} Dollers`));
                console.log(chalk.green(`Your remaining balance is ${mybalance}`));
            }
            else if (data = "check_balance") {
                console.log(chalk.green(`Your current balance is ${mybalance}`));
            }
        }
        else {
            console.log(chalk.red('Enter the correct pin'));
        }
        let restart = await confirm({ message: chalk.blue("do you want to do another transection?") });
        if (!restart) {
            console.log(chalk.green("Goodbye!"));
            break;
        }
    }
}
start();
