// MENU propio
function onOpen() {
    Logger.log("===== [onOpen] Run ======");
    
    var Ui = SpreadsheetApp.getUi();
    Ui.createMenu('<< Hoakeen: GAS >>')
    .addSubMenu((Ui.createMenu('Correr Script')
                 .addItem('Crear y Agregar a grupos', 'getDataAndCreateUser')
                 .addSeparator() 
                //  .addSeparator()    
                //  .addItem('1 - AGREGAR ALUMNOS A CLASES', 'STUDENT_ADD')  
                //  .addSeparator()
                //  .addItem('2 - ELIMINAR ALUMNOS DE CLASES','STUDENT_REMOVE' )             
          ))
        
    .addToUi();
  }