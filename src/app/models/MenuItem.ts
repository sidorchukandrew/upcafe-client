import { Image } from "./Image";
import { ModifierList } from './ModifierList';

export class MenuItem {
  id: string;
  name: string;
  price: number;
  image: Image;
  inStock: boolean;
  description: string;
  modifierLists: ModifierList[];
}
