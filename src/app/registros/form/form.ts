import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ApiService } from '../../core/services/api';

interface BitacoraRegistro {
  idUsuario: string;
  idOperacion: string;
  idComando: string;
  idSistema: string;
  idOficina: string;
  IDInstitucion: number;
  tabla: string;
  entrada: string;
  fechaHora?: string;
  nombreEquipo?: string;
  ipEquipo?: string;
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './form.html',
  styleUrls: ['./form.scss']
})
export class FormComponent implements OnInit {
  usuarios: any[] = [];
  operaciones: any[] = [];
  comandos: any[] = [];
  oficinas: any[] = [];
  tablas = ['Usuarios', 'Productos', 'Ventas', 'Comando', 'Sistema', 'Oficina', 'Operacion'];
  instituciones = [1,2,3,4,5];

  registro: BitacoraRegistro = {
    idUsuario: '',
    idOperacion: '',
    idComando: '',
    idSistema: '',
    idOficina: '',
    IDInstitucion: 1,
    tabla: '',
    entrada: ''
  };

  mensaje: string = '';

  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.cargarCombos();
    if (this.data?.sistemaId) {
    this.registro.idSistema = this.data.sistemaId; // Traer sistema del componente list
  }
  }

  cargarCombos() {
    this.apiService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        console.log('Usuarios cargados:', this.usuarios);
      },
      error: () => (this.mensaje = 'Error al cargar usuarios')
    });
    this.apiService.getOperaciones().subscribe({
      next: (data) => {
        this.operaciones = data;
        console.log('Operaciones cargadas:', this.operaciones);
      },
      error: () => (this.mensaje = 'Error al cargar operaciones')
    });

    this.apiService.getComandos().subscribe({
      next: (data) => {
      this.comandos = data;
      console.log('Comandos cargados:', this.comandos);
      },
      error: () => (this.mensaje = 'Error al cargar comandos')
    });

    this.apiService.getOficinas().subscribe({
      next: (data) => {
        this.oficinas = data;
        console.log('Oficinas cargadas:', this.oficinas);
      },
      error: () => (this.mensaje = 'Error al cargar oficinas')
    });
  }

  guardar() {
    if (!this.registro.idUsuario || !this.registro.idOperacion || !this.registro.idSistema ||
        !this.registro.idOficina || !this.registro.tabla || !this.registro.entrada || !this.registro.idComando) {
      this.mensaje = 'Debe completar todos los campos obligatorios.';    
      return;
    }

    const payload: BitacoraRegistro = {
      ...this.registro,
      IDInstitucion: Math.floor(Math.random() * 5) + 1,
      fechaHora: new Date().toISOString(),
      nombreEquipo: navigator.userAgent || 'Equipo desconocido',
      ipEquipo: '0.0.0.0'
    };


    console.log('Enviando a la API:', payload);

    this.apiService.insertarBitacora(payload).subscribe({
      next: () => {
        this.mensaje = 'Registro guardado correctamente.';
        setTimeout(() => this.dialogRef.close(payload), 1000);
      },
      error: (err) => {
        console.error(err);
        this.mensaje = 'Error al guardar registro.';
      }
    });
  }

  cancelar() {
    this.dialogRef.close();
  }
}
