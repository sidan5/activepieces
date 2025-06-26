import { createAction, Property, File } from '@activepieces/pieces-framework';
import { HttpMethod, httpClient } from '@activepieces/pieces-common';
import { freshserviceAuth, FreshserviceAuth, baseUrl, makeHeaders } from '../common';
import FormData from 'form-data';

export const uploadAttachment = createAction({
  auth: freshserviceAuth,
  name: 'upload_attachment_to_ticket',
  displayName: 'Upload Attachment to Ticket',
  description: 'Upload a file attachment to a ticket',
  props: {
    ticket_id: Property.Number({ displayName: 'Ticket ID', required: true }),
    file: Property.File({ displayName: 'File', required: true }),
  },
  async run(ctx) {
    const auth = ctx.auth as FreshserviceAuth;
    const form = new FormData();
    const file: File | undefined = ctx.propsValue.file;
    if (file) {
      form.append('attachments[]', Buffer.from(file.data), file.filename);
    }
    const res = await httpClient.sendRequest({
      method: HttpMethod.POST,
      url: `${baseUrl(auth)}/tickets/${ctx.propsValue.ticket_id}/attachments`,
      headers: { ...makeHeaders(auth), ...form.getHeaders() },
      body: form,
    });
    return res.body;
  },
});
