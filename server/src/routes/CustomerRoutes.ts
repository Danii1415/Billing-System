import {CustomerController} from "../controller/CustomerController";

export const CustomerRoutes = [{
    method: "get",
    route: "/customers",
    controller: CustomerController,
    action: "all"
}, {
    method: "post",
    route: "/customers",
    controller: CustomerController,
    action: "create"
},
{
    method: "put",
    route: "/customers/:id",
    controller: CustomerController,
    action: "update"
}, {
    method: "delete",
    route: "/customers/:id",
    controller: CustomerController,
    action: "remove"
}];