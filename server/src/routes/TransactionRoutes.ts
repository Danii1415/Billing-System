import {TransactionController} from "../controller/TransactionController";

export const TransactionRoutes = [{
    method: "get",
    route: "/transactions",
    controller: TransactionController,
    action: "all"
}, {
    method: "post",
    route: "/transactions",
    controller: TransactionController,
    action: "create"
},{
    method: "put",
    route: "/transactions/:id",
    controller: TransactionController,
    action: "update"
}, {
    method: "delete",
    route: "/transactions/:id",
    controller: TransactionController,
    action: "remove"
}];