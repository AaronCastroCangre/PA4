import { Router } from 'express';
import pedidoRoutes from './pedido.routes.js';
import mesaRoutes from './mesa.routes.js';

const router = Router();

router.use('/pedidos', pedidoRoutes);
router.use('/mesas', mesaRoutes);

export default router;
