const { kafka } = require("../client");

const groupId = "order-processor";

async function init() {
    const consumer = kafka.consumer({ groupId });
    const producer = kafka.producer();

    console.log("Order Consumer Connecting...");
    await consumer.connect();
    console.log("Order Consumer Connected");

    await consumer.subscribe({ topic: "order-placed", fromBeginning: true });

    await producer.connect();

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const order = JSON.parse(message.value.toString());
            console.log(`Order Consumer: New order received - ${JSON.stringify(order)}`);

            // Simulate rider assignment logic
            const assignedRider = assignRider(order.orderId);
            const assignment = { orderId: order.orderId, riderId: assignedRider, timestamp: Date.now() };

            try {
                await producer.send({
                    topic: "rider-assigned",
                    messages: [
                        {
                            key: order.orderId,
                            value: JSON.stringify(assignment),
                        },
                    ],
                });
                console.log(`Order ${order.orderId} assigned to Rider ${assignedRider}`);
            } catch (error) {
                console.error("Error assigning rider:", error);
            }
        }
    });
}

function assignRider(orderId) {
    // Simple assignment logic (e.g., round-robin or random)
    const riders = ['rider1', 'rider2'];
    const index = parseInt(orderId.slice(-1)) % riders.length;
    return riders[index];
}

init().catch(console.error);
