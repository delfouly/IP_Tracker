/**
 * Checks if a given string is a valid IP address.
 * @param ipAddress - The string to be checked.
 * @returns `true` if the string is a valid IP address, `false` otherwise.
 */
export function checkIsValideIp(ipAddress: string) {
  const ipPattern =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return !!ipAddress.match(ipPattern);
}
