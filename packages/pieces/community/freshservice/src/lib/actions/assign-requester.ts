import { createAction, Property } from '@activepieces/pieces-framework';
import { HttpMethod } from '@activepieces/pieces-common';
import { freshserviceAuth, freshserviceRequest, FreshserviceAuth } from '../common';

export const assignRequester = createAction({
  auth: freshserviceAuth,
  name: 'assign_requester_to_ticket',
  displayName: 'Assign Requester to Ticket',
  description: 'Assign a requester to a ticket',
  props: {
    ticket_id: Property.Number({ displayName: 'Ticket ID', required: true }),
    requester_id: Property.Number({ displayName: 'Requester ID', required: true }),
  },
  async run(ctx) {
    const auth = ctx.auth as FreshserviceAuth;
    const res = await freshserviceRequest(auth, {
      method: HttpMethod.PUT,
      path: `/tickets/${ctx.propsValue.ticket_id}`,
      body: { requester_id: ctx.propsValue.requester_id },
    });
    return res.body;
  },
});
