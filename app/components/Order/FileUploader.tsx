import { DownloadIcon } from '@chakra-ui/icons'
import { Progress } from '@chakra-ui/react'
import{useRef} from 'react'
import styles from './order.module.css'

const FileUploader = ({onFileSelect}) => {
	const fileInput = useRef(null)
	const handleFileInput = (e) => {
		onFileSelect(e.target.files[0])
	}

	return (
		<div className={styles.wrapper}>
			<input multiple
				id="input__file"
				type="file"
				className={styles.input}
				onChange={handleFileInput}/>
			<label htmlFor="input__file"  className={styles.button}>
			<DownloadIcon mr={2} />
			<span className="input__file-button-text">Select File</span>
   </label>
			{/* <button onClick={e => fileInput.current && fileInput.current.click()}/> */}
		</div>
	)
}

export default FileUploader