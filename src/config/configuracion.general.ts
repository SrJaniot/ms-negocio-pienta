export namespace ConfiguracionGeneral {
  //-------------------------carpetas -------------------------------------
  export const carpetaFotosContexto: string = "../../../../archivos/fotoscontexto";
  export const carpetaFotosPregunta: string = "../../../../archivos/fotospregunta";
  export const carpetaFotosOpcion: string = "../../../../archivos/fotosopcion";
  //-------------------------archivos -------------------------------------

  export const campodeNombreArchivo: string = "file";
  export const extensionesPermitidasImagenes: string[] = [
    '.PNG',
    '.JPG',
    '.JPEG',
    '.GIF',
    '.PDF'
  ];
  //-------------------------servidor -------------------------------------
  export const puertoServidor: number = 3001;
  export const direccionServidor: string = " http://localhost";
}
