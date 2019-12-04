import { View } from "@app/view/view";
import { Animal } from "@models/animal";
import { Client } from "@models/client";
import { Clinic } from "@models/clinic";
import { Doctor } from "@models/doctor";
import { AnimalDoctor, AnimalDoctorFieldName } from "@models/animal-doctor";

export class Controller {

    public async init(): Promise<void> {
        let currentMenuItem = -1;

        while (currentMenuItem !== 0) {
            View.printMainMenu();
            currentMenuItem = View.readInteger("Enter your choice: ");

            switch(currentMenuItem) {
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
                    await this.parametrizedSearch();
                    break;
                }
                case 7: {
                    await this.performFullTextSearch();
                    break;
                }
                case 8: {
                    await this.generateRandomEntity();
                    break;
                }
                case 9: {
                    await this.workWithManyToManyConnection();
                    break;
                }
            }
        }
    }

    private async getAllEntities(): Promise<void> {
        try {
            View.printOptionsMenu();
            const option = View.readInteger("Enter your choice: ");

            switch(option) {
                case 1: {
                    View.printEntities(await Animal.getAll());
                    break;
                }
                case 2: {
                    View.printEntities(await Client.getAll());
                    break;
                }
                case 3: {
                    View.printEntities(await Clinic.getAll());
                    break;
                }
                case 4: {
                    View.printEntities(await Doctor.getAll());
                    break;
                }
                default: {
                    View.printLine("Wrong choice");
                }
            }
        }
        catch(error) {
            View.printLine(`Error: ${error.message}`);
        }
        
        View.pressToReturn();
    }

    private async getEntityById(): Promise<void> {
        try {
            View.printOptionsMenu();
            const option = View.readInteger("Enter your choice: ");
            const id = View.readInteger("Enter id of the entity: ");

            switch(option) {
                case 1: {
                    View.printEntities([await Animal.getById(id)]);
                    break;
                }
                case 2: {
                    View.printEntities([await Client.getById(id)]);
                    break;
                }
                case 3: {
                    View.printEntities([await Clinic.getById(id)]);
                    break;
                }
                case 4: {
                    View.printEntities([await Doctor.getById(id)]);
                    break;
                }
                default: {
                    View.printLine("Wrong choice");
                }
            }
        }
        catch(error) {
            View.printLine(`Error: ${error.message}`);
        }
        
        View.pressToReturn();
    }

    private async createEntity(): Promise<void> {
        try {
            View.printOptionsMenu();
            const option = View.readInteger("Enter your choice: ");

            switch(option) {
                case 1: {
                    const birthdate = View.readDate('Enter date of birth of the animal in format YYYY-MM-DD: ');
                    const name = View.readString('Enter name of the animal: ');
                    const animalPassportId = View.readString('Enter passportId of the animal: ');
                    const clientId = View.readInteger('Enter id of the owner: ');
                    View.printEntities([await Animal.create(birthdate, name, animalPassportId, clientId)]);
                    break;
                }
                case 2: {
                    const hasDiscount = View.readBoolean('Enter if client has discount (true/false): ');
                    const clinicId = View.readInteger('Enter clinic id of the client: ');
                    const name = View.readString('Enter name of the client: ');
                    const surname = View.readString('Enter surname of the client: ');
                    View.printEntities([await Client.create(hasDiscount, clinicId, name, surname)]);
                    break;
                }
                case 3: {
                    const city = View.readString('Enter the city of the clinic: ');
                    const house = View.readString('Enter the house of the clinic: ');
                    const street = View.readString('Enter street of the clinic: ');
                    const aviariesQuantity = View.readInteger('Enter number of avaries in the clinic: ');
                    View.printEntities([await Clinic.create(city, house, street, aviariesQuantity)]);
                    break;
                }
                case 4: {
                    const name = View.readString('Enter the name of the doctor: ');
                    const surname = View.readString('Enter the surname of the doctor: ');
                    const speciality = View.readString('Enter the speciality of the doctor: ');
                    const qualification = View.readString('Enter the speciality of the doctor: ');
                    const clinicId = View.readInteger('Enter id of the clinic associated with doctor: ');
                    View.printEntities([await Doctor.create(name, surname, speciality, qualification, clinicId)]);
                    break;
                }
                default: {
                    View.printLine("Wrong choice");
                }
            }
        }
        catch(error) {
            View.printLine(`Error: ${error.message}`);
        }
        
        View.pressToReturn();
    }

    private async updateEntity(): Promise<void> {
        try {
            View.printOptionsMenu();
            const option = View.readInteger("Enter your choice: ");
            const id = View.readInteger("Enter id of the entity: ");

            switch(option) {
                case 1: {
                    const birthdate = View.readDate('Enter date of birth of the animal in format YYYY-MM-DD: ');
                    const name = View.readString('Enter name of the animal: ');
                    const animalPassportId = View.readString('Enter passportId of the animal: ');
                    const clientId = View.readInteger('Enter id of the owner: ');
                    View.printEntities([await Animal.update({id, birthdate, name, animalPassportId, clientId})]);
                    break;
                }
                case 2: {
                    const hasDiscount = View.readBoolean('Enter if client has discount (true/false): ');
                    const clinicId = View.readInteger('Enter clinic id of the client: ');
                    const name = View.readString('Enter name of the client: ');
                    const surname = View.readString('Enter surname of the client: ');
                    View.printEntities([await Client.update({id, hasDiscount, clinicId, name, surname})]);
                    break;
                }
                case 3: {
                    const city = View.readString('Enter the city of the clinic: ');
                    const house = View.readString('Enter the house of the clinic: ');
                    const street = View.readString('Enter street of the clinic: ');
                    const aviariesQuantity = View.readInteger('Enter number of avaries in the clinic: ');
                    View.printEntities([await Clinic.update({id, city, house, street, aviariesQuantity})]);
                    break;
                }
                case 4: {
                    const name = View.readString('Enter the name of the doctor: ');
                    const surname = View.readString('Enter the surname of the doctor: ');
                    const speciality = View.readString('Enter the speciality of the doctor: ');
                    const qualification = View.readString('Enter the speciality of the doctor: ');
                    const clinicId = View.readInteger('Enter id of the clinic associated with doctor: ');
                    View.printEntities([await Doctor.update({id, name, surname, speciality, qualification, clinicId})]);
                    break;
                }
                default: {
                    View.printLine("Wrong choice");
                }
            }
        }
        catch(error) {
            View.printLine(`Error: ${error.message}`);
        }
        
        View.pressToReturn();
    }

    private async deleteEntity(): Promise<void> {
        try {
            View.printOptionsMenu();
            const option = View.readInteger("Enter your choice: ");
            const id = View.readInteger("Enter id of the entity: ");

            switch(option) {
                case 1: {
                    View.printEntities([await Animal.delete(id)]);
                    break;
                }
                case 2: {
                    View.printEntities([await Client.delete(id)]);
                    break;
                }
                case 3: {
                    View.printEntities([await Clinic.delete(id)]);
                    break;
                }
                case 4: {
                    View.printEntities([await Doctor.delete(id)]);
                    break;
                }
                default: {
                    View.printLine("Wrong choice");
                }
            }
        }
        catch(error) {
            View.printLine(`Error: ${error.message}`);
        }
        
        View.pressToReturn();
    }

    private async performFullTextSearch(): Promise<void> {
        try{
            const text = View.readString("Enter information about a doctor to search for it: ");
            View.printEntities(await Doctor.fullTextSearch(text));
        } catch(error) {
            View.printLine(`Error: ${error.message}`);
        }
        View.pressToReturn();
    }

    private async parametrizedSearch(): Promise<void> {
        try{
            const speciality = View.readString("Enter speciality of doctors you wish to look for: ");
            const minAviaries = View.readInteger("Enter min number of aviaries in clinic this doctor works in: ");
            const maxAviaries = View.readInteger("Enter max number of aviaries in clinic this doctor works in: ");
            View.printEntities(await Doctor.parameterizedSearch(speciality, minAviaries, maxAviaries));
        } catch(error) {
            View.printLine(`Error: ${error.message}`);
        }
        View.pressToReturn();
    }

    private async generateRandomEntity(): Promise<void> {
        try {
            View.printOptionsMenu();
            const option = View.readInteger("Enter your choice: ");

            switch(option) {
                case 1: {
                    const birthdate = this.generateRandomDate(new Date("2010-08-12"), new Date());
                    const name = this.generateRandomString(10);
                    const animalPassportId = this.generateRandomString(8);
                    const clientId: number = null;
                    View.printEntities([await Animal.create(birthdate, name, animalPassportId, clientId)]);
                    break;
                }
                case 2: {
                    const hasDiscount = this.generateRandomBoolean();
                    const clinicId: number = null;
                    const name = this.generateRandomString(10);
                    const surname = this.generateRandomString(10);
                    View.printEntities([await Client.create(hasDiscount, clinicId, name, surname)]);
                    break;
                }
                case 3: {
                    const city = this.generateRandomString(10);
                    const house = this.generateRandomString(10);
                    const street = this.generateRandomString(10);
                    const aviariesQuantity = this.generateRandomInteger(1000);
                    View.printEntities([await Clinic.create(city, house, street, aviariesQuantity)]);
                    break;
                }
                case 4: {
                    const name = this.generateRandomString(10);
                    const surname = this.generateRandomString(10);
                    const speciality = this.generateRandomString(10);
                    const qualification = this.generateRandomString(10);
                    const clinicId: number = null;
                    View.printEntities([await Doctor.create(name, surname, speciality, qualification, clinicId)]);
                    break;
                }
                default: {
                    View.printLine("Wrong choice");
                }
            }
        }
        catch(error) {
            View.printLine(`Error: ${error.message}`);
        }
        
        View.pressToReturn();
    }

    private async workWithManyToManyConnection(): Promise<void> {
        try {
            View.printManyToManyMenu();
            const option = View.readInteger("Enter your choice: ");

            switch(option) {
                case 1: {
                    View.printEntities(await AnimalDoctor.getAll());
                    break;
                }
                case 2: {
                    const doctorId = View.readInteger("Enter doctor id: ");
                    View.printEntities(await AnimalDoctor.getById(doctorId, AnimalDoctorFieldName.DoctorId));
                    break;
                }
                case 3: {
                    const animalId = View.readInteger("Enter animal id: ");
                    View.printEntities(await AnimalDoctor.getById(animalId, AnimalDoctorFieldName.AnimalId));
                    break;
                }
                case 4: {
                    const animalId = View.readInteger("Enter animal id: ");
                    const doctorId = View.readInteger("Enter doctor id: ");
                    View.printEntities([await AnimalDoctor.create(animalId, doctorId)]);
                    break;
                }
                default: {
                    View.printLine("Wrong choice");
                }
            }
        }
        catch(error) {
            View.printLine(`Error: ${error.message}`);
        }
        
        View.pressToReturn();
    }

    private generateRandomInteger(maxValue: number): number {
        return Math.floor(Math.random() * maxValue);
    }

    private generateRandomString(length: number): string {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    private generateRandomDate(startDate: Date, endDate: Date): Date {
        return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    }

    private generateRandomBoolean(): boolean {
        return Math.round(Math.random()) as unknown as boolean;
    }

}