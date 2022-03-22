var emailPpal = "st.rodriguez2.testeando56@liceobritanico.com"
var miDominio = "liceobritanico.com"

function patchData (){
        var userJson = {
        // organizations: [
        //   {
        //    costCenter: "DNI34443",
        //   }
        // ],
        // externalIds: [
        //   {
        //   type: "organization", 
        //   value: "UniqueIDVaAqui-PeroEstaCompartidoEnDirectorio",
        //   }
        // ],
        id: "DNI123456891011"

      };
  
      user = AdminDirectory.Users.patch(userJson, emailPpal);
}

function listData (){
       respuesta = AdminDirectory.Users.list(
                  {
                    domain : miDominio,   
                    orderBy : 'givenName',
                    user: emailPpal,
                  }
                )
  var users = respuesta.users
      for (var i = 0; i < users.length; i++) {
          var user = users[i];
          var datoUnico = user.externalIds[0].value;
          var datoUnico;
          var status;
          var title; // Added two new variables 
          try { // Try to get the users department if there is an error push the error to the array
              laOU = user.orgUnitPath
          } catch (e) {
              laOU = e
          }
          }

//Logger.log(respuesta);
}


function addUserManual() {
  var user = {
    primaryEmail: 'pruebajp@liceobritanico.com',
    name: {
      givenName: 'Pruebas',
      familyName: 'JP'
    },
    // Generate a random password string.
    // password: Math.random().toString(36),
    password: "LcbgooglePrueba",
    changePasswordAtNextLogin: true,
    orgUnitPath: "/Students.Test",
    
  };
  user = AdminDirectory.Users.insert(user);
  console.log('User %s created with ID %s.', user.primaryEmail, user.id);
}