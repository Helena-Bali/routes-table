export function ipToNumber(ip: string): number {
    if (!ip || ip === '0.0.0.0') {
      return 0;
    }

    const octets = ip.split('.').map(octet => octet.padStart(3, '0'));
    
    return parseInt(octets.join(''), 10);
}