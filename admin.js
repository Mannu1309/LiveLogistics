const { kafka } = require("./client");

async function init() {
    const admin = kafka.admin();
    console.log("Admin Connecting...");
    await admin.connect();
    console.log("Admin Connected Successfully");

    const topics = [
        { topic: "order-placed", numPartitions: 3 },
        { topic: "rider-assigned", numPartitions: 2 },
        { topic: "rider-updated", numPartitions: 2 },
        { topic: "order-delivered", numPartitions: 2 },
    ];

    console.log("Creating Topics...");
    await admin.createTopics({ topics });
    console.log("Topics Created Successfully");

    console.log("Disconnecting Admin...");
    await admin.disconnect();
    console.log("Admin Disconnected");
}

init().catch(console.error);
