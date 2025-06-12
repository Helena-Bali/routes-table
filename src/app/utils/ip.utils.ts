
export function ipToNumber(ip: string): number {
    if (!ip || ip === '0.0.0.0') {
      return 0;
    }

    return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0);
  }