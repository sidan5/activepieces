import { createAction, Property } from '@activepieces/pieces-framework';
import { HttpMethod } from '@activepieces/pieces-common';
import { freshserviceAuth, freshserviceRequest, FreshserviceAuth } from '../common';

export const createApproval = createAction({
  auth: freshserviceAuth,
  name: 'create_approval_on_ticket',
  displayName: 'Create Approval on Ticket',
  description: 'Create an approval for a ticket',
  props: {
    ticket_id: Property.Number({ displayName: 'Ticket ID', required: true }),
    body: Property.LongText({ displayName: 'Approval Body', required: true }),
  },
  async run(ctx) {
    const auth = ctx.auth as FreshserviceAuth;
    const res = await freshserviceRequest(auth, {
      method: HttpMethod.POST,
      path: `/tickets/${ctx.propsValue.ticket_id}/approvals`,
      body: { body: ctx.propsValue.body },
    });
    return res.body;
  },
});
