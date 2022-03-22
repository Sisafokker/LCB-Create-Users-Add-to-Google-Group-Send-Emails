
function getDataAndCreateUser (){
      var ssTest=SpreadsheetApp.getActive().getSheetByName("CREAR USUARIOS");
      var creacionResultsToPrint;
      var resultForEmail;
      var grupoArrayAll =[];
      var gruposArray = [];
      var groupResultsToPrint = "NADA";
      var emailGroupResultsToPrint= [];

      var todaInfo = ssTest.getRange("A4:BB").getValues(); // Captura todo
      var infoPorProcesar = todaInfo.filter(function (r) {return r [0] !== "" && r [10] !== "" && r [14] !== "" && r [12] == ""}); // Filtra solo lo que quiero
      console.log("Toda la infor sin resultados", infoPorProcesar);

  try {
        var datos = infoPorProcesar[0] // Solo agarramos uno a la vez
        console.log("El usuario a procesar", datos);
         
        var tipoUsuario = datos[0];
        var apellidos = datos[2];
        var nombres = datos[3];
        var email = datos[4];
        var contrasena = datos[5];
        var ou = datos[7];
        var admin = datos [8];
        var sedeManual = datos[9];
        var sedeDestino = datos[10];
        var fila = datos[11];
        var controlSedePPal = datos[14];
        var colResultCreacion = 13;
        var colResultGrupos = 14;
        var agregarAgG = datos[25];
        var gg1p = datos[26];
        var gg2p = datos[27];
        var gg3p = datos[28];
        var gg4p = datos[29];
        var gg5p = datos[30];
        var gg6p = datos[31];
        var gg7p = datos[32];
        var gg8p = datos[33];
        var gg9p = datos[34];
        var controlSedeSec = datos[36];
        var gg1s = datos[38];
        var gg2s = datos[39];
        var gg3s = datos[40];
        var gg4s = datos[41];
        var gg5s = datos[42];
        var gg6s = datos[43];
        var gg7s = datos[44];
        var gg8s = datos[45];
        var gg9s = datos[46];
        var controlSedeSec2 = datos[48];
        var gg1ss = datos[50];
        var gg2ss = datos[51];
        var gg3ss = datos[52];
        var gg4ss = datos[53];
        var gg5ss = datos[54];
        var gg6ss = datos[55];
        var gg7ss = datos[56];
        var gg8ss = datos[57];
        var gg9ss = datos[57];

     if(agregarAgG !=="" &&  agregarAgG !=="NO AGREGAR A NINGUN GRUPO" && controlSedePPal == "PERMITIDO" && controlSedeSec == "PERMITIDO" && controlSedeSec2 == "PERMITIDO" ) {
        gruposArrayAll = [gg1p,gg2p,gg3p,gg4p,gg5p,gg6p,gg7p,gg8p,gg9p,gg1s,gg2s,gg3s,gg4s,gg5s,gg6s,gg7s,gg8s,gg9s,gg1ss,gg2ss,gg3ss,gg4ss,gg5ss,gg6ss,gg7ss,gg8ss,gg9ss]
        console.log(gruposArrayAll);
        console.log(gruposArrayAll.length);
     } else if(agregarAgG !=="" && agregarAgG !=="NO AGREGAR A NINGUN GRUPO" && controlSedePPal == "PERMITIDO" && controlSedeSec == "PERMITIDO") {
        gruposArrayAll = [gg1p,gg2p,gg3p,gg4p,gg5p,gg6p,gg7p,gg8p,gg9p,gg1s,gg2s,gg3s,gg4s,gg5s,gg6s,gg7s,gg8s,gg9s]
        console.log(gruposArrayAll);
        console.log(gruposArrayAll.length); 
    } else if(agregarAgG =="" || agregarAgG =="NO AGREGAR A NINGUN GRUPO") {
        gruposArrayAll = []
        console.log(gruposArrayAll);
        console.log(gruposArrayAll.length); 
    } else {
       gruposArrayAll = [gg1p,gg2p,gg3p,gg4p,gg5p,gg6p,gg7p,gg8p,gg9p]
        console.log(gruposArrayAll);
        console.log(gruposArrayAll.length);
     }

      // Filtra el GrupoArrayAll y deja valores unicos
      const unique = (value, index, self) => {
        return self.indexOf(value) === index
      }
      gruposArray = gruposArrayAll.filter(unique)
      console.log('gruposArray',gruposArray)
      console.log('gruposArray.length',gruposArray.length)

      // Json para crear el usuario en cuestion
        var userJson = {
        primaryEmail: email,
        name: {
          givenName: nombres,
          familyName: apellidos
        },
       // password: Math.random().toString(36), // Generate a random password string.
        password: contrasena,
        changePasswordAtNextLogin: true,
        orgUnitPath: ou,
        // organizations: [
        //   {
        //    costCenter: "DNI123456",
        //   }
        // ]
      }; 
    } catch(errorDeDatos){
     console.log ("Error en (GAS - CREAR USUARIOS VIA FORMS @liceobritanico.com) la captura de los datos: ",errorDeDatos)
     sendEmailFallo("jp@liceobritanico.com", "indefinido", "indefinido", "indefinido", "indefinido", "errorDeDatos", "indefinido", "indefinido","indefinido") 
    }
  

  //console.log(controlSedePPal);
  if (controlSedePPal === "PERMITIDO"){
    console.log("Permitido: Creamos usuario y enviamos email")
      
      try {
      // CREA EL USUARIO
      creacionResultsToPrint = creamosUsuario(userJson);
      
      // AGREGA AL DOCENTE A LOS GRUPOS
      if(tipoUsuario == "DOCENTE" && agregarAgG !== "" && agregarAgG !== "NO AGREGAR A NINGUN GRUPO" && gruposArray && gruposArray.length >0) {
            for (i=0; i<gruposArray.length; i++ ) {
              var defineRole = "MEMBER";
              groupEmail = gruposArray[i];
              if(groupEmail){ // Solo quiero la seccion de grupos que este completa.
                  console.log("Agregar a un grupo ",i)
                  console.log(groupEmail);
                  groupResultsToPrint =  addGroupMember(email,groupEmail, defineRole, tipoUsuario)
                  emailGroupResultsToPrint.push([" >> "+groupEmail]); 
                  console.log(groupResultsToPrint);
                  console.log(emailGroupResultsToPrint);
              }
            }
          }

      if(creacionResultsToPrint == "NO SE PUDO CREAR USUARIO!"){
        ssTest.getRange(fila,colResultCreacion).setValue(creacionResultsToPrint);
        ssTest.getRange(fila,colResultGrupos).setValue("NINGUNO");
        resultForEmail = creacionResultsToPrint;
        sendEmailFallo(admin, tipoUsuario, ou, nombres, apellidos, resultForEmail, sedeDestino, email, agregarAgG)  
      } else {
          ssTest.getRange(fila,colResultCreacion).setValue(creacionResultsToPrint);  
          ssTest.getRange(fila,colResultGrupos).setValue(groupResultsToPrint);  
          console.log("groupResultsToPrint ="+groupResultsToPrint)
          
         if(groupResultsToPrint !=="NADA"){
            sendEmailPermitidoConGrupo(admin, email, contrasena, ou, nombres, apellidos, sedeDestino, creacionResultsToPrint,groupResultsToPrint,emailGroupResultsToPrint,agregarAgG, tipoUsuario);
            } else {
            sendEmailPermitido(admin, email, contrasena, ou, nombres, apellidos, sedeDestino, creacionResultsToPrint,agregarAgG, tipoUsuario); 
            }
      }
      } // Fin del TRY
      catch  (err){
         console.log(err);
         if (err == "GoogleJsonResponseException: API call to directory.users.insert failed with error: Entity already exists."){
           creacionResultsToPrint = "YA EXISTE!";
           resultForEmail = "No se creo. El usuario "+email+" YA EXISTE!";
         }
      ssTest.getRange(fila,colResultCreacion).setValue(creacionResultsToPrint);  
      ssTest.getRange(fila,colResultGrupos).setValue(groupResultsToPrint);  
      sendEmailFallo(admin, tipoUsuario, ou, nombres, apellidos, resultForEmail, sedeDestino, email, agregarAgG);
      }
      
    } 
    else if (controlSedePPal === "SIN PERMISOS - TIPO"){
      console.log("SIN PERMISOS: No creamos nada. Solo enviamos email")
      creacionResultsToPrint = "SIN PERMISOS PARA CREAR!";
      resultForEmail = "Tu usuario ("+admin+") NO tienes permisos para crear "+tipoUsuario+ " en la sede "+sedeDestino;
      agregarAgG = "";
      ssTest.getRange(fila,colResultCreacion).setValue(creacionResultsToPrint);  
      sendEmailFallo(admin, tipoUsuario, ou, nombres, apellidos, resultForEmail, sedeDestino, email, agregarAgG);
    } 
    else if (controlSedePPal === "SIN PERMISOS - SEDE"){
      console.log("SIN PERMISOS PARA LA SEDE SELECCIONADA: No creamos nada. Solo enviamos email")
      creacionResultsToPrint = "SIN PERMISOS PARA LA SEDE SELECCIONADA! "+sedeManual;
      agregarAgG = "";
      resultForEmail = "Tu usuario ("+admin+") NO tiene permisos para la Sede seleccionada en el Formulario";
      ssTest.getRange(fila,colResultCreacion).setValue(creacionResultsToPrint);  
      sendEmailFallo(admin, tipoUsuario, ou, nombres, apellidos, resultForEmail, sedeManual, email, agregarAgG);
    }

}
