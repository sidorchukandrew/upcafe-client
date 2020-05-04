import { Image } from './Image';

export class Modifier {

  id: string;
  price: DoubleRange;
  name: string;
  onByDefault: boolean;
  inStock: boolean;
  image: Image;
  modifierListId: string;

}
