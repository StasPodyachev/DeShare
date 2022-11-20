
import { FormLabel, Input, InputGroup, InputRightAddon, NumberInput, NumberInputField, Stack } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'
import styles from './order.module.css'
import FileUploader from './FileUploader'
import { useEffect, useState } from 'react'
import Button from '../ui/Button'
import { DeleteIcon } from '@chakra-ui/icons'

const Order = () => {
 const [name, setName] = useState("")
 const [selectedFile, setSelectedFile] = useState(null)

 useEffect(() => {
  console.log(selectedFile, 'selectedFile');
 }, [selectedFile])

 return (
  <div className={styles.user}>
   <div className={styles.block}>
   <Stack spacing={4}>
     <FormLabel color="#A6A0BB">Name Product</FormLabel>
     <InputGroup mt="0">
       <Input background="#131118" placeholder='Name'/>
     </InputGroup>

     <FormLabel color="#A6A0BB">Description product</FormLabel>
     <InputGroup>
      <Textarea background="#131118" placeholder='Description product'/>
     </InputGroup>

     <FormLabel color="#A6A0BB">Sale Duration</FormLabel>
     <InputGroup>
      <NumberInput background="#131118" defaultValue={15} min={10}>
       <NumberInputField borderRadius="8px 0px 0px 8px" />
      </NumberInput>
      <InputRightAddon>Days</InputRightAddon>
     </InputGroup>

     <FormLabel color="#A6A0BB">Price</FormLabel>
     <InputGroup>
      <NumberInput background="#131118" defaultValue={15} min={10}>
       <NumberInputField borderRadius="8px 0px 0px 8px" />
      </NumberInput>
      <InputRightAddon>USDT</InputRightAddon>
     </InputGroup>

     
     <FormLabel color="#A6A0BB">Upload Files</FormLabel>
     <InputGroup>
      {
        !selectedFile ? <FileUploader onFileSelect={(file) => setSelectedFile(file)}/> :
        <div className={styles.fileName}>
          <span>{selectedFile?.name}</span>
          <div className={styles.delete} onClick={() => setSelectedFile(null)}><DeleteIcon /></div>
        </div>
      }
     </InputGroup>
   </Stack>
   <div className={styles.btn}>
     <Button title='Confirm' onClick={() => console.log("confirm")} />
    </div>
   </div>
  </div>
 )
}
export default Order