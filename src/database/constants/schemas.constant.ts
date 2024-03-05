import { TableColumnOptions } from 'typeorm';

interface SchemaOptions {
  id: TableColumnOptions;
  createdAt: TableColumnOptions;
  updatedAt: TableColumnOptions;
}

export const schemas: SchemaOptions = {
  id: {
    name: 'id',
    type: 'uuid',
    isPrimary: true,
    generationStrategy: 'uuid',
    default: `uuid_generate_v4()`,
  },
  createdAt: {
    name: 'created_at',
    type: 'timestamptz',
    default: 'now()',
  },
  updatedAt: {
    name: 'updated_at',
    type: 'timestamptz',
    default: 'now()',
  },
};
