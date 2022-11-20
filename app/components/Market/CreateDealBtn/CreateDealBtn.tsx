import { CSSProperties, useContext, useEffect } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import styles from "./Button.module.css";
import { BIG_1E18 } from "../../../utils/misc";
import BigDecimal from "decimal.js-light";
import { useRouter } from "next/router";
import { PulseLoader } from "react-spinners";
import WaitingConfirmationModal from "../../ui/Modals/WaitingConfirmationModal";
import { useTransactionManager } from "../../../context/TransactionManageProvider";
import addresses from "../../../contracts/addresses";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

const CreateDealBtn = ({
  title,
  contract,
  abi,
  id, token,
  amount
}: any) => {
  const { onConfirm, onTransaction } = useTransactionManager()
  const { push } = useRouter()
  const newCount = BigInt(new BigDecimal("200").mul(BIG_1E18 + "").toFixed(0)) + "";
  const { config } = usePrepareContractWrite({
    address: contract.address,
    abi,
    functionName: "buyItem",
    args: [ 2, addresses.USDC , newCount,"0x"],
  });

  const { data, write: create, isLoading, isSuccess } = useContractWrite(config)

  useEffect(() => {
    if (data && isSuccess) {
      onTransaction(data?.hash)
      push('/dashboard')
    }
  }, [data])

  useEffect(() => {
    if (isLoading) {
      onConfirm()
    }
  }, [isLoading])

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

export default CreateDealBtn;