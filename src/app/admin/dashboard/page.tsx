// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Plus, Search, Edit, Trash2, LogOut } from 'lucide-react';
// import { DietPlan } from '@/types';
// import { signOut } from 'next-auth/react';

// export default function AdminDashboardPage() {
//     const router = useRouter();
//     const [dietPlans, setDietPlans] = useState<DietPlan[]>([]);
//     const [search, setSearch] = useState('');
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchDietPlans();
//     }, [search]);

//     const fetchDietPlans = async () => {
//         setLoading(true);
//         try {
//             const params = new URLSearchParams();
//             if (search) params.append('search', search);
//             params.append('limit', '100');

//             const response = await fetch(`/api/diet-plans?${params}`);
//             const data = await response.json();
//             setDietPlans(data.dietPlans || []);
//         } catch (error) {
//             console.error('Error fetching diet plans:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDelete = async (id: string) => {
//         if (!confirm('Are you sure you want to delete this diet plan?')) return;

//         try {
//             const response = await fetch(`/api/diet-plans/${id}`, {
//                 method: 'DELETE',
//             });

//             if (response.ok) {
//                 fetchDietPlans();
//             } else {
//                 alert('Failed to delete diet plan');
//             }
//         } catch (error) {
//             console.error('Error deleting diet plan:', error);
//             alert('Failed to delete diet plan');
//         }
//     };

//     const handleLogout = async () => {
//         await signOut({ callbackUrl: '/admin/login' });
//     };

//     return (
//         <div className="container mx-auto px-12 py-8">
//             <div className="flex justify-between items-center mb-8">
//                 <div>
//                     <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
//                     <p className="text-muted-foreground">Manage your diet plans</p>
//                 </div>
//                 <div className="flex gap-3">
//                     <Link href="/admin/dashboard/new">
//                         <Button>
//                             <Plus className="mr-2 h-4 w-4" />
//                             Add New Diet Plan
//                         </Button>
//                     </Link>
//                     <Button variant="outline" onClick={handleLogout}>
//                         <LogOut className="mr-2 h-4 w-4" />
//                         Logout
//                     </Button>
//                 </div>
//             </div>

//             {/* Search */}
//             <Card className="mb-6">
//                 <CardContent className="pt-6">
//                     <div className="relative">
//                         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
//                         <Input
//                             type="text"
//                             placeholder="Search diet plans..."
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                             className="pl-10"
//                         />
//                     </div>
//                 </CardContent>
//             </Card>

//             {/* Diet Plans Table */}
//             <Card>
//                 <CardHeader>
//                     <CardTitle>All Diet Plans ({dietPlans.length})</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     {loading ? (
//                         <p className="text-center py-8 text-muted-foreground">Loading...</p>
//                     ) : dietPlans.length === 0 ? (
//                         <p className="text-center py-8 text-muted-foreground">No diet plans found</p>
//                     ) : (
//                         <div className="overflow-x-auto">
//                             <table className="w-full">
//                                 <thead>
//                                     <tr className="border-b">
//                                         <th className="text-left py-3 px-4 font-semibold">Title</th>
//                                         <th className="text-left py-3 px-4 font-semibold">Price</th>
//                                         <th className="text-left py-3 px-4 font-semibold">Created</th>
//                                         <th className="text-right py-3 px-4 font-semibold">Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {dietPlans.map((plan) => (
//                                         <tr key={plan._id} className="border-b hover:bg-muted/50">
//                                             <td className="py-3 px-4">
//                                                 <div className="font-medium">{plan.title}</div>
//                                                 <div className="text-sm text-muted-foreground line-clamp-1">
//                                                     {plan.description}
//                                                 </div>
//                                             </td>
//                                             <td className="py-3 px-4">
//                                                 {plan.price === 0 ? (
//                                                     <span className="text-green-600 font-semibold">FREE</span>
//                                                 ) : (
//                                                     <span>₹{plan.price}</span>
//                                                 )}
//                                             </td>
//                                             <td className="py-3 px-4 text-sm text-muted-foreground">
//                                                 {new Date(plan.createdAt).toLocaleDateString()}
//                                             </td>
//                                             <td className="py-3 px-4">
//                                                 <div className="flex justify-end gap-2">
//                                                     <Link href={`/admin/dashboard/edit/${plan._id}`}>
//                                                         <Button variant="outline" size="sm">
//                                                             <Edit className="h-4 w-4" />
//                                                         </Button>
//                                                     </Link>
//                                                     <Button
//                                                         variant="outline"
//                                                         size="sm"
//                                                         onClick={() => handleDelete(plan._id!)}
//                                                     >
//                                                         <Trash2 className="h-4 w-4 text-red-500" />
//                                                     </Button>
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     )}
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }



'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Search, Edit, Trash2, LogOut } from 'lucide-react';
import { DietPlan } from '@/types';
import { signOut } from 'next-auth/react';

export default function AdminDashboardPage() {
    const router = useRouter();
    const [dietPlans, setDietPlans] = useState<DietPlan[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDietPlans();
    }, [search]);

    const fetchDietPlans = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (search) params.append('search', search);
            params.append('limit', '100');

            const response = await fetch(`/api/diet-plans?${params}`);
            const data = await response.json();
            setDietPlans(data.dietPlans || []);
        } catch (error) {
            console.error('Error fetching diet plans:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this diet plan?')) return;

        try {
            const response = await fetch(`/api/diet-plans/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchDietPlans();
            } else {
                alert('Failed to delete diet plan');
            }
        } catch (error) {
            console.error('Error deleting diet plan:', error);
            alert('Failed to delete diet plan');
        }
    };

    const handleLogout = async () => {
        await signOut({ callbackUrl: '/admin/login' });
    };

    return (
        <div className="container mx-auto px-4 md:px-8 lg:px-12 py-4 md:py-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 md:mb-8">
                <div>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2">Admin Dashboard</h1>
                    <p className="text-sm md:text-base text-muted-foreground">Manage your diet plans</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                    <Link href="/admin/dashboard/new" className="w-full sm:w-auto">
                        <Button className="w-full sm:w-auto">
                            <Plus className="mr-2 h-4 w-4" />
                            <span className="hidden sm:inline">Add New Diet Plan</span>
                            <span className="sm:hidden">Add Plan</span>
                        </Button>
                    </Link>
                    <Button variant="outline" onClick={handleLogout} className="w-full sm:w-auto">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </div>
            </div>

            {/* Search */}
            <Card className="mb-4 md:mb-6">
                <CardContent className="pt-4 md:pt-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 md:h-5 md:w-5" />
                        <Input
                            type="text"
                            placeholder="Search diet plans..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 md:pl-10 text-sm md:text-base"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Diet Plans Table/Cards */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg md:text-xl">All Diet Plans ({dietPlans.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <p className="text-center py-8 text-muted-foreground text-sm md:text-base">Loading...</p>
                    ) : dietPlans.length === 0 ? (
                        <p className="text-center py-8 text-muted-foreground text-sm md:text-base">No diet plans found</p>
                    ) : (
                        <>
                            {/* Desktop Table View */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-3 px-4 font-semibold">Title</th>
                                            <th className="text-left py-3 px-4 font-semibold">Price</th>
                                            <th className="text-left py-3 px-4 font-semibold">Created</th>
                                            <th className="text-right py-3 px-4 font-semibold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dietPlans.map((plan) => (
                                            <tr key={plan._id} className="border-b hover:bg-muted/50">
                                                <td className="py-3 px-4">
                                                    <div className="font-medium">{plan.title}</div>
                                                    <div className="text-sm text-muted-foreground line-clamp-1">
                                                        {plan.description}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4">
                                                    {plan.price === 0 ? (
                                                        <span className="text-green-600 font-semibold">FREE</span>
                                                    ) : (
                                                        <span>₹{plan.price}</span>
                                                    )}
                                                </td>
                                                <td className="py-3 px-4 text-sm text-muted-foreground">
                                                    {new Date(plan.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="flex justify-end gap-2">
                                                        <Link href={`/admin/dashboard/edit/${plan._id}`}>
                                                            <Button variant="outline" size="sm">
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleDelete(plan._id!)}
                                                        >
                                                            <Trash2 className="h-4 w-4 text-red-500" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Card View */}
                            <div className="md:hidden space-y-4">
                                {dietPlans.map((plan) => (
                                    <Card key={plan._id}>
                                        <CardContent className="p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-base mb-1">{plan.title}</h3>
                                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                                                        {plan.description}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="flex flex-col gap-1">
                                                    <div className="text-sm">
                                                        {plan.price === 0 ? (
                                                            <span className="text-green-600 font-semibold">FREE</span>
                                                        ) : (
                                                            <span className="font-semibold">₹{plan.price}</span>
                                                        )}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {new Date(plan.createdAt).toLocaleDateString()}
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Link href={`/admin/dashboard/edit/${plan._id}`}>
                                                        <Button variant="outline" size="sm">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleDelete(plan._id!)}
                                                    >
                                                        <Trash2 className="h-4 w-4 text-red-500" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}