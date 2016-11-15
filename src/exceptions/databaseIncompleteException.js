export default function databaseIncompleteException(incompletePropertyName) {
    this.message = 'Property "' + incompletePropertyName + '" needs to be defined';
}