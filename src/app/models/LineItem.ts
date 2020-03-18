import { VariationData } from './VariationData';
import { ModifierListData } from './ModifierListData';

export class LineItem {
    name: string;
    description: string;
    variationData: VariationData;
    modifierListsData: Array<ModifierListData>;
}