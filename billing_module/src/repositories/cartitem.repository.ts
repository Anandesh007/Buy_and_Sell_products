import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Cartitem, CartitemRelations} from '../models';

export class CartitemRepository extends DefaultCrudRepository<
  Cartitem,
  typeof Cartitem.prototype.id,
  CartitemRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Cartitem, dataSource);
  }
}
