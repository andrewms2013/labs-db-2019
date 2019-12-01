import { config as configEnv } from 'dotenv';
import "reflect-metadata";
import { Client } from '@models/client';


(async () => {
    configEnv();
    
    await Client.create(true, 2, "John", 'Doe');
})();