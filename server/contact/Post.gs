var g_spreadsheet_id = 'xxxxx'

function doPost(e) {
  if (!e) return
  var res
  var cb = e.parameter.callback
  var data = JSON.parse(e.postData.getDataAsString())
  data.date = new Date().toLocaleString()

  try {
    var book  = SpreadsheetApp.openById(g_spreadsheet_id)
    var sheet = book.getActiveSheet()
    sheet.appendRow([data.date, data.email, data.title, data.message])
    res = { "result": "success" }
  } catch(e) {
    Logger.log(e)
    res = { "result": "error" }
  }

  sendmail('office@codingkids.jp', '[CodingKids] お問い合わせ', 'admin', data, false)

  if(cb) {
    return ContentService
      .createTextOutput(cb + '(' + JSON.stringify(res) + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT)
  } else {
    return ContentService
      .createTextOutput(JSON.stringify(res))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

function sendmail(mailto, title, tmpl, data, html) {
  var options = {from: 'office@codingkids.jp', name: 'CodingKids事務局', noReply: true}
  var textBody = HtmlService.createTemplateFromFile(tmpl + '_text')
  textBody.data = data

  if (html) {
    var htmlBody = HtmlService.createTemplateFromFile(tmpl + '_html')
    htmlBody.data = data
    options.htmlBody = htmlBody.evaluate().getContent()
  }

  GmailApp.sendEmail(mailto, title, textBody.evaluate().getContent(), options)
}
