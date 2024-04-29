import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateTestimonialsComments1603043583645
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'testimonials_comments',
        columns: [
          {
            name: 'testimonial_id',
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
      'testimonials_comments',
      new TableForeignKey({
        columnNames: ['testimonial_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'testimonials',
        name: 'testimonialIdForeignKey',
        onDelete: 'CASCADE',
        onUpdate: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'testimonials_comments',
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
    await queryRunner.dropForeignKey(
      'testimonials_comments',
      'commentIdForeignKey',
    );
    await queryRunner.dropForeignKey(
      'testimonials_comments',
      'testimonialIdForeignKey',
    );
    await queryRunner.dropTable('testimonials_comments');
  }
}
