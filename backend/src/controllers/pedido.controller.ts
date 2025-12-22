import type { Request, Response } from 'express';
import { pedidoService } from '../services/pedido.service.js';
import type { NuevoPedidoSchema, CambiarEstadoSchema } from '../schemas/index.js';

class PedidoController {
  getAll(_req: Request, res: Response): void {
    const pedidos = pedidoService.getAll();
    res.json(pedidos);
  }

  getById(req: Request, res: Response): void {
    const id = parseInt(req.params.id, 10);
    const pedido = pedidoService.getById(id);

    if (!pedido) {
      res.status(404).json({ error: 'Pedido no encontrado' });
      return;
    }

    res.json(pedido);
  }

  create(req: Request<unknown, unknown, NuevoPedidoSchema>, res: Response): void {
    const pedido = pedidoService.create(req.body);
    res.status(201).json(pedido);
  }

  updateEstado(req: Request<{ id: string }, unknown, CambiarEstadoSchema>, res: Response): void {
    const id = parseInt(req.params.id, 10);
    const pedido = pedidoService.updateEstado(id, req.body.nuevoEstado);

    if (!pedido) {
      res.status(404).json({ error: 'Pedido no encontrado' });
      return;
    }

    res.json(pedido);
  }

  delete(req: Request, res: Response): void {
    const id = parseInt(req.params.id, 10);
    const deleted = pedidoService.delete(id);

    if (!deleted) {
      res.status(404).json({ error: 'Pedido no encontrado' });
      return;
    }

    res.status(204).send();
  }
}

export const pedidoController = new PedidoController();
