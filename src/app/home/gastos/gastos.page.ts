import { Router } from "@angular/router";
import { ActionSheetController, PopoverController } from "@ionic/angular";
import { Component } from "@angular/core";
import { FBservicesService } from "src/app/fbservices.service";
import { LocalNotifications } from "@ionic-native/local-notifications/ngx";
import { NgStyle } from '@angular/common';

@Component({
  selector: "app-gastos",
  templateUrl: "./gastos.page.html",
  styleUrls: ["./gastos.page.scss"]
})
export class GastosPage {
  // mostrar: VisibilityState = "visible";
  mostrar: boolean = false;
  mostrarPagar: boolean = false;
  mostrarEliminar: boolean = false;
  listo: boolean = false;
  id: string;
  //variable suma es la suma de los gastos
  suma;
  //Aquí se guarda el array con todos los gastos
  listaGastosL = [];
  //variable del usuario autenticado
  usuarioUid: string;
  //La segmentación para la opción de efectivo y electronico
  segmentChanged(ev: any) {
    console.log("Segment changed", ev);
  }

  constructor(
    private FB: FBservicesService,
    public actionSheetController: ActionSheetController,
    private router: Router
  ) { }

  async presentActionSheet() {
    //Controla las opciones que puede hacer en ingresos
    const actionSheet = await this.actionSheetController.create({
      header: "Que deseas hacer en gastos",
      buttons: [
        {
          text: "Añadir gasto",
          icon: "add",
          handler: () => {
            this.router.navigate(["registrar-gasto"]);
          }
        },
        {
          text: "Pagar",
          icon: "checkmark-circle",
          handler: () => {
            this.listo = true;
            this.mostrarPagar = !this.mostrarPagar;
            this.mostrarEliminar = false;
            console.log(this.id)
          }
        },
        {
          text: "Eliminar",
          icon: "trash",
          handler: () => {
            this.listo = true;
            this.mostrarEliminar = !this.mostrarEliminar;
            this.mostrarPagar = false;
            console.log(this.id)
          }
        },
        {
          text: "Cancelar",
          icon: "close",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });
    await actionSheet.present();
  }
  accion(dato: string) {
    this.id = dato;
    console.log(this.id);
    this.mostrar = !this.mostrar;   
  }
  eventoEliminar() {
    this.FB.gastoEliminado(this.id);
    this.mostrar = !this.mostrar;   
  }
  
  pagarGasto() {
    this.FB.pagar(this.id);
    this.mostrar = !this.mostrar;   
  }

  listoPE(){
    this.listo = false;
    this.mostrarPagar = false;
    this.mostrarEliminar = false;
  }
}
