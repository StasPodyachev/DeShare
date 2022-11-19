import { useAccount } from 'wagmi'
import { FormLabel, Input, InputGroup, InputLeftElement, InputRightAddon, InputRightElement, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Stack, TagLabel, Text } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'
import styles from './order.module.css'
import FileUploader from './FileUploader'
import { useEffect, useState } from 'react'
import Button from '../ui/Button'

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
      <InputRightAddon children='Days' />
     </InputGroup>

     <FormLabel color="#A6A0BB">Price</FormLabel>
     <InputGroup>
      <NumberInput background="#131118" defaultValue={15} min={10}>
       <NumberInputField borderRadius="8px 0px 0px 8px" />
      </NumberInput>
      <InputRightAddon children='USDT' />
     </InputGroup>

     <FormLabel color="#A6A0BB">Upload File</FormLabel>
     <InputGroup>
     <FileUploader onFileSelect={(file) => setSelectedFile(file)}/>
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