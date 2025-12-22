import { Router } from 'express';
import { pedidoController } from '../controllers/pedido.controller.js';
import { validateBody } from '../middlewares/validation.js';
import { nuevoPedidoSchema } from '../schemas/index.js';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Pedido:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         mesa:
 *           type: string
 *           example: "1"
 *         nombreCliente:
 *           type: string
 *           example: "Juan Pérez"
 *         platos:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Hamburguesa", "Refresco"]
 *         estado:
 *           type: string
 *           enum: [Pendiente, En Preparación, Listo para Servir]
 *           example: "Pendiente"
 *         mozoNombre:
 *           type: string
 *           example: "Mozo Principal"
 *         fecha:
 *           type: string
 *           format: date-time
 *           example: "2024-01-15T10:30:00.000Z"
 *     NuevoPedido:
 *       type: object
 *       required:
 *         - mesa
 *         - platos
 *       properties:
 *         mesa:
 *           type: string
 *           example: "1"
 *         platos:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Hamburguesa", "Refresco"]
 *         mozoNombre:
 *           type: string
 *           example: "Mozo Principal"
 *     CambiarEstado:
 *       type: object
 *       required:
 *         - nuevoEstado
 *       properties:
 *         nuevoEstado:
 *           type: string
 *           enum: [Pendiente, En Preparación, Listo para Servir]
 *           example: "En Preparación"
 *     ValidationError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Validation Error"
 *         details:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *               message:
 *                 type: string
 */

/**
 * @swagger
 * /api/pedidos:
 *   get:
 *     summary: Obtener todos los pedidos
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pedido'
 */
router.get('/', pedidoController.getAll.bind(pedidoController));

/**
 * @swagger
 * /api/pedidos/{id}:
 *   get:
 *     summary: Obtener un pedido por ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del pedido
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pedido'
 *       404:
 *         description: Pedido no encontrado
 */
router.get('/:id', pedidoController.getById.bind(pedidoController));

/**
 * @swagger
 * /api/pedidos:
 *   post:
 *     summary: Crear un nuevo pedido
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NuevoPedido'
 *     responses:
 *       201:
 *         description: Pedido creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pedido'
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 */
router.post('/', validateBody(nuevoPedidoSchema), pedidoController.create.bind(pedidoController));

/**
 * @swagger
 * /api/pedidos/{id}:
 *   delete:
 *     summary: Eliminar un pedido
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del pedido
 *     responses:
 *       204:
 *         description: Pedido eliminado
 *       404:
 *         description: Pedido no encontrado
 */
router.delete('/:id', pedidoController.delete.bind(pedidoController));

export default router;
