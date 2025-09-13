const path = require("path");
const fs = require("fs");

const expFilePath = path.join(__dirname, "exp.json");

const args = process.argv.slice(2);
const command = args[0];

function loadExpenses() {
  try {
    const dataBuffer = fs.readFileSync(expFilePath);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
}

if (command === "list") {
  const expenses = loadExpenses();
  expenses.forEach((expense) => {
    console.log(
      `ID: ${expense.id}, Description: ${expense.description}, Amount: ${expense.amount}, Date: ${expense.date}`
    );
  });
} else if (command === "add") {
  const description = args[1];
  const amount = args[2];
  const expenses = loadExpenses();
  expenses.push({
    id: expenses.length + 1,
    description,
    amount,
    date: new Date().toISOString(),
  });
  fs.writeFileSync(expFilePath, JSON.stringify(expenses));
  console.log(
    "Expense added: ID:",
    expenses.length,
    "Description:",
    description,
    "Amount:",
    amount
  );
} else if (command === "delete") {
  const id = parseInt(args[1]);
  let expenses = loadExpenses();
  if (!isNaN(id) && id > 0 && id <= expenses.length) {
    expenses.splice(id, 1);
    console.log(`expense deleted successfully`);
  } else {
    console.log(`invalid expense id, Or empty list`);
  }
} else if (command === "update") {
  let expenses = loadExpenses();
  const id = parseInt(args[1]);
  if (!isNaN(id) && id > 0 && id <= expenses.length) {
    const description = args[2];
    const amount = args[3];

    expenses = expenses.map((exp) => {
      if (exp.id == id) {
        return {
          ...exp,
          description:
            description !== undefined ? description : exp.description,
          amount: amount !== undefined ? amount : exp.amount,
        };
      }
      return exp;
    });

    fs.writeFileSync(expFilePath, JSON.stringify(expenses));

    console.log(`expense updated successfully`);
  } else {
    console.log(`invalid expense id, Or empty list`);
  }
} else if (command === "summary") {
  const expenses = loadExpenses();
  let summary = 0;
  expenses.forEach((exp) => {
    if (!args[1]) {
      summary += parseInt(exp.amount);
    } else if (!isNaN(args[1])) {
      const month = args[1].length == 1 ? `0${args[1]}` : args[1];

      if (exp.date.split("T")[0].split("-")[1] == month) {
        summary += parseInt(exp.amount);
      }
    }
  });
  console.log(`summary expenses: ${summary}$`);
} else if (command === "export") {
  const expenses = loadExpenses();
  const csvFilePath = path.join(__dirname, "expenses.csv");
  const header = "ID,Description,Amount,Date\n";
  const rows = expenses
    .map(
      (exp) =>
        `${exp.id},"${exp.description.replace(/"/g, '""')}",${exp.amount},${
          exp.date
        }`
    )
    .join("\n");
  fs.writeFileSync(csvFilePath, header + rows);
  console.log(`Expenses exported to ${csvFilePath}`);
}
