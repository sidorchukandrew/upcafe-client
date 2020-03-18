import { ModifierData } from './ModifierData';

export class ModifierListData {
    nameOfList: string;
    selectionType: string;
    imageUrl: string;
    modifiers: Array<ModifierData>;

    constructor(nameOfList: string, selectionType: string, imageUrl: string, modifiers: Array<ModifierData>) {
        this.nameOfList = nameOfList;
        this.selectionType = selectionType;
        this.imageUrl = imageUrl;
        this.modifiers = modifiers;
    }
}