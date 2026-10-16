// Código para Google Apps Script (pegar dentro de tu hoja de cálculo)
const HOJA = 'Invitados'

// Evita que un texto que empiece con = + - @ se ejecute como fórmula en la hoja
const limpio = (v) => (typeof v === 'string' && /^[=+\-@]/.test(v) ? "'" + v : v)

function doPost(e) {
  const lock = LockService.getScriptLock()
  lock.waitLock(10000)
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet()
    const sh = ss.getSheetByName(HOJA) || ss.insertSheet(HOJA)
    if (sh.getLastRow() === 0) {
      sh.appendRow(['Fecha', 'Nombre', 'Asistencia', 'Personas', 'Menú', 'Mensaje'])
      sh.getRange(1, 1, 1, 6).setFontWeight('bold')
      sh.setFrozenRows(1)
    }
    const d = JSON.parse(e.postData.contents)
    sh.appendRow([new Date(), limpio(d.nombre), limpio(d.asistencia), d.personas, limpio(d.menu), limpio(d.mensaje)])
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON)
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) })).setMimeType(ContentService.MimeType.JSON)
  } finally {
    lock.releaseLock()
  }
}

function doGet() {
  return ContentService.createTextOutput('El servicio de invitados funciona.')
}