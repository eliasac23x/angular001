import { NgClass, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Alumno } from '../model/Alumno';
import { firstValueFrom } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { debug } from 'console';
import { Menu } from '../shared/menu/menu';
import { Header } from '../shared/header/header';

export interface TodoItem {
  id: number;
  task: string;
  completed: boolean; 
}



@Component({
  selector: 'app-alumnos',
imports: [FormsModule, NgFor, HttpClientModule, NgIf, Menu, Header],
  templateUrl: './alumnos.html',
  styleUrl: './alumnos.css'
})
export class Alumnos implements OnInit {
 
  Todolist: TodoItem[] = []
  newTask: string = ''

  nidAlumno: string = "";
  nNombre: string = "";
  nApellidos: string = '';
  nTelefono: string = ''; 
  nDireccion: string = '';
  nMatricula: string = '';


  weather: any[] = [];
  alumnos: any[] = [];


  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.cargarDatosTabla();
  }

   cargarDatosTabla(){
        const urlAlumnos = "http://localhost:5156/" + 'api/Alumno/Alumnos';
    this.http.get<Alumno[]>(urlAlumnos).subscribe({
      next: (data) => {
        //debugger;
        this.alumnos = data;
        console.log('Alumnos obtenidos:', this.alumnos);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });

    }

  addTask():void{
    console.log('Adding task:', this.newTask);
   if (this.newTask.trim () !== '') {
      
      const newTodoItem : TodoItem = {
        id : Date.now(),
        task : this.newTask,
        completed:false
      }

      console.log('New Todo Item:', newTodoItem);
      
      this.Todolist.push(newTodoItem)
      this.newTask = '';
    }
  }

  toggleCompleted(index: number):void {
    this.Todolist[index].completed = !this.Todolist[index].completed;

    console.log(`Task at index ${index} completed status:`, this.Todolist[index].completed);

  }
 
  deletedTask(id: number): void{
  this.Todolist = this.Todolist.filter(item => item.id !== id);
  console.log(this.Todolist);
  }

  async agregarAlumno(): Promise<void> {

    if (this.nidAlumno.length > 0) {
      //Actualizar el alumno existente

      let alumnoActualizado = {
        idAlumno: parseInt(this.nidAlumno),
        nombre: this.nNombre,
        apellidos: this.nApellidos,
        telefono: this.nTelefono,
        direccion: this.nDireccion,
        matricula: this.nMatricula,
      };
      const urlAlumnos = "http://localhost:5156/" + 'api/Alumno/Alumno';


      this.http.put<Alumno>(urlAlumnos, alumnoActualizado).subscribe({
      next: (data) => {
        debugger;
        alumnoActualizado = data;
        
         console.log('Nuevo alumno agregado:', alumnoActualizado);
        //actualizar la lista de alumnos

        this.cargarDatosTabla();

      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });



    }else{


      let nuevoAlumno = {
      nombre: this.nNombre,
      apellidos: this.nApellidos,
      telefono: this.nTelefono,
      direccion: this.nDireccion,
      matricula: this.nMatricula,
    };


     const urlAlumnos = "http://localhost:5156/" + 'api/Alumno/Alumno';
    this.http.post<Alumno>(urlAlumnos, nuevoAlumno).subscribe({
      next: (data) => {
        debugger;
        nuevoAlumno = data;
         
         console.log('Nuevo alumno agregado:', nuevoAlumno);
      

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


   limpiarCampos(): void{

    debugger;

    
      this.nidAlumno = "";
      this.nNombre = "";
      this.nApellidos = "";
      this.nTelefono = "";
      this.nDireccion = "";
      this.nMatricula = "";
     // this.cdr.detectChanges();
    }

  

traerAlumno(n: number): void {
  const urlAlumnos = "http://localhost:5156/" + 'api/Alumno/Alumno/' + n;
  this.http.get<Alumno>(urlAlumnos).subscribe({
    next: (data) => {
      debugger;
      this.nidAlumno = data.idAlumno.toString();
      this.nNombre = data.nombre;
      this.nApellidos = data.apellidos;
      this.nTelefono = data.telefono;
      this.nDireccion = data.direccion;
      this.nMatricula = data.matricula;
      // Aquí Angular detecta los cambios automáticamente
      this.cdr.detectChanges();
    },
    error: (error) => {
      console.error('Error fetching data:', error);
    }
  });
}



 async traerAlumno2(n: number) {

    
  debugger;


   const urlAlumnos = "http://localhost:5156/" + 'api/Alumno/Alumno/'+ n;
   const data: Alumno = await firstValueFrom(this.http.get<Alumno>(urlAlumnos));
  
   console.log('Data fetched successfully:', data);
 
    this.nidAlumno = data.idAlumno.toString();
    this.nNombre = data.nombre;
    this.nApellidos = data.apellidos;
    this.nTelefono = data.telefono;
    this.nDireccion = data.direccion;  
    this.nMatricula = data.matricula;

 

    

   // this.nNombre = "holamundo" + Date.now();
  }

  borrarAlumno(){
    if (confirm("¿Deseas borrar este Aluno?")){
      console.log("borrar alumno");

       let alumnoborrado = parseInt(this.nidAlumno);
      const urlAlumnos = "http://localhost:5156/" + 'api/Alumno/Alumno/' + alumnoborrado;


      this.http.delete(urlAlumnos).subscribe({
      next: (data) => {

        
         console.log('Nuevo alumno borrado:', alumnoborrado);
        //actualizar la lista de alumnos

        this.cargarDatosTabla();
        this.limpiarCampos();

      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });



     }else{
      console.log("no se borrará este alumno ")
     }
  }




}

