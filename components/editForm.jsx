import { useState } from 'react'
import { SimpleGrid } from '@mantine/core'
import { Renderer } from './Renderer'
import { EcmaA5520_20_01_01 as Definition } from './generators/ECMA a55.20.01.01'

export const EditForm = props => {
	const { width, length, depth, onChange } = { width: 60, depth: 25, length: 72, onchange: () => { }, ...props }

	const [currentWidth, setWidth] = useState(width)
	const [currentLength, setLength] = useState(length)
	const [currentDepth, setDepth] = useState(depth)

	const definition = new Definition(currentWidth, length, depth)


	const widthChanged = newWidth => { setWidth(newWidth) }
	const lengthChanged = newLength => { }
	const depthChanged = newDepth => { }

	return <div>
		<div style={{ width: "70%", float: "right" }}>
			<Renderer foldLines={definition.foldLines} cutLines={definition.cutLines} gluePoints={definition.gluePoints}></Renderer>
		</div>

		<div style={{ width: "30%", backgroundColor: "lightgreen" }}>
			<SimpleGrid cols={2}>
				<div>Width (thickness of card * number of cards)</div>
				<div>{currentWidth}</div>
				<input type="number" value={currentWidth} onChange={e => widthChanged(e.target.value)} />

				<div>Length (horizontal measurement of card face)</div>
				<div>{length}</div>

				<div>Depth (vertical measurement of card face)</div>
				<div>{depth}</div>
			</SimpleGrid>
		</div>

	</div>
}


