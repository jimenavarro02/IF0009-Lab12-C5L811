import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EnvioService } from '../../services/envio.service';
import { CrearEnvioDTO } from '../../models/envio.model';

@Component({
  selector: 'app-envio-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './envio-form.component.html',
  styleUrls: ['./envio-form.component.css']
})
export class EnvioFormComponent {
  @Output() envioCreado = new EventEmitter<void>();

  numeroRastreo: string = '';
  destinatario: string = '';
  direccionDestino: string = '';
  montoFlete: number | null = null;

  mensaje: string = '';
  error: string = '';
  guardando: boolean = false;

  constructor(private envioService: EnvioService) {}

  registrar(): void {
    if (!this.destinatario || !this.direccionDestino || !this.montoFlete) {
      this.error = 'Por favor complete todos los campos obligatorios.';
      this.mensaje = '';
      return;
    }

    this.guardando = true;
    this.error = '';
    this.mensaje = '';

    const nuevoEnvio: CrearEnvioDTO = {
      numeroRastreo: this.numeroRastreo ? this.numeroRastreo : undefined,
      destinatario: this.destinatario,
      direccionDestino: this.direccionDestino,
      montoFlete: Number(this.montoFlete)
    };

    this.envioService.crear(nuevoEnvio).subscribe({
      next: () => {
        this.mensaje = '¡Envío registrado con éxito!';
        this.error = '';
        this.guardando = false;
        this.volver();
        this.envioCreado.emit();
      },
      error: (err) => {
        this.error = 'Error al guardar el envío: ' + (err.error?.message || 'Error del servidor');
        this.mensaje = '';
        this.guardando = false;
      }
    });
  }

  volver(): void {
    this.numeroRastreo = '';
    this.destinatario = '';
    this.direccionDestino = '';
    this.montoFlete = null;
  }
}