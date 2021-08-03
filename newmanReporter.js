const newman = require('newman');

function createReport(reportPath, collectionPath, environmentPath = "") {
    newman.run({
        collection: collectionPath,
        environment: environmentPath,
        reporters: ['htmlextra'],
        reporter: {
            htmlextra: {
                export: reportPath,
            }
        }
    }, function (err) {
        if (err) { throw err; }
    })
}

function continuousReporting(frequency, reportPath, collectionPath, environmentPath = "") {
    createReport(reportPath, collectionPath, environmentPath)
    setTimeout(() => {continuousReporting(frequency, reportPath, collectionPath, environmentPath)}, frequency * 1000)
}

exports.createReport = createReport
exports.continuousReporting = continuousReporting