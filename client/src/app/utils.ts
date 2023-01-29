import type { Ticket } from '@acme/shared-models';

export function matchesStatus(tickets: Ticket[], status: string) {
  return tickets.filter((ticket) => {
    if (!status) return true;
    if (status === 'completed' && ticket.completed) return true;
    if (status === 'open' && !ticket.completed) return true;
    return false;
  });
};