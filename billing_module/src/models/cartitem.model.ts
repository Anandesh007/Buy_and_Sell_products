import {Entity, model, property} from '@loopback/repository';

@model({name:'cart_items',settings: {strict: false}})
export class Cartitem extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  cart_id: number;

  @property({
    type: 'number',
    required: true,
  })
  product_id: number;

  @property({
    type: 'number',
    required: true,
  })
  quantity: number;

  @property({
    type: 'number',
    required: true,
  })
  price_at_add: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Cartitem>) {
    super(data);
  }
}

export interface CartitemRelations {
  // describe navigational properties here
}

export type CartitemWithRelations = Cartitem & CartitemRelations;
