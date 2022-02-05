export const generateBox = (offset, width, depth, height) => [
	// draw outer square
	`h ${length} `,
	`v ${bottom}`,
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
