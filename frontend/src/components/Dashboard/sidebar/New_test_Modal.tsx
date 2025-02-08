"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const availableTests = [
  { id: "1", name: "Physics Test 1" },
  { id: "2", name: "Chemistry Test 1" },
  { id: "3", name: "Mathematics Test 1" },
]

interface NewTestDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function NewTestDialog({ isOpen, onClose }: NewTestDialogProps) {
  const [selectedTest, setSelectedTest] = useState<string>("")
  const handleStartTest = () => {
    console.log("Starting test:", selectedTest)
    onClose() // Close dialog after starting test (optional)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start New Test</DialogTitle>
          <DialogDescription>Select a test from the available options below.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Select onValueChange={setSelectedTest} value={selectedTest}>
            <SelectTrigger>
              <SelectValue placeholder="Select a test" />
            </SelectTrigger>
            <SelectContent>
              {availableTests.map((test) => (
                <SelectItem key={test.id} value={test.id}>
                  {test.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button className="w-full" onClick={handleStartTest} disabled={!selectedTest}>
            Start Test
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
