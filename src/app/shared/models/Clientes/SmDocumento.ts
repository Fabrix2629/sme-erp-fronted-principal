export class SmDocumento {
  constructor(
    public idTipoDocumento: number | null = null,
    public codigo: string | null = null,
    public nombre: string | null = null,
    public descripcion: string | null = null,
    public estado: boolean | null = null
  ) {}
}
