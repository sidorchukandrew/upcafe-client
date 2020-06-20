import { Image } from './Image';
import { CatalogObjectTypes } from './CatalogObjectTypes';

export class CatalogObject {
  name: string;
  id: string;
  image ?: Image;
  type ?: CatalogObjectTypes
}
