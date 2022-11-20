
import { FormControl, FormLabel, Input, InputGroup, InputRightAddon, NumberInput, NumberInputField, Stack } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'
import styles from './order.module.css'
import FileUploader from './FileUploader'
import { useEffect, useState } from 'react'
import Button from '../ui/Button'
import { DeleteIcon } from '@chakra-ui/icons'

const Order = () => {
 const [name, setName] = useState("")
 const [description, setDescription] = useState("")
 const [price, setPrice] = useState(50)
 const [duration, setDuration] = useState(15)
 const [sid, setSid] = useState<any>('')

 const [selectedFile, setSelectedFile] = useState(null)

 const handleInputChangeName = (e) => setName(e.target.value)
 const handleInputChangeDescription = (e) => setDescription(e.target.value)
 const handleInputChangePrice = (e) => setPrice(e.target.value)
 const handleInputChangeDuration = (e) => setDuration(e.target.value)

 useEffect(() => {
  if (sid) console.log(sid, 'sid');
 }, [sid])

 return (
  <div className={styles.user}>
   <div className={styles.block}>
   <Stack spacing={4}>
     <FormControl>
      <FormLabel color="#A6A0BB">File Name</FormLabel>
      <InputGroup mt="0">
        <Input value={name} onChange={handleInputChangeName}  background="#131118" placeholder='What exactly are you selling'/>
      </InputGroup>
     </FormControl>

     <FormControl>
      <FormLabel color="#A6A0BB">File Description</FormLabel>
      <InputGroup>
        <Textarea value={description} onChange={handleInputChangeDescription} background="#131118" placeholder='Some words about your file'/>
      </InputGroup>
     </FormControl>

     <FormControl>
      <FormLabel color="#A6A0BB">Sale Duration</FormLabel>
      <InputGroup>
        <NumberInput background="#131118" defaultValue={15} min={10}
           value={duration} onChange={handleInputChangeDuration} >
          <NumberInputField borderRadius="8px 0px 0px 8px" />
        </NumberInput>
        <InputRightAddon>Days</InputRightAddon>
      </InputGroup>
     </FormControl>

     <FormControl>
      <FormLabel color="#A6A0BB">Price</FormLabel>
      <InputGroup>
        <NumberInput value={price} onChange={handleInputChangePrice}   background="#131118" defaultValue={15} min={10}>
          <NumberInputField borderRadius="8px 0px 0px 8px" />
        </NumberInput>
        <InputRightAddon>USDT</InputRightAddon>
      </InputGroup>
     </FormControl>

     
     <FormLabel color="#A6A0BB">Upload Files</FormLabel>
     <InputGroup>
      {
        !selectedFile ? <FileUploader setSid={setSid} onFileSelect={(file) => setSelectedFile(file)}/> :
        <div className={styles.fileName}>
          <span>{selectedFile?.name}</span>
          <div className={styles.delete}
            onClick={() => setSelectedFile(null)}><DeleteIcon />
          </div>
        </div>
      }
     </InputGroup>
   </Stack>
   <div className={styles.btn}>
     <Button title='Sell File' onClick={() => console.log("confirm")} />
    </div>
   </div>
  </div>
 )
}
export default Order