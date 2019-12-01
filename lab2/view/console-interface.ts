import readlineSync from 'readline-sync'

export class ConsoleInterface {
    public init() {
        this.printMainMenu();
        let currentMenuItem = parseInt(readlineSync.question('Enter your input: '));

        while (currentMenuItem !== 5) {

            switch(currentMenuItem) {
                case 0: {

                }
                currentMenuItem = 3;
            }
        }
    }

    private printMainMenu() {
        console.log("Chose an entity to work with:")
        console.log("1.Animal")
        console.log("2.Doctor")
        console.log("3.Client")
        console.log("4.Clinic")
        console.log("5.Exit")
    }
}