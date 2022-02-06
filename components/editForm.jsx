import { useState } from 'react'
import { SimpleGrid } from '@mantine/core'
import { Renderer } from './Renderer'
import { defineCarton } from './generators/ECMA a55.20.01.01'

export const EditForm = props => {
	const { width, length, depth, onChange } = { width: 25, depth: 75, length: 60, onchange: () => { }, ...props }

	const [currentDepth, setDepth] = useState(depth)
	const [currentWidth, setWidth] = useState(width)
	const [currentLength, setLength] = useState(length)

	const { foldLines, cutLines, gluePoints } = defineCarton(currentDepth, currentWidth, currentLength)

	const widthChanged = newWidth => { setWidth(newWidth) }
	const lengthChanged = newLength => { setLength(newLength) }
	const depthChanged = newDepth => { setDepth(newDepth) }

	return <div>
		<div style={{ width: "80%", height: "100%", float: "right" }}>
			<Renderer foldLines={foldLines} cutLines={cutLines} gluePoints={gluePoints}></Renderer>
		</div>

		<div style={{ width: "20%", backgroundColor: "lightgreen" }}>
			<SimpleGrid cols={3}>

				<div>Depth</div>
				<div>{depth}</div>
				<input type="number" value={currentDepth} onChange={e => depthChanged(e.target.value)} />

				<div>Width</div>
				<div>{currentWidth}</div>
				<input type="number" value={currentWidth} onChange={e => widthChanged(e.target.value)} />

				<div>Length</div>
				<div>{length}</div>
				<input type="number" value={currentLength} onChange={e => lengthChanged(e.target.value)} />

			</SimpleGrid>
		</div>

	</div>
}


