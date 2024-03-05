import { QueryRunner, TableForeignKey } from 'typeorm';

export async function dropForeignKeysByColumnNames(
  queryRunner: QueryRunner,
  tableName: string,
  columnNames: string[],
): Promise<void> {
  const table = await queryRunner.getTable(tableName);

  if (table) {
    const foreignKeys = table.foreignKeys;

    const isColumnIncluded = (foreignKey: TableForeignKey): boolean => {
      return columnNames.some((colName) =>
        foreignKey.columnNames.includes(colName),
      );
    };

    for (const foreignKey of foreignKeys) {
      if (isColumnIncluded(foreignKey)) {
        await queryRunner.dropForeignKey(tableName, foreignKey);
      }
    }
  }
}
