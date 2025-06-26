import { PieceAuth, Property } from '@activepieces/pieces-framework';
import { HttpRequest, httpClient } from '@activepieces/pieces-common';

export const freshserviceAuth = PieceAuth.CustomAuth({
  description: 'Provide your Freshservice domain (e.g. `yourcompany.freshservice.com`) and API key.',
  props: {
    domain: Property.ShortText({
      displayName: 'Domain',
      required: true,
    }),
    apiKey: PieceAuth.SecretText({
      displayName: 'API Key',
      required: true,
    }),
  },
  required: true,
});

export type FreshserviceAuth = {
  domain: string;
  apiKey: string;
};

export const baseUrl = (auth: FreshserviceAuth) => `https://${auth.domain}/api/v2`;

export function makeHeaders(auth: FreshserviceAuth): Record<string, string> {
  return {
    Authorization: `Basic ${Buffer.from(`${auth.apiKey}:X`).toString('base64')}`,
  };
}

export async function freshserviceRequest(
  auth: FreshserviceAuth,
  options: Omit<HttpRequest, 'url' | 'headers'> & { path: string }
) {
  const request: HttpRequest = {
    method: options.method,
    url: `${baseUrl(auth)}${options.path}`,
    body: options.body,
    headers: { ...makeHeaders(auth), ...(options.headers ?? {}) },
  };
  return httpClient.sendRequest(request);
}
