function creamosUsuario(userJson) {
  Logger.log("creamosUsuario Fx");
  var resultadodeestaFuncion;
  try{
     AdminDirectory.Users.insert(userJson)
     resultadodeestaFuncion = "USUARIO CREADO"
     Logger.log(resultadodeestaFuncion);
  } catch  (err){
      Logger.log(err);
      resultadodeestaFuncion = "NO SE PUDO CREAR USUARIO!"
     if (err == "GoogleJsonResponseException: API call to directory.users.insert failed with error: Entity already exists." || err == "GoogleJsonResponseException: No se ha podido llamar a la API directory.users.insert; error: Entity already exists."){
         resultadodeestaFuncion = "USUARIO YA EXISTIA!"
      }
   }
 return resultadodeestaFuncion;
}
