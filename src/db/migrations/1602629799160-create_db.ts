import {MigrationInterface, QueryRunner} from "typeorm";

export class createDb1602629799160 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createDatabase('db');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropDatabase('db');
  }

}
