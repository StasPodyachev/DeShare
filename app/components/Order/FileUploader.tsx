import { DownloadIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react'
const axios = require('axios')
import styles from './order.module.css'

const FileUploader = ({onFileSelect, setSid}) => {
	const [ isLoading, setLoading ] = useState(false)
	const handleFileInput = async (e) => {
		const file = e.target.files[0]
		onFileSelect(file)
		if (file) {
			try {
				console.log(file, 'file');
				const formData = new FormData();
				formData.append("file", file);
				console.log(formData);
				const url = "https://api.pinata.cloud/pinning/pinFileToIPFS"
				const resFile = await axios.post(
					url,
					formData,
					{
						maxContentLength: "Infinity",
						headers: {
							"Content-Type": undefined, 
							'pinata_api_key': `${process.env.NEXT_PUBLIC_PINATA_API_KEY}`,
							'pinata_secret_api_key': `${process.env.NEXT_PUBLIC_PINATA_API_SECRET}`
						}
					}
			)
			const ImgHash = resFile.data.IpfsHash
			setSid(ImgHash) 
			} catch (error) {
				console.log("Error sending File to IPFS: ")
				console.log(error)
			}
		}
    // setSid(result.path)
	}

	return (
		<div className={styles.wrapper}>
			{
				!isLoading ?
				<>
					<input
						id="input__file"
						type="file"
						className={styles.input}
						onChange={handleFileInput}/>
					<label htmlFor="input__file"  className={styles.button}>
						<DownloadIcon mr={2} />
						<span className="input__file-button-text">Select File</span>
					</label>
				</>
				: null
			}
		</div>
	)
}

export default FileUploader