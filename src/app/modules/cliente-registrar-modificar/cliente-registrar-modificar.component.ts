import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SmClienteService } from '../../core/services/sm-cliente.service';
import { SmCliente } from '../../shared/models/Clientes/SmClientes';
import { SmContribuyente } from '../../shared/models/Clientes/SmContribuyente';
import { SmDocumento } from '../../shared/models/Clientes/SmDocumento';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente-registrar-modificar',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './cliente-registrar-modificar.component.html',
  styleUrl: './cliente-registrar-modificar.component.scss',
})
export default class ClienteRegistrarModificarComponent implements OnInit {
  private readonly _fb = inject(FormBuilder);

  constructor(
    private readonly _SmClienteService: SmClienteService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  form?: FormGroup;
  smCliente?: SmCliente;
  smClienteUpdate: SmCliente[] = [];
  tiposContribuyentes: SmContribuyente[] = [];
  tiposDocumentos: SmDocumento[] = [];

  ngOnInit(): void {
    const idEntidad = this.route.snapshot.paramMap.get('id');
    this._SmClienteService.getTiposContribuyentes().subscribe((data) => {
      this.tiposContribuyentes = data;
    });

    this._SmClienteService.getTiposDocumentos().subscribe((data) => {
      this.tiposDocumentos = data;
    });

    this.validationIdEntidad(idEntidad);
  }

  validationIdEntidad(idEntidad: string | null): void {
    if (idEntidad) {
      this._SmClienteService.get(parseInt(idEntidad)).subscribe((cliente) => {
        this.smCliente = cliente;
        this.form = this._fb.group({
          idEntidad: [cliente.idEntidad, [Validators.required]],
          tipoDocumento: [
            cliente.tipoDocumento?.idTipoDocumento,
            [Validators.required],
          ],
          nroDocumento: [cliente.nroDocumento, [Validators.required]],
          razonSocial: [cliente.razonSocial, [Validators.required]],
          nombreComercial: [cliente.nombreComercial, [Validators.required]],
          tipoContribuyente: [
            cliente.tipoContribuyente?.idTipoContribuyente,
            [Validators.required],
          ],
          direccion: [cliente.direccion, [Validators.required]],
          telefono: [
            cliente.telefono,
            [Validators.required, Validators.pattern('[0-9]*')],
          ],
          estado: [cliente.estado, [Validators.required]],
        });
      });
    } else {
      this.form = this._fb.group({
        idEntidad: ['', [Validators.required]],
        tipoDocumento: ['', [Validators.required]],
        tipoContribuyente: ['', [Validators.required]],
        nroDocumento: ['', [Validators.required]],
        razonSocial: ['', [Validators.required]],
        nombreComercial: ['', [Validators.required]],
        direccion: ['', [Validators.required]],
        telefono: ['', [Validators.required, Validators.pattern('[0-9]*')]],
        estado: ['', [Validators.required]],
      });
    }
  }

  agregarEditar() {
    console.log('Formulario:', this.form?.value);
    console.log('Formulario:', this.form!.value.tipoDocumento);
    const formularioCliente: SmCliente = {
      ...this.form!.value,
      tipoDocumento: {
        idTipoDocumento: Number(this.form!.value.tipoDocumento),
      },
      tipoContribuyente: {
        idTipoContribuyente: Number(this.form!.value.tipoContribuyente),
      },
    };
    console.log('Formularioclie:', formularioCliente);
    const idEntidad = this.smCliente?.idEntidad;

    if (this.smCliente) {
      // Actualizar cliente
      this._SmClienteService
        .update(idEntidad!, formularioCliente)
        .subscribe(() => {
          console.log('Cliente actualizado:', formularioCliente);
          this.router.navigate(['/']);
        });
    } else {
      // Crear cliente
      this._SmClienteService.create(formularioCliente).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
