import { DataSource } from "@app/data-source/data-source";

enum AnimalDoctorFieldName {
    AnimalId = 'animal_id',
    DoctorId = 'doctor_id'
}

export class AnimalDoctor {

    constructor(
        public animalId: number,
        public doctorId: number,
    ) {}

    public static async getById(entityId: number, fieldName: AnimalDoctorFieldName): Promise<AnimalDoctor[]> {
        const query = `SELECT * FROM public."Animal_Doctor" WHERE public."Animal_Doctor".${fieldName} = $1`;
        const { rows } = await DataSource.getPool().query(query, [entityId]);
        return rows.map((row) => {
            const { animal_id, doctor_id } = row;
            return new AnimalDoctor(animal_id, doctor_id);
        });
    }

    public static async getAll(): Promise<AnimalDoctor[]> {
        const query = 'SELECT * FROM public."Animal_Doctor"';
        const { rows } = await DataSource.getPool().query(query);
        return rows.map((row) => {
            const { animal_id, doctor_id } = row;
            return new AnimalDoctor(animal_id, doctor_id);
        });
    } 

    public static async create(animalId: number, doctorId: number): Promise<AnimalDoctor> {
        const query = `INSERT INTO public."Animal_Doctor" (animal_id, doctor_id) 
                        VALUES ($1, $2);`;
        await DataSource.getPool().query(query, [animalId, doctorId]);
        return new AnimalDoctor(animalId, doctorId);
    }

    public static async deleteAll(entityId: number, fieldName: AnimalDoctorFieldName): Promise<void> {
        const query = `DELETE FROM public."Animal_Doctor" WHERE public."Animal_Doctor".${fieldName} = $1;`;
        const { rowCount } = await DataSource.getPool().query(query, [entityId]);
        if(!rowCount) {
            throw new Error('No entities with such id found')
        }
    }

    public static async deleteOne(animalId: number, doctorId: number): Promise<void> {
        const query = `DELETE FROM public."Animal_Doctor" 
                        WHERE public."Animal_Doctor".animal_id = $1, public."Animal_Doctor".doctor_id = $2;`;
        const { rowCount } = await DataSource.getPool().query(query, [animalId, doctorId]);
        if(!rowCount) {
            throw new Error('No entities with such ids found')
        }
    }
}