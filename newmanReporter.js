const newman = require("newman");

/**
 * Performs a postamn collection run
 * @param {String} reportPath Path of where to output the report file to
 * @param {String} collectionPath  Path to the postamn collection to run
 * @param {String} environmentPath Optional path to the postman environment if needed
 * @throws Will throw an error if there is a problem running the colection
 */
function createReport(reportPath, collectionPath, environmentPath = "") {
    newman.run(
        {
            collection: collectionPath,
            environment: environmentPath,
            reporters: ["htmlextra"],
            reporter: {
                htmlextra: {
                    export: reportPath,
                },
            },
        },
        function (err, summary) {
            if (err) {
                throw err;
            } else if (summary.run.failures.length > 0) {
                console.log(
                    "There were failures in the API tests :( send an email or something"
                );
            }
        }
    );
}

/**
 * Performs a postamn collection run repeately every x seconds
 * @param {Number} frequency How often to run the collection in seconds, e.g. 60 would cause a collection run to happen every 60 seconds
 * @param {String} reportPath Path of where to output the report file to
 * @param {String} collectionPath  Path to the postamn collection to run
 * @param {String} environmentPath Optional path to the postman environment if needed
 * @throws Will throw an error if there is a problem running the colection
 */
function continuousReporting(
    frequency,
    reportPath,
    collectionPath,
    environmentPath = ""
) {
    createReport(reportPath, collectionPath, environmentPath);
    setTimeout(() => {
        continuousReporting(
            frequency,
            reportPath,
            collectionPath,
            environmentPath
        );
    }, frequency * 1000);
}

exports.createReport = createReport;
exports.continuousReporting = continuousReporting;
