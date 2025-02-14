import { Button } from "@/components/ui/button";
import React from "react";import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { useNavigate } from "react-router-dom";

type Props = {
    setIsLoggingOut : () => void
    isLogOut : boolean
}


export const LogoutModal : React.FC<Props> = ({isLogOut,setIsLoggingOut} : Props)=>{
    const navigate = useNavigate();


    return(
        <Dialog open={isLogOut} onOpenChange={setIsLoggingOut}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Log Out</DialogTitle>
      <DialogDescription>
        Are you sure you want to log out? You will need to log in again to access your account.
      </DialogDescription>
    </DialogHeader>
    <div className="space-y-4 py-4">
      <Button
        className="w-full bg-blue-900 hover:bg-blue-950 hover:scale-105"
        onClick={() => {
          localStorage.removeItem("authToken");
          localStorage.removeItem("userId");
          localStorage.removeItem("userName");
          localStorage.removeItem("userEmail");
          localStorage.removeItem("userPhoto");
          navigate("/");
        }}
      >
        Logout
      </Button>
      <Button
        className="w-full"
        variant="outline"
        onClick={setIsLoggingOut}
      >
        Cancel
      </Button>
    </div>
  </DialogContent>
</Dialog>
    )
}
