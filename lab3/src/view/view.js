const readlineSync = require('readline-sync');

class View {

    static printMainMenu() {
        console.log("Main menu. Choose your options: ");
        console.log("1.Read list of entities");
        console.log("2.Read entity by ID");
        console.log("3.Create entity");
        console.log("4.Update entity");
        console.log("5.Delete entity");
        console.log("6.Generate random data");
        console.log("0.Exit");
    }

    static printOptionsMenu() {
        console.log("Choose an entity:");
        console.log("1.Animal");
        console.log("2.Client");
        console.log("3.Clinic");
        console.log("4.Doctor");
    }

    static readInteger(text) {        
        return parseInt(readlineSync.question(text));
    }

    static readFloat(text) {
        return parseFloat(readlineSync.question(text));
    }

    static readString(text) {
        return readlineSync.question(text);
    }

    static readDate(text) {
        return new Date(readlineSync.question(text));
    }

    static readBoolean(text) {
        return readlineSync.question(text) === "true" ? true : false;
    }

    static printEntities(entities) {
        console.table(entities);
    }

    static printLine(text) {
        console.log(text);
    }

    static pressToReturn() {
        readlineSync.question("Press any key to return: ");
        return;
    }

}

module.exports = { View };
