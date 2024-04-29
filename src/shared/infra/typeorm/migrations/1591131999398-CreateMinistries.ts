import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateMinistries1591131999398
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ministries',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'local',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'date',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'hour',
            type: 'date',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ministries');
  }
}
