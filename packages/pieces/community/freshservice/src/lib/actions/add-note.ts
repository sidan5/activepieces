import { createAction, Property } from '@activepieces/pieces-framework';
import { HttpMethod } from '@activepieces/pieces-common';
import { freshserviceAuth, freshserviceRequest, FreshserviceAuth } from '../common';

export const addNote = createAction({
  auth: freshserviceAuth,
  name: 'add_note_to_ticket',
  displayName: 'Add Note to Ticket',
  description: 'Add a note to a ticket',
  props: {
    ticket_id: Property.Number({ displayName: 'Ticket ID', required: true }),
    body: Property.LongText({ displayName: 'Note', required: true }),
  },
  async run(ctx) {
    const auth = ctx.auth as FreshserviceAuth;
    const res = await freshserviceRequest(auth, {
      method: HttpMethod.POST,
      path: `/tickets/${ctx.propsValue.ticket_id}/notes`,
      body: { body: ctx.propsValue.body },
    });
    return res.body;
  },
});
