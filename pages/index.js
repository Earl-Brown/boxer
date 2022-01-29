import Head from 'next/head'
import Image from 'next/image'
import {EditForm} from '../components/EditForm'
import styles from '../styles/Home.module.css'

export default function Home() {

  return (
		<>
			<div>
				<EditForm
					deck={{
						width: 5, height: 5, depth: 5
					}}
					onChange={() =>{}}
				></EditForm>
			</div>
		</>

  )
}
