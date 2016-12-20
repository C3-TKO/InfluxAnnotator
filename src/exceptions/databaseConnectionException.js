export default function databaseConnectionException(error) {
    this.message = 'Unable to connect to database - Reason: ' + error.toString();
}