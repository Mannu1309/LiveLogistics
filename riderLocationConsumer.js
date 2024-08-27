const { kafka } = require("./client");

const groupId = "rider-location-processor";

async function init() {
    const consumer = kafka.consumer({ groupId });

    console.log("Rider Location Consumer Connecting...");
    await consumer.connect();
    console.log("Rider Location Consumer Connected");

    await consumer.subscribe({ topic: "rider-updated", fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const update = JSON.parse(message.value.toString());
            console.log(`Rider Location Consumer: Rider ${update.riderId} is at ${update.location}`);
            
            // Here you can add logic to update rider location in a database or dashboard
        }
    });
}

init().catch(console.error);
