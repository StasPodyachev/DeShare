export const approved  = async (contractAprove, contract, addressWallet) => {
  return await contractAprove?.allowance(contract, addressWallet).then((res) => {
    return res._hex !== "0x00" ? true : false
  })
}