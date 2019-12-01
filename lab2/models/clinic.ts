import { DataSource } from "@app/data-source/data-source";

export class Clinic {
    constructor(
        public id: number,
        public city: String,
        public house: String,
        public street: String,
        public aviariesQuantity: number,
    ) {}

    public static async getById(entityId: number): Promise<Clinic> {
        const query = 'SELECT * FROM public."Clinic" WHERE public."Clinic".id = $1';
        const { rows } = await DataSource.getPool().query(query, [entityId]);
        if (!rows.length) {
            throw Error('No entity with such id found');
        }
        const { id, city, house, street, aviaries_quantity } = rows[0];
        return new Clinic(id, city, house, street, aviaries_quantity);
    }

    public static async getAll(): Promise<Clinic[]> {
        const query = 'SELECT * FROM public."Clinic"';
        const { rows } = await DataSource.getPool().query(query);
        return rows.map((row) => {
            const { id, city, house, street, aviaries_quantity } = row;
            return new Clinic(id, city, house, street, aviaries_quantity);
        });
    } 

    public static async create(city: string, house: string, street: string, aviariesQuantity: number): Promise<Clinic> {
        const query = `INSERT INTO public."Clinic" (city, house, street, aviaries_quantity) 
                        VALUES ($1, $2, $3, $4) RETURNING id;`;
        const { rows } = await DataSource.getPool().query(query, [city, house, street, aviariesQuantity]);
        const { id } = rows[0];
        return new Clinic(id, city, house, street, aviariesQuantity);
    }

    public static async update(clinic: Clinic): Promise<void> {
        const query = `UPDATE public."Clinic" 
                        SET city = $2, house = $3, street = $4, aviaries_quantity = $5
                        WHERE public."Clinic".id = $1`;
        const { id, city, house, street, aviariesQuantity } = clinic;
        const { rowCount } = await DataSource.getPool().query(query, [id, city, house, street, aviariesQuantity]);
        if(!rowCount) {
            throw new Error('No entity with such id found')
        }
    }

    public static async delete(id: number): Promise<void> {
        const query = `DELETE FROM public."Clinic" WHERE public."Clinic".id = $1;`;
        const { rowCount } = await DataSource.getPool().query(query, [id]);
        if(!rowCount) {
            throw new Error('No entity with such id found')
        }
    }
}