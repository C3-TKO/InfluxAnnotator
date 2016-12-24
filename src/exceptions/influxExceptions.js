export function AliasAlreadyInUseException(alias, index) {
    this.message = 'Naming conflict';
    this.message = 'Alias "' + alias + '" is already used';
    this.index = index;
}

export function DatabaseConfigurationIncompleteException(incompletePropertyName) {
    this.title = 'Configuration incomplete';
    this.message = 'Property "' + incompletePropertyName + '" needs to be defined';
}

export function DatabaseNotFoundException() {
    this.title = 'Database not found'
    this.message = 'Database was not found on host';
}

export function HostNotFoundException(error) {
    this.title = 'Host not found'
    this.message = 'Can not connect to host - reason: ' + error.toString();
}

export function MeasurementNotFoundException() {
    this.title = 'Measurement not found'
    this.message = 'The measurement might not contain any series yet and thus is not yet defined within the database';
}