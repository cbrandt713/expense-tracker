import { CreationMode } from '../enums';

export interface ModalDialogData<T> {
    creationMode: CreationMode;
    model?: T;
}
