const router = require('express').Router();
const { z } = require('zod');
const prisma = require('../services/prisma');
const { auth } = require('../middlewares/auth');

const schema = z.object({ name: z.string().min(2), email: z.string().email().optional().or(z.literal('')), phone: z.string().min(8), document: z.string().optional(), address: z.string().optional(), notes: z.string().optional() });
router.use(auth);

router.get('/', async (req, res, next) => {
  try {
    const search = String(req.query.search || '');
    const customers = await prisma.customer.findMany({ where: search ? { OR: [{ name: { contains: search, mode: 'insensitive' } }, { phone: { contains: search } }, { document: { contains: search } }] } : undefined, orderBy: { createdAt: 'desc' }, include: { equipment: true, _count: { select: { services: true } } } });
    res.json(customers);
  } catch (e) { next(e); }
});

router.post('/', async (req, res, next) => { try { const data = schema.parse(req.body); res.status(201).json(await prisma.customer.create({ data })); } catch (e) { next(e); } });
router.get('/:id', async (req, res, next) => { try { const c = await prisma.customer.findUnique({ where: { id: req.params.id }, include: { equipment: true, services: { orderBy: { createdAt: 'desc' } } } }); if (!c) return res.status(404).json({ error: 'Cliente não encontrado' }); res.json(c); } catch(e){next(e);} });
router.put('/:id', async (req, res, next) => { try { const data = schema.partial().parse(req.body); res.json(await prisma.customer.update({ where: { id: req.params.id }, data })); } catch(e){next(e);} });
router.delete('/:id', async (req, res, next) => { try { await prisma.customer.delete({ where: { id: req.params.id } }); res.status(204).end(); } catch(e){next(e);} });
module.exports = router;
