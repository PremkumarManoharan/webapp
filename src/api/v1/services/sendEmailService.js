import {PubSub} from '@google-cloud/pubsub';
import { logger } from '../config/loggerConfig.js';

const pubSubClient = new PubSub();

export async function publishMessage(topicNameOrId, data) {
    const dataBuffer = Buffer.from(JSON.stringify(data));
    try {
      const messageId = await pubSubClient
        .topic(topicNameOrId)
        .publishMessage({data: dataBuffer});
      logger.info(`Message ${messageId} published.`);
    } catch (error) {
      logger.error(`Received error while publishing: ${error.message}`);
    }
  }
