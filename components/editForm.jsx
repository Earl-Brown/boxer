import { SimpleGrid } from '@mantine/core'
import generators from './generators'

export const EditForm = props => {

	const { deck, onChange } = { onchange: () => { }, deck: { width: 60, depth: 25, length: 72 }, ...props }
	const { width, length, depth } = deck

	const widthChanged = () => { }
	const lengthChanged = () => { }
	const depthChanged = () => { }

	const Renderer = generators[0].renderer

	return <div>
		<div style={{ width: "70%", float: "right" }}>
			<Renderer width={width} depth={depth} length={length}></Renderer>
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


