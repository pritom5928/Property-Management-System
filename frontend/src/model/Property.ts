
import { IPropertybase } from './IPropertybase';

export class Property implements IPropertybase {
  id: number;
  sellrent: number;
  name: string;
  ptype: string;
  ftype: string;
  city: string;
  rtm: number;
  price: number;
  bhk: number;
  builtarea: number;
  carpetarea?: number;
  address: string;
  address2?: string;
  floorno: string;
  totalfloor:string;
  aop?:string;
  maintenance: number;
  security?: number;
  gated?: number;
  mainentrance?: string;
  possession:string;
  description?:string;
  postedon: string;
  postedby: number;
  image?: string;
}
