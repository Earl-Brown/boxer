

export class EcmaA5520_20_01_01 {

	constructor(width, length, depth) {

		var { width, length, depth } = { width: 50, length: 78, depth: 25, ...{ width: width, length: length, depth: depth } }

		const offset = {
			x: 10 + (depth * 2),
			y: 10
		}

		const flapDepth = depth * 0.75
		const bottom = (width * 2) + (depth * 2)

		const glueTab = [
			`M ${offset.x} ${offset.y + bottom}`,
			`l ${length * 0.1} ${flapDepth}`,
			`h ${length * 0.8}`,
			`l ${length * 0.1} ${0 - flapDepth}`,
		]

		const lidFold = [
			`M ${offset.x + length + depth} ${offset.y + bottom}`,
			`v ${-width}`,
		]

		const box = [
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

		const flaplength = width * 0.5

		const upFlap = [
			`l 	${(depth * -0.5)} ${depth * 0.5}`,
			`h 	${(depth * -0.25)}`,

			// 			rx 							ry 							x-axis-rotation large-arc sweep x 									y
			`a 	${depth * 0.25}	${depth * 0.25} 0 							0 				0 		${(depth * -0.25)} 	${depth * 0.25}`,
			`v 	${depth * 0.25}`,
			`h 	${flaplength}`
		]

		const overFlap = [
			`l ${depth * -0.5} ${depth * 0.5}`,
			`h ${depth * -0.25}`,

			`a ${depth * 0.25} ${depth * 0.25} 0 0 0 ${depth * -0.25} ${depth * 0.25}`,

			`v ${width - (depth * 1.5)}`,
			`a ${depth * 0.25} ${depth * 0.25} 0 0 0 ${depth * 0.25} ${depth * 0.25}`,

			`h ${depth * 0.25}`,
			`l ${depth * 0.5} ${depth * 0.5}`,
		]

		const downFlap = [
			`h 	${-flaplength}`,
			`v 	${depth * 0.25}`,

			// 			rx 							ry 							x-axis-rotation large-arc sweep x 									y
			`a 	${depth * 0.25}	${depth * 0.25} 0 							0 				0 		${(depth * 0.25)} 	${depth * 0.25}`,

			`h 	${(depth * 0.25)}`,
			`l 	${(depth * 0.5)} ${depth * 0.5}`,
		]

		const tuckFlap = [
			`h ${-depth}`,
			`v ${width * 0.1}`,
			`a ${depth * 0.25} ${depth * 0.25} 0 0 0 ${depth * 0.25} ${depth * 0.25}`,
			`h ${depth * 0.25}`,

			`v ${width - (depth * 1)}`,
			`h ${depth * -0.25}`,
			`a ${depth * 0.25} ${depth * 0.25} 0 0 0 ${depth * -0.25} ${depth * 0.25}`,
			`v ${width * 0.1}`,
			`h ${depth}`
		]

		this.metrics = {
			offset: {
				x: 10 + (depth * 2),
				y: 10
			},
			width: 1000,
			height: 1000
		}

		this.cutLines = [
			`M 	${offset.x} ${offset.y}`,
			...upFlap,
			...overFlap,
			...downFlap,

			...tuckFlap,

			...glueTab,
		]

		this.foldLines = [
			`M ${offset.x} ${offset.y}`,
			...box,
			...lidFold,
		]

		this.gluePoints = [
			{
				pathLines: glueTab,
				fillPattern: []
			}
		]
	}
}
