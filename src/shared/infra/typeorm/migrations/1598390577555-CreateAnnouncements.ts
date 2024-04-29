import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateAnnouncements1598390577555
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'announcements',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'content',
            type: 'varchar',
          },
          {
            name: 'image',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'video',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'link',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'event_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'ministry_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'announcements',
      new TableForeignKey({
        name: 'userId',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'announcements',
      new TableForeignKey({
        name: 'eventId',
        columnNames: ['event_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'events',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('announcements', 'eventId');
    await queryRunner.dropForeignKey('announcements', 'userId');
    await queryRunner.dropTable('announcements');
  }
}
