import { createTrigger, TriggerStrategy, Property } from '@activepieces/pieces-framework';
import { freshserviceAuth } from '../common';

export function makeWebhookTrigger(name: string, displayName: string, description: string) {
  return createTrigger({
    name,
    displayName,
    description,
    auth: freshserviceAuth,
    props: {
      md: Property.MarkDown({ value: 'Use this trigger with the Freshservice MCP webhook events.' }),
    },
    type: TriggerStrategy.WEBHOOK,
    async onEnable() {
      /* webhook created by platform */
    },
    async onDisable() {
      /* webhook removed by platform */
    },
    async run(context) {
      return [context.payload.body];
    },
    sampleData: {},
  });
}
