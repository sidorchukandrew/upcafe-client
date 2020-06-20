import { Image } from './Image'
import { Modifier } from './Modifier';
import { CatalogObject } from './CatalogObject';

export class ModifierList extends CatalogObject {
  id: string;
  name: string;
  selectionType: string;
  image: Image;
  modifiers: Modifier[];
}
