const { kafka } = require("../client");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function init() {
    const producer = kafka.producer();
    console.log("Connecting Rider Producer...");
    await producer.connect();
    console.log("Rider Producer Connected");

    rl.setPrompt('Update Rider Location (riderId location)> ');
    rl.prompt();

    rl.on('line', async (line) => {
        const [riderId, location] = line.trim().split(' ');

        if (!riderId || !location) {
            console.log("Invalid input. Please provide riderId and location.");
            rl.prompt();
            return;
        }

        const update = { riderId, location, timestamp: Date.now() };

        try {
            const partition = location.toLowerCase() === 'north' ? 0 : 1;
            await producer.send({
                topic: "rider-updated",
                messages: [
                    {
                        key: riderId,
                        value: JSON.stringify(update),
                        partition: partition,
                    },
                ],
            });
            console.log(`Rider Updated: ${JSON.stringify(update)}`);
        } catch (error) {
            console.error("Error updating rider location:", error);
        }

        rl.prompt();
    }).on('close', async () => {
        console.log("Rider Producer Disconnecting...");
        await producer.disconnect();
        console.log("Rider Producer Disconnected");
        process.exit(0);
    });
}

init().catch(console.error);
