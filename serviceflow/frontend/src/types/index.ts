export type User = { id: string; name: string; email: string; role: string }
export type Customer = { id: string; name: string; email?: string | null; phone: string; document?: string | null; address?: string | null; _count?: { services: number } }
export type Service = {
  id: string; code: number; title: string; status: string; totalCost: number | string; receivedAt: string; dueDate?: string | null;
  customer: Customer; equipment?: { name: string; brand?: string | null; model?: string | null } | null; technician?: { name: string } | null
}
export type Payment = { id: string; description: string; type: 'INCOME'|'EXPENSE'; status: string; amount: number|string; dueDate: string; category?: string|null }
export type Dashboard = { metrics: { customers:number; activeServices:number; completedServices:number; revenue:number; expenses:number; result:number }; servicesByStatus:{status:string;count:number}[]; revenueByMonth:{month:string;value:number}[]; recentServices:Service[] }
