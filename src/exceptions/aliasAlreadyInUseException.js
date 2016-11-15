export default function aliasAlreadyInUseException(alias, index) {
    this.message = 'Alias "' + alias + '" is already used';
}