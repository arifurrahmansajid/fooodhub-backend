type MealItem = {
    mealId : string;
    quantity : number;
}

export type CreateOrderRequest = {
    meals : MealItem[];
}

export type UpdateCustomerOrderRequest = {
  status: "CANCELLED";
};