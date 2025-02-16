export namespace ConfiguracionSeguridad{
  //-------------------------VARIABLES DE ENTORNO  -------------------------------------
    //instalar el paquete dotenv npm i dotenv para poder leer variables de entorno  y importar en application.ts require('dotenv').config();
    export const connection_user_postgres = process.env.CONNECTION_USER_POSTGRES ;
    export const connection_password_postgres = process.env.CONNECTION_PASSWORD_POSTGRES ;
    export const connection_database_postgres = process.env.CONNECTION_DATABASE_POSTGRES ;
    //
    //cambiar esta ruta por la url del server con el puerto a la api de seguridad
    export const hostSeguridad = process.env.CONECTION_SEGURIDAD ;


    //-------------------------menus -------------------------------------
  export const menuperfil = 1;
  export const menuprueba = 2;
  export const menuherramientas = 3;
  export const menuresultados = 4;
  export const menuroles = 5;
  export const menupreguntas = 6;
  export const menuinstitucion = 7;
  export const menupruebaestudiantes = 8;
  //-------------------------acciones -------------------------------------
  export const listarAccion = "listar";
  export const guardarAccion = "guardar";
  export const eliminarAccion = "eliminar";
  export const editarAccion = "editar";
  export const buscarAccion_id = "buscar_id";



}
