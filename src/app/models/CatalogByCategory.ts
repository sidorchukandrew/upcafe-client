import { CategoryItem } from './CategoryItem';
import { Category } from './Category';

export class CatalogByCategory {
    categoryItems: Array<CategoryItem>;
    category: string;

    constructor(categoryItems: Array<CategoryItem>, category: string) {
        this.categoryItems = categoryItems;
        this.category = category;
    }
}