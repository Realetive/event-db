import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Action} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ActionRepository extends DefaultCrudRepository<
  Action,
  typeof Action.prototype.id
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Action, dataSource);
  }
}
