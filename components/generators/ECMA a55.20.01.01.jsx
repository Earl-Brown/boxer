

export const EcmaA5520_20_01_01 = (props) => {
	const { width, length, depth } = { width: 50, length: 78, depth: 25, ...props }

	const startx = 10 + (depth * 2)
	const starty = 10
	const flapDepth = depth * 0.75
	const bottom = (width * 2) + (depth * 2)

	const glueTab = [
		`M ${startx} ${starty + bottom}`,
		`l ${length * 0.1} ${flapDepth}`,
		`h ${length * 0.8}`,
		`l ${length * 0.1} ${0 - flapDepth}`,
	]

	const lidFold = [
		`M ${startx + length + depth} ${starty + bottom}`,
		`v ${-width}`,
	]

	const box = [
		// draw outer square
		`h ${length} `,
		`v ${bottom}`,
		`H ${startx}`,
		`V ${starty}`,

		// mark off side 1
		`M ${startx} ${starty + depth}`,
		`h ${length}`,

		// mark off front
		`M ${startx} ${starty + depth + width}`,
		`h ${length}`,

		// mark off side 2 (back is the remainder of the box)
		`M ${startx} ${starty + depth + width + depth}`,
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

	const folds = [
		`M ${startx} ${starty}`,
		...box,
		...lidFold,
	]

	const cuts = [
		`M 	${startx} ${starty}`,
		...upFlap,
		...overFlap,
		...downFlap,

		...tuckFlap,

		...glueTab,
	]


	return <div style={{ width: "inherit", length: "inherit", position: "relative" }}>
		<div style={{ width: "inherit", length: "inherit", position: "absolute" }}>
			<svg viewBox="0 0 222 279.4" xmlns="http://www.w3.org/2000/svg">
				<g id="svgGroup"
					strokeLinecap="round"
					fillRule="evenodd"
					fontSize="9pt"
					stroke="#000"
					strokeWidth="0.25mm"
					fill="none"
					style={{ stroke: "#000", strokeWidth: "0.25mm", fill: "none" }}
				>
					<path
						d={folds.join(", ")}
						id="folds"
						stroke="green"
						style={{ stroke: "green" }}
						vectorEffect="non-scaling-stroke"
					/>


					<path
						d={cuts.join(", ")}
						id="cuts"
						stroke="red"
						style={{ stroke: "red" }}
						vectorEffect="non-scaling-stroke"
					/>
				</g>
			</svg>
		</div>
	</div>
}