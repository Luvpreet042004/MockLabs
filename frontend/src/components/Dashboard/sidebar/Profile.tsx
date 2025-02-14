import { useEffect, useState } from "react";
import { CalendarDays, Mail, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

interface UserProfile {
  name: string;
  email: string;
  accountCreated: string;
  totalTests: number;
  averageScore: number;
  bestScore: number;
}

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState<boolean>(true); // Fix: Initialize to true
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    accountCreated: "",
    totalTests: 0,
    averageScore: 0,
    bestScore: 0,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProfile(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false); // Fix: Set loading state to false after API call
      }
    };

    fetchProfile();
  }, []); // Fix: Removed `profile` from dependency array to avoid infinite loop

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      {isLoading ? (
        <div className="max-w-2xl mx-auto">
          {/* Skeleton Loading UI */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-6 w-3/4 rounded-md" />
              <Skeleton className="h-6 w-2/3 rounded-md" />
              <Skeleton className="h-6 w-1/2 rounded-md" />
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Total Tests</CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-full rounded-lg" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Average Score</CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-full rounded-lg" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Best Score</CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-full rounded-lg" />
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
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
                  <p className="font-medium">{profile.accountCreated}</p>
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
                <p className="text-3xl font-bold">{profile.averageScore}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Best Score</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{profile.bestScore}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
