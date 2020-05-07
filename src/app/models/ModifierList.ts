import { Image } from './Image'
import { Modifier } from './Modifier';

export class ModifierList {
  id: string;
  name: string;
  selectionType: string;
  image: Image;
  modifiers: Modifier[];
}
