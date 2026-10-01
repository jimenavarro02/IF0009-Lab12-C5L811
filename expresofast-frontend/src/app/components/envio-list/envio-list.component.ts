import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EnvioService } from '../../services/envio.service';
import { Envio } from '../../models/envio.model';

@Component({
  selector: 'app-envio-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './envio-list.component.html',
  styleUrls: ['./envio-list.component.css']
})
export class EnvioListComponent implements OnInit {
  envios: Envio[] = [];
  codigoRastreoBusqueda: string = '';
  envioEncontrado: Envio | null = null;
  mensajeError: string = '';

  cargando: boolean = false;
  error: string = '';
  estados: string[] = ['PENDIENTE', 'EN_TRANSITO', 'ENTREGADO', 'CANCELADO'];

  constructor(private envioService: EnvioService) {}

  ngOnInit(): void {
    this.cargarEnvios();
  }

  cargarEnvios(): void {
    this.cargando = true;
    this.error = '';

    this.envioService.obtenerTodos().subscribe({
      next: (data: Envio[]) => {
        this.envios = data;
        this.cargando = false;
      },
      error: (err: any) => {
        console.error('Error al cargar envíos:', err);
        this.error = 'Ocurrió un error al cargar la lista de envíos.';
        this.cargando = false;
      }
    });
  }

  buscarPorRastreo(): void {
    if (!this.codigoRastreoBusqueda.trim()) {
      this.cargarEnvios();
      this.envioEncontrado = null;
      this.mensajeError = '';
      return;
    }

    this.envioService.buscarPorRastreo(this.codigoRastreoBusqueda.trim()).subscribe({
      next: (data: Envio) => {
        this.envioEncontrado = data;
        this.mensajeError = '';
      },
      error: () => {
        this.envioEncontrado = null;
        this.mensajeError = 'No se encontró ningún envío con ese código de rastreo.';
      }
    });
  }

  cambiarEstado(envio: Envio, nuevoEstado: string): void {
    if (!envio.id) return;

    this.envioService.actualizarEstado(envio.id, nuevoEstado).subscribe({
      next: (actualizado: Envio) => {
        envio.estado = actualizado.estado;
      },
      error: (err: any) => {
        console.error('Error al actualizar el estado:', err);
        this.error = 'No se pudo actualizar el estado del envío.';
      }
    });
  }

  claseEstado(estado?: string): string {
    if (!estado) return 'bg-secondary';
    switch (estado.toUpperCase()) {
      case 'ENTREGADO':
        return 'bg-success';
      case 'EN_TRANSITO':
        return 'bg-primary';
      case 'PENDIENTE':
        return 'bg-warning text-dark';
      case 'CANCELADO':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }
}