"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from "axios"
import { useNavigate } from "react-router-dom"


interface NewTestDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function NewTestDialog({ isOpen, onClose }: NewTestDialogProps) {
  const navigate = useNavigate();
  const [availableTests, setAvailableTests] = useState([])
  const [selectedTest, setSelectedTest] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const fetchTests = async () => {
      setLoading(true)
      const token = localStorage.getItem('authToken')
      setError("")
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/test/available`,{
          headers : {
            Authorization : `Bearer ${token}`,
          }
        }) // Adjust endpoint as needed
        setAvailableTests(response.data)
        
      } catch (err : any) {
        setError(err.message)
      } finally {
        setLoading(false) 
      }
    }

    if (isOpen) fetchTests()
  }, [isOpen])

  const handleStartTest = () => {
    navigate(`/paper/${selectedTest}/1`,{ replace: true });
      window.history.pushState(null,'/dashboard/')
    onClose() // Close dialog after starting test (optional)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-inter">Start New Test</DialogTitle>
          <DialogDescription className="font-inter">Select a test from the available options below.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4 font-inter">
          {loading ? (
            <p>Loading tests...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <Select onValueChange={setSelectedTest} value={selectedTest}>
              <SelectTrigger>
                <SelectValue placeholder="Select a test" />
              </SelectTrigger>
              <SelectContent>
              {availableTests.map((test, index) => (
  <SelectItem key={index} value={test}>
    {test}
  </SelectItem>
))}

              </SelectContent>
            </Select>
          )}
          <Button className="w-full" onClick={handleStartTest} disabled={!selectedTest || loading}>
            Start Test
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
