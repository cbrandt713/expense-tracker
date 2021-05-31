import { Expense } from "./expense.model";
import { Group } from "./group.model";
import { ModalDialogData } from "./modal-dialog-data.model";

export interface ExpenseDialogData extends ModalDialogData<Expense> {
    group: Group;
}