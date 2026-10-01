import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EnvioService } from '../../services/envio.service';
import { Envio } from '../../models/envio.model';

@Component({
  selector: 'app-envio-tracking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './envio-tracking.component.html',
  styleUrls: ['./envio-tracking.component.css']
})
export class EnvioTrackingComponent {
  codigo: string = '';
  envio: Envio | null = null;
  error: string = '';

  constructor(private envioService: EnvioService) {}

  buscar(): void {
    if (!this.codigo.trim()) {
      this.error = 'Ingrese un código de rastreo válido.';
      this.envio = null;
      return;
    }

    this.envioService.obtenerPorRastreo(this.codigo.trim()).subscribe({
      next: (datos: Envio) => {
        this.envio = datos;
        this.error = '';
      },
      error: () => {
        this.envio = null;
        this.error = 'No se encontró el envío solicitado.';
      }
    });
  }

  progreso(): number {
    if (!this.envio || !this.envio.estado) return 0;
    switch (this.envio.estado.toUpperCase()) {
      case 'PENDIENTE':
        return 25;
      case 'EN_TRANSITO':
        return 65;
      case 'ENTREGADO':
        return 100;
      case 'CANCELADO':
        return 0;
      default:
        return 0;
    }
  }
}