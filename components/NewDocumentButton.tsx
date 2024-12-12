"use client"

import { useRouter } from "next/navigation";
import { Button } from "./ui/button"
import { useTransition } from "react"
import { createNewdocument } from "@/actions/actions";

function NewDocumentButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleCreateNewDocument = () => {
    startTransition(async ()=>{
      //Create a new document
      const{ docId } = await createNewdocument();
      router.push(`/doc/${docId}`);

    })

  }
  return (
    <Button onClick={handleCreateNewDocument} disabled={isPending}>{isPending? "Creating..." : "New Document"}</Button>
  )
}

export default NewDocumentButton;
