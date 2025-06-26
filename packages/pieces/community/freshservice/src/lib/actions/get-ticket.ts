import { createAction, Property } from '@activepieces/pieces-framework';
import { HttpMethod } from '@activepieces/pieces-common';
import { freshserviceAuth, freshserviceRequest, FreshserviceAuth } from '../common';

export const getTicket = createAction({
  auth: freshserviceAuth,
  name: 'get_ticket',
  displayName: 'Get Ticket',
  description: 'Retrieve a ticket by ID',
  props: {
    ticket_id: Property.Number({ displayName: 'Ticket ID', required: true }),
  },
  async run(ctx) {
    const auth = ctx.auth as FreshserviceAuth;
    const res = await freshserviceRequest(auth, {
      method: HttpMethod.GET,
      path: `/tickets/${ctx.propsValue.ticket_id}`,
    });
    return res.body;
  },
});
