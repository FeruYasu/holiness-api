import {
  MigrationInterface,
  QueryRunner,
  TableForeignKey,
  Table,
} from 'typeorm';

export default class CreateCommentsReplies1599686211909
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'comments_replies',
        columns: [
          {
            name: 'comment_id',
            type: 'uuid',
          },
          {
            name: 'reply_id',
            type: 'uuid',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'comments_replies',
      new TableForeignKey({
        columnNames: ['comment_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'comments',
        name: 'commentIdForeignKey',
        onDelete: 'CASCADE',
        onUpdate: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'comments_replies',
      new TableForeignKey({
        columnNames: ['reply_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'comments',
        name: 'replyIdForeignKey',
        onDelete: 'CASCADE',
        onUpdate: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('comments_replies', 'replyIdForeignKey');
    await queryRunner.dropForeignKey('comments_replies', 'commentIdForeignKey');
    await queryRunner.dropTable('comments_replies');
  }
}
