const {Animal, Client, Doctor, Clinic}  = require('../db/models');
const {View} = require('../view/view');
const {Op} = require('sequelize');

class Controller {

    async init() {
        let currentMenuItem = -1;

        while (currentMenuItem !== 0) {
            View.printMainMenu();
            currentMenuItem = View.readInteger("Enter your choice: ");

            switch (currentMenuItem) {
                case 1: {
                    await this.getAllEntities();
                    break;
                }
                case 2: {
                    await this.getEntityById();
                    break;
                }
                case 3: {
                    await this.createEntity();
                    break;
                }
                case 4: {
                    await this.updateEntity();
                    break;
                }
                case 5: {
                    await this.deleteEntity();
                    break;
                }
                case 6: {
                    await this.generateRandomEntity();
                    break;
                }
            }
        }
    }

    async getAllEntities() {
        try {
            View.printOptionsMenu();
            const option = View.readInteger("Enter your choice: ");

            switch (option) {
                case 1: {
                    View.printEntities((await Animal.findAll()).map(entity => entity.toJSON()));
                    break;
                }
                case 2: {
                    View.printEntities((await Client.findAll()).map(entity => entity.toJSON()));
                    break;
                }
                case 3: {
                    View.printEntities((await Clinic.findAll()).map(entity => entity.toJSON()));
                    break;
                }
                case 4: {
                    View.printEntities((await Doctor.findAll()).map(entity => entity.toJSON()));
                    break;
                }
                default: {
                    View.printLine("Wrong choice");
                }
            }
        } catch (error) {
            View.printLine(`Error: ${error.message}`);
        }

        View.pressToReturn();
    }

    async getEntityById() {
        try {
            View.printOptionsMenu();
            const option = View.readInteger("Enter your choice: ");
            const id = View.readInteger("Enter id of the entity: ");

            switch (option) {
                case 1: {
                    View.printEntities((await Animal.findOne({where: {id}})).toJSON());
                    break;
                }
                case 2: {
                    View.printEntities((await Client.findOne({where: {id}})).toJSON());
                    break;
                }
                case 3: {
                    View.printEntities((await Clinic.findOne({where: {id}})).toJSON());
                    break;
                }
                case 4: {
                    View.printEntities((await Doctor.findOne({where: {id}})).toJSON());
                    break;
                }
                default: {
                    View.printLine("Wrong choice");
                }
            }
        } catch (error) {
            View.printLine(`Error: ${error.message}`);
        }

        View.pressToReturn();
    }

    async createEntity() {
        try {
            View.printOptionsMenu();
            const option = View.readInteger("Enter your choice: ");

            switch (option) {
                case 1: {
                    const birthdate = View.readDate('Enter date of birth of the animal in format YYYY-MM-DD: ');
                    const name = View.readString('Enter name of the animal: ');
                    const animalPassportId = View.readString('Enter passportId of the animal: ');
                    const clientId = View.readInteger('Enter id of the owner: ');
                    View.printEntities((await Animal.create({birthdate, name, animalPassportId, clientId})).toJSON());
                    break;
                }
                case 2: {
                    const hasDiscount = View.readBoolean('Enter if client has discount (true/false): ');
                    const clinicId = View.readInteger('Enter clinic id of the client: ');
                    const name = View.readString('Enter name of the client: ');
                    const surname = View.readString('Enter surname of the client: ');
                    View.printEntities((await Client.create({hasDiscount, clinicId, name, surname})).toJSON());
                    break;
                }
                case 3: {
                    const city = View.readString('Enter the city of the clinic: ');
                    const house = View.readString('Enter the house of the clinic: ');
                    const street = View.readString('Enter street of the clinic: ');
                    const aviariesQuantity = View.readInteger('Enter number of avaries in the clinic: ');
                    View.printEntities((await Clinic.create({city, house, street, aviariesQuantity})).toJSON());
                    break;
                }
                case 4: {
                    const name = View.readString('Enter the name of the doctor: ');
                    const surname = View.readString('Enter the surname of the doctor: ');
                    const speciality = View.readString('Enter the speciality of the doctor: ');
                    const qualification = View.readString('Enter the speciality of the doctor: ');
                    const clinicId = View.readInteger('Enter id of the clinic associated with doctor: ');
                    View.printEntities((await Doctor.create({name, surname, speciality, qualification, clinicId})).toJSON());
                    break;
                }
                default: {
                    View.printLine("Wrong choice");
                }
            }
        } catch (error) {
            View.printLine(`Error: ${error.message}`);
        }

        View.pressToReturn();
    }

    async updateEntity() {
        try {
            View.printOptionsMenu();
            const option = View.readInteger("Enter your choice: ");
            const id = View.readInteger("Enter id of the entity: ");

            switch (option) {
                case 1: {
                    const birthdate = View.readDate('Enter date of birth of the animal in format YYYY-MM-DD: ');
                    const name = View.readString('Enter name of the animal: ');
                    const animalPassportId = View.readString('Enter passportId of the animal: ');
                    const clientId = View.readInteger('Enter id of the owner: ');
                    View.printEntities((await Animal.update({
                        birthdate,
                        name,
                        animalPassportId,
                        clientId
                    }, {where: {id}})).toJSON());
                    break;
                }
                case 2: {
                    const hasDiscount = View.readBoolean('Enter if client has discount (true/false): ');
                    const clinicId = View.readInteger('Enter clinic id of the client: ');
                    const name = View.readString('Enter name of the client: ');
                    const surname = View.readString('Enter surname of the client: ');
                    View.printEntities((await Client.update({
                        hasDiscount,
                        clinicId,
                        name,
                        surname
                    }, {where: {id}})).toJSON());
                    break;
                }
                case 3: {
                    const city = View.readString('Enter the city of the clinic: ');
                    const house = View.readString('Enter the house of the clinic: ');
                    const street = View.readString('Enter street of the clinic: ');
                    const aviariesQuantity = View.readInteger('Enter number of avaries in the clinic: ');
                    View.printEntities((await Clinic.update({
                        city,
                        house,
                        street,
                        aviariesQuantity
                    }, {where: {id}})).toJSON());
                    break;
                }
                case 4: {
                    const name = View.readString('Enter the name of the doctor: ');
                    const surname = View.readString('Enter the surname of the doctor: ');
                    const speciality = View.readString('Enter the speciality of the doctor: ');
                    const qualification = View.readString('Enter the speciality of the doctor: ');
                    const clinicId = View.readInteger('Enter id of the clinic associated with doctor: ');
                    View.printEntities((await Doctor.update({
                        name,
                        surname,
                        speciality,
                        qualification,
                        clinicId
                    }, {where: {id}})).toJSON());
                    break;
                }
                default: {
                    View.printLine("Wrong choice");
                }
            }
        } catch (error) {
            View.printLine(`Error: ${error.message}`);
        }

        View.pressToReturn();
    }

    async deleteEntity() {
        try {
            View.printOptionsMenu();
            const option = View.readInteger("Enter your choice: ");
            const id = View.readInteger("Enter id of the entity: ");

            switch (option) {
                case 1: {
                    await Animal.destroy({where: {id}});
                    View.printLine("Success");
                    break;
                }
                case 2: {
                    await Client.destroy({where: {id}});
                    View.printLine("Success");
                    break;
                }
                case 3: {
                    await Clinic.destroy({where: {id}});
                    View.printLine("Success");
                    break;
                }
                case 4: {
                    await Doctor.destroy({where: {id}});
                    View.printLine("Success");
                    break;
                }
                default: {
                    View.printLine("Wrong choice");
                }
            }
        } catch (error) {
            View.printLine(`Error: ${error.message}`);
        }

        View.pressToReturn();

    }

    delay(ms) {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, ms);
        });
    }

    async generateRandomEntity() {
        try {
            View.printOptionsMenu();
            const option = View.readInteger("Enter your choice: ");

            switch (option) {
                case 1: {
                    for(let i = 0; i < 10000; i++) {
                        const birthdate = new Date();
                        const name = this.generateRandomString(10);
                        const animalPassportId = this.generateRandomString(8);
                        const clientId = null;
                        View.printEntities((await Animal.create({birthdate, name, animalPassportId, clientId})).toJSON());
                    }
                    break;
                }
                case 2: {
                    for(let i = 0; i < 10000; i++) {
                        const hasDiscount = this.generateRandomBoolean();
                        const clinicId = null;
                        const name = this.generateRandomString(10);
                        const surname = this.generateRandomString(10);
                        View.printEntities((await Client.create({hasDiscount, clinicId, name, surname})).toJSON());
                    }
                    break;
                }
                case 3: {
                    for(let i = 0; i < 10000; i++) {
                        const city = this.generateRandomString(10);
                        const house = this.generateRandomString(10);
                        const street = this.generateRandomString(10);
                        const aviariesQuantity = i;
                        View.printEntities((await Clinic.create({city, house, street, aviariesQuantity})).toJSON());
                    }
                    break;
                }
                case 4: {
                    for(let i = 0; i < 10000; i++) {
                        const name = this.generateRandomString(10);
                        const surname = this.generateRandomString(10);
                        const speciality = this.generateRandomString(10);
                        const qualification = this.generateRandomString(10);
                        const clinicId = null;
                        View.printEntities((await Doctor.create({name, surname, speciality, qualification, clinicId})).toJSON());
                    }
                    break;
                }
                default: {
                    View.printLine("Wrong choice");
                }
            }
        } catch (error) {
            View.printLine(`Error: ${error.message}`);
        }

        View.pressToReturn();
    }

    generateRandomInteger(maxValue) {
        return Math.floor(Math.random() * maxValue);
    }

    generateRandomString(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    generateRandomDate(startDate, endDate) {
        return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    }

    generateRandomBoolean() {
        return Math.round(Math.random());
    }

}

module.exports = { Controller };
