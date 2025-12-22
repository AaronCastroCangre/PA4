import { mesaRepository } from '../repositories/mesa.repository.js';
import type { Mesa } from '../types/index.js';

class MesaService {
  getAll(): Mesa[] {
    return mesaRepository.getAll();
  }

  getByNumero(numeroMesa: number): Mesa | undefined {
    return mesaRepository.getByNumero(numeroMesa);
  }

  getClienteByMesa(numeroMesa: number): string {
    const mesa = this.getByNumero(numeroMesa);
    return mesa?.cliente || 'Cliente';
  }
}

export const mesaService = new MesaService();
