import { useState } from 'react'
import { SimpleGrid } from '@mantine/core'
import { Renderer } from './Renderer'
import { defineCarton } from './generators/ECMA A5520 Style A - FC0105'

const mmPerInch = 254

export const EditForm = props => {
	const { page, width, length, depth, onChange } = {
		page: {
			width: 11,
			height: 8.5
		},
		width: 0.31 * 60,
		depth: 88.9,
		length: 63.5,
		onchange: () => { },
		...props
	}

	const pageWidth = page.width * mmPerInch
	const pageHeight = page.height * mmPerInch

	const [currentDepth, setDepth] = useState(depth)
	const [currentWidth, setWidth] = useState(width)
	const [currentLength, setLength] = useState(length)

	const { foldLines, cutLines, gluePoints, image } = defineCarton(currentDepth, currentWidth, currentLength)

	const depthChanged = newDepth => { setDepth(newDepth) }
	const widthChanged = newWidth => { setWidth(newWidth) }
	const lengthChanged = newLength => { setLength(newLength) }

	return <div>
		<div id="render-container" style={{ width: "80%", height: "100%", float: "right" }}>
			<div id="dimensions-overlay" style={{ position: "relative", left: "0.25em" }}> Depth {currentDepth}, Width {currentWidth}, Length {currentLength}</div>
			<Renderer foldLines={foldLines} cutLines={cutLines} gluePoints={gluePoints} pageWidth={pageWidth} pageHeight={pageHeight}></Renderer>
		</div>

		<div id="input-form" style={{ width: "20%" }}>
			<SimpleGrid cols={3}>

				<div>Depth</div>
				<div>{currentDepth}</div>
				<input type="number" value={currentDepth} onChange={e => depthChanged(e.target.value)} />

				<div>Width</div>
				<div>{currentWidth}</div>
				<input type="number" value={currentWidth} onChange={e => widthChanged(e.target.value)} />

				<div>Length</div>
				<div>{currentLength}</div>
				<input type="number" value={currentLength} onChange={e => lengthChanged(e.target.value)} />

			</SimpleGrid>
			<img src={`images/representations/${image}`} />
		</div>

	</div>
}


