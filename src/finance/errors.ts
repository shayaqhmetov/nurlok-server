import { NotFoundException } from '@nestjs/common';

export const Errors = {
  NOT_FOUND: (data: string, entity: string, field: string = 'id') =>
    new NotFoundException(`${entity} with ${field}=${data} not found.`),
};

export const ErrorMessages = {
  DUPLICATE_ENTRY: (model: string, fields: string) =>
    `Cannot create ${model} entry with following field(s): ${fields}. Already exists.`,
};
