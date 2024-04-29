import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateMinistriesLeaders1597935025553
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ministries_leaders',
        columns: [
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'ministry_id',
            type: 'uuid',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'ministries_leaders',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        name: 'userIdForeignKey',
        onDelete: 'CASCADE',
        onUpdate: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'ministries_leaders',
      new TableForeignKey({
        columnNames: ['ministry_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'ministries',
        name: 'ministryIdForeignKey',
        onDelete: 'CASCADE',
        onUpdate: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'ministries_leaders',
      'ministryIdForeignKey',
    );
    await queryRunner.dropForeignKey('ministries_leaders', 'userIdForeignKey');
    await queryRunner.dropTable('ministries_leaders');
  }
}
