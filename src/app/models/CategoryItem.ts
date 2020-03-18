import { ItemData } from './ItemData';
import { VariationData } from './VariationData';
import { ModifierListData } from './ModifierListData';

export class CategoryItem {

    itemData: ItemData;
    variationsData: Array<VariationData>;
    modifierListsData: Array<ModifierListData>;

    constructor(itemData: ItemData, variationsData: Array<VariationData>, modifierListsData: Array<ModifierListData>) {
        this.itemData = itemData;
        this.variationsData = variationsData;
        this.modifierListsData = modifierListsData;
    }

}