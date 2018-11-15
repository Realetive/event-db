import {Entity, model, property} from '@loopback/repository';

@model()
export class Action extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  start: string;

  constructor(data?: Partial<Action>) {
    super(data);
  }
}
