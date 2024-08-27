const { kafka } = require("../client");

const groupId = "rider-assignment-processor";

async function init() {
    const consumer = kafka.consumer({ groupId });

    console.log("Rider Assignment Consumer Connecting...");
    await consumer.connect();
    console.log("Rider Assignment Consumer Connected");

    await consumer.subscribe({ topic: "rider-assigned", fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const assignment = JSON.parse(message.value.toString());
            console.log(`Rider Assignment Consumer: Order ${assignment.orderId} assigned to ${assignment.riderId}`);

            // Here you can add logic to notify the rider, update databases, etc.
        }
    });
}

init().catch(console.error);
