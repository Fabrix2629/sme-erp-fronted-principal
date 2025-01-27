import { Component } from '@angular/core';
import { SmClienteService } from '../../core/services/sm-cliente.service';
import { SmCliente } from '../../shared/models/Clientes/SmClientes';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-clientes-listado',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './clientes-listado.component.html',
  styleUrl: './clientes-listado.component.scss',
})
export default class ClientesListadoComponent {
  listClientes: SmCliente[] = [];
  constructor(private readonly _SmClienteService: SmClienteService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this._SmClienteService.list().subscribe((clientes) => {
      this.listClientes = clientes;
    });
  }

  eliminarCliente(cliente: SmCliente) {
    this._SmClienteService.delete(cliente.idEntidad).subscribe(() => {
      this.loadAll();
    });
  }
}
