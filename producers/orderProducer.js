const { kafka } = require("../client");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function init() {
    const producer = kafka.producer();
    console.log("Connecting Order Producer...");
    await producer.connect();
    console.log("Order Producer Connected");

    rl.setPrompt('Place Order (orderId customer item)> ');
    rl.prompt();

    rl.on('line', async (line) => {
        const [orderId, customer, ...itemParts] = line.trim().split(' ');
        const item = itemParts.join(' ');

        if (!orderId || !customer || !item) {
            console.log("Invalid input. Please provide orderId, customer, and item.");
            rl.prompt();
            return;
        }

        const order = { orderId, customer, item, timestamp: Date.now() };

        try {
            await producer.send({
                topic: "order-placed",
                messages: [
                    {
                        key: orderId,
                        value: JSON.stringify(order),
                    },
                ],
            });
            console.log(`Order Placed: ${JSON.stringify(order)}`);
        } catch (error) {
            console.error("Error placing order:", error);
        }

        rl.prompt();
    }).on('close', async () => {
        console.log("Order Producer Disconnecting...");
        await producer.disconnect();
        console.log("Order Producer Disconnected");
        process.exit(0);
    });
}

init().catch(console.error);
