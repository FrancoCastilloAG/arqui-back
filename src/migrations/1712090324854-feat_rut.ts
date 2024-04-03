import { MigrationInterface, QueryRunner } from "typeorm";

export class FeatRut1712090324854 implements MigrationInterface {
    name = 'FeatRut1712090324854'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "rut" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "rut"`);
    }

}
