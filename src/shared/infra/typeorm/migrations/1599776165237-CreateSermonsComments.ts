import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateSermonsComments1599776165237
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sermons_comments',
        columns: [
          {
            name: 'sermon_id',
            type: 'uuid',
          },
          {
            name: 'comment_id',
            type: 'uuid',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'sermons_comments',
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
      'sermons_comments',
      new TableForeignKey({
        columnNames: ['comment_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'comments',
        name: 'commentIdForeignKey',
        onDelete: 'CASCADE',
        onUpdate: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('sermons_comments', 'commentIdForeignKey');
    await queryRunner.dropForeignKey('sermons_comments', 'sermonIdForeignKey');
    await queryRunner.dropTable('sermons_comments');
  }
}
