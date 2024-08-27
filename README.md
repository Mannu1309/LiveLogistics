# Real-Time Food Delivery Tracking System

This project is a mini application designed to simulate real-time updates for a food delivery service using Apache Kafka. The system involves producers and consumers that handle rider location updates and delivery status tracking.

## Project Structure

```plaintext
kafka-food-delivery/
├── client.js
├── admin.js
├── producers/
│   ├── riderProducer.js
│   ├── orderProducer.js
|   ├── deliveryProducer.js
├── consumers/
│   ├── riderLocationConsumer.js
│   ├── riderAssignmentConsumer.js
│   ├── orderConsumer.js
│   ├── deliveryConsumer.js
├── README.md
├── package.json
└── node_modules/
```

## File Descriptions

- **client.js**: Configures and exports a Kafka client instance using kafkajs. This file sets up the connection to the Kafka broker and provides the Kafka client for use in producers and consumers.
- **admin.js**: Handles Kafka topic creation and management. It connects to the Kafka broker and creates the necessary topics for the system (e.g., rider-updated, order-status, delivery-updates).
- **producers/**
    - **riderProducer.js**: Sends updates about rider locations to the rider-updated topic. This script allows input of rider names and locations and publishes them to Kafka.
    - **orderProducer.js**: Sends updates about order statuses to the order-status topic. This script allows input of order IDs and statuses and publishes them to Kafka.
    - **deliveryProducer.js**: Sends updates about delivery statuses to the delivery-updates topic. This script allows input of delivery IDs and statuses and publishes them to Kafka.
- **consumers/**
    - **riderLocationConsumer.js**: Consumes messages from the rider-updated topic. This consumer processes updates about rider locations and prints them to the console.
    - **riderAssignmentConsumer.js**: Consumes messages related to rider assignments from a specific topic (if implemented). This consumer processes assignments and updates.
    - **orderConsumer.js**: Consumes messages from the order-status topic. This consumer processes order status updates and prints them to the console.
    - **deliveryConsumer.js**: Consumes messages from the delivery-updates topic. This consumer processes delivery status updates and prints them to the console.
- **package.json**: Contains the project's metadata and dependencies. It is used by Node.js to manage project packages and scripts.
- **node_modules/**: Directory where all the project dependencies are installed. This directory is generated when running npm install and is not manually edited.

## Setup

### Prerequisites

- Node.js installed on your system.
- Apache Kafka installed and running.
- A running Kafka broker (e.g., 192.168.1.6:9092).

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/kafka-food-delivery.git
    ```
2. Navigate to the project directory:
    ```bash
    cd kafka-food-delivery
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

### Kafka Setup

1. Start Kafka and Zookeeper (if not already running):

    ```bash
    zookeeper-server-start.sh config/zookeeper.properties
    kafka-server-start.sh config/server.properties
    ```

2. Create Kafka topics using the admin script:

    ```bash
    node admin.js
    ```

## Execution

### Running the Producers

1. **Rider Producer**:
   This script sends rider location updates. You can input rider name and location (e.g., John north).

    ```bash
    node producers/riderProducer.js
    ```

3. **Order Producer**:
This script sends order status updates. You can input order ID and status (e.g., order123 delivered).

    ```bash
    node producers/orderProducer.js
    ```

3. **Delivery Producer**:
This script sends delivery status updates. You can input delivery ID and status (e.g., delivery456 in-transit).

    ```bash
    node producers/deliveryProducer.js
    ```

### Running the Consumers

1. **Rider Location Consumer**:
This consumer listens to the rider-updated topic and processes rider location updates. Run the consumer with a specific group ID (e.g., locationGroup).

    ```bash
    node consumers/riderLocationConsumer.js locationGroup
    ```

2. **Rider Assignment Consumer**:
This consumer listens to the rider assignment topic (if implemented) and processes assignments. Run with a specific group ID (e.g., assignmentGroup).

    ```bash
    node consumers/riderAssignmentConsumer.js assignmentGroup
    ```

3. **Order Consumer**:
This consumer listens to the order-status topic and processes order status updates. Run with a specific group ID (e.g., statusGroup).

    ```bash
    node consumers/orderConsumer.js statusGroup
    ```

4. **Delivery Consumer**:
This consumer listens to the delivery-updates topic and processes delivery status updates. Run with a specific group ID (e.g., deliveryGroup).

    ```bash
    node consumers/deliveryConsumer.js deliveryGroup
    ```


### Testing the System

- Start the Kafka broker and ensure the topics are created.
- Run the producer scripts to send rider, order, and delivery updates.
- Run the consumer scripts in separate terminals to see the messages being processed in real-time.


## Conclusion

This project demonstrates the use of Apache Kafka to simulate a real-time food delivery tracking system. By utilizing different producers and consumers, the system effectively handles and processes various aspects of the delivery process.
