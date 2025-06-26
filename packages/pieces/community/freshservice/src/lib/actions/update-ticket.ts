import { createAction, Property } from '@activepieces/pieces-framework';
import { HttpMethod } from '@activepieces/pieces-common';
import { freshserviceAuth, freshserviceRequest, FreshserviceAuth } from '../common';

export const updateTicket = createAction({
  auth: freshserviceAuth,
  name: 'update_ticket',
  displayName: 'Update Ticket',
  description: 'Update an existing ticket',
  props: {
    ticket_id: Property.Number({ displayName: 'Ticket ID', required: true }),
    subject: Property.ShortText({ displayName: 'Subject', required: false }),
    description: Property.LongText({ displayName: 'Description', required: false }),
    priority: Property.Number({ displayName: 'Priority', required: false }),
    status: Property.Number({ displayName: 'Status', required: false }),
  },
  async run(ctx) {
    const auth = ctx.auth as FreshserviceAuth;
    const body: Record<string, unknown> = {};
    if (ctx.propsValue.subject) body['subject'] = ctx.propsValue.subject;
    if (ctx.propsValue.description) body['description'] = ctx.propsValue.description;
    if (ctx.propsValue.priority) body['priority'] = ctx.propsValue.priority;
    if (ctx.propsValue.status) body['status'] = ctx.propsValue.status;

    const res = await freshserviceRequest(auth, {
      method: HttpMethod.PUT,
      path: `/tickets/${ctx.propsValue.ticket_id}`,
      body,
    });
    return res.body;
  },
});
