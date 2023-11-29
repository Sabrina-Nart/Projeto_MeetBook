import { PaisEnum } from './pais.enum';
import { SexoEnum } from './sexo.enum';

export interface UsuariosInterface {
  id?: number | null;
  nome: string;
  email: string;
  genero: SexoEnum;
  dataNascimento: Date;
  pais: PaisEnum;
  qtdLeituras: number;
  satisfacao: boolean;
}
