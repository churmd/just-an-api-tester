const express = require("express");
const newmanReporter = require("./newmanReporter");
const path = require("path");
const app = express();

const defaultReportPath = "./generatedReport/report.html";
const defaultCollectionPath =
    "./postman-files/ExampleTests.postman_collection.json";
const defaultEnvironmentPath =
    "./postman-files/ExampleEnvironment.postman_environment.json";

const port = process.env.PORT || 8080;
const reportPath = process.env.REPORT_PATH || defaultReportPath;
const collectionPath = process.env.COLLECTION_PATH || defaultCollectionPath;
const environmentPath = process.env.ENVIRONMENT_PATH || defaultEnvironmentPath;

app.get("/healthcheck", (req, resp) => {
    resp.send('{"status": "OK"}');
});

app.get("/report", function (req, resp) {
    resp.sendFile(reportPath, function (err) {
        if (err) {
            resp.status(404).send("Report not available right now");
        }
    });
});

newmanReporter.continuousReporting(
    60,
    path.resolve(reportPath),
    path.resolve(collectionPath),
    path.resolve(environmentPath)
);

app.listen(port, () => {
    console.log(`Just an API Tester listening at http://localhost:${port}`);
});
