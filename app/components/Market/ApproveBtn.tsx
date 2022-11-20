
import { CSSProperties, useEffect } from "react";
import { erc20ABI, useContractWrite, usePrepareContractWrite } from "wagmi";
import styles from "./Button.module.css";
import { PulseLoader } from "react-spinners";
import { ethers } from "ethers";
import addresses from "../../contracts/addresses";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

const ApproveBtn = ({
  title,
  isSetApprove
}: any) => {
  const { config } = usePrepareContractWrite({
    address: addresses.USDC,
    abi: erc20ABI,
    functionName: "approve",
    args: [addresses.USDC, ethers?.constants?.MaxUint256]
  }); 
  const { write: create, isLoading, isSuccess } = useContractWrite(config)
  useEffect(() => {
    if (isSuccess) isSetApprove(isSuccess)
  }, [isSuccess])

  return (
    isLoading ?
    <div className={styles.btn}>
      <PulseLoader
        color="#fff"
        loading={isLoading}
        cssOverride={override}
        size={8}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>:
    <div onClick={() => {create?.()}} className={styles.btn}>
      {title}
    </div>
  );
};

export default ApproveBtn;