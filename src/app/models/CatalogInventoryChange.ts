import { MenuItem } from './MenuItem';
import { Modifier } from './Modifier';

export class CatalogInventoryChange {

  items: Set<MenuItem>;
  modifiers: Set<Modifier>;
}
