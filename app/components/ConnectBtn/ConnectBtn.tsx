import { ConnectButton } from '@rainbow-me/rainbowkit';
export const ConnectBtn = () => {
  if (typeof window === 'undefined') return 
  return (
    <ConnectButton
      chainStatus="icon"
      showBalance={false}
      accountStatus={{ largeScreen: 'full', smallScreen: "full" }} />
  )
}