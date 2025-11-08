import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormComponent } from '../form/form';
import { ApiService } from '../../core/services/api';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
    FormComponent
  ],
  templateUrl: './list.html',
  styleUrls: ['./list.scss']
})
export class ListComponent implements OnInit {
  sistemas: any[] = [];
  sistemaId: number | null = null;

  constructor(private dialog: MatDialog, private apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarSistemas();
  }

  cargarSistemas() {
    this.apiService.getSistemas().subscribe({
      next: (data) => {
        this.sistemas = data;
        console.log('Sistemas cargados:', this.sistemas);
      },
      error: (err) => {
        console.error('Error al cargar sistemas:', err);
      }
    });
  }

  abrirAgregar() {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '400px',
      data: { sistemaId: this.sistemaId }
    });
  }
}
