import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CharlaService } from '../../services/charla.service';
import { Charla } from '../../models/charla.model';

@Component({
  selector: 'app-charla-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './charla-list.component.html',
  styleUrls: ['./charla-list.component.css']
})
export class CharlaListComponent implements OnInit {
  charlas: Charla[] = [];
  charlasFiltradas: Charla[] = [];
  busqueda: string = '';
  cargando: boolean = false;
  mensajeError: string = '';
  mensajeExito: string = '';

  constructor(private charlaService: CharlaService) {}

  ngOnInit(): void {
    this.cargarCharlas();
  }

  cargarCharlas(): void {
    this.cargando = true;
    this.mensajeError = '';

    this.charlaService.obtenerTodas().subscribe({
      next: (data: Charla[]) => {
        this.charlas = data;
        this.charlasFiltradas = data;
        this.cargando = false;
      },
      error: (err: any) => {
        console.error('Error al cargar charlas:', err);
        this.mensajeError = 'Ocurrió un error al cargar la lista de charlas.';
        this.cargando = false;
      }
    });
  }

  filtrar(): void {
    if (!this.busqueda.trim()) {
      this.charlasFiltradas = [...this.charlas];
      return;
    }

    const termino = this.busqueda.toLowerCase().trim();
    this.charlasFiltradas = this.charlas.filter(charla =>
      charla.titulo?.toLowerCase().includes(termino) ||
      charla.expositor?.toLowerCase().includes(termino) ||
      charla.lugar?.toLowerCase().includes(termino)
    );
  }

  eliminarCharla(id?: number): void {
    if (!id) return;

    if (confirm('¿Está seguro de que desea eliminar esta charla?')) {
      this.charlaService.eliminar(id).subscribe({
        next: () => {
          this.mensajeExito = 'Charla eliminada correctamente.';
          this.cargarCharlas();
          setTimeout(() => (this.mensajeExito = ''), 3000);
        },
        error: (err: any) => {
          console.error('Error al eliminar la charla:', err);
          this.mensajeError = 'No se pudo eliminar la charla.';
        }
      });
    }
  }

  claseEstado(estado?: string): string {
    if (!estado) return 'bg-secondary';
    switch (estado.toUpperCase()) {
      case 'PROGRAMADA':
      case 'ACTIVA':
        return 'bg-primary';
      case 'EN_CURSO':
        return 'bg-success';
      case 'FINALIZADA':
        return 'bg-secondary';
      case 'CANCELADA':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }
}