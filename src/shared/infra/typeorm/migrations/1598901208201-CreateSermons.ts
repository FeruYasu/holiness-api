import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateSermons1598901208201 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sermons',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'preacher_id',
            type: 'uuid',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'thumbnail',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'video_url',
            type: 'varchar',
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
      'sermons',
      new TableForeignKey({
        name: 'preacherId',
        columnNames: ['preacher_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('sermons', 'preacherId');
    await queryRunner.dropTable('sermons');
  }
}
