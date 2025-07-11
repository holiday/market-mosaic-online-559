import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Car, DollarSign, Calendar, Gauge, Fuel } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  condition: 'new' | 'used' | 'certified';
  color: string;
  description: string;
  vin: string;
  status: 'available' | 'sold' | 'pending';
}

const VehicleInventory = () => {
  const { toast } = useToast();
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: '1',
      make: 'Toyota',
      model: 'Camry',
      year: 2023,
      price: 28500,
      mileage: 15000,
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      condition: 'used',
      color: 'Silver',
      description: 'Excellent condition, single owner',
      vin: '1HGBH41JXMN109186',
      status: 'available'
    },
    {
      id: '2',
      make: 'Honda',
      model: 'CR-V',
      year: 2024,
      price: 32000,
      mileage: 5000,
      fuelType: 'Gasoline',
      transmission: 'CVT',
      condition: 'certified',
      color: 'Black',
      description: 'Like new, certified pre-owned',
      vin: '2HGBH41JXMN109187',
      status: 'available'
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [newVehicle, setNewVehicle] = useState<Omit<Vehicle, 'id'>>({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    mileage: 0,
    fuelType: '',
    transmission: '',
    condition: 'used',
    color: '',
    description: '',
    vin: '',
    status: 'available'
  });

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.year.toString().includes(searchTerm)
  );

  const handleAddVehicle = () => {
    const vehicle: Vehicle = {
      ...newVehicle,
      id: Date.now().toString()
    };
    setVehicles([...vehicles, vehicle]);
    setNewVehicle({
      make: '',
      model: '',
      year: new Date().getFullYear(),
      price: 0,
      mileage: 0,
      fuelType: '',
      transmission: '',
      condition: 'used',
      color: '',
      description: '',
      vin: '',
      status: 'available'
    });
    setIsAddDialogOpen(false);
    toast({
      title: "Vehicle Added",
      description: `${vehicle.year} ${vehicle.make} ${vehicle.model} has been added to inventory.`,
    });
  };

  const handleEditVehicle = () => {
    if (!editingVehicle) return;
    setVehicles(vehicles.map(v => v.id === editingVehicle.id ? editingVehicle : v));
    setIsEditDialogOpen(false);
    setEditingVehicle(null);
    toast({
      title: "Vehicle Updated",
      description: "Vehicle information has been updated successfully.",
    });
  };

  const handleDeleteVehicle = (id: string) => {
    const vehicle = vehicles.find(v => v.id === id);
    setVehicles(vehicles.filter(v => v.id !== id));
    toast({
      title: "Vehicle Removed",
      description: `${vehicle?.year} ${vehicle?.make} ${vehicle?.model} has been removed from inventory.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'sold': return 'bg-red-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'new': return 'bg-blue-500';
      case 'certified': return 'bg-purple-500';
      case 'used': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const VehicleForm = ({ vehicle, setVehicle, isEdit = false }: { 
    vehicle: Omit<Vehicle, 'id'> | Vehicle, 
    setVehicle: (v: any) => void, 
    isEdit?: boolean 
  }) => (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="make">Make</Label>
        <Input
          id="make"
          value={vehicle.make}
          onChange={(e) => setVehicle({ ...vehicle, make: e.target.value })}
          placeholder="Toyota, Honda, Ford..."
        />
      </div>
      <div>
        <Label htmlFor="model">Model</Label>
        <Input
          id="model"
          value={vehicle.model}
          onChange={(e) => setVehicle({ ...vehicle, model: e.target.value })}
          placeholder="Camry, Civic, F-150..."
        />
      </div>
      <div>
        <Label htmlFor="year">Year</Label>
        <Input
          id="year"
          type="number"
          value={vehicle.year}
          onChange={(e) => setVehicle({ ...vehicle, year: parseInt(e.target.value) })}
        />
      </div>
      <div>
        <Label htmlFor="price">Price ($)</Label>
        <Input
          id="price"
          type="number"
          value={vehicle.price}
          onChange={(e) => setVehicle({ ...vehicle, price: parseInt(e.target.value) })}
        />
      </div>
      <div>
        <Label htmlFor="mileage">Mileage</Label>
        <Input
          id="mileage"
          type="number"
          value={vehicle.mileage}
          onChange={(e) => setVehicle({ ...vehicle, mileage: parseInt(e.target.value) })}
        />
      </div>
      <div>
        <Label htmlFor="color">Color</Label>
        <Input
          id="color"
          value={vehicle.color}
          onChange={(e) => setVehicle({ ...vehicle, color: e.target.value })}
          placeholder="Red, Blue, Silver..."
        />
      </div>
      <div>
        <Label>Fuel Type</Label>
        <Select value={vehicle.fuelType} onValueChange={(value) => setVehicle({ ...vehicle, fuelType: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select fuel type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Gasoline">Gasoline</SelectItem>
            <SelectItem value="Diesel">Diesel</SelectItem>
            <SelectItem value="Hybrid">Hybrid</SelectItem>
            <SelectItem value="Electric">Electric</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Transmission</Label>
        <Select value={vehicle.transmission} onValueChange={(value) => setVehicle({ ...vehicle, transmission: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select transmission" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Manual">Manual</SelectItem>
            <SelectItem value="Automatic">Automatic</SelectItem>
            <SelectItem value="CVT">CVT</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Condition</Label>
        <Select value={vehicle.condition} onValueChange={(value: 'new' | 'used' | 'certified') => setVehicle({ ...vehicle, condition: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="used">Used</SelectItem>
            <SelectItem value="certified">Certified Pre-Owned</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Status</Label>
        <Select value={vehicle.status} onValueChange={(value: 'available' | 'sold' | 'pending') => setVehicle({ ...vehicle, status: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="sold">Sold</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-2">
        <Label htmlFor="vin">VIN</Label>
        <Input
          id="vin"
          value={vehicle.vin}
          onChange={(e) => setVehicle({ ...vehicle, vin: e.target.value })}
          placeholder="Vehicle Identification Number"
        />
      </div>
      <div className="col-span-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={vehicle.description}
          onChange={(e) => setVehicle({ ...vehicle, description: e.target.value })}
          placeholder="Vehicle description, features, condition notes..."
        />
      </div>
    </div>
  );

  return (
    <PageLayout title="Vehicle Inventory">
      <div className="space-y-6">
        {/* Header with search and add button */}
        <div className="flex justify-between items-center">
          <div className="flex-1 max-w-md">
            <Input
              placeholder="Search vehicles by make, model, or year..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Vehicle
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Vehicle</DialogTitle>
                <DialogDescription>
                  Enter the vehicle details to add it to your inventory.
                </DialogDescription>
              </DialogHeader>
              <VehicleForm vehicle={newVehicle} setVehicle={setNewVehicle} />
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddVehicle}>Add Vehicle</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Inventory stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vehicles.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available</CardTitle>
              <Badge className="bg-green-500 text-white">{vehicles.filter(v => v.status === 'available').length}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vehicles.filter(v => v.status === 'available').length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sold This Month</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vehicles.filter(v => v.status === 'sold').length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Price</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${vehicles.length > 0 ? Math.round(vehicles.reduce((sum, v) => sum + v.price, 0) / vehicles.length).toLocaleString() : 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Vehicle listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <Card key={vehicle.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </CardTitle>
                    <CardDescription className="text-xl font-semibold text-primary">
                      ${vehicle.price.toLocaleString()}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(vehicle.status)}>
                      {vehicle.status}
                    </Badge>
                    <Badge className={getConditionColor(vehicle.condition)}>
                      {vehicle.condition}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Gauge className="h-3 w-3" />
                      {vehicle.mileage.toLocaleString()} miles
                    </span>
                    <span className="flex items-center gap-1">
                      <Fuel className="h-3 w-3" />
                      {vehicle.fuelType}
                    </span>
                  </div>
                  <div className="text-sm">
                    <p><strong>Color:</strong> {vehicle.color}</p>
                    <p><strong>Transmission:</strong> {vehicle.transmission}</p>
                    <p><strong>VIN:</strong> {vehicle.vin}</p>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {vehicle.description}
                  </p>
                  <div className="flex gap-2 pt-2">
                    <Dialog open={isEditDialogOpen && editingVehicle?.id === vehicle.id} onOpenChange={(open) => {
                      setIsEditDialogOpen(open);
                      if (!open) setEditingVehicle(null);
                    }}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => setEditingVehicle(vehicle)}
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Edit Vehicle</DialogTitle>
                          <DialogDescription>
                            Update the vehicle information.
                          </DialogDescription>
                        </DialogHeader>
                        {editingVehicle && (
                          <VehicleForm vehicle={editingVehicle} setVehicle={setEditingVehicle} isEdit />
                        )}
                        <DialogFooter>
                          <Button variant="outline" onClick={() => {
                            setIsEditDialogOpen(false);
                            setEditingVehicle(null);
                          }}>
                            Cancel
                          </Button>
                          <Button onClick={handleEditVehicle}>Update Vehicle</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDeleteVehicle(vehicle.id)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredVehicles.length === 0 && (
          <div className="text-center py-12">
            <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold">No vehicles found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? 'No vehicles match your search criteria.' : 'Add your first vehicle to get started.'}
            </p>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default VehicleInventory;