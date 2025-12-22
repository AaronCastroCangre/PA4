import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { Mesa } from '../types/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class MesaRepository {
  private mesasPath: string;

  constructor() {
    this.mesasPath = join(__dirname, '../../data/mesas.json');
  }

  getAll(): Mesa[] {
    try {
      const data = readFileSync(this.mesasPath, 'utf8');
      return JSON.parse(data) as Mesa[];
    } catch (error) {
      console.error('Error al leer mesas:', error);
      return [];
    }
  }

  getByNumero(numeroMesa: number): Mesa | undefined {
    const mesas = this.getAll();
    return mesas.find((m) => m.numeroMesa === numeroMesa);
  }
}

export const mesaRepository = new MesaRepository();
