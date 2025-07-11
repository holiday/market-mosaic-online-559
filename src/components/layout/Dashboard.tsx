
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatsCard } from '@/components/ui/StatsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Eye, Car, MessageCircle, Clock, Edit, Users, Phone, 
  TrendingUp, Calendar, BarChart3, Activity, Star, MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for dashboard metrics
const dealerMetrics = {
  totalVisits: 2847,
  visitsTrend: 12.5,
  totalVehicles: 47,
  vehiclesTrend: 8.3,
  whatsappClicks: 156,
  whatsappTrend: 23.1,
  avgTimeSpent: "4m 32s",
  timeSpentTrend: -2.3,
};

const recentActivity = [
  { type: 'edit', vehicle: '2023 Toyota Camry', time: '2 minutes ago', user: 'John Smith' },
  { type: 'view', vehicle: '2024 Honda CR-V', time: '5 minutes ago', user: 'Customer' },
  { type: 'whatsapp', vehicle: '2022 Ford F-150', time: '12 minutes ago', user: 'Sarah Johnson' },
  { type: 'edit', vehicle: '2023 BMW X5', time: '1 hour ago', user: 'Mike Davis' },
  { type: 'view', vehicle: '2024 Tesla Model 3', time: '2 hours ago', user: 'Customer' },
];

const popularVehicles = [
  { id: 1, name: '2024 Honda CR-V', views: 234, price: '$32,000', status: 'available', image: '/placeholder.svg' },
  { id: 2, name: '2023 Toyota Camry', views: 198, price: '$28,500', status: 'available', image: '/placeholder.svg' },
  { id: 3, name: '2022 Ford F-150', views: 187, price: '$45,000', status: 'pending', image: '/placeholder.svg' },
  { id: 4, name: '2024 Tesla Model 3', views: 165, price: '$38,000', status: 'available', image: '/placeholder.svg' },
  { id: 5, name: '2023 BMW X5', views: 142, price: '$65,000', status: 'available', image: '/placeholder.svg' },
];

const recentlyEdited = [
  { id: 1, name: '2023 Toyota Camry', editedBy: 'John Smith', editedAt: '2 minutes ago', changes: 'Price updated' },
  { id: 2, name: '2024 Honda Accord', editedBy: 'Sarah Johnson', editedAt: '1 hour ago', changes: 'Description added' },
  { id: 3, name: '2023 BMW X5', editedBy: 'Mike Davis', editedAt: '2 hours ago', changes: 'Photos uploaded' },
  { id: 4, name: '2022 Nissan Altima', editedBy: 'John Smith', editedAt: '3 hours ago', changes: 'Status changed' },
];

const timeSpentData = [
  { vehicle: '2024 Honda CR-V', timeSpent: '6m 45s', views: 234 },
  { vehicle: '2023 Toyota Camry', timeSpent: '5m 12s', views: 198 },
  { vehicle: '2022 Ford F-150', timeSpent: '4m 38s', views: 187 },
  { vehicle: '2024 Tesla Model 3', timeSpent: '4m 02s', views: 165 },
  { vehicle: '2023 BMW X5', timeSpent: '3m 55s', views: 142 },
];

export function Dashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'edit': return <Edit className="h-4 w-4 text-blue-500" />;
      case 'view': return <Eye className="h-4 w-4 text-green-500" />;
      case 'whatsapp': return <MessageCircle className="h-4 w-4 text-green-600" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'edit': return 'bg-blue-100 text-blue-800';
      case 'view': return 'bg-green-100 text-green-800';
      case 'whatsapp': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'sold': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex">
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
        
        <main className="flex-1 transition-all duration-300">
          <div className="container max-w-full p-4 lg:p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Dealership Dashboard</h1>
              <Button asChild>
                <Link to="/vehicles">
                  <Car className="h-4 w-4 mr-2" />
                  Manage Inventory
                </Link>
              </Button>
            </div>
            
            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 animate-slide-up">
              <StatsCard 
                title="Page Visits" 
                value={dealerMetrics.totalVisits.toLocaleString()}
                trend={dealerMetrics.visitsTrend}
                description="This month"
                icon={<Eye />}
                className="bg-primary/5"
              />
              <StatsCard 
                title="Total Vehicles" 
                value={dealerMetrics.totalVehicles.toString()}
                trend={dealerMetrics.vehiclesTrend}
                description="In inventory"
                icon={<Car />}
                className="bg-primary/5"
              />
              <StatsCard 
                title="WhatsApp Clicks" 
                value={dealerMetrics.whatsappClicks.toString()}
                trend={dealerMetrics.whatsappTrend}
                description="This week"
                icon={<MessageCircle />}
                className="bg-success/5"
              />
              <StatsCard 
                title="Avg. Time Spent" 
                value={dealerMetrics.avgTimeSpent}
                trend={dealerMetrics.timeSpentTrend}
                description="Per listing view"
                icon={<Clock />}
                className="bg-info/5"
              />
            </div>
            
            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left column - Most viewed vehicles */}
              <div className="space-y-4 animate-slide-up">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      Most Viewed Vehicles
                    </CardTitle>
                    <CardDescription>Top performing listings this week</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {popularVehicles.map((vehicle, index) => (
                      <div key={vehicle.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{vehicle.name}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Eye className="h-3 w-3" />
                            {vehicle.views} views
                            <Badge className={`ml-auto ${getStatusColor(vehicle.status)}`}>
                              {vehicle.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{vehicle.price}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
              
              {/* Middle column - Activity and time spent */}
              <div className="space-y-4 animate-slide-up">
                <Tabs defaultValue="activity" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                    <TabsTrigger value="time">Time Spent</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="activity">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Activity className="h-5 w-5" />
                          Recent Activity
                        </CardTitle>
                        <CardDescription>Latest actions on your listings</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {recentActivity.map((activity, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="mt-1">
                              {getActivityIcon(activity.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm">
                                <span className="font-medium">{activity.user}</span>
                                {activity.type === 'edit' && ' edited '}
                                {activity.type === 'view' && ' viewed '}
                                {activity.type === 'whatsapp' && ' contacted about '}
                                <span className="font-medium">{activity.vehicle}</span>
                              </p>
                              <p className="text-xs text-muted-foreground">{activity.time}</p>
                            </div>
                            <Badge className={getActivityColor(activity.type)}>
                              {activity.type}
                            </Badge>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="time">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Clock className="h-5 w-5" />
                          Time Spent on Listings
                        </CardTitle>
                        <CardDescription>Average time customers spend viewing</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {timeSpentData.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex-1">
                              <p className="font-medium">{item.vehicle}</p>
                              <p className="text-sm text-muted-foreground">{item.views} views</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-primary">{item.timeSpent}</p>
                              <p className="text-xs text-muted-foreground">avg. time</p>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Right column - Recently edited vehicles */}
              <div className="space-y-4 animate-slide-up">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Edit className="h-5 w-5" />
                      Recently Edited
                    </CardTitle>
                    <CardDescription>Latest updates to your inventory</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentlyEdited.map((vehicle) => (
                      <div key={vehicle.id} className="p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{vehicle.name}</p>
                            <p className="text-sm text-muted-foreground">
                              by {vehicle.editedBy}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {vehicle.editedAt}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="mt-2 text-xs">
                          {vehicle.changes}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button asChild className="w-full justify-start">
                      <Link to="/vehicles">
                        <Car className="h-4 w-4 mr-2" />
                        Add New Vehicle
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Analytics
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Customer Inquiries
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
