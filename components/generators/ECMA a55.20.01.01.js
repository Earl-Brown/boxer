import { generateBox } from './utilities/box-foldlines'

export function defineCarton(depth, width, length,) {

	var { width, length, depth } = { width: 75, length: 150, depth: 180, ...{ width: Number(width), length: Number(length), depth: Number(depth) } }

	const bottom = (width * 2) + (depth * 2)

	const flapWidth = width * 0.75
	const lockFlapLength = length * 0.475
	const flapCurveRadius = width * 0.1
	const tuckFlapLength = length * 0.3
	const tongueArcRadius = length * 0.2

	const offset = {
		x: 10 + Math.max(width, lockFlapLength) + 5,
		y: 10 + width * 0.8
	}

	const lidFold = [
		`M ${offset.x + depth + width} ${offset.y + length + width} `,
		`v ${length} `,
	]


	const glueTab = [
		`M ${offset.x} ${offset.y}`,
		`l ${depth * 0.1} ${-flapWidth}`,
		`h ${depth * 0.8}`,
		`l ${depth * 0.1} ${flapWidth}`,
	]

	// arcs: rx ry x-axis-rotation large-arc sweep x y
	const arc1 = `a ${flapCurveRadius} ${flapCurveRadius} 0 0 0 ${-flapCurveRadius} ${flapCurveRadius}`
	const arc2 = `a ${flapCurveRadius} ${flapCurveRadius} 0 0 0 ${flapCurveRadius} ${flapCurveRadius}`
	const tongueArc1 = `a ${tongueArcRadius} ${tongueArcRadius} 0 0 0 ${tongueArcRadius} ${-tongueArcRadius}`
	const tongueArc2 = `a ${tongueArcRadius} ${tongueArcRadius} 0 0 0 ${-tongueArcRadius} ${-tongueArcRadius}`

	const lockFlapAngleYLength = (length * 0.2) + flapCurveRadius

	const lockTab = [
		`M ${offset.x} ${offset.y}`,
		`l ${(width * -0.5)} ${lockFlapAngleYLength}`,
		`h ${(width * -0.4)}`,

		arc1,

		`v ${(length * 0.6) - (width * 0.2) - (flapCurveRadius * 2)}`,

		arc2,

		`h ${(width * 0.4)}`,
		`l ${width * 0.5} ${lockFlapAngleYLength}`,
	]

	const supportFlap1 = [
		`M ${offset.x} ${offset.y + length}`,
		`h ${-lockFlapLength}`,
		`v ${width * 0.5 - flapCurveRadius}`,
		arc2,
		`h ${lockFlapLength - flapCurveRadius - length * 0.2}`,
		`l ${length * 0.2} ${width * 0.5}`
	]

	const lockFlap = [
		`M ${offset.x} ${offset.y + width + length}`,
		`h ${-width}`,
		`v ${length * 0.2}`,																	// length * 0.2 + width * 0.1

		arc2,

		`h ${width * 0.5 - flapCurveRadius}`,
		`v ${(length * 0.6) - (width * 0.2)}`,
		`h ${-(width * 0.5 - flapCurveRadius)}`,

		arc1,

		`v ${length * 0.2}`,
		`h ${width}`
	]

	const supportFlap2 = [
		`M ${offset.x} ${offset.y + length + width + length}`,
		`l ${length * -0.2} ${width * 0.5}`,
		`h ${-(lockFlapLength - flapCurveRadius - length * 0.2)}`,
		arc1,
		`v ${width * 0.5 - flapCurveRadius}`,
		`h ${lockFlapLength}`
	]

	const tuckFlap1 = [
		`M ${offset.x + depth} ${offset.y + (width * 2) + (length * 2)}`,
		`h 5`,
		`l ${tuckFlapLength} ${width * -0.1}`,
		`v ${width * -0.85}`,
		`l ${-tuckFlapLength - 5} ${width * -0.05}`
	]

	const tuckLid = [
		`M ${offset.x + depth} ${offset.y + length + width + length}`,
		`h ${width + (width * 0.5)}`,
		tongueArc1,
		`v ${length * -0.6}`,
		tongueArc2,
		`h ${-(width + (width * 0.5))}`,

		// lock slot 1
		`M ${offset.x + depth + width + 1} ${offset.y + length + width} `,
		`v ${10} `,
		`h -1`,

		// lock slot 2
		`M ${offset.x + depth + width + 1} ${offset.y + length + width + length} `,
		`v ${-10} `,
		`h -1`
	]

	const tuckFlap2 = [
		`M ${offset.x + depth} ${offset.y + length}`,
		`h 5`,
		`l ${tuckFlapLength} ${width * 0.1}`,
		`v ${width * 0.85}`,
		`l ${-tuckFlapLength - 5} ${width * 0.05}`
	]

	const tuckOpening = [
		`M ${offset.x + depth} ${offset.y}`,
		`v ${length * 0.3}`,
		`a ${length * 0.2} ${length * 0.2} 0 0 0 ${0} ${length * 0.4}`,
		`v ${length * 0.3}`,
	]


	const box = generateBox(offset, depth, width, length,)

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
			...lidFold
		],

		cutLines: [
			`M 	${offset.x} ${offset.y} `,
			...glueTab,
			...lockTab,
			...supportFlap1,
			...lockFlap,
			...supportFlap2,
			`h ${depth} `,
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
