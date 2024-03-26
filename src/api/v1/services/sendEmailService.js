import {PubSub} from '@google-cloud/pubsub';

const pubSubClient = new PubSub();

export async function publishMessage(topicNameOrId, data) {
    
    const dataBuffer = Buffer.from(JSON.stringify(data));
    try {
      const messageId = await pubSubClient
        .topic(topicNameOrId)
        .publishMessage({data: dataBuffer});
      console.log(`Message ${messageId} published.`);
    } catch (error) {
      console.error(`Received error while publishing: ${error.message}`);
    }
  }
