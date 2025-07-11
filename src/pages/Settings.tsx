
import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  User, Building2, Phone, Mail, Globe, MapPin, Upload, 
  Users, CreditCard, Crown, Plus, Trash2, Edit, Shield, Calendar
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DealerProfile {
  dealershipName: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  logo: string | null;
  description: string;
  establishedYear: string;
  licenseNumber: string;
}

interface AuthorizedUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'sales' | 'viewer';
  status: 'active' | 'pending' | 'suspended';
  lastLogin: string;
}

const Settings = () => {
  const { toast } = useToast();
  const [dealerProfile, setDealerProfile] = useState<DealerProfile>({
    dealershipName: 'Premium Auto Sales',
    email: 'contact@premiumauto.com',
    phone: '(555) 123-4567',
    website: 'https://premiumauto.com',
    address: {
      street: '123 Auto Drive',
      city: 'Motor City',
      state: 'Michigan',
      zipCode: '48201',
      country: 'United States'
    },
    logo: null,
    description: 'Premium quality vehicles with exceptional service since 1995.',
    establishedYear: '1995',
    licenseNumber: 'DL-2024-001'
  });

  const [authorizedUsers, setAuthorizedUsers] = useState<AuthorizedUser[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john@premiumauto.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-01-15'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@premiumauto.com',
      role: 'manager',
      status: 'active',
      lastLogin: '2024-01-14'
    },
    {
      id: '3',
      name: 'Mike Davis',
      email: 'mike@premiumauto.com',
      role: 'sales',
      status: 'pending',
      lastLogin: 'Never'
    }
  ]);

  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'sales' as const });

  const subscriptionInfo = {
    plan: 'Professional',
    status: 'Active',
    nextBilling: '2024-02-15',
    amount: '$49.99/month',
    features: ['Unlimited vehicle listings', 'Advanced analytics', 'Custom branding', 'Priority support']
  };

  const handleProfileUpdate = () => {
    toast({
      title: "Profile Updated",
      description: "Your dealership profile has been successfully updated.",
    });
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to a storage service
      const reader = new FileReader();
      reader.onload = () => {
        setDealerProfile({ ...dealerProfile, logo: reader.result as string });
      };
      reader.readAsDataURL(file);
      toast({
        title: "Logo Uploaded",
        description: "Your dealership logo has been uploaded successfully.",
      });
    }
  };

  const handleAddUser = () => {
    const user: AuthorizedUser = {
      id: Date.now().toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: 'pending',
      lastLogin: 'Never'
    };
    setAuthorizedUsers([...authorizedUsers, user]);
    setNewUser({ name: '', email: '', role: 'sales' });
    setIsAddUserDialogOpen(false);
    toast({
      title: "User Invited",
      description: `${user.name} has been invited to join your dealership.`,
    });
  };

  const handleRemoveUser = (userId: string) => {
    setAuthorizedUsers(authorizedUsers.filter(user => user.id !== userId));
    toast({
      title: "User Removed",
      description: "User has been removed from your dealership.",
    });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500';
      case 'manager': return 'bg-blue-500';
      case 'sales': return 'bg-green-500';
      case 'viewer': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'suspended': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <PageLayout title="Dealership Settings">
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Dealer Profile</TabsTrigger>
          <TabsTrigger value="users">User Access</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        {/* Dealer Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Logo Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Dealership Logo
                </CardTitle>
                <CardDescription>Upload your dealership logo for branding</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={dealerProfile.logo || undefined} />
                    <AvatarFallback className="text-lg">
                      {dealerProfile.dealershipName.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-center space-y-2">
                    <Label htmlFor="logo-upload" className="cursor-pointer">
                      <Button variant="outline" className="w-full" asChild>
                        <span>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Logo
                        </span>
                      </Button>
                    </Label>
                    <Input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoUpload}
                    />
                    <p className="text-xs text-muted-foreground">PNG, JPG up to 2MB</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Dealership Information</CardTitle>
                <CardDescription>Basic information about your dealership</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dealership-name">Dealership Name</Label>
                    <Input
                      id="dealership-name"
                      value={dealerProfile.dealershipName}
                      onChange={(e) => setDealerProfile({ ...dealerProfile, dealershipName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="license-number">License Number</Label>
                    <Input
                      id="license-number"
                      value={dealerProfile.licenseNumber}
                      onChange={(e) => setDealerProfile({ ...dealerProfile, licenseNumber: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="established-year">Established Year</Label>
                    <Input
                      id="established-year"
                      value={dealerProfile.establishedYear}
                      onChange={(e) => setDealerProfile({ ...dealerProfile, establishedYear: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={dealerProfile.website}
                      onChange={(e) => setDealerProfile({ ...dealerProfile, website: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={dealerProfile.description}
                    onChange={(e) => setDealerProfile({ ...dealerProfile, description: e.target.value })}
                    placeholder="Tell customers about your dealership..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Contact Information
              </CardTitle>
              <CardDescription>How customers can reach your dealership</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={dealerProfile.email}
                    onChange={(e) => setDealerProfile({ ...dealerProfile, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={dealerProfile.phone}
                    onChange={(e) => setDealerProfile({ ...dealerProfile, phone: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Business Address
              </CardTitle>
              <CardDescription>Your dealership's physical location</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  value={dealerProfile.address.street}
                  onChange={(e) => setDealerProfile({
                    ...dealerProfile,
                    address: { ...dealerProfile.address, street: e.target.value }
                  })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={dealerProfile.address.city}
                    onChange={(e) => setDealerProfile({
                      ...dealerProfile,
                      address: { ...dealerProfile.address, city: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={dealerProfile.address.state}
                    onChange={(e) => setDealerProfile({
                      ...dealerProfile,
                      address: { ...dealerProfile.address, state: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input
                    id="zip"
                    value={dealerProfile.address.zipCode}
                    onChange={(e) => setDealerProfile({
                      ...dealerProfile,
                      address: { ...dealerProfile.address, zipCode: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={dealerProfile.address.country}
                    onChange={(e) => setDealerProfile({
                      ...dealerProfile,
                      address: { ...dealerProfile.address, country: e.target.value }
                    })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleProfileUpdate}>Save Profile Changes</Button>
          </div>
        </TabsContent>

        {/* User Access Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Authorized Users
                  </CardTitle>
                  <CardDescription>Manage who can access your dealership portal</CardDescription>
                </div>
                <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add User
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New User</DialogTitle>
                      <DialogDescription>
                        Invite a new user to access your dealership portal.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="user-name">Full Name</Label>
                        <Input
                          id="user-name"
                          value={newUser.name}
                          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                          placeholder="Enter full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="user-email">Email Address</Label>
                        <Input
                          id="user-email"
                          type="email"
                          value={newUser.email}
                          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                          placeholder="Enter email address"
                        />
                      </div>
                      <div>
                        <Label htmlFor="user-role">Role</Label>
                        <Select value={newUser.role} onValueChange={(value: any) => setNewUser({ ...newUser, role: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="viewer">Viewer</SelectItem>
                            <SelectItem value="sales">Sales</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddUser}>Send Invitation</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {authorizedUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge className={getRoleColor(user.role)}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleRemoveUser(user.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Role Permissions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Role Permissions
              </CardTitle>
              <CardDescription>Overview of what each role can do</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 border rounded-lg">
                    <Badge className="bg-gray-500 mb-2">Viewer</Badge>
                    <ul className="text-sm space-y-1">
                      <li>• View vehicle listings</li>
                      <li>• View analytics</li>
                      <li>• Export reports</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <Badge className="bg-green-500 mb-2">Sales</Badge>
                    <ul className="text-sm space-y-1">
                      <li>• All Viewer permissions</li>
                      <li>• Add/edit vehicles</li>
                      <li>• Manage inquiries</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <Badge className="bg-blue-500 mb-2">Manager</Badge>
                    <ul className="text-sm space-y-1">
                      <li>• All Sales permissions</li>
                      <li>• Delete vehicles</li>
                      <li>• Manage sales team</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <Badge className="bg-red-500 mb-2">Admin</Badge>
                    <ul className="text-sm space-y-1">
                      <li>• All Manager permissions</li>
                      <li>• Manage users</li>
                      <li>• Billing & settings</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subscription Tab */}
        <TabsContent value="subscription" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Current Subscription
              </CardTitle>
              <CardDescription>Manage your dealership subscription plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Crown className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{subscriptionInfo.plan} Plan</h3>
                    <p className="text-muted-foreground">{subscriptionInfo.amount}</p>
                  </div>
                </div>
                <Badge className="bg-green-500">{subscriptionInfo.status}</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Plan Features</h4>
                  <ul className="space-y-2">
                    {subscriptionInfo.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Billing Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Next billing date:</span>
                      <span>{subscriptionInfo.nextBilling}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount:</span>
                      <span>{subscriptionInfo.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Payment method:</span>
                      <span>•••• •••• •••• 4242</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex flex-wrap gap-3">
                <Button>Upgrade Plan</Button>
                <Button variant="outline">Change Payment Method</Button>
                <Button variant="outline">View Billing History</Button>
                <Button variant="outline" className="text-red-600 hover:text-red-700">
                  Cancel Subscription
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Display Preferences</CardTitle>
              <CardDescription>Customize how your dealership portal looks and feels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Switch between light and dark theme</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Compact View</Label>
                  <p className="text-sm text-muted-foreground">Show more data with less spacing</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications about inquiries and sales</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Auto-refresh Dashboard</Label>
                  <p className="text-sm text-muted-foreground">Automatically update dashboard data</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
              <CardDescription>Set your dealership's operating hours</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Weekdays</Label>
                  <div className="flex gap-2 mt-1">
                    <Select defaultValue="9">
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="8">8:00 AM</SelectItem>
                        <SelectItem value="9">9:00 AM</SelectItem>
                        <SelectItem value="10">10:00 AM</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="flex items-center">to</span>
                    <Select defaultValue="18">
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="17">5:00 PM</SelectItem>
                        <SelectItem value="18">6:00 PM</SelectItem>
                        <SelectItem value="19">7:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label>Weekends</Label>
                  <div className="flex gap-2 mt-1">
                    <Select defaultValue="10">
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9">9:00 AM</SelectItem>
                        <SelectItem value="10">10:00 AM</SelectItem>
                        <SelectItem value="11">11:00 AM</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="flex items-center">to</span>
                    <Select defaultValue="17">
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="16">4:00 PM</SelectItem>
                        <SelectItem value="17">5:00 PM</SelectItem>
                        <SelectItem value="18">6:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button>Save Preferences</Button>
          </div>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default Settings;
