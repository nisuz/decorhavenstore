
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { 
  Package2, 
  Users, 
  DollarSign, 
  ShoppingCart, 
  BarChart3,
  Clock,
  CheckCircle2,
  TruckIcon
} from 'lucide-react';

const mockOrders = [
  {
    id: 'ORD-123456',
    customer: 'John Smith',
    date: '2023-05-15',
    total: 129.99,
    status: 'delivered',
    items: 3
  },
  {
    id: 'ORD-123457',
    customer: 'Emily Johnson',
    date: '2023-05-16',
    total: 79.95,
    status: 'shipped',
    items: 2
  },
  {
    id: 'ORD-123458',
    customer: 'Michael Williams',
    date: '2023-05-16',
    total: 214.50,
    status: 'processing',
    items: 4
  },
  {
    id: 'ORD-123459',
    customer: 'Sarah Brown',
    date: '2023-05-17',
    total: 45.99,
    status: 'pending',
    items: 1
  },
  {
    id: 'ORD-123460',
    customer: 'David Garcia',
    date: '2023-05-17',
    total: 159.95,
    status: 'processing',
    items: 3
  }
];

const statusStyles: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  canceled: 'bg-red-100 text-red-800'
};

const statusIcons: Record<string, React.ReactNode> = {
  pending: <Clock className="h-4 w-4" />,
  processing: <Package2 className="h-4 w-4" />,
  shipped: <TruckIcon className="h-4 w-4" />,
  delivered: <CheckCircle2 className="h-4 w-4" />,
  canceled: <ShoppingCart className="h-4 w-4" />
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders');
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <h3 className="text-2xl font-bold">$10,580.25</h3>
                <p className="text-xs text-muted-foreground mt-1">+12.5% from last month</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <h3 className="text-2xl font-bold">245</h3>
                <p className="text-xs text-muted-foreground mt-1">+7.2% from last month</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Customers</p>
                <h3 className="text-2xl font-bold">1,423</h3>
                <p className="text-xs text-muted-foreground mt-1">+4.9% from last month</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Inventory Items</p>
                <h3 className="text-2xl font-bold">587</h3>
                <p className="text-xs text-muted-foreground mt-1">12 items low in stock</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Package2 className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'orders' ? 'border-b-2 border-primary' : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('orders')}
        >
          Recent Orders
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'inventory' ? 'border-b-2 border-primary' : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('inventory')}
        >
          Inventory
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'customers' ? 'border-b-2 border-primary' : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('customers')}
        >
          Customers
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'analytics' ? 'border-b-2 border-primary' : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
      </div>
      
      {activeTab === 'orders' && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Manage your recent customer orders.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell>
                      <span 
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[order.status]}`}
                      >
                        {statusIcons[order.status]}
                        <span className="ml-1 capitalize">{order.status}</span>
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
      
      {activeTab === 'inventory' && (
        <div className="text-center py-16">
          <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground" />
          <h2 className="text-xl font-medium mt-4 mb-2">Inventory Management</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Track and manage your inventory levels, add new products, and more.
          </p>
          <Button>View Full Inventory</Button>
        </div>
      )}
      
      {activeTab === 'customers' && (
        <div className="text-center py-16">
          <Users className="h-16 w-16 mx-auto text-muted-foreground" />
          <h2 className="text-xl font-medium mt-4 mb-2">Customer Management</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            View customer details, purchase history, and manage accounts.
          </p>
          <Button>View All Customers</Button>
        </div>
      )}
      
      {activeTab === 'analytics' && (
        <div className="text-center py-16">
          <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground" />
          <h2 className="text-xl font-medium mt-4 mb-2">Sales Analytics</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            View detailed reports of your sales, inventory, and customer metrics.
          </p>
          <Button>View Analytics</Button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
