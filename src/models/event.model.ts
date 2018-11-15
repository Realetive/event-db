import {Entity, model, property} from '@loopback/repository';

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
  title: string;

  @property({
    type: 'string',
    default: 123,
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

  constructor(data?: Partial<Event>) {
    super(data);
  }
}
