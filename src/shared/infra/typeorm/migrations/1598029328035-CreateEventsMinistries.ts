import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateEventsMinistries1598029328035
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'events_ministries',
        columns: [
          {
            name: 'event_id',
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
      'events_ministries',
      new TableForeignKey({
        columnNames: ['event_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'events',
        name: 'eventIdForeignKey',
        onDelete: 'CASCADE',
        onUpdate: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'events_ministries',
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
      'events_ministries',
      'ministryIdForeignKey',
    );
    await queryRunner.dropForeignKey('events_ministries', 'eventIdForeignKey');
    await queryRunner.dropTable('events_ministries');
  }
}
