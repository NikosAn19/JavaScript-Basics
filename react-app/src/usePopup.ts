import { useState } from "react";

export default function usePopup() {
  const [showDataAccepted, setDataAccepted] = useState(false);
  const [code, setCode] = useState("");
}
