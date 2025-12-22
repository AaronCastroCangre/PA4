import { z } from 'zod';

export const estadoPedidoSchema = z.enum(['Pendiente', 'En Preparación', 'Listo para Servir']);

export const nuevoPedidoSchema = z.object({
  mesa: z.string().min(1, 'Mesa es requerida'),
  platos: z.array(z.string().min(1)).min(1, 'Debe incluir al menos un plato'),
  mozoNombre: z.string().optional(),
});

export const cambiarEstadoSchema = z.object({
  pedidoId: z.number().positive('ID de pedido debe ser positivo'),
  nuevoEstado: estadoPedidoSchema,
});

export const pedidoIdParamSchema = z.object({
  id: z.string().transform((val) => parseInt(val, 10)).pipe(z.number().positive()),
});

export type NuevoPedidoSchema = z.infer<typeof nuevoPedidoSchema>;
export type CambiarEstadoSchema = z.infer<typeof cambiarEstadoSchema>;
