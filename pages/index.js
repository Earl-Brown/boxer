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
						width: 24, length: 50, depth: 60
					}}
					onChange={() =>{}}
				></EditForm>
			</div>
		</>

  )
}
