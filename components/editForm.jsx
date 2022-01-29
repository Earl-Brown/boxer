import {SimpleGrid} from '@mantine/core'
import templates from './templates'
import {CrashFold} from './templates'

export const EditForm = props => {

	const {deck, onChange} = {onchange: () => {}, deck: {width: 60, depth: 25, height: 72}, ...props}
	const {width, height, depth} = deck

	const widthChanged = () => {}
	const heightChanged = () => {}
	const depthChanged = () => {}

	const Renderer = templates[0].renderer

	return <div>
		<div style={{width: "70%", float: "right"}}>
			<Renderer></Renderer>
		</div>

		<div style={{width: "30%", backgroundColor: "lightgreen"}}>
			<SimpleGrid cols={2}>
					<div>Width</div>
					<div>{width}</div>
					<div>Height</div>
					<div>{height}</div>
					<div>Depth</div>
					<div>{depth}</div>
			</SimpleGrid>
		</div>

	</div>
}


