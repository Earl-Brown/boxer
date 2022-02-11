const arrayToString = arr => {
	if (typeof (arr) == 'string') return arr
	if (Array.isArray(arr)) return arr.join(', ')
	return null
}

const foldsToString = arr => {
	var str = arrayToString(arr)
	if (str != null) return str
	console.log('folds failed', typeof (arr), arr)
	throw "folds must be a string or an array"
}

const cutsToString = arr => {
	var str = arrayToString(arr)
	if (str != null) return str
	throw "cuts must be a string or an array"
}

const gluesToString = arr => {
	var str = arrayToString(arr)
	if (str != null) return str
	throw "glue points must be a string or an array"
}


export const Renderer = props => {
	const { foldLines, cutLines, gluePoints, styles, pageWidth, pageHeight } = {
		pageWidth: "8.5in",
		pageHeight: "11in",
		styles: {
			foldLines: {
				stroke: 'green',
				vectorEffect: 'non-scaling-stroke'
			},
			cutLines: {
				stroke: 'red',
				vectorEffect: 'non-scaling-stroke'
			},
			gluePoints: {
				stroke: 'blue',
				vectorEffect: 'non-scaling-stroke',
				fillPattern: <pattern />
			}
		}, ...props
	}

	const folds = foldsToString(foldLines)
	const cuts = cutsToString(cutLines)
	//	const glues = gluesToString(gluePoints)

	return <div style={{ width: pageWidth, height: pageHeight, position: "relative" }}>
		<div style={{ width: "100%", height: "100%", position: "absolute" }}>
			<svg width={pageWidth} height={pageHeight} xmlns="http://www.w3.org/2000/svg">
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
						d={folds}
						id="folds"
						stroke={styles.foldLines.stroke}
						style={{ stroke: styles.foldLines.stroke }}
						vectorEffect={styles.foldLines.vectorEffect}
					/>

					<path
						d={cuts}
						id="cuts"
						stroke={styles.cutLines.stroke}
						style={{ stroke: styles.cutLines.stroke }}
						vectorEffect={styles.cutLines.vectorEffect}
					/>

					{/* {glues
						? <path
							d={glues}
							id="glues"
							stroke={styles.gluePoints.stroke}
							style={{ stroke: styles.gluePoints.stroke }}
							vectorEffect={styles.gluePoints.vectorEffect}
						/>
						: <></>
					} */}

				</g>
			</svg>
		</div>
	</div>
}