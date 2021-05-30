import { User } from "./user.model";

export interface Debt {
    from: User;
    to: User;
    amount: number;
}