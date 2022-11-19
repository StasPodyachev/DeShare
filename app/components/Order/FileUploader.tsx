import React, {useRef} from 'react'

const FileUploader = ({onFileSelect}) => {
	const fileInput = useRef(null)
	const handleFileInput = (e) => {
		onFileSelect(e.target.files[0])
	}

	return (
		<div className="file-uploader">
			<input multiple type="file" onChange={handleFileInput}/>
			<button onClick={e => fileInput.current && fileInput.current.click()} className="primary"/>
		</div>
	)
}

export default FileUploader