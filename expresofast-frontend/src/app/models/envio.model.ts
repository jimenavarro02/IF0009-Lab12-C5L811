export interface Envio {
  id?: number;
  codigoRastreo?: string;
  destinatario: string;
  direccionDestino: string;
  montoFlete: number;
  estado?: string;
  fechaCreacion?: string;
}

export interface CrearEnvioDTO {
  numeroRastreo?: string;
  destinatario: string;
  direccionDestino: string;
  montoFlete: number;
}