import { Component, OnInit } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { Jugador } from '../model/Jugador';
import { firstValueFrom } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { debug } from 'console';
import { Equipo } from '../model/Equipo';
import { Menu } from '../shared/menu/menu';
import { Header } from '../shared/header/header';

@Component({
  selector: 'app-portaljugadores',
  imports: [FormsModule, HttpClientModule, NgFor, NgIf, Menu, Header],
  templateUrl: './portaljugadores.html',
  styleUrl: './portaljugadores.css'
})
export class Portaljugadores implements OnInit  {
  
  nidJugador: string = '';
  nidEquipo: number = 0 ;
  nNombre: string = "";
  nPosicion: string = '';
  nDorsal: string = ''; 
  nEdad: string = '';
  nValor: string = '';
  dropEquipos: any;
  jugadores: any[] = [];
  equipos: Equipo[] = [];



  constructor(private cdr: ChangeDetectorRef, private http: HttpClient) {
  }

  ngOnInit(): void {

    this.cargarDatosTabla();
    this.cargarDatosEquipos();
    
  }
  

  cargarDatosTabla(){
      const urlJugadores = "http://localhost:5156/" + 'api/Jugador/Jugador';
      this.http.get<Jugador[]>(urlJugadores).subscribe({
        next: (data) => {
          this.jugadores = data;
          console.log('Jugadores obtenidos:', this.jugadores);

           this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        }
      });
  }

  cargarDatosEquipos(){
    const urlEquipos = "http://localhost:5156/" + 'api/Equipo/Equipos';
      this.http.get<Equipo[]>(urlEquipos).subscribe({
        next: (data) => {
          this.dropEquipos = data;
          console.log('Equipos obtenidos:', this.equipos);

           //this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        }
      });
  }

  async agregarJugador(): Promise<void> {

    debugger;

    if (this.nidJugador.length > 0) {
      //Actualizar el alumno existente

     // this.nidEquipo = this.dropEquipos.idEquipo;

      let jugadorActualizado = {
        idJugador: parseInt(this.nidJugador),
        idEquipo: this.nidEquipo,
        nombre: this.nNombre,
        posicion: this.nPosicion,
        dorsal: parseInt(this.nDorsal),
        edad: parseInt(this.nEdad),
        valor: parseInt(this.nValor)
      };
      const urlJugador = "http://localhost:5156/" + 'api/Jugador/Jugador';


      this.http.put<Jugador>(urlJugador, jugadorActualizado).subscribe({
      next: (data) => {
        debugger;
        jugadorActualizado = data;
        
         console.log('Nuevo jugador agregado:', jugadorActualizado);
        //actualizar la lista de alumnos

         this.cargarDatosTabla();

      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });



    }else{

      debugger;
      console.log("grabando jugador");

       // this.nidEquipo = this.dropEquipos.idEquipo;

      let nuevoJugador = {
      // idJugador: parseInt(this.nidJugador),
        idEquipo: this.nidEquipo,
        nombre: this.nNombre,
        posicion: this.nPosicion,
        dorsal: parseInt(this.nDorsal),
        edad: parseInt(this.nEdad),
        valor: parseInt(this.nValor)
    };


     const urlJugador = "http://localhost:5156/" + 'api/Jugador/Jugador';
    this.http.post<Jugador>(urlJugador, nuevoJugador).subscribe({
      next: (data) => {
        debugger;
        nuevoJugador = data;
         
         console.log('Nuevo jugador agregado:', nuevoJugador);
      



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

    
      this.nidJugador = "";
      this.nNombre = "";
      this.nPosicion = "";
      this.nDorsal = "";
      this.nEdad = "";
      this.nValor = "";
      //this.cdr.detectChanges();
    }

 

    traerJugador(n: number): void {
      const urlJugadores = "http://localhost:5156/" + 'api/Jugador/Jugador/' + n;
      this.http.get<Jugador>(urlJugadores).subscribe({
        next: (data) => {
          debugger;
          this.nidJugador = data.idJugador.toString();
          
        this.nidEquipo = data.idEquipo;
        // this.dropEquipos = this.equipos;
         // this.dropEquipos = this.equipos.filter(x => x.idEquipo == parseInt(this.nidEquipo));
          

          this.nNombre = data.nombre;
          this.nPosicion = data.posicion;
          this.nDorsal = data.dorsal.toString();
          this.nEdad = data.edad.toString();
          this.nValor = data.valor.toString();
          // Aquí Angular detecta los cambios automáticamente
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        }
      });
    }


    borrarJugador(){
     if (confirm("¿Deseas borrar este jugador?")){
      debugger;
      console.log("borrar jugador");
     
    
     let jugadorborrado = parseInt(this.nidJugador);
      const urlJugador = "http://localhost:5156/" + 'api/Jugador/Jugador/' + jugadorborrado;


      this.http.delete(urlJugador).subscribe({
      next: (data) => {

        
         console.log('Nuevo jugador borrado:', jugadorborrado);
        //actualizar la lista de alumnos

        this.cargarDatosTabla();
        this.limpiarCampos();

      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
    }else{
      console.log("no se borrará este jugador ")
     }
  }


  formatCurrency(amount: number, locale: string = 'en-US', currency: string = 'USD'): string {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
      }).format(amount);
  }
}
     

    
