import { makeWebhookTrigger } from './generic-webhook';

export const mcpStepTriggered = makeWebhookTrigger('mcp_step_triggered', 'MCP Step Triggered', 'Triggered when an MCP step runs');
export const mcpStepApprovedRejected = makeWebhookTrigger('mcp_step_approved_rejected', 'MCP Step Approved or Rejected', 'Triggered when an MCP step is approved or rejected');
export const mcpExecutionStarted = makeWebhookTrigger('mcp_execution_started', 'New MCP Execution Started', 'Triggered when a new MCP execution starts');
export const ticketUpdatedViaMcp = makeWebhookTrigger('ticket_updated_mcp', 'Ticket Updated via MCP', 'Triggered when a ticket is updated through MCP');
