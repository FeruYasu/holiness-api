import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateSermonsTags1599154007339
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sermons_tags',
        columns: [
          {
            name: 'sermon_id',
            type: 'uuid',
          },
          {
            name: 'tag_id',
            type: 'uuid',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'sermons_tags',
      new TableForeignKey({
        columnNames: ['sermon_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'sermons',
        name: 'sermonIdForeignKey',
        onDelete: 'CASCADE',
        onUpdate: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'sermons_tags',
      new TableForeignKey({
        columnNames: ['tag_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tags',
        name: 'tagIdForeignKey',
        onDelete: 'CASCADE',
        onUpdate: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('sermons_tags', 'tagIdForeignKey');
    await queryRunner.dropForeignKey('sermons_tags', 'sermonIdForeignKey');
    await queryRunner.dropTable('sermons_tags');
  }
}
