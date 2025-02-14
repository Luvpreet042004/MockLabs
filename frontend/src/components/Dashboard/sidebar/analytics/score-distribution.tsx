import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect,useState } from "react"
import axios from "axios"

const COLORS = ["#00C49F", "#0088FE", "#FFBB28", "#FF8042"]

export function ScoreDistribution() {
  const [data,setData] = useState([])

  useEffect(() => {
    const fetchAvg = async ()=>{
      try {
        const token = localStorage.getItem("authToken")

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/test/scoreDist`,{
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
    <Card>
      <CardHeader>
        <CardTitle>Score Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value" 
            >
              {data.map((_,index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

