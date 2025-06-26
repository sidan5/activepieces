import { createAction, Property } from '@activepieces/pieces-framework';
import { HttpMethod } from '@activepieces/pieces-common';
import { freshserviceAuth, freshserviceRequest, FreshserviceAuth } from '../common';

export const assignAgent = createAction({
  auth: freshserviceAuth,
  name: 'assign_agent_to_ticket',
  displayName: 'Assign Agent to Ticket',
  description: 'Assign an agent to a ticket',
  props: {
    ticket_id: Property.Number({ displayName: 'Ticket ID', required: true }),
    agent_id: Property.Number({ displayName: 'Agent ID', required: true }),
  },
  async run(ctx) {
    const auth = ctx.auth as FreshserviceAuth;
    const res = await freshserviceRequest(auth, {
      method: HttpMethod.PUT,
      path: `/tickets/${ctx.propsValue.ticket_id}`,
      body: { responder_id: ctx.propsValue.agent_id },
    });
    return res.body;
  },
});
