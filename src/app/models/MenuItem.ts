import { Image } from "./Image";
import { ModifierList } from './ModifierList';
import { CatalogObject } from './CatalogObject';

export class MenuItem extends CatalogObject {
  id: string;
  name: string;
  price: number;
  image: Image;
  inStock: boolean;
  description: string;
  modifierLists: ModifierList[];
}
