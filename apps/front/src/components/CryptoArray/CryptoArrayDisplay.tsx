import React from "react"
import CryptoArray from "./CryptoArray"
import SelectCrypto from "./SelectCrypto"

export default function CryptoArrayDisplay() {
  return (
    <div className="ArrayDisplay">
      <SelectCrypto />

      <CryptoArray />
    </div>
  )
}
