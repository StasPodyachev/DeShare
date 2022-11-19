import { CloseButton } from '@chakra-ui/close-button'
import { CheckCircleIcon } from '@chakra-ui/icons'
import { Box, Flex, Link } from '@chakra-ui/layout'
import { useNetwork } from 'wagmi'

export default function ToastSuccess({
  onClose,
  title = 'Transaction is completed.',
  description,
  address = null,
}: {
  title?: string
  description?: any
  onClose: () => void
  address: string | null
}) {
  const { chain } = useNetwork()
  return (
    <Flex
      justifyContent="space-between"
      borderRadius="xl"
      color="white"
      p={3}
      bg="#363D45"
      borderWidth={1}
      borderColor="#6E7C8C"
    >
      <CheckCircleIcon flexShrink={0} mr={4} boxSize="20px" color="#84BF40" />
      <Box flexGrow={1}>
        {title && <Box fontWeight={600}>{title}</Box>}
        {description && <Box>{description}</Box>}
        <Box>
          {address && (
            <Link
              isExternal
              href={chain?.id === 420 ? `https://goerli-optimism.etherscan.io/tx/${address}` : `https://mumbai.polygonscan.com/tx/${address}`}
              fontSize="sm"
              color="#00C097"
              fontWeight={600}
            >
              View on Erherscan
            </Link>
          )}
        </Box>
      </Box>
      <CloseButton flexShrink={0} onClick={onClose} />
    </Flex>
  )
}
