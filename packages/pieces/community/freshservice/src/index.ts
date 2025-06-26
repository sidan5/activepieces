import { createPiece } from '@activepieces/pieces-framework';
import { PieceCategory } from '@activepieces/shared';
import { createCustomApiCallAction } from '@activepieces/pieces-common';
import { freshserviceAuth, baseUrl } from './lib/common';
import { createTicket } from './lib/actions/create-ticket';
import { updateTicket } from './lib/actions/update-ticket';
import { deleteTicket } from './lib/actions/delete-ticket';
import { getTicket } from './lib/actions/get-ticket';
import { listTickets } from './lib/actions/list-tickets';
import { addNote } from './lib/actions/add-note';
import { assignAgent } from './lib/actions/assign-agent';
import { assignGroup } from './lib/actions/assign-group';
import { assignRequester } from './lib/actions/assign-requester';
import { createApproval } from './lib/actions/create-approval';
import { getTicketConversations } from './lib/actions/get-conversations';
import { getTicketCount } from './lib/actions/get-ticket-count';
import { listAgents } from './lib/actions/list-agents';
import { listDepartments } from './lib/actions/list-departments';
import { listGroups } from './lib/actions/list-groups';
import { listProducts } from './lib/actions/list-products';
import { listRequesters } from './lib/actions/list-requesters';
import { uploadAttachment } from './lib/actions/upload-attachment';
import { mcpExecutionStarted, mcpStepApprovedRejected, mcpStepTriggered, ticketUpdatedViaMcp } from './lib/triggers';

export const freshservice = createPiece({
  displayName: 'Freshservice',
  description: 'IT service management platform',
  logoUrl: 'https://cdn.activepieces.com/pieces/freshservice.png',
  authors: ['OpenAI-Assistant'],
  categories: [PieceCategory.CUSTOMER_SUPPORT],
  minimumSupportedRelease: '0.50.0',
  auth: freshserviceAuth,
  actions: [
    createTicket,
    updateTicket,
    deleteTicket,
    getTicket,
    listTickets,
    addNote,
    assignAgent,
    assignGroup,
    assignRequester,
    createApproval,
    getTicketConversations,
    getTicketCount,
    listAgents,
    listDepartments,
    listGroups,
    listProducts,
    listRequesters,
    uploadAttachment,
    createCustomApiCallAction({
      baseUrl: (auth) => baseUrl(auth as any),
      auth: freshserviceAuth,
      authMapping: async (auth) => ({
        Authorization: `Basic ${Buffer.from(`${(auth as any).apiKey}:X`).toString('base64')}`,
      }),
    }),
  ],
  triggers: [
    mcpStepTriggered,
    mcpStepApprovedRejected,
    mcpExecutionStarted,
    ticketUpdatedViaMcp,
  ],
});
