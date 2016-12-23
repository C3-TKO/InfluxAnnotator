export default function databaseConnectionException(error) {
    this.message = 'Can not connect to database - reason: ' + error.toString()  + '. Please check the connection parameters.'
}