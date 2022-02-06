import { generateBox } from './utilities/box-foldlines'

export function defineCarton(depth, width, length,) {

	var { width, length, depth } = { width: 20, length: 50, depth: 70, ...{ width: Number(width), length: Number(length), depth: Number(depth) } }

	const offset = {
		x: 80 + width,
		y: 10 + width * 0.8
	}

	const box = generateBox(offset, depth, width, length,)
	const bottom = (width * 2) + (depth * 2)

	const flapWidth = width * 0.75
	const flapLength = length * 0.475

	const glueTab = [
		`M ${offset.x} ${offset.y}`,
		`l ${depth * 0.1} ${-flapWidth}`,
		`h ${depth * 0.8}`,
		`l ${depth * 0.1} ${flapWidth}`,
	]

	// 								rx 							ry 						 x-axis-rotation 	large-arc sweep x									y
	const arc1 = `a 	${width * 0.1}	${width * 0.1} 0 								0 				0 		${width * -0.1} 	${width * 0.1}`

	const arc2 = `a ${width * 0.1} ${width * 0.1} 0 0 0 ${width * 0.1} ${width * 0.1}`


	const lockTab = [
		`M ${offset.x} ${offset.y}`,
		`l 	${(width * -0.5)} ${length * 0.2}`,
		`h 	${(width * -0.4)}`,
		arc1,

		`v 	${(length * 0.6) - (width * 0.2)}`,

		arc2,

		`h 	${(width * 0.4)}`,
		`l  ${width * 0.5} ${length * 0.2}`,

		...glueTab
	]

	const supportFlap1 = [
		`M ${offset.x} ${offset.y + length}`,
		`h ${-flapLength}`,
		`v ${width * 0.4}`,
		arc2,


	]

	// const overFlap = [
	// 	`l ${ depth * -0.5 } ${ depth * 0.5 } `,
	// 	`h ${ depth * -0.25 } `,

	// 	`a ${ depth * 0.25 } ${ depth * 0.25 } 0 0 0 ${ depth * -0.25 } ${ depth * 0.25 } `,

	// 	`v ${ width - (depth * 1.5) } `,
	// 	`a ${ depth * 0.25 } ${ depth * 0.25 } 0 0 0 ${ depth * 0.25 } ${ depth * 0.25 } `,

	// 	`h ${ depth * 0.25 } `,
	// 	`l ${ depth * 0.5 } ${ depth * 0.5 } `,
	// ]

	// const tuckFlap = [
	// 	`h ${ -depth } `,
	// 	`v ${ width * 0.1 } `,
	// 	`a ${ depth * 0.25 } ${ depth * 0.25 } 0 0 0 ${ depth * 0.25 } ${ depth * 0.25 } `,
	// 	`h ${ depth * 0.25 } `,

	// 	`v ${ width - (depth * 1) } `,
	// 	`h ${ depth * -0.25 } `,
	// 	`a ${ depth * 0.25 } ${ depth * 0.25 } 0 0 0 ${ depth * -0.25 } ${ depth * 0.25 } `,
	// 	`v ${ width * 0.1 } `,
	// 	`h ${ depth } `
	// ]

	const lidFold = [
		`M ${offset.x + depth + width} ${offset.y + length + width} `,
		`v ${length} `,
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
			`M ${offset.x} ${offset.y} `,
			...box,
			...lidFold,
			...glueTab
		],

		cutLines: [
			`M 	${offset.x} ${offset.y} `,
			...lockTab,
			...supportFlap1,

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
