import { MigrationInterface, QueryRunner } from "typeorm";

export class FeatMovement1712090179992 implements MigrationInterface {
    name = 'FeatMovement1712090179992'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movements" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movements" DROP COLUMN "createdAt"`);
    }

}
