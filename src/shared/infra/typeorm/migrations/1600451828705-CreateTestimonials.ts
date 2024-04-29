import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateTestimonials1600451828705
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'testimonials',
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
            name: 'ministry_id',
            type: 'uuid',
            isNullable: true,
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
            name: 'photo',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'approved',
            type: 'boolean',
            default: false,
          },
          {
            name: 'emoji1',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'emoji2',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'emoji3',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'emoji4',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'emoji5',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'emoji6',
            type: 'varchar',
            isNullable: true,
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
      'testimonials',
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
      'testimonials',
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
    await queryRunner.dropForeignKey('testimonials', 'ministryIdForeignKey');
    await queryRunner.dropForeignKey('testimonials', 'userIdForeignKey');
    await queryRunner.dropTable('testimonials');
  }
}
