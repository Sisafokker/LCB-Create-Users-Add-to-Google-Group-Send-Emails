var linkTutorial = 'https://www.youtube.com/watch?v=rpOVfv7gdvg';
var linkFaq;
var linkFaqAlumno = 'https://docs.google.com/document/d/1-xOYcEuuFb8mMw1P72xc774V2YFPuNISPbR_LwJHRpg';
var linkFaqDocente = 'https://docs.google.com/document/d/1bxk1OhXiuqpaOZPkdZjTOOJrdavCGxMvjHxhDMt2YKw'

// Creamos Email Template para todos los tipos de correos.
function createAndSendEmail (htmlCuerpo, asuntoEmail, admin, email, contrasena, ou, nombres, apellidos, sedeDestino,resultsToPrint,groupResultsToPrint,emailGroupResultsToPrint, agregarAgG, tipoUsuario, postdata){
  console.log('createAndSendEmail', asuntoEmail);
  
  // set the values for the placeholders
  htmlCuerpo.admin = admin;
  htmlCuerpo.email = email;
  htmlCuerpo.contrasena = contrasena;
  htmlCuerpo.ou = ou;
  htmlCuerpo.nombres = nombres;
  htmlCuerpo.apellidos = apellidos;
  htmlCuerpo.sedeDestino = sedeDestino;
  htmlCuerpo.resultsToPrint = resultsToPrint;
  htmlCuerpo.groupResultsToPrint = groupResultsToPrint;
  htmlCuerpo.emailGroupResultsToPrint = emailGroupResultsToPrint;
  htmlCuerpo.agregarAgG = agregarAgG;
  htmlCuerpo.tipoUsuario = tipoUsuario;
  htmlCuerpo.postdata = postdata;
  htmlCuerpo.linkFaq = linkFaq
  htmlCuerpo.linkTutorial = linkTutorial

  // evaluate and get the html
  var email_html = htmlCuerpo.evaluate().getContent();
  
  MailApp.sendEmail({
    to: admin,
    subject: asuntoEmail,
    htmlBody: email_html
  });
}


function sendEmailPermitido(admin, email, contrasena, ou, nombres, apellidos, sedeDestino, resultsToPrint, agregarAgG, tipoUsuario) {
   var postdata;
   var tipoParaAsunto;
  if(tipoUsuario == "ALUMNO"){
    agregarAgG = "Los Alumnos NO se agregan automáticamente a ningún Google Group"
    tipoParaAsunto = "ALUMNA/O"
    linkFaq = linkFaqAlumno
    tipoUsuario = "Tipo de usuario: ALUMNA/O"
    postdata = "Puedes agregar al alumno a su GOOGLE CLASSROOM y al grupo correspondiente aqui: https://forms.gle/jBdQ4HBWsAhQVhPb8";
  } 
  //if(tipoUsuario == "Docente" && (agregarAgG == "NO AGREGAR A NINGUN GRUPO" || agregarAgG == "") ){
  if(tipoUsuario == "DOCENTE" ){
    agregarAgG = "Agregar a Grupos: No solicitaste agregarlo a ningún Google Group"
    tipoParaAsunto = "Docente/Otro"
    linkFaq = linkFaqDocente
    tipoUsuario = "Tipo de usuario: Docente/Secretaria/Maestranza"
    postdata = "Si es un usuario Docente, puedes agregarlo a un GOOGLE CLASSROOM y su grupo correspondiente aqui: https://forms.gle/jBdQ4HBWsAhQVhPb8";
  } 
  
  // Definiendo Variables para el email
  var htmlCuerpo = HtmlService.createTemplateFromFile("EmailCreacion");
  var asuntoEmail = "[LCB/Google] Creacion "+tipoParaAsunto+" - " +email
  
  // Variables del template que aqui estan vacias para evitar errores
  var groupResultsToPrint, emailGroupResultsToPrint;
  // Enviamos email con el template
  createAndSendEmail (htmlCuerpo, asuntoEmail, admin, email, contrasena, ou, nombres, apellidos, sedeDestino,resultsToPrint,groupResultsToPrint,emailGroupResultsToPrint, agregarAgG, tipoUsuario, postdata)
}


function sendEmailPermitidoConGrupo(admin, email, contrasena, ou, nombres, apellidos, sedeDestino,resultsToPrint,groupResultsToPrint,emailGroupResultsToPrint, agregarAgG, tipoUsuario) {
  var tipoParaAsunto;
  var postdata;
  var linkFaq = linkFaqDocente
  if(agregarAgG == "SI - GRUPOS DOCENTE"){
    tipoParaAsunto = "DOCENTE"
    tipoUsuario = "Tipo de usuario: DOCENTE";
    agregarAgG = "El DOCENTE ha sido agregado a los siguientes Google Groups:"
    postdata = "Puedes agregar al docente a un GOOGLE CLASSROOM y su grupo correspondiente aqui: https://forms.gle/jBdQ4HBWsAhQVhPb8";
  } else if(agregarAgG == "SI - GRUPOS SECRETARIAS") {
    tipoParaAsunto = "SECRETARIA/O"
    tipoUsuario = "Tipo de usuario: SECRETARIA/O"
    agregarAgG = "El/la SECRETARIA/O ha sido agregado a los siguientes Google Groups:"
  } else if(agregarAgG == "SI - GRUPOS CUSTODIO/MAESTRANZA") {
    tipoParaAsunto = "CUSTODIO/MAESTRANZA"
    tipoUsuario = "Tipo de usuario: CUSTODIO / MAESTRANZA"
    agregarAgG = "El CUSTODIO/MAESTRANZA ha sido agregado a los siguientes Google Groups:"
    postdata = "";
  }else { 
    tipoParaAsunto = "usuario"
    tipoUsuario = "Tipo de usuario:INDEFINIDO AUN => Docente/Secretaria/Maestranza" 
    agregarAgG = "El usuario NO fue agregado a ningún Google Groups:"
    postdata = "Si este es un usuario Docente, puedes agregarlo a un GOOGLE CLASSROOM y su grupo correspondiente aqui: https://forms.gle/jBdQ4HBWsAhQVhPb8";
    }

  var htmlCuerpo = HtmlService.createTemplateFromFile("EmailCreacionConGrupo");
  //var htmlCuerpo = HtmlService.createHtmlOutputFromFile('EmailCreacion').getContent();
  var asuntoEmail = "[LCB/Google] Creacion "+tipoParaAsunto+" (+gGroups) - " +email

  // Enviamos email con el template
  createAndSendEmail (htmlCuerpo, asuntoEmail, admin, email, contrasena, ou, nombres, apellidos, sedeDestino,resultsToPrint,groupResultsToPrint,emailGroupResultsToPrint, agregarAgG, tipoUsuario, postdata)
}


function sendEmailFallo(admin, tipoUsuario, ou, nombres, apellidos, resultForEmail, sedeDestino, email, agregarAgG) {
   if(resultForEmail == "NO SE PUDO CREAR USUARIO!"){
     resultForEmail = "NO SE CREO el usuario "+email+ "(algo en el formato del usuario no es correcto)";
     agregarAgG = "Tampoco, logicamente, se ha agregado a ningun Google Group."
   }
  var htmlCuerpo = HtmlService.createTemplateFromFile("EmailNoPermitido");
  //var htmlCuerpo = HtmlService.createHtmlOutputFromFile('EmailCreacion').getContent();
  var asuntoEmail = "[LCB/Google] Fallo Creacion "+tipoUsuario+" - " +email
  
  var resultsToPrint = resultForEmail; // Cambio de nombre para que coincida con las variables del emailTemplate
  // Variables vacias
  var contrasena, groupResultsToPrint, emailGroupResultsToPrint,postdata;
  // Enviamos email con el template
  createAndSendEmail (htmlCuerpo, asuntoEmail, admin, email, contrasena, ou, nombres, apellidos, sedeDestino,resultsToPrint,groupResultsToPrint,emailGroupResultsToPrint, agregarAgG, tipoUsuario, postdata)
}

