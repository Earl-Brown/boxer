
export const CrashFold = (props) => {
	const {width, height, depth} = {width: 50, height: 78, depth: 25, ...props}

	const startx = 10
	const starty = 10
	const flapDepth = depth * 0.75

	const foldElements=[
		// draw outer square
		`M ${startx} ${starty}`,
		`h ${height} `,
		`v ${(width * 2) + (depth * 2)}`,
		`H ${startx}`,
		`V ${starty}`,

		// mark off side 1
		`M ${startx} ${starty + depth}`,
		`h ${height}`,

		// mark off front
		`M ${startx} ${starty + depth + width}`,
		`h ${height}`,

		// mark off side 2 (back is the remainder of the box)
		`M ${startx} ${starty + depth + width + depth}`,
		`h ${height}`,

		// mark off glue tab
		`M ${startx} ${(starty + depth * 2) + (width * 2)}`,
		`l ${height * 0.1} ${flapDepth}`,
		`h ${height * 0.8}`,
		`l ${height * 0.1} ${0 - flapDepth}`

	]

	const cutElements = [
		`M ${width} 244`,
		`L 197 244`,
		`L 199 244`,
		`L 200 244`,
		`L 202.6 ${height}`,
	]

	return <div style={{width: "inherit", height: "inherit", position: "relative"}}>
		<div style={{width: "inherit", height: "inherit", position: "absolute"}}>
			<svg viewBox="0 0 222 279.4" xmlns="http://www.w3.org/2000/svg">
				<g id="svgGroup"
					strokeLinecap="round"
					fillRule="evenodd"
					fontSize="9pt"
					stroke="#000"
					strokeWidth="0.25mm"
					fill="none"
					style={{stroke:"#000", strokeWidth:"0.25mm", fill:"none"}}
				>
					<path
						d={foldElements.join(", ")}
						id="folds"
						stroke="green"
						style={{stroke:"green"}}
						vectorEffect="non-scaling-stroke"
					/>


					<path
						d={cutElements.join(", ")}
						id="cuts"
						stroke="red"
						style={{stroke:"red"}}
						vectorEffect="non-scaling-stroke"
					/>
				</g>
			</svg>
		</div>
	</div>
}