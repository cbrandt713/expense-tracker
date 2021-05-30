import { Group } from "./group.model";
import { User } from "./user.model";

export interface Expense {
    id?: number;
    cost: number;
    purpose?: string;
    user?: User;
    group?: Group;
}