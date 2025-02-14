"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import axios from "axios"


export function ComparisonChart() {
  const [data,setData] = useState()

  useEffect(() => {
    const fetchAvg = async ()=>{
      try {
        const token = localStorage.getItem("authToken")

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/test/subAvg`,{
          headers:{
            Authorization : `Bearer ${token}`,
          }
        }
      )
 
        setData(response.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchAvg()
  }, [])

  return (
    <Card className="md:col-span-2 p-1">
      <CardHeader>
        <CardTitle>Subject-wise Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="vertical">
            <XAxis type="number" />
            <YAxis dataKey="subject" width={100} type="category" />
            <Bar dataKey="average" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

