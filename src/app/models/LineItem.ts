import { VariationData } from './VariationData';
import { ModifierListData } from './ModifierListData';
import { ItemData } from './ItemData';

export class LineItem {
    itemData: ItemData;
    variationData: VariationData;
    modifierListsData: Array<ModifierListData>;
}   