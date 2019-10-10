interface State {
    order: Order;

    cancelOrder();
    verifyPayment();
    shipOrder();
}

class Order {
    public currentState: State;

    public cancelled : CanceledOrderState;
    public paymentPending: PaymentPendingState;
    public orderPrep : OrderBeingPreparedState;
    public orderShipped : OrderShippedState;

    constructor(){
        this.cancelled = new CanceledOrderState(this);
        this.paymentPending = new PaymentPendingState(this);
        this.orderPrep = new OrderBeingPreparedState(this);
        this.orderShipped = new OrderShippedState(this);

        this.setState(this.paymentPending);
    }

    public setState(state:State){
        this.currentState = state;
    }

    public getState(){
        return this.currentState;
    }
}

class PaymentPendingState implements State {
    order: Order;

    constructor(order: Order){
        this.order = order;
    }
    cancelOrder() {
        console.log("Cancelling Order.Payment not done yet");
        this.order.setState(this.order.cancelled);
    }
    verifyPayment() {
        console.log("Payment Verified");
        this.order.setState(this.order.orderPrep);
    }
    shipOrder() {
        console.log("Order can't be shipped, Payment is pending..");
    }
}

class CanceledOrderState implements State {
    order: Order;

    constructor(order: Order){
        this.order = order;
    }
    cancelOrder() {
        console.log("Order can't be cancelled, already cancelled");
    }
    verifyPayment() {
        console.log("Payment can't be verified, Order already cancellled..");
    }
    shipOrder() {
        console.log("Order can't be shipped, Order already cancellled..");
    }

}

class OrderBeingPreparedState implements State {
    order: Order;

    constructor(order: Order){
        this.order = order; 
    }
    cancelOrder() {
        console.log("Cancelling Order");
        this.order.setState(this.order.cancelled);
    }
    verifyPayment() {
        console.log("Payment done Already");
    }
    shipOrder() {
        console.log("Shipping your Order");
        this.order.setState(this.order.orderShipped);
    }

}

class OrderShippedState implements State {
    order: Order;

    constructor(order: Order){
        this.order = order;
    }
    cancelOrder() {
        console.log("Can not Cancel, Order is Shipped");
    }
    verifyPayment() {
        console.log("Can not verify payment, Order is Shipped");
    }
    shipOrder() {
        console.log("Can not ship, Order is Shipped");
    }

}

console.log("Case 1: Order Shipped===>")
let order = new Order();

order.getState().verifyPayment();
order.getState().shipOrder();
order.getState().cancelOrder();

console.log('Order state: ' + (<any> order.getState()).constructor.name);



console.log("\nCase 2: Order cancelled===>")
let order2 = new Order();

order2.getState().verifyPayment();
order2.getState().cancelOrder();
order2.getState().shipOrder();

console.log('Order state: ' + (<any> order2.getState()).constructor.name);

console.log("\nCase 3: Payment is pending===>")
let order3 = new Order();

order3.getState().shipOrder();

console.log('Order state: ' + (<any> order3.getState()).constructor.name);


