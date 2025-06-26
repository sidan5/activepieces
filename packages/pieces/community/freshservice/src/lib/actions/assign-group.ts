import { createAction, Property } from '@activepieces/pieces-framework';
import { HttpMethod } from '@activepieces/pieces-common';
import { freshserviceAuth, freshserviceRequest, FreshserviceAuth } from '../common';

export const assignGroup = createAction({
  auth: freshserviceAuth,
  name: 'assign_group_to_ticket',
  displayName: 'Assign Group to Ticket',
  description: 'Assign a group to a ticket',
  props: {
    ticket_id: Property.Number({ displayName: 'Ticket ID', required: true }),
    group_id: Property.Number({ displayName: 'Group ID', required: true }),
  },
  async run(ctx) {
    const auth = ctx.auth as FreshserviceAuth;
    const res = await freshserviceRequest(auth, {
      method: HttpMethod.PUT,
      path: `/tickets/${ctx.propsValue.ticket_id}`,
      body: { group_id: ctx.propsValue.group_id },
    });
    return res.body;
  },
});
