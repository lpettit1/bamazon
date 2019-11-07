//setup variables
var Table = require('cli-table');
var mysql = require('mysql');
var inquirer = require('inquirer');

//connect sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    startPrompt();
});

//inquirer introduction
function startPrompt() {
    inquirer.prompt([{

        type: "confirm",
        name: "confirm",
        message: "Welcome to Bamazon! Would you like to view our products"

    }]).then(function (user) {
        if (user.confirm === true) {
            inventory();
        } else {
            console.log("Thank you! Come back soon!");
        }
    });
}

//inventory
function inventory() {

    var table = new Table({
        head: ['ID', 'Item', 'Department', 'Price', 'Stock'],
        colWidths: [10, 30, 30, 30, 30]
    });

    listInventory();

    //table array
    function listInventory() {
        connection.query("SELECT * FROM products", function (err, res) {
            for (var i = 0; i < res.length; i++) {
                var itemId = res[i].item_id,
                    productName = res[i].product_name,
                    departmentName = res[i].department_name,
                    price = res[i].price,
                    stockQuantity = res[i].stock_quantity;

                table.push(
                    [itemId, productName, departmentName, price, stockQuantity]
                );
            }
            console.log("");
            console.log("================Current Inventory===============");
            console.log("");
            console.log(table.toString());
            console.log("");
            continuePrompt();
        });
    }
}

// purchase
function continuePrompt() {

    inquirer.prompt([{

        type: "confirm",
        name: "continue",
        message: "Items to Purchase",
        default: true
    }]).then(function (user) {
        if (user.continue === true) {
            selectionPrompt();
        } else {
            console.log("Thank you! Come Again");
        }
    });
}

//item and quantity desired
function selectionPrompt() {

    inquirer.prompt([{

        type: "input",
        name: "inputId",
        message: "Please enter th ID number of the item you would like to purchase.",
    },
    {
        type: "input",
        name: "inputNumber",
        message: "How many units of this item would you like to purchase?",
    }
    ]).then(function (userPurchase) {

        //database connect to stock
        connection.query("SELECT * FROM production WHERE item_id=?", userPurchase.inputIds, function (err, res) {
            for (var i = 0; i < res.length; i++) {
                if (userPurchase.inputNumber > res[i].stock_quantity) {

                    console.log("=======================================");
                    console.log("Sorry! Not enough in stock. Please try again later.");
                    console.log("=======================================");
                    startPrompt();
                } else {

                    console.log("=========================================");
                    console.log("Awesome! your order is fulfilled");
                    console.log("=========================================");
                    console.log("Item Selected");
                    console.log("------------------");
                    console.log("Item: " + res[i].product_name);
                    console.log("Department: " + res[i].department_name);
                    console.log("Price " + res[i].price);
                    console.log("Quantity: " + userPurchase.inputNumber);
                    console.log("-------------------");
                    console.log("Total: " + res[i].price * userPurchase.inputNumber);
                    console.log("===========================================");

                    var newStock = (res[i].stock_quantity - userPurchase.inputNumber);
                    var purchaseId = (userPurchase.inputId);
                    confirmPrompt(newStock, purchaseId);
                }
            }
        });
    });
}

//confirm purchase
function confirmPrompt(newStock, purchaseId) {

    inquirer.prompt([{

        type: "confirm",
        name: "confirmPurchase",
        message: "Confirm  your Purchase",
        default: true
    }]).then(function (userConfirm) {

        if (userConfirm.confirmPurchase === true) {
            connection.query("UPDATE products SET ? WHERE ?", [{

                stock_quantity: newStock

            }, {

                item_id: purchaseId
            }], function (err, res) { });

            console.log("=================================");
            console.log("Transaction completed. Thank you.");
            console.log("=================================");
            startPrompt();

        } else {

            console.log("=================================");
            console.log("No worries. Maybe next time!");
            console.log("=================================");
            startPrompt();
        }
    });
}