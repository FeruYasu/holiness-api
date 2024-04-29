import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateEventsParticipants1598301758366
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'events_participants',
        columns: [
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'event_id',
            type: 'uuid',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'events_participants',
      new TableForeignKey({
        columnNames: ['event_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'events',
        name: 'eventsIdForeignKey',
        onDelete: 'CASCADE',
        onUpdate: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'events_participants',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        name: 'userIdForeignKey',
        onDelete: 'CASCADE',
        onUpdate: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'events_participants',
      'eventsIdForeignKey',
    );
    await queryRunner.dropForeignKey('events_participants', 'userIdForeignKey');
    await queryRunner.dropTable('events_participants');
  }
}
