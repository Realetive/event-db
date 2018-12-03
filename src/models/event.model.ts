import { Entity, model, property, hasMany } from '@loopback/repository';
import { Action } from './action.model';

@model()
export class Event extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
    default: '',
  })
  title?: string;

  @property({
    type: 'string',
    default: '',
  })
  description?: string;

  @property({
    type: 'boolean',
    default: false,
  })
  isAllDay?: boolean;

  @property({
    type: 'date',
    required: true,
  })
  start: string;

  @property({
    type: 'date',
    required: true,
  })
  end: string;

  @property({
    type: 'string',
    default: '',
  })
  recurrenceException?: string;

  @property({
    type: 'string',
    default: 0,
  })
  recurrenceId?: string;

  @property({
    type: 'string',
    default: '',
  })
  recurrenceRule?: string;

  @property({
    type: 'string',
    default: '',
  })
  startTimezone?: string;

  @property({
    type: 'string',
    default: '',
  })
  endTimezone?: string;

  @hasMany(() => Action)
  actions?: Action[];

  @property({
    type: 'string',
    default: ''
  })
  tipBuy?: string

  @property({
    type: 'string',
    default: ''
  })
  tipTicket?: string

  constructor(data?: Partial<Event>) {
    super(data);
  }
}
