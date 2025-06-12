export function ipToNumber(ip: string): number {
    if (!ip || ip === '0.0.0.0') {
      return 0;
    }

    // Преобразуем каждый октет в строку с ведущими нулями
    const octets = ip.split('.').map(octet => octet.padStart(3, '0'));
    
    // Объединяем все октеты в одну строку и преобразуем в число
    // Например: 192.168.001.000 -> 192168001000
    return parseInt(octets.join(''), 10);
}