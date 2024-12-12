"use client";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FormEvent, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { inviteUserToDocument } from "@/actions/actions";
import { toast } from "sonner";
import { Input } from "./ui/input";
import * as Y from "yjs";
import { MessageCircleCode } from "lucide-react";


function ChatToDocument({doc}: {doc: Y.Doc}) {
    const [input, setInput] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [summary, setSummary] = useState("");
    const [question, setQuestion] = useState("");

    const handleAskQuestion = async (e: FormEvent)=> {
        e.preventDefault();

        setQuestion(input);

        startTransition(async ()=> {
            const documentData= doc.get("document-store").toJSON();

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/chatToDocument`,{
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        documentData,
                        question: input,
                    }),
                }
            )
            if(res.ok){
                const { message } = await res.json();

                setInput("");
                setSummary(message);

                toast.success("Question Asked Successfully!");
            }
        })
    };



    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant="outline">
                <DialogTrigger>
                    <MessageCircleCode className="mr-2" />
                    Chat to Document
                </DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Chat to the Document!</DialogTitle>
                    <DialogDescription>
                        Enter the email of the user you want to invite.
                    </DialogDescription>
                </DialogHeader>

                <form className="flex gap-2" onSubmit={handleAskQuestion}>
                    <Input
                    type="text" 
                    placeholder="i.e. what is this about?"
                    className="w-full"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    />
                    <Button type="submit" disabled={!input || isPending}>
                        {isPending ? "Asking..." : "Ask"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>

    )
}

export default ChatToDocument
