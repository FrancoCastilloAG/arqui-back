import { DataSource } from 'typeorm';
import { Movement } from "../../database/entities/movement.entity"

export const MovementProviders = [
    {
        provide: 'MOVEMENT_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Movement),
        inject: ['DATA_SOURCE'],
    },
];