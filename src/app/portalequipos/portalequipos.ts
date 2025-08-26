import { Component, OnInit } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { Equipo } from '../model/Equipo';
import { firstValueFrom } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { debug } from 'console';
import { Menu } from '../shared/menu/menu';
import { Header } from '../shared/header/header';

@Component({
  selector: 'app-portalequipos',
  imports: [FormsModule, HttpClientModule, NgFor, NgIf, Menu, Header],
  templateUrl: './portalequipos.html',
  styleUrl: './portalequipos.css'
})
export class Portalequipos implements OnInit  {
  
  nidEquipo: string = "";
  nNombre: string = "";
  nLiga: string = '';
  nEntrenador: string = ''; 
  nPresidente: string = '';

  equipos: any[] = [];

  constructor(private cdr: ChangeDetectorRef, private http: HttpClient) {
  }

  ngOnInit(): void {

    this.cargarDatosTabla();
    
  }
  

  cargarDatosTabla(){
      const urlEquipos = "http://localhost:5156/" + 'api/Equipo/Equipos';
      this.http.get<Equipo[]>(urlEquipos).subscribe({
        next: (data) => {
          this.equipos = data;
          console.log('Equipos obtenidos:', this.equipos);

           this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        }
      });
  }

  async agregarEquipo(): Promise<void> {

    if (this.nidEquipo.length > 0) {
      //Actualizar el alumno existente

      let equipoActualizado = {
        idEquipo: parseInt(this.nidEquipo),
        nombre: this.nNombre,
        liga: this.nLiga,
        entrenador: this.nEntrenador,
        presidente: this.nPresidente,
      };
      const urlEquipo = "http://localhost:5156/" + 'api/Equipo/Equipo';


      this.http.put<Equipo>(urlEquipo, equipoActualizado).subscribe({
      next: (data) => {
        debugger;
        equipoActualizado = data;
        
         console.log('Nuevo equipo agregado:', equipoActualizado);
        //actualizar la lista de alumnos

         this.cargarDatosTabla();

      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });



    }else{


      let nuevoEquipo = {
      nombre: this.nNombre,
      liga: this.nLiga,
      entrenador: this.nEntrenador,
      presidente: this.nPresidente,
    };


     const urlEquipo = "http://localhost:5156/" + 'api/Equipo/Equipo';
    this.http.post<Equipo>(urlEquipo, nuevoEquipo).subscribe({
      next: (data) => {
        debugger;
        nuevoEquipo = data;
         
         console.log('Nuevo equipo agregado:', nuevoEquipo);
      



          this.cargarDatosTabla();
         
          

      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });




    }


    this.limpiarCampos();
   //this.cdr.detectChanges();
    
  }
  
   limpiarCampos(){

    debugger;

    
      this.nidEquipo = "";
      this.nNombre = "";
      this.nLiga = "";
      this.nEntrenador = "";
      this.nPresidente = "";
      //this.cdr.detectChanges();
    }

 

    traerEquipo(n: number): void {
      const urlEquipos = "http://localhost:5156/" + 'api/Equipo/Equipo/' + n;
      this.http.get<Equipo>(urlEquipos).subscribe({
        next: (data) => {
          debugger;
          this.nidEquipo = data.idEquipo.toString();
          this.nNombre = data.nombre;
          this.nLiga = data.liga;
          this.nEntrenador = data.entrenador;
          this.nPresidente = data.presidente;
          // Aquí Angular detecta los cambios automáticamente
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        }
      });
    }


    borrarEquipo(){
     if (confirm("¿Deseas borrar este equipo?")){
      debugger;
      console.log("borrar equipo");
     
    
     let equipoborrado = parseInt(this.nidEquipo);
      const urlEquipos = "http://localhost:5156/" + 'api/Equipo/Equipo/' + equipoborrado;


      this.http.delete(urlEquipos).subscribe({
      next: (data) => {

        
         console.log('Nuevo equipo borrado:', equipoborrado);
        //actualizar la lista de alumnos

        this.cargarDatosTabla();
        this.limpiarCampos();

      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
    }else{
      console.log("no se borrará este equipo ")
     }
  }
}
     

    
