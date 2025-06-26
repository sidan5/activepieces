import { createAction, Property } from '@activepieces/pieces-framework';
import { HttpMethod } from '@activepieces/pieces-common';
import { freshserviceAuth, freshserviceRequest, FreshserviceAuth } from '../common';

export const deleteTicket = createAction({
  auth: freshserviceAuth,
  name: 'delete_ticket',
  displayName: 'Delete Ticket',
  description: 'Delete a ticket',
  props: {
    ticket_id: Property.Number({ displayName: 'Ticket ID', required: true }),
  },
  async run(ctx) {
    const auth = ctx.auth as FreshserviceAuth;
    const res = await freshserviceRequest(auth, {
      method: HttpMethod.DELETE,
      path: `/tickets/${ctx.propsValue.ticket_id}`,
    });
    return res.body;
  },
});
