const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return res.status(401).json({ error: 'Token não informado' });
  try {
    req.user = jwt.verify(header.slice(7), process.env.JWT_SECRET || 'dev-secret');
    next();
  } catch {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
}

function roles(...allowed) {
  return (req, res, next) => allowed.includes(req.user?.role) ? next() : res.status(403).json({ error: 'Permissão insuficiente' });
}

module.exports = { auth, roles };
