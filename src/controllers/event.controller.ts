import {
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  patch,
  del,
  requestBody,
} from '@loopback/rest';
import { Event, Action } from '../models';
import { EventRepository, ActionRepository } from '../repositories';
import { RRule } from 'rrule';

interface postRequest {
  models: string
}

export class EventController {
  constructor(
    @repository(EventRepository)
    public eventRepository: EventRepository,
    @repository(ActionRepository)
    public actionRepository: ActionRepository,
  ) { }

  @post('/events', {
    responses: {
      '200': {
        description: 'Event model instance',
        content: {
          'application/json': { schema: { 'x-ts-type': Event } }
        },
      },
    },
  })
  async create(@requestBody() event: Event): Promise<Event> {
    console.log('[post]event', event);
    const newEvent = await this.eventRepository.create(event);

    if (newEvent.recurrenceRule) {
      const options = RRule.parseString(newEvent.recurrenceRule)
      options.dtstart = new Date(newEvent.start);
      const rrule = new RRule(options);

      const actions = rrule.all().map((date: Date) => {
        return {
          start: date.toISOString(),
          _eventId: newEvent.id
        }
      });

      await this.actionRepository.createAll(actions);
    } else {
      await this.actionRepository.create({
        start: newEvent.start,
        _eventId: newEvent.id
      });
    }

    return newEvent;
  }

  @get('/events', {
    responses: {
      '200': {
        description: 'Array of Event model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Event } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Event)) filter?: Filter
  ) {
    if (filter && filter.limit && filter.limit.toString() === '0') {
      delete filter.limit;
    }

    return await this.eventRepository.find(filter);
  }

  @patch('/events/{id}', {
    responses: {
      '204': {
        description: 'Event PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() event: Event
  ): Promise<void> {
    await this.eventRepository.updateById(id, event);

    if (event.recurrenceException) {
      async function asyncForEach(array: string[], callback: Function) {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array);
        }
      }

      const recurrenceException = event.recurrenceException.split(',');

      console.log('recurrenceException', recurrenceException);

      await asyncForEach(recurrenceException, async (date: string) => {
        function parseDate(input: string) {
          return new Date(Date.UTC(
            parseInt(input.slice(0, 4), 10),
            parseInt(input.slice(4, 6), 10) - 1,
            parseInt(input.slice(6, 8), 10),
            parseInt(input.slice(9, 11), 10),
            parseInt(input.slice(11, 13), 10),
            parseInt(input.slice(13, 15), 10)
          ));
        }

        const action: Where<Action> = {
          start: parseDate(date).toISOString(),
          _eventId: id
        };

        await this.actionRepository.deleteAll(action, { strictObjectIDCoercion: true });
      });
    } else {
      await this.actionRepository.deleteAll({ _eventId: id }, { strictObjectIDCoercion: true });
    }
  }

  @del('/events/{id}', {
    responses: {
      '204': {
        description: 'Event DELETE success'
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
  ): Promise<void> {
    await this.eventRepository.deleteById(id);
    await this.actionRepository.deleteAll({ _eventId: id }, { strictObjectIDCoercion: true });
  }
}
