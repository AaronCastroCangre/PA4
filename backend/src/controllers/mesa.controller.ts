import type { Request, Response } from 'express';
import { mesaService } from '../services/mesa.service.js';

class MesaController {
  getAll(_req: Request, res: Response): void {
    const mesas = mesaService.getAll();
    res.json(mesas);
  }
}

export const mesaController = new MesaController();
