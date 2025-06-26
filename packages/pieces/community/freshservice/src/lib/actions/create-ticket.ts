import { createAction, Property } from '@activepieces/pieces-framework';
import { HttpMethod } from '@activepieces/pieces-common';
import { freshserviceAuth, freshserviceRequest, FreshserviceAuth } from '../common';

export const createTicket = createAction({
  auth: freshserviceAuth,
  name: 'create_ticket',
  displayName: 'Create Ticket',
  description: 'Create a Freshservice ticket',
  props: {
    subject: Property.ShortText({ displayName: 'Subject', required: true }),
    description: Property.LongText({ displayName: 'Description', required: true }),
    email: Property.ShortText({ displayName: 'Requester Email', required: false }),
    requester_id: Property.Number({ displayName: 'Requester ID', required: false }),
    priority: Property.Number({ displayName: 'Priority', required: false }),
    status: Property.Number({ displayName: 'Status', required: false }),
  },
  async run(ctx) {
    const auth = ctx.auth as FreshserviceAuth;
    const body: Record<string, unknown> = {
      subject: ctx.propsValue.subject,
      description: ctx.propsValue.description,
      priority: ctx.propsValue.priority,
      status: ctx.propsValue.status,
    };
    if (ctx.propsValue.email) body['email'] = ctx.propsValue.email;
    if (ctx.propsValue.requester_id) body['requester_id'] = ctx.propsValue.requester_id;

    const res = await freshserviceRequest(auth, {
      method: HttpMethod.POST,
      path: '/tickets',
      body,
    });
    return res.body;
  },
});
