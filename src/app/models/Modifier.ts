import { Image } from './Image';
import { CatalogObject } from './CatalogObject';

export class Modifier extends CatalogObject {

  id: string;
  price: number;
  name: string;
  onByDefault: boolean;
  inStock: boolean;
  image: Image;
  modifierListId: string;

}
