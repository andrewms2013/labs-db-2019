import { DataSource } from "@app/data-source/data-source";

export class Animal {

    constructor(
        public id: number,
        public birthdate: Date,
        public name: String,
        public animalPassportId: String,
        public clientId: number,
    ) {}

    public static async getById(entityId: number): Promise<Animal> {
        const query = 'SELECT * FROM public."Animal" WHERE public."Animal".id = $1';
        const { rows } = await DataSource.getPool().query(query, [entityId]);
        if (!rows.length) {
            throw Error('No entity with such id found');
        }
        const { id, birthdate, name, animal_passport_id, client_id } = rows[0];
        return new Animal(id, birthdate, name, animal_passport_id, client_id);
    }

    public static async getAll(): Promise<Animal[]> {
        const query = 'SELECT * FROM public."Animal"';
        const { rows } = await DataSource.getPool().query(query);
        return rows.map((row) => {
            const { id, birthdate, name, animal_passport_id, client_id } = row;
            return new Animal(id, birthdate, name, animal_passport_id, client_id);
        });
    } 

    public static async create(birthdate: Date, name: String, animalPassportId: String, clientId: number): Promise<Animal> {
        const query = `INSERT INTO public."Animal" (birthdate, name, animal_passport_id, client_id) 
                        VALUES ($1, $2, $3, $4) RETURNING id;`;
        const { rows } = await DataSource.getPool().query(query, [birthdate, name, animalPassportId, clientId]);
        const { id } = rows[0];
        return new Animal(id, birthdate, name, animalPassportId, clientId);
    }

    public static async update(animal: Animal): Promise<void> {
        const query = `UPDATE public."Animal" 
                        SET birthdate = $2, name = $3, animal_passport_id = $4, client_id = $5
                        WHERE public."Animal".id = $1`;
        const { id, birthdate, name, animalPassportId, clientId } = animal;
        const { rowCount } = await DataSource.getPool().query(query, [id, birthdate, name, animalPassportId, clientId]);
        if(!rowCount) {
            throw new Error('No entity with such id found')
        }
    }


    public static async delete(id: number): Promise<void> {
        const query = `DELETE FROM public."Animal" WHERE public."Client".id = $1;`;
        const { rowCount } = await DataSource.getPool().query(query, [id]);
        if(!rowCount) {
            throw new Error('No entity with such id found')
        }
    }
}