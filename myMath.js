function decimalToOctal(decimalNumber) {
    return decimalNumber.toString(8);
}
function decimalToHexadecimal(decimalNumber) {
    return decimalNumber.toString(16).toUpperCase();
}
function decimalToBase32(decimalNumber) {
    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUV';
    let base32Value = '';
    while (decimalNumber > 0) {
        base32Value = alphabet[decimalNumber % 32] + base32Value;
        decimalNumber = Math.floor(decimalNumber / 32);
    }
    return base32Value;
}
function decimalToBase64(decimalNumber) {
    return btoa(decimalNumber.toString());
}
function octalToDecimal(octalValue) {
    return parseInt(octalValue, 8);
}
function hexadecimalToDecimal(hexadecimalValue) {
    return parseInt(hexadecimalValue, 16);
}
function base32ToDecimal(base32Value) {
    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUV';
    let decimalNumber = 0;
    for (let char of base32Value) {
        decimalNumber = decimalNumber * 32 + alphabet.indexOf(char);
    }
    return decimalNumber;
}
function base64ToDecimal(base64Value) {
    return parseInt(atob(base64Value), 10);
}
