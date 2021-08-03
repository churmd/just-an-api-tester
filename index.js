const express = require('express')
const newmanReporter = require('./newmanReporter')
const path = require('path')
const app = express()
const port = 3000

const reportPath = path.join(__dirname, "/generatedReport/report.html")
const collectionPath = path.join(__dirname, "/postman-files/ExampleTests.postman_collection.json")
const environmentPath =  path.join(__dirname,"/postman-files/ExampleEnvironment.postman_environment.json")

app.get('/healthcheck', (req, resp) => {
    resp.send('{"status": "OK"}')
  })

app.get('/report', function(req, resp) {
    resp.sendFile(reportPath, function (err) {
        resp.status(404).send('Report not available right now')
    })
})

newmanReporter.continuousReporting(60, reportPath, collectionPath, environmentPath);

app.listen(port, () => {
    console.log(`Just an API Tester listening at http://localhost:${port}`)
  })