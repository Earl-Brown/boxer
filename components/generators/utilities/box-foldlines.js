export const generateBox = (offset, width, depth, length) => [
	// draw outer square
	`h ${length} `,
	`v ${(width * 2) + (depth * 2)}`,
	`H ${offset.x}`,
	`V ${offset.y}`,

	// mark off side 1
	`M ${offset.x} ${offset.y + depth}`,
	`h ${length}`,

	// mark off front
	`M ${offset.x} ${offset.y + depth + width}`,
	`h ${length}`,

	// mark off side 2 (back is the remainder of the box)
	`M ${offset.x} ${offset.y + depth + width + depth}`,
	`h ${length}`,
]
