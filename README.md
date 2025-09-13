Expense Tracker
Sample solution for the expense-tracker challenge from roadmap.sh.

This is a simple command-line interface (CLI) application for managing expenses.

project url: https://roadmap.sh/projects/expense-tracker

Features
Add new expense with a unique ID and store it in JSON format.
List expense 
Update the description or amount of an existing expense.
Delete expense by their ID.
export expenses to CSV file

Prerequisites

Node.js installed on your system.
Installation
Clone the Repository

git clone --depth=1 https://github.com/Ahmad-Bra/expense-tracker

# Navigate to the project Directory

Usage
Add an expense
node main.js add desctiption amount
example: node index.js add 'food' 20$
List all expense
node main.js list

# To update an expense
node main.js update id description amount 

# To delete an expense
node main.js delete id 

# To list summary  
node main.js summay

#  list summary by month
node main.js summary 8

# To export expenses to CSV file
node main.js export 

# To search for an expense 
node main.js search text 

