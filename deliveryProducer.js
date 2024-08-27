const { kafka } = require("./client");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function init() {
    const producer = kafka.producer();
    console.log("Connecting Delivery Producer...");
    await producer.connect();
    console.log("Delivery Producer Connected");

    rl.setPrompt('Mark Order as Delivered (orderId)> ');
    rl.prompt();

    rl.on('line', async (line) => {
        const [orderId] = line.trim().split(' ');

        if (!orderId) {
            console.log("Invalid input. Please provide orderId.");
            rl.prompt();
            return;
        }

        const delivery = { orderId, status: 'delivered', timestamp: Date.now() };

        try {
            await producer.send({
                topic: "order-delivered",
                messages: [
                    {
                        key: orderId,
                        value: JSON.stringify(delivery),
                    },
                ],
            });
            console.log(`Order Delivered: ${JSON.stringify(delivery)}`);
        } catch (error) {
            console.error("Error marking order as delivered:", error);
        }

        rl.prompt();
    }).on('close', async () => {
        console.log("Delivery Producer Disconnecting...");
        await producer.disconnect();
        console.log("Delivery Producer Disconnected");
        process.exit(0);
    });
}

init().catch(console.error);
