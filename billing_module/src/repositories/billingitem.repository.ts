import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Billingitem, BillingitemRelations} from '../models';

export class BillingitemRepository extends DefaultCrudRepository<
  Billingitem,
  typeof Billingitem.prototype.id,
  BillingitemRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Billingitem, dataSource);
  }
}
