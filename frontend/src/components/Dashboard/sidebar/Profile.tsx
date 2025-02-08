"use client"

import { useEffect, useState } from "react"
import { CalendarDays, Mail, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface UserProfile {
  name: string
  email: string
  createdAt: string
  totalTests: number
  averageScore: number
  bestScore: number
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    createdAt: "",
    totalTests: 0,
    averageScore: 0,
    bestScore: 0,
  })

  useEffect(() => {
    // Simulate fetching profile data
    // Replace with actual API call
    const mockProfile = {
      name: localStorage.getItem("firstName") || "John Doe",
      email: "student@example.com",
      createdAt: "2024-01-01",
      totalTests: 15,
      averageScore: 85,
      bestScore: 95,
    }
    setProfile(mockProfile)
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="max-w-2xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{profile.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{profile.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <CalendarDays className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Account Created</p>
                <p className="font-medium">{profile.createdAt}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total Tests</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{profile.totalTests}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{profile.averageScore}%</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Best Score</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{profile.bestScore}%</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

