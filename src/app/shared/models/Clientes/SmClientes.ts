import { SmContribuyente } from './SmContribuyente';
import { SmDocumento } from './SmDocumento';

export class SmCliente {
  constructor(
    public idEntidad: number,
    public idtipoDocumento: number | null = null,
    public tipoDocumento: SmDocumento | null = null,
    public nroDocumento: string | null = null,
    public razonSocial: string | null = null,
    public nombreComercial: string | null = null,
    public idTipoContribuyente: number | null = null,
    public tipoContribuyente: SmContribuyente | null = null,
    public direccion: string | null = null,
    public telefono: string | null = null,
    public estado: boolean | null = null
  ) {}
}
