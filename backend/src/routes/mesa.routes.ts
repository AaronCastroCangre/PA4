import { Router } from 'express';
import { mesaController } from '../controllers/mesa.controller.js';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Mesa:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         numeroMesa:
 *           type: integer
 *           example: 1
 *         cliente:
 *           type: string
 *           example: "Juan Pérez"
 *         capacidad:
 *           type: integer
 *           example: 4
 *         estado:
 *           type: string
 *           enum: [ocupada, disponible]
 *           example: "ocupada"
 */

/**
 * @swagger
 * /api/mesas:
 *   get:
 *     summary: Obtener todas las mesas
 *     tags: [Mesas]
 *     responses:
 *       200:
 *         description: Lista de mesas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Mesa'
 */
router.get('/', mesaController.getAll.bind(mesaController));

export default router;
