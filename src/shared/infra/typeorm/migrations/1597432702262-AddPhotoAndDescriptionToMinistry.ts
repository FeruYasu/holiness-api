import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddPhotoToMinistry1597432702262
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'ministries',
      new TableColumn({
        name: 'photo',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'ministries',
      new TableColumn({
        name: 'description',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('ministries', 'description');
    await queryRunner.dropColumn('ministries', 'photo');
  }
}
