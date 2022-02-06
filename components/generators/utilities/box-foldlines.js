export const generateBox = (offset, depth, width, length) => [
	// start at the start
	`M ${offset.x} ${offset.y}`,
	// draw outer square
	`h ${depth} `,
	`v ${(width * 2) + (length * 2)}`,
	`H ${offset.x}`,
	`V ${offset.y}`,

	// // mark off side 1
	`M ${offset.x} ${offset.y + length}`,
	`h ${depth}`,

	// // // mark off front
	`M ${offset.x} ${offset.y + length + width}`,
	`h ${depth}`,

	// // // mark off side 2 (back is the remainder of the box)
	`M ${offset.x} ${offset.y + length + width + length}`,
	`h ${depth}`,
]
