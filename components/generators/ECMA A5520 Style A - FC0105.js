import { generateBox } from './utilities/box-foldlines'

export function defineCarton(depth, width, length,) {

	var { width, length, depth } = { width: 75, length: 150, depth: 180, ...{ width: Number(width), length: Number(length), depth: Number(depth) } }

	const bottom = (width * 2) + (depth * 2)

	const flapWidth = width * 0.75
	const lockFlapLength = length * 0.475
	const flapCurveRadius = width * 0.1
	const tuckFlapLength = length * 0.3
	const tongueArcRadius = length * 0.1

	const offset = {
		x: 10,
		y: 10 + (width * 1.05) + flapCurveRadius
	}

	const lidFold = [
		`M ${offset.x + length + width} ${offset.y - width}`,
		`h ${length} `,
	]


	const glueTab = [
		`M ${offset.x + length + width + length + width} ${offset.y}`,
		`l ${flapWidth} ${depth * 0.1}`,
		`v ${depth * 0.8}`,
		`l ${-flapWidth} ${depth * 0.1} `,
	]

	// arcs: rx ry x-axis-rotation large-arc sweep x y
	const arc1 = `a ${flapCurveRadius} ${flapCurveRadius} 0 0 0 ${flapCurveRadius} ${flapCurveRadius}`
	const arc2 = `a ${flapCurveRadius} ${flapCurveRadius} 0 0 0 ${flapCurveRadius} ${-flapCurveRadius}`
	const tongueArc1 = `a ${tongueArcRadius} ${tongueArcRadius} 0 0 0 ${-tongueArcRadius} ${-tongueArcRadius}`
	const tongueArc2 = `a ${tongueArcRadius} ${tongueArcRadius} 0 0 0 ${-tongueArcRadius} ${tongueArcRadius}`

	const lockFlapAngleYLength = (length * 0.2) + flapCurveRadius

	const lockTab = [
		`M ${offset.x} ${offset.y + depth}`,
		`l ${lockFlapAngleYLength} ${(width * 0.5)}`,
		`v ${width * 0.4}`,

		arc1,

		`h ${(length * 0.6) - (width * 0.2) - (flapCurveRadius * 2)}`,

		arc2,

		`v ${width * -0.4}`,
		`l ${lockFlapAngleYLength} ${width * -0.5}`,
	]

	const supportFlap1 = [
		`M ${offset.x + length} ${offset.y + depth}`,
		`v ${lockFlapLength}`,
		`h ${width * 0.5 - flapCurveRadius}`,
		arc2,
		`v ${-(lockFlapLength - flapCurveRadius - length * 0.2)}`,
		`l ${width * 0.5} ${length * -0.2}`
	]

	const lockFlap = [
		`M ${offset.x + width + length} ${offset.y + depth}`,
		`v ${width}`,
		`h ${length * 0.2}`,																	// length * 0.2 + width * 0.1

		arc2,

		`v ${-(width * 0.5 - flapCurveRadius)}`,
		`h ${(length * 0.6) - (width * 0.2)}`,
		`v ${width * 0.5 - flapCurveRadius}`,

		arc1,

		`h ${length * 0.2}`,
		`v ${-width}`
	]

	const supportFlap2 = [
		`M ${offset.x + length + width + length} ${offset.y + depth}`,
		`l ${width * 0.5} ${length * 0.2}`,
		`v ${(lockFlapLength - flapCurveRadius - length * 0.2)}`,
		arc1,
		`h ${width * 0.5 - flapCurveRadius}`,
		`v ${-lockFlapLength}`
	]

	const tuckFlap1 = [
		`M ${offset.x + (width * 2) + (length * 2)} ${offset.y}`,
		`v ${width * -0.3}`,
		`l ${width * -0.1} ${-tuckFlapLength} `,
		`h ${width * -0.85} `,
		`l ${width * -0.05} ${tuckFlapLength + (width * 0.3)} `
	]

	const tuckLid = [
		`M ${offset.x + length + width + length} ${offset.y} `,
		`v ${width * -1.25} `,
		tongueArc1,
		`h ${-(length - (tongueArcRadius * 2))} `,
		tongueArc2,
		`v ${(width + 1.5)} `,

		// lock slot 1
		`M ${offset.x + length + width} ${offset.y - 0.5} `,
		`h 3`,
		`v 0.5`,

		// lock slot 2
		`M ${offset.x + length + width + length} ${offset.y - 0.5} `,
		`h -3`,
		`v 0.5`,

		// lock slot 1
		`M ${offset.x + length + width} ${offset.y - (width + 0.5)} `,
		`h 3`,
		`v 0.5`,

		// lock slot 2
		`M ${offset.x + length + width + length} ${offset.y - (width + 0.5)} `,
		`h -3`,
		`v 0.5`
	]

	const tuckFlap2 = [
		`M ${offset.x + length + width} ${offset.y} `,
		`l ${width * -0.05} ${-tuckFlapLength + (width * -0.3)} `,
		`h ${width * -0.85} `,
		`l ${width * -0.1} ${tuckFlapLength} `,
		`v ${width * 0.3} `,
	]

	const tuckOpening = [
		`M ${offset.x + length} ${offset.y} `,
		`h ${length * -0.3} `,
		`a ${length * 0.2} ${length * 0.2} 0 0 1 ${length * -0.4} ${0} `,
		`h ${length * -0.3} `,
	]


	const box = generateBox(offset, depth, width, length,)

	return {
		image: "ECMA A5520 Style A - FC0105.png",

		metrics: {
			offset: {
				x: 10,
				y: 10 + (depth * 2)
			},
			width: 1000,
			height: bottom + 20
		},


		foldLines: [
			...box,
			...lidFold
		],

		cutLines: [
			...glueTab,
			...lockTab,
			...supportFlap1,
			...lockFlap,
			...supportFlap2,
			tuckFlap1,
			tuckLid,
			tuckFlap2,
			tuckOpening,

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
