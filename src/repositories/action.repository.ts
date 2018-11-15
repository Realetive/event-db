import { DefaultCrudRepository, repository, BelongsToAccessor } from '@loopback/repository';
import { Action, Event } from '../models';
import { MongoDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { EventRepository } from './event.repository';

export class ActionRepository extends DefaultCrudRepository<
  Action,
  typeof Action.prototype.id
  > {
  // public readonly event: BelongsToAccessor<
  //   Event,
  //   typeof Action.prototype.id
  //   >

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
    // @repository.getter(EventRepository)
    // protected eventRepositoryGetter: Getter<EventRepository>
  ) {
    super(Action, dataSource);

    // this.event = this._createBelongsToAccessorFor(
    //   'event',
    //   eventRepositoryGetter
    // )
  }
}
