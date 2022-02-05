import { useState } from 'react'
import { SimpleGrid } from '@mantine/core'
import { Renderer } from './Renderer'
import { EcmaA5520_20_01_01 as Definition } from './generators/ECMA a55.20.01.01'

export const EditForm = props => {
	const { deck, onChange } = { onchange: () => { }, deck: { width: 60, depth: 25, length: 72 }, ...props }
	const { width, length, depth } = deck

	const [definition, setDefinition] = useState(new Definition(width, length, depth))

	//	setDefinition(new Definintion(width, length, depth))
	console.log("definition", JSON.stringify(definition, undefined, 2))

	const widthChanged = () => { }
	const lengthChanged = () => { }
	const depthChanged = () => { }

	return <div>
		<div style={{ width: "70%", float: "right" }}>
			<Renderer foldLines={definition.foldLines} cutLines={definition.cutLines} gluePoints={definition.gluePoints}></Renderer>
		</div>

		<div style={{ width: "30%", backgroundColor: "lightgreen" }}>
			<SimpleGrid cols={2}>
				<div>Width (thickness of card * number of cards)</div>
				<div>{width}</div>
				<div>Length (horizontal measurement of card face)</div>
				<div>{length}</div>
				<div>Depth (vertical measurement of card face)</div>
				<div>{depth}</div>
			</SimpleGrid>
		</div>

	</div>
}


