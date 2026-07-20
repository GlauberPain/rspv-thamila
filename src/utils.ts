export function capitalizeWords(str: string): string {
	return str
		.toLowerCase()
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

export function maskPhone(phone: string): string {
	const cleaned = phone.replace(/\D/g, "").slice(0, 11);

	if (cleaned.length === 0) return "";
	if (cleaned.length <= 2) return `(${cleaned}`;
	if (cleaned.length <= 6) {
		return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
	}
	if (cleaned.length <= 10) {
		return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
	}
	return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
}
