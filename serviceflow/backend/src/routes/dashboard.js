const router = require('express').Router();
const prisma = require('../services/prisma');
const { auth } = require('../middlewares/auth');

router.get('/', auth, async (_req, res, next) => {
  try {
    const [customers, activeServices, completedServices, income, expense, servicesByStatus, recentServices] = await Promise.all([
      prisma.customer.count(),
      prisma.service.count({ where: { status: { in: ['RECEIVED','DIAGNOSIS','QUOTE','APPROVED','IN_PROGRESS','READY'] } } }),
      prisma.service.count({ where: { status: 'DELIVERED' } }),
      prisma.payment.aggregate({ _sum: { amount: true }, where: { type: 'INCOME', status: 'PAID' } }),
      prisma.payment.aggregate({ _sum: { amount: true }, where: { type: 'EXPENSE', status: 'PAID' } }),
      prisma.service.groupBy({ by: ['status'], _count: { _all: true } }),
      prisma.service.findMany({ take: 6, orderBy: { createdAt: 'desc' }, include: { customer: true, equipment: true } })
    ]);

    const months = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      const agg = await prisma.payment.aggregate({ _sum: { amount: true }, where: { type: 'INCOME', status: 'PAID', paidAt: { gte: start, lt: end } } });
      months.push({ month: start.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', ''), value: Number(agg._sum.amount || 0) });
    }

    res.json({
      metrics: {
        customers,
        activeServices,
        completedServices,
        revenue: Number(income._sum.amount || 0),
        expenses: Number(expense._sum.amount || 0),
        result: Number(income._sum.amount || 0) - Number(expense._sum.amount || 0)
      },
      servicesByStatus: servicesByStatus.map(x => ({ status: x.status, count: x._count._all })),
      revenueByMonth: months,
      recentServices
    });
  } catch (e) { next(e); }
});
module.exports = router;
