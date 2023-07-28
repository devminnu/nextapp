// Convert IPv4 to IPv6 (IPv4-mapped IPv6 address)
func ipv4ToIPv6(ipv4 net.IP) net.IP {
	ipv6 := make(net.IP, net.IPv6len)
	// Set the first 10 bytes to 0x00
	copy(ipv6, net.IPv6zero[:10])
	// Set bytes 11 and 12 to 0xff
	copy(ipv6[10:], net.IPv6unspecified[:2])
	// Copy the last 4 bytes from the IPv4 address into the last 4 bytes of the IPv6 representation
	copy(ipv6[12:], ipv4.To4())

	return ipv6
}
