import { SexoEnum } from './sexo.enum';

export interface AutorInterface {
  id?: number | null;
  nome: string;
  dataNascimento: Date;
  sexo: SexoEnum;
  generoLiterario: string;
  qtdLivrosLidos: number;
  ultLivroslidos: string;
  indicacao: boolean;
}
