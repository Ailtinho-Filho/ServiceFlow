const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();
const money = (v) => Number(v).toFixed(2);

async function main() {
  await prisma.payment.deleteMany();
  await prisma.quote.deleteMany();
  await prisma.service.deleteMany();
  await prisma.equipment.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash('123456', 10);
  const admin = await prisma.user.create({
    data: { name: 'Admin ServiceFlow', email: 'admin@serviceflow.dev', passwordHash, role: 'ADMIN' }
  });
  const technician = await prisma.user.create({
    data: { name: 'Carlos Técnico', email: 'tecnico@serviceflow.dev', passwordHash, role: 'TECHNICIAN' }
  });

  const customers = await Promise.all([
    prisma.customer.create({ data: { name: 'João Silva', email: 'joao@email.com', phone: '(14) 99999-1111', document: '123.456.789-00', address: 'Bauru - SP' } }),
    prisma.customer.create({ data: { name: 'Metalúrgica São Paulo', email: 'contato@metalsp.com', phone: '(14) 98888-2222', document: '12.345.678/0001-90', address: 'Distrito Industrial - Bauru' } }),
    prisma.customer.create({ data: { name: 'Mariana Oliveira', email: 'mariana@email.com', phone: '(14) 97777-3333', address: 'Centro - Bauru' } })
  ]);

  const [laser, notebook, compressor] = await Promise.all([
    prisma.equipment.create({ data: { customerId: customers[0].id, name: 'Máquina de corte laser', brand: 'Romac', model: 'LZ-40', serialNumber: 'LZ401245' } }),
    prisma.equipment.create({ data: { customerId: customers[1].id, name: 'Notebook corporativo', brand: 'Dell', model: 'Latitude 5420', serialNumber: 'DL5420-7788' } }),
    prisma.equipment.create({ data: { customerId: customers[2].id, name: 'Compressor de ar', brand: 'Schulz', model: 'CSV 10/150', serialNumber: 'SCZ-9901' } })
  ]);

  const service1 = await prisma.service.create({ data: {
    customerId: customers[0].id, equipmentId: laser.id, technicianId: technician.id,
    title: 'Troca da fonte de alimentação', description: 'Equipamento apresenta falhas de acionamento.',
    status: 'APPROVED', laborCost: money(300), partsCost: money(850), totalCost: money(1150), dueDate: new Date(Date.now() + 5*86400000)
  }});
  await prisma.quote.create({ data: { serviceId: service1.id, partsCost: money(850), laborCost: money(300), discount: money(0), total: money(1150), status: 'APPROVED', validUntil: new Date(Date.now() + 7*86400000) } });

  await prisma.service.create({ data: {
    customerId: customers[1].id, equipmentId: notebook.id, technicianId: technician.id,
    title: 'Formatação e manutenção preventiva', description: 'Sistema lento e limpeza interna.',
    status: 'IN_PROGRESS', laborCost: money(180), partsCost: money(120), totalCost: money(300), dueDate: new Date(Date.now() + 2*86400000)
  }});

  await prisma.service.create({ data: {
    customerId: customers[2].id, equipmentId: compressor.id,
    title: 'Diagnóstico de ruído', description: 'Avaliação de vibração e ruído anormal.',
    status: 'DIAGNOSIS', laborCost: money(100), partsCost: money(0), totalCost: money(100), dueDate: new Date(Date.now() + 4*86400000)
  }});

  await prisma.payment.createMany({ data: [
    { description: 'OS #1 - Fonte laser', type: 'INCOME', status: 'PAID', amount: money(1150), dueDate: new Date(), paidAt: new Date(), category: 'Serviço' },
    { description: 'OS #2 - Manutenção notebook', type: 'INCOME', status: 'PENDING', amount: money(300), dueDate: new Date(Date.now() + 4*86400000), category: 'Serviço' },
    { description: 'Compra de componentes', type: 'EXPENSE', status: 'PAID', amount: money(680), dueDate: new Date(), paidAt: new Date(), category: 'Materiais' },
    { description: 'Internet e telefonia', type: 'EXPENSE', status: 'PENDING', amount: money(220), dueDate: new Date(Date.now() + 8*86400000), category: 'Operacional' }
  ]});

  console.log('Seed concluído. Login: admin@serviceflow.dev / 123456');
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
