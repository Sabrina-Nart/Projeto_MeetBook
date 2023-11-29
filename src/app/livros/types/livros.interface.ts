import { GeneroEnum } from './genero.enum';

export interface LivrosInterface {
  id?: number | null;
  nome: string;
  autor: string;
  dataNascimento: Date;
  genero: GeneroEnum;
  descricao: string;
  valor: number;
  qtdPaginas: number;
  avaliacao: boolean;

}
