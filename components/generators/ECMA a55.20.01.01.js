import { generateBox } from './utilities/box-foldlines'

export function defineCarton(depth, width, length,) {

	var { width, length, depth } = { width: 20, length: 50, depth: 70, ...{ width: Number(width), length: Number(length), depth: Number(depth) } }

	const offset = {
		x: 10 + width,
		y: 10
	}

	const box = generateBox(offset, depth, width, length,)
	const bottom = (width * 2) + (depth * 2)

	// const flapDepth = depth * 0.75

	// const glueTab = [
	// 	`M ${offset.x} ${offset.y + bottom}`,
	// 	`l ${length * 0.1} ${flapDepth}`,
	// 	`h ${length * 0.8}`,
	// 	`l ${length * 0.1} ${0 - flapDepth}`,
	// ]

	// const flaplength = width * 0.5

	// const upFlap = [
	// 	`l 	${(depth * -0.5)} ${depth * 0.5}`,
	// 	`h 	${(depth * -0.25)}`,

	// 	// 			rx 							ry 							x-axis-rotation large-arc sweep x 									y
	// 	`a 	${depth * 0.25}	${depth * 0.25} 0 							0 				0 		${(depth * -0.25)} 	${depth * 0.25}`,
	// 	`v 	${depth * 0.25}`,
	// 	`h 	${flaplength}`
	// ]

	// const overFlap = [
	// 	`l ${depth * -0.5} ${depth * 0.5}`,
	// 	`h ${depth * -0.25}`,

	// 	`a ${depth * 0.25} ${depth * 0.25} 0 0 0 ${depth * -0.25} ${depth * 0.25}`,

	// 	`v ${width - (depth * 1.5)}`,
	// 	`a ${depth * 0.25} ${depth * 0.25} 0 0 0 ${depth * 0.25} ${depth * 0.25}`,

	// 	`h ${depth * 0.25}`,
	// 	`l ${depth * 0.5} ${depth * 0.5}`,
	// ]

	// const downFlap = [
	// 	`h 	${-flaplength}`,
	// 	`v 	${depth * 0.25}`,

	// 	// 			rx 							ry 							x-axis-rotation large-arc sweep x 									y
	// 	`a 	${depth * 0.25}	${depth * 0.25} 0 							0 				0 		${(depth * 0.25)} 	${depth * 0.25}`,

	// 	`h 	${(depth * 0.25)}`,
	// 	`l 	${(depth * 0.5)} ${depth * 0.5}`,
	// ]

	// const tuckFlap = [
	// 	`h ${-depth}`,
	// 	`v ${width * 0.1}`,
	// 	`a ${depth * 0.25} ${depth * 0.25} 0 0 0 ${depth * 0.25} ${depth * 0.25}`,
	// 	`h ${depth * 0.25}`,

	// 	`v ${width - (depth * 1)}`,
	// 	`h ${depth * -0.25}`,
	// 	`a ${depth * 0.25} ${depth * 0.25} 0 0 0 ${depth * -0.25} ${depth * 0.25}`,
	// 	`v ${width * 0.1}`,
	// 	`h ${depth}`
	// ]

	const lidFold = [
		`M ${offset.x + depth + width} ${offset.y + length + width}`,
		`v ${length}`,
	]


	return {
		metrics: {
			offset: {
				x: 10 + (depth * 2),
				y: 10
			},
			width: 1000,
			height: 1000
		},


		foldLines: [
			`M ${offset.x} ${offset.y}`,
			...box,
			...lidFold,
		],

		cutLines: [
			// `M 	${offset.x} ${offset.y}`,
			// ...upFlap,
			// ...overFlap,
			// ...downFlap,

			// ...tuckFlap,

			// ...glueTab,
		],

		// gluePoints: [
		// 	{
		// 		pathLines: glueTab,
		// 		fillPattern: []
		// 	}
		// ]
	}
}
