import { generateBox } from './utilities/box-foldlines'

export function defineCarton(depth, width, length,) {

	var { width, length, depth } = { width: 75, length: 150, depth: 180, ...{ width: Number(width), length: Number(length), depth: Number(depth) } }

	const bottom = (width * 2) + (depth * 2)

	const lockFlapLength = length * 0.475
	const flapCurveRadius = width * 0.1
	const tuckFlapLength = length * 0.3
	const tongueArcRadiusX = length * 0.175
	const tongueArcRadiusY = length * 0.15
	const glueTabWidth = width * 0.9
  const tuckOpeningDepth = width * 0.4

	const lockSlotLength = 3

	const offset = {
		x: 5 + glueTabWidth,
		y: 5 + width + tuckOpeningDepth + tongueArcRadiusY
	}

	const lidFold = [
		`M ${offset.x} ${offset.y - width}`,
		`h ${length} `,
	]


	const glueTab = [
		`M ${offset.x} ${offset.y}`,
		`l ${-glueTabWidth} ${depth * 0.025}`,
		`v ${depth * 0.95}`,
		`l ${glueTabWidth} ${depth * 0.025} `,
	]

	// arcs: rx ry x-axis-rotation large-arc sweep x y
	const arc1 = `a ${flapCurveRadius} ${flapCurveRadius} 0 0 0 ${flapCurveRadius} ${flapCurveRadius}`
	const arc2 = `a ${flapCurveRadius} ${flapCurveRadius} 0 0 0 ${flapCurveRadius} ${-flapCurveRadius}`
	const tongueArc1 = `a ${tongueArcRadiusX} ${tongueArcRadiusY} 0 0 0 ${-tongueArcRadiusX} ${-tongueArcRadiusY}`
	const tongueArc2 = `a ${tongueArcRadiusX} ${tongueArcRadiusY} 0 0 0 ${-tongueArcRadiusX} ${tongueArcRadiusY}`
  const tuckOpeningArc = `a ${tuckOpeningDepth} ${tuckOpeningDepth} 0 0 1 -${tuckOpeningDepth * 2} 0 `


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
		`M ${offset.x + length + width} ${offset.y}`,
		`v ${-lockSlotLength}`,
		`l ${width * -0.1} ${-tuckFlapLength} `,
		`h ${width * -0.85} `,
		`l ${width * -0.05} ${tuckFlapLength} `
	]

	const tuckLid = [
		`M ${offset.x + length} ${offset.y} `,
		`v -${width + tuckOpeningDepth} `,
		tongueArc1,
		`h -${length - (tongueArcRadiusX * 2)} `,
		tongueArc2,
		`v ${width + tuckOpeningDepth} `,

		// lock slot 1
		`M ${offset.x} ${offset.y - (width + 0.5)} `,
		`h ${lockSlotLength}`,
		`v 0.5`,

		// lock slot 2
		`M ${offset.x + length} ${offset.y - (width + 0.5)} `,
		`h ${-lockSlotLength}`,
		`v 0.5`
	]

	const tuckFlap2 = [
		`M ${offset.x + length + width + length + width} ${offset.y} `,
		`l ${width * -0.05} ${-tuckFlapLength + (-lockSlotLength)} `,
		`h ${width * -0.85} `,
		`l ${width * -0.1} ${tuckFlapLength} `,
		`v ${lockSlotLength} `,
	]

	const tuckOpening = [
		`M ${offset.x + length + width + length} ${offset.y} `,
		`h -${(length/ 2) - tuckOpeningDepth} `,
		tuckOpeningArc,
		`h -${(length/ 2) - tuckOpeningDepth} `,
	]

	const openSide = [
		`M ${offset.x + length + width + length + width} ${offset.y}`,
		`v ${depth}`
	]


	const box = generateBox(offset, depth, width, length,)

	return {
		image: "ECMA A5520 Style B - FC0105.png",

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
			openSide,

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
