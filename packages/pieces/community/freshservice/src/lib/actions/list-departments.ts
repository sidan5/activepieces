import { createAction, Property } from '@activepieces/pieces-framework';
import { HttpMethod } from '@activepieces/pieces-common';
import { freshserviceAuth, freshserviceRequest, FreshserviceAuth } from '../common';

export const listDepartments = createAction({
  auth: freshserviceAuth,
  name: 'list_departments',
  displayName: 'List Departments',
  description: 'List departments',
  props: {
    page: Property.Number({ displayName: 'Page', required: false }),
    per_page: Property.Number({ displayName: 'Per Page', required: false }),
  },
  async run(ctx) {
    const auth = ctx.auth as FreshserviceAuth;
    const params = new URLSearchParams();
    if (ctx.propsValue.page) params.append('page', ctx.propsValue.page.toString());
    if (ctx.propsValue.per_page) params.append('per_page', ctx.propsValue.per_page.toString());
    const res = await freshserviceRequest(auth, {
      method: HttpMethod.GET,
      path: `/departments?${params.toString()}`,
    });
    return res.body;
  },
});
