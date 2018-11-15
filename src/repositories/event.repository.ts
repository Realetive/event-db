import { DefaultCrudRepository, HasManyRepositoryFactory, repository } from '@loopback/repository';
import { Event, Action } from '../models';
import { MongoDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { ActionRepository } from './action.repository';

export class EventRepository extends DefaultCrudRepository<
  Event,
  typeof Event.prototype.id
  > {
  // public readonly actions: HasManyRepositoryFactory<
  //   Action,
  //   typeof Action.prototype.id
  //   >

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
    // @repository.getter(ActionRepository)
    // protected actionRepositoryGetter: Getter<ActionRepository>,
  ) {
    super(Event, dataSource);

    // this.actions = this._createHasManyRepositoryFactoryFor(
    //   'actions',
    //   actionRepositoryGetter
    // )
  }
}
