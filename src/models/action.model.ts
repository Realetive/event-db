import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Event } from './event.model';

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

  // @belongsTo(() => Event)
  // event: string;

  constructor(data?: Partial<Action>) {
    super(data);
  }
}
