export const generateBox = (offset, depth, width, length) => [
	// start at the start
	`M ${offset.x} ${offset.y}`,

	// draw outer square
	`h ${(width * 2) + (length * 2)}`,
	`v ${depth} `,

	`H ${offset.x}`,
	`V ${offset.y}`,

	// mark off side 1
	`M ${offset.x + length} ${offset.y}`,
	`v ${depth}`,

	// mark off front
	`M ${offset.x + length + width} ${offset.y}`,
	`v ${depth}`,

	// mark off side 2 (back is the remainder of the box)
	`M ${offset.x + length + width + length} ${offset.y}`,
	`v ${depth}`,
]
