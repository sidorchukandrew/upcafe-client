import { CatalogByCategory } from './CatalogByCategory';

export class Catalog {
    catalogSections: Array<CatalogByCategory>;

    constructor() {
        this.catalogSections = new Array<CatalogByCategory>();
    }
}