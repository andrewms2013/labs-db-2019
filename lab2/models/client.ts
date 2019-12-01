import { DataSource } from "@app/data-source/data-source";

export class Client {

    constructor(
        public id: number,
        public hasDiscount: boolean,
        public clinicId: number,
        public name: String,
        public surname: String,
    ) {}

    public static async getById(entityId: number): Promise<Client> {
        const query = 'SELECT * FROM public."Client" WHERE public."Client".id = $1';
        const { rows } = await DataSource.getPool().query(query, [entityId]);
        if (!rows.length) {
            throw Error('No entity with such id found');
        }
        const { id, has_discount, clinic_id, name, surname } = rows[0];
        return new Client(id, has_discount, clinic_id, name, surname);
    }

    public static async getAll(): Promise<Client[]> {
        const query = 'SELECT * FROM public."Client"';
        const { rows } = await DataSource.getPool().query(query);
        return rows.map((row) => {
            const { id, has_discount, clinic_id, name, surname } = row;
            return new Client(id, has_discount, clinic_id, name, surname);
        });
    } 

    public static async create(hasDiscount: boolean, clinicId: number, name: string, surname: string): Promise<Client> {
        const query = `INSERT INTO public."Client" (has_discount, clinic_id, name, surname) 
                        VALUES ($1, $2, $3, $4) RETURNING id;`;
        const { rows } = await DataSource.getPool().query(query, [hasDiscount, clinicId, name, surname]);
        const { id } = rows[0];
        return new Client(id, hasDiscount, clinicId, name, surname);
    }

    public static async update(client: Client): Promise<void> {
        const query = `UPDATE public."Client" 
                        SET has_discount = $2, clinic_id = $3, name = $4, surname = $5
                        WHERE public."Client".id = $1`;
        const { id, hasDiscount, clinicId, name, surname } = client;
        const { rowCount } = await DataSource.getPool().query(query, [id, hasDiscount, clinicId, name, surname]);
        if(!rowCount) {
            throw new Error('No entity with such id found')
        }
    }


    public static async delete(id: number): Promise<void> {
        const query = `DELETE FROM public."Client" WHERE public."Client".id = $1;`;
        const { rowCount } = await DataSource.getPool().query(query, [id]);
        if(!rowCount) {
            throw new Error('No entity with such id found')
        }
    }
}