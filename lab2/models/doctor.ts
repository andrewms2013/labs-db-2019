import { DataSource } from "@app/data-source/data-source";

export class Doctor {

    constructor(
        public id: number,
        public name: String,
        public surname: String,
        public speciality: String,
        public qualification: String,
        public clinicId: number
    ) {}

    public static async getById(entityId: number): Promise<Doctor> {
        const query = 'SELECT * FROM public."Doctor" WHERE public."Doctor".id = $1';
        const { rows } = await DataSource.getPool().query(query, [entityId]);
        if (!rows.length) {
            throw Error('No entity with such id found');
        }
        const { id, name, surname, speciality, qualification, clinic_id } = rows[0];
        return new Doctor(id, name, surname, speciality, qualification, clinic_id);
    }

    public static async getAll(): Promise<Doctor[]> {
        const query = 'SELECT * FROM public."Doctor"';
        const { rows } = await DataSource.getPool().query(query);
        return rows.map((row) => {
            const { id, name, surname, speciality, qualification, clinic_id } = row;
            return new Doctor(id, name, surname, speciality, qualification, clinic_id);
        });
    } 

    public static async create(name: String, surname: String, speciality: String, qualification: String, clinicId: number): Promise<Doctor> {
        const query = `INSERT INTO public."Doctor" (name, surname, speciality, qualification, clinic_id) 
                        VALUES ($1, $2, $3, $4, $5) RETURNING id;`;
        const { rows } = await DataSource.getPool().query(query, [name, surname, speciality, qualification, clinicId]);
        const { id } = rows[0];
        return new Doctor(id, name, surname, speciality, qualification, clinicId);
    }

    public static async update(doctor: Doctor): Promise<void> {
        const query = `UPDATE public."Doctor" 
                        SET name = $2, surname = $3, speciality = $4, qualification = $5, clinic_id = $6
                        WHERE public."Animal".id = $1`;
        const { id, name, surname, speciality, qualification, clinicId } = doctor;
        const { rowCount } = await DataSource.getPool().query(query, [id, name, surname, speciality, qualification, clinicId]);
        if(!rowCount) {
            throw new Error('No entity with such id found')
        }
    }

    public static async delete(id: number): Promise<void> {
        const query = `DELETE FROM public."Doctor" WHERE public."Doctor".id = $1;`;
        const { rowCount } = await DataSource.getPool().query(query, [id]);
        if(!rowCount) {
            throw new Error('No entity with such id found')
        }
    }
}