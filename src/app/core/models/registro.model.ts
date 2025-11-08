export interface Registro {
  idUsuario: string;
  idOperacion: string;
  idComando: string;
  idSistema: string;
  idOficina: string;
  IDInstitucion: number;
  tabla: string;
  entrada: string;
  fechaHora?: string;
  nombreEquipo?: string;
  ipEquipo?: string;
}
