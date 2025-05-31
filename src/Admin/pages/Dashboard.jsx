import React, { useEffect, useState } from 'react'
import axios from 'axios'
import api from '../../../api/api'

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/api/Order/AdminDash')
        console.log("dash",response)
        setDashboardData(response.data.data)
      } catch (err) {
        setError('Failed to fetch dashboard data')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 bg-white shadow z-10 p-4">
        <h2 className="text-center text-2xl font-bold">Dashboard</h2>
      </div>

      <div className="p-6">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && dashboardData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-md rounded-lg p-4 text-center">
              <p className="text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">₹{dashboardData.totalRevenue}</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 text-center">
              <p className="text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-blue-600">{dashboardData.totalProducts}</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 text-center">
              <p className="text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-purple-600">{dashboardData.totalOrders}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
