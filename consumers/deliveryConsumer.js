const { kafka } = require("../client");

const groupId = "delivery-processor";

async function init() {
    const consumer = kafka.consumer({ groupId });

    console.log("Delivery Consumer Connecting...");
    await consumer.connect();
    console.log("Delivery Consumer Connected");

    await consumer.subscribe({ topic: "order-delivered", fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const delivery = JSON.parse(message.value.toString());
            console.log(`Delivery Consumer: Order ${delivery.orderId} has been delivered at ${new Date(delivery.timestamp).toLocaleString()}`);
            
            // Here you can add logic to update order status in a database, notify the customer, etc.
        }
    });
}

init().catch(console.error);
