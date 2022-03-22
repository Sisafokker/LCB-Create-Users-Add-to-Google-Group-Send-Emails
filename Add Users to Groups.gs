function addGroupMember(userEmail,groupEmail, defineRole, tipoUsuario) {
  var arrayResultado = [];

  Logger.log("addGroupMember Fx")
  var member = {
    email: userEmail,
    role: defineRole,
  };

  try {
      member = AdminDirectory.Members.insert(member, groupEmail);
      Logger.log("User %s added as a member of group %s.", userEmail, groupEmail);
    // Logger.log(member);
      var resultado; // Definiendo resultado de la accion
      resultado = tipoUsuario+" agregado al grupo " 
      arrayResultado.push(resultado); 
    
  }catch(err) {
        Logger.log(err)
        Logger.log("Grupos: Hubo algun tipo de error al intentar agregar al usuario a la clase");
        var resultado; // Definiendo resultado de la accion
        resultado = tipoUsuario+" NO FUE AGREGADO AL GRUPO."

    // Esto esta dando problemas... ver porque----------------------------------------------------------------------------     
    // if (err.includes("error: Member already exists") || err.includes("error: Entity already exists") ){
    //          resultado = tipoUsuario+" YA ES ERA MIEMBRO DE ALGUNO DE ESTOS GRUPOS";
    //     }  else {
    //         resultado = "ERROR: GRUPO O USUARIO INEXISTENTE";
    //         }

        arrayResultado.push(resultado);   
      }
     return arrayResultado;
}