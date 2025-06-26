import { createAction } from '@activepieces/pieces-framework';
import { HttpMethod } from '@activepieces/pieces-common';
import { freshserviceAuth, freshserviceRequest, FreshserviceAuth } from '../common';

export const getTicketCount = createAction({
  auth: freshserviceAuth,
  name: 'get_ticket_count',
  displayName: 'Get Ticket Count',
  description: 'Get total ticket count',
  props: {},
  async run(ctx) {
    const auth = ctx.auth as FreshserviceAuth;
    const res = await freshserviceRequest(auth, {
      method: HttpMethod.GET,
      path: '/tickets/count',
    });
    return res.body;
  },
});
