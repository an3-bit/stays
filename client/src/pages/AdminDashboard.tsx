import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User, Home, CreditCard, BookOpen, Building, LogOut, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";


const AdminDashboard = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [activeView, setActiveView] = useState('dashboard');
    
    // Data states
    const [properties, setProperties] = useState([]);
    const [bookings, setBookings] = useState([]);
    
    // Payments View State
    const [selectedMethod, setSelectedMethod] = useState('All');

    // Property form states
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [newProperty, setNewProperty] = useState({
        title: '', type: '', desc: '', image: '', price: '',
        location: '', guests: '', beds: '', baths: '',
    });
    const [imageFile, setImageFile] = useState(null); // For new property
    const [imagePreview, setImagePreview] = useState(''); // For new property
    const [editImageFile, setEditImageFile] = useState(null); // For edit property
    const [editImagePreview, setEditImagePreview] = useState(''); // For edit property

    useEffect(() => {
        fetchProperties();
        fetchBookings();
    }, []);

    const fetchProperties = async () => {
        const res = await fetch('/api/properties');
        setProperties(await res.json());
    };

    const fetchBookings = async () => {
        const res = await fetch('/api/bookings');
        setBookings(await res.json());
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    // --- Property Management Logic ---
    const handleFormSubmit = async (e, propertyId) => {
        e.preventDefault();
        const isEdit = Boolean(propertyId);
        const url = isEdit ? `https://safari-stays-kenya-connect.onrender.com/api/properties/${propertyId}` : 'https://safari-stays-kenya-connect.onrender.com/api/properties';
        const method = isEdit ? 'PUT' : 'POST';
        let formData;
        if ((isEdit && editImageFile) || (!isEdit && imageFile)) {
            formData = new FormData();
            const data = isEdit ? selectedProperty : newProperty;
            Object.entries(data).forEach(([key, value]) => {
                if (key !== 'image') formData.append(key, value);
            });
            formData.append('image', isEdit ? editImageFile : imageFile);
        } else {
            // No new file selected, send JSON (for edit, keep existing image URL)
            formData = isEdit ? { ...selectedProperty } : { ...newProperty };
        }
        try {
            const res = await fetch(url, {
                method,
                headers: formData instanceof FormData ? undefined : { 'Content-Type': 'application/json' },
                body: formData instanceof FormData ? formData : JSON.stringify(formData),
            });
            if (res.ok) {
                toast({ title: 'Success', description: `Property ${propertyId ? 'updated' : 'added'}!` });
                fetchProperties();
                setIsEditModalOpen(false);
                setNewProperty({ title: '', type: '', desc: '', image: '', price: '', location: '', guests: '', beds: '', baths: '' });
                setImageFile(null);
                setImagePreview('');
                setEditImageFile(null);
                setEditImagePreview('');
            } else { throw new Error('Operation failed'); }
        } catch (err) { toast({ title: 'Error', description: err.message, variant: 'destructive' }); }
    };

    const handleDeleteProperty = async (propertyId) => {
        if (window.confirm('Are you sure?')) {
            try {
                const res = await fetch(`https://safari-stays-kenya-connect.onrender.com/api/properties/${propertyId}`, { method: 'DELETE' });
                if (res.ok) {
                    toast({ title: 'Success', description: 'Property deleted' });
                    fetchProperties();
                } else { throw new Error('Failed to delete'); }
            } catch (err) { toast({ title: 'Error', description: err.message, variant: 'destructive' }); }
        }
    };
    
    const openEditModal = (property) => {
        setSelectedProperty(JSON.parse(JSON.stringify(property)));
        setIsEditModalOpen(true);
    };

    const handleImageChange = (e, isEdit = false) => {
        const file = e.target.files[0];
        console.log('Selected file:', file);
        if (!file) return;
        const formData = new FormData();
        formData.append('image', file);
        try {
            const res = await fetch('https://safari-stays-kenya-connect.onrender.com/api/upload', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            if (data.url) {
                setPropertyData(prev => ({ ...prev, image: data.url }));
            }
        } catch (err) {
            alert('Image upload failed');
        }
    };

    const renderPropertyForm = (propertyData, setPropertyData) => (
        <form onSubmit={(e) => handleFormSubmit(e, propertyData?._id)} className="space-y-4">
            {/* All form fields here */}
            <div><Label>Title</Label><Input value={propertyData.title} onChange={(e) => setPropertyData({...propertyData, title: e.target.value})} required/></div>
            <div className="grid grid-cols-2 gap-4">
                <div><Label>Type</Label><Input value={propertyData.type} onChange={(e) => setPropertyData({...propertyData, type: e.target.value})} required/></div>
                <div><Label>Price</Label><Input type="number" value={propertyData.price} onChange={(e) => setPropertyData({...propertyData, price: e.target.value})} required/></div>
            </div>
            <div><Label>Location</Label><Input value={propertyData.location} onChange={(e) => setPropertyData({...propertyData, location: e.target.value})} required/></div>
            <div className="grid grid-cols-3 gap-4">
                 <div><Label>Guests</Label><Input type="number" value={propertyData.guests} onChange={(e) => setPropertyData({...propertyData, guests: e.target.value})} required/></div>
                 <div><Label>Beds</Label><Input type="number" value={propertyData.beds} onChange={(e) => setPropertyData({...propertyData, beds: e.target.value})} required/></div>
                 <div><Label>Baths</Label><Input type="number" value={propertyData.baths} onChange={(e) => setPropertyData({...propertyData, baths: e.target.value})} required/></div>
            </div>
            <div>
                <Label>Image</Label>
                <Input type="file" accept="image/*" onChange={e => handleImageChange(e, setPropertyData)} />
                {propertyData.image && <img src={propertyData.image} alt="Preview" className="mt-2 h-24 rounded" />}
            </div>
            <div><Label>Description</Label><Textarea value={propertyData.desc} onChange={(e) => setPropertyData({...propertyData, desc: e.target.value})} required/></div>
            <Button type="submit">{propertyData?._id ? 'Update Property' : 'Add Property'}</Button>
        </form>
    );

    const renderPaymentsView = () => {
        // Demo payment transactions
        const allTransactions = [
            { user: 'John Doe', method: 'M-Pesa', amount: 15000, status: 'Success', date: '2024-06-01', phone: '0712345678', ref: 'MPESA123' },
            { user: 'Jane Smith', method: 'PayPal', amount: 4550, status: 'Success', date: '2024-05-28', email: 'jane@paypal.com', ref: 'PP-456' },
            { user: 'Alice Brown', method: 'Card', amount: 12000, status: 'Pending', date: '2024-05-25', card: '**** 5248', ref: 'CARD789' },
            { user: 'Bob White', method: 'Credit Card', amount: 20000, status: 'Success', date: '2024-05-20', card: '**** 7852', ref: 'CC-321' },
            { user: 'Eve Black', method: 'M-Pesa', amount: 8000, status: 'Success', date: '2024-05-18', phone: '0722333444', ref: 'MPESA456' },
        ];
        const methods = ['All', 'M-Pesa', 'PayPal', 'Card', 'Credit Card'];
        const filtered = selectedMethod === 'All' ? allTransactions : allTransactions.filter(t => t.method === selectedMethod);
        return (
            <div className="bg-white rounded-xl p-6 shadow">
                <div className="flex gap-2 mb-4">
                    {methods.map(m => (
                        <Button key={m} variant={selectedMethod === m ? 'secondary' : 'outline'} onClick={() => setSelectedMethod(m)}>{m}</Button>
                    ))}
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User Name</TableHead>
                            <TableHead>Payment Method</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Details</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map((t, i) => (
                            <TableRow key={i}>
                                <TableCell>{t.user}</TableCell>
                                <TableCell>{t.method}</TableCell>
                                <TableCell>KSh {t.amount.toLocaleString()}</TableCell>
                                <TableCell><Badge variant={t.status === 'Success' ? 'default' : 'secondary'}>{t.status}</Badge></TableCell>
                                <TableCell>{t.date}</TableCell>
                                <TableCell>
                                    {t.method === 'M-Pesa' && <span>Phone: {t.phone} <br />Ref: {t.ref}</span>}
                                    {t.method === 'PayPal' && <span>Email: {t.email} <br />Ref: {t.ref}</span>}
                                    {(t.method === 'Card' || t.method === 'Credit Card') && <span>Card: {t.card} <br />Ref: {t.ref}</span>}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    };

    const renderContent = () => {
        switch (activeView) {
            case 'dashboard':
                return (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {/* Stat Cards */}
                            <Card><CardHeader><CardTitle>Total Bookings</CardTitle></CardHeader><CardContent className="text-3xl font-bold">{bookings.length}</CardContent></Card>
                            <Card><CardHeader><CardTitle>Total Properties</CardTitle></CardHeader><CardContent className="text-3xl font-bold">{properties.length}</CardContent></Card>
                            <Card><CardHeader><CardTitle>Revenue (Coming Soon)</CardTitle></CardHeader><CardContent className="text-3xl font-bold">KSh 0</CardContent></Card>
                        </div>
                        <Card>
                            <CardHeader><CardTitle>Recent Bookings</CardTitle></CardHeader>
                            <CardContent>{renderBookingsTable(bookings.slice(0, 5))}</CardContent>
                        </Card>
                    </>
                );
            case 'bookings':
                return <Card><CardHeader><CardTitle>All Bookings</CardTitle></CardHeader><CardContent>{renderBookingsTable(bookings)}</CardContent></Card>;
            case 'properties':
                return (
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card>
                            <CardHeader><CardTitle>Add New Property</CardTitle></CardHeader>
                            <CardContent>{renderPropertyForm(newProperty, setNewProperty)}</CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle>Existing Properties</CardTitle></CardHeader>
                            <CardContent>{renderPropertiesTable(properties)}</CardContent>
                        </Card>
                    </div>
                );
            case 'payments':
                return renderPaymentsView();
            default: return null;
        }
    };
    
    const renderBookingsTable = (bookingData) => (
        <Table>
            <TableHeader><TableRow><TableHead>Customer</TableHead><TableHead>Email</TableHead><TableHead>Phone</TableHead><TableHead>Dates</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
            <TableBody>
                {bookingData.map(b => <TableRow key={b._id}><TableCell>{b.name}</TableCell><TableCell>{b.email}</TableCell><TableCell>{b.phone}</TableCell><TableCell>{new Date(b.checkIn).toLocaleDateString()} - {new Date(b.checkOut).toLocaleDateString()}</TableCell><TableCell><Badge variant={b.paymentStatus === 'paid' ? 'default' : 'secondary'}>{b.paymentStatus}</Badge></TableCell></TableRow>)}
            </TableBody>
        </Table>
    );

    const renderPropertiesTable = (propertyData) => (
        <div className="max-h-[500px] overflow-auto">
        <Table>
            <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Price</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
            <TableBody>
                {propertyData.map(p => <TableRow key={p._id}><TableCell>{p.title}</TableCell><TableCell>KSh {p.price}</TableCell><TableCell className="flex gap-2"><Button variant="ghost" size="icon" onClick={() => openEditModal(p)}><Edit className="h-4 w-4"/></Button><Button variant="destructive" size="icon" onClick={() => handleDeleteProperty(p._id)}><Trash2 className="h-4 w-4"/></Button></TableCell></TableRow>)}
            </TableBody>
        </Table>
        </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r flex flex-col py-6 px-4">
        <div className="flex items-center gap-2 mb-8"><Home className="h-7 w-7 text-orange-500" /><span className="font-bold text-lg text-gray-800">Safari Stays Admin</span></div>
        <nav className="flex-1 flex flex-col gap-2">
          <Button variant={activeView === 'dashboard' ? 'secondary' : 'ghost'} onClick={() => setActiveView('dashboard')} className="justify-start gap-3"><Home /> Dashboard</Button>
          <Button variant={activeView === 'bookings' ? 'secondary' : 'ghost'} onClick={() => setActiveView('bookings')} className="justify-start gap-3"><BookOpen /> Bookings</Button>
          <Button variant={activeView === 'properties' ? 'secondary' : 'ghost'} onClick={() => setActiveView('properties')} className="justify-start gap-3"><Building /> Properties</Button>
          <Button variant={activeView === 'payments' ? 'secondary' : 'ghost'} onClick={() => setActiveView('payments')} className="justify-start gap-3"><CreditCard /> Payments</Button>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between px-8 py-4 bg-white border-b">
          <div className="text-sm text-gray-400">Pages / <span className="text-gray-800 font-semibold capitalize">{activeView}</span></div>
          <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2"><User /> Admin</Button>
            </PopoverTrigger>
            <PopoverContent className="w-48">
                <div className="p-2">
                    <p className="text-sm text-muted-foreground">Signed in as admin</p>
                    <Button variant="ghost" onClick={handleLogout} className="w-full justify-start mt-2"><LogOut className="mr-2 h-4 w-4"/> Logout</Button>
                </div>
            </PopoverContent>
          </Popover>
        </header>
        <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
            {renderContent()}
        </main>
      </div>
       <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent>
                <DialogHeader><DialogTitle>Edit Property</DialogTitle></DialogHeader>
                {selectedProperty && renderPropertyForm(selectedProperty, setSelectedProperty)}
            </DialogContent>
        </Dialog>
    </div>
  );
};

export default AdminDashboard; 