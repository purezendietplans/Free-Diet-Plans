// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Select } from '@/components/ui/select';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { DietPlan } from '@/types';
// import Link from 'next/link';
// import { ArrowLeft } from 'lucide-react';

// export default function CheckoutPage() {
//     const params = useParams();
//     const router = useRouter();
//     const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
//     const [loading, setLoading] = useState(false);
//     const [errors, setErrors] = useState<Record<string, string>>({});

//     const [formData, setFormData] = useState({
//         firstName: '',
//         lastName: '',
//         phone: '+91',
//         email: '',
//         age: '',
//         gender: '',
//         weight: '',
//         healthGoal: '',
//         healthGoalOther: '',
//     });

//     useEffect(() => {
//         fetchDietPlan();
//     }, [params.id]);

//     const fetchDietPlan = async () => {
//         try {
//             const response = await fetch(`/api/diet-plans/${params.id}`);
//             if (response.ok) {
//                 const data = await response.json();
//                 setDietPlan(data);
//             }
//         } catch (error) {
//             console.error('Error fetching diet plan:', error);
//         }
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setLoading(true);
//         setErrors({});

//         try {
//             const response = await fetch('/api/submissions', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     ...formData,
//                     dietPlanId: params.id,
//                 }),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 router.push(`/download/${params.id}`);
//             } else {
//                 if (data.details) {
//                     const newErrors: Record<string, string> = {};
//                     data.details.forEach((err: any) => {
//                         newErrors[err.path[0]] = err.message;
//                     });
//                     setErrors(newErrors);
//                 } else {
//                     alert(data.error || 'Failed to submit form');
//                 }
//             }
//         } catch (error) {
//             console.error('Error submitting form:', error);
//             alert('Failed to submit form');
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (!dietPlan) {
//         return (
//             <div className="container mx-auto px-4 py-12">
//                 <div className="text-center">Loading...</div>
//             </div>
//         );
//     }

//     return (
//         <div className="container mx-auto px-4 py-12">
//             <div className="max-w-2xl mx-auto">
//                 <Link href={`/diet-plans/${params.id}`} className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
//                     <ArrowLeft className="h-4 w-4 mr-2" />
//                     Back to diet plan
//                 </Link>

//                 <Card>
//                     <CardHeader>
//                         <CardTitle className="text-3xl">Complete Your Details</CardTitle>
//                         <p className="text-muted-foreground mt-2">
//                             Downloading: <span className="font-semibold">{dietPlan.title}</span>
//                         </p>
//                         {dietPlan.price === 0 && (
//                             <p className="text-green-600 font-semibold">Price: FREE</p>
//                         )}
//                     </CardHeader>
//                     <CardContent>
//                         <form onSubmit={handleSubmit} className="space-y-6">
//                             {/* Name */}
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <div>
//                                     <Label htmlFor="firstName">First Name *</Label>
//                                     <Input
//                                         id="firstName"
//                                         value={formData.firstName}
//                                         onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
//                                         required
//                                     />
//                                     {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>}
//                                 </div>
//                                 <div>
//                                     <Label htmlFor="lastName">Last Name *</Label>
//                                     <Input
//                                         id="lastName"
//                                         value={formData.lastName}
//                                         onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
//                                         required
//                                     />
//                                     {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>}
//                                 </div>
//                             </div>

//                             {/* Phone */}
//                             <div>
//                                 <Label htmlFor="phone">Phone *</Label>
//                                 <div className="flex gap-2">
//                                     <Select
//                                         value={formData.phone.split(' ')[0]}
//                                         onChange={(e) => {
//                                             const code = e.target.value;
//                                             const number = formData.phone.split(' ')[1] || '';
//                                             setFormData({ ...formData, phone: `${code} ${number}`.trim() });
//                                         }}
//                                         className="w-32"
//                                     >
//                                         <option value="+91">🇮🇳 +91</option>
//                                         <option value="+1">🇺🇸 +1</option>
//                                         <option value="+44">🇬🇧 +44</option>
//                                         <option value="+61">🇦🇺 +61</option>
//                                     </Select>
//                                     <Input
//                                         id="phone"
//                                         type="tel"
//                                         placeholder="Phone number"
//                                         value={formData.phone.split(' ')[1] || ''}
//                                         onChange={(e) => {
//                                             const code = formData.phone.split(' ')[0] || '+91';
//                                             setFormData({ ...formData, phone: `${code} ${e.target.value}`.trim() });
//                                         }}
//                                         required
//                                     />
//                                 </div>
//                                 {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
//                             </div>

//                             {/* Email */}
//                             <div>
//                                 <Label htmlFor="email">Email *</Label>
//                                 <Input
//                                     id="email"
//                                     type="email"
//                                     value={formData.email}
//                                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                                     required
//                                 />
//                                 {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
//                             </div>

//                             {/* Age Band */}
//                             <div>
//                                 <Label htmlFor="age">Age Band *</Label>
//                                 <Select
//                                     id="age"
//                                     value={formData.age}
//                                     onChange={(e) => setFormData({ ...formData, age: e.target.value })}
//                                     required
//                                 >
//                                     <option value="">Select age band</option>
//                                     <option value="18-25">18-25</option>
//                                     <option value="25-35">25-35</option>
//                                     <option value="35-50">35-50</option>
//                                     <option value="50-65">50-65</option>
//                                     <option value="65+">65+</option>
//                                 </Select>
//                                 {errors.age && <p className="text-sm text-red-500 mt-1">{errors.age}</p>}
//                             </div>

//                             {/* Gender */}
//                             <div>
//                                 <Label>Gender *</Label>
//                                 <div className="flex gap-6 mt-2">
//                                     {['M', 'F', 'Other'].map((gender) => (
//                                         <label key={gender} className="flex items-center gap-2 cursor-pointer">
//                                             <input
//                                                 type="radio"
//                                                 name="gender"
//                                                 value={gender}
//                                                 checked={formData.gender === gender}
//                                                 onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
//                                                 required
//                                                 className="w-4 h-4"
//                                             />
//                                             <span>{gender === 'M' ? 'Male' : gender === 'F' ? 'Female' : 'Other'}</span>
//                                         </label>
//                                     ))}
//                                 </div>
//                                 {errors.gender && <p className="text-sm text-red-500 mt-1">{errors.gender}</p>}
//                             </div>

//                             {/* Weight */}
//                             <div>
//                                 <Label htmlFor="weight">Weight in Kgs *</Label>
//                                 <Input
//                                     id="weight"
//                                     type="number"
//                                     step="0.1"
//                                     value={formData.weight}
//                                     onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
//                                     required
//                                 />
//                                 {errors.weight && <p className="text-sm text-red-500 mt-1">{errors.weight}</p>}
//                             </div>

//                             {/* Health Goal */}
//                             <div>
//                                 <Label htmlFor="healthGoal">Health Goal *</Label>
//                                 <Select
//                                     id="healthGoal"
//                                     value={formData.healthGoal}
//                                     onChange={(e) => setFormData({ ...formData, healthGoal: e.target.value })}
//                                     required
//                                 >
//                                     <option value="">Select health goal</option>
//                                     <option value="Weight Loss">Weight Loss</option>
//                                     <option value="Weight Gain">Weight Gain</option>
//                                     <option value="Muscle Gain">Muscle Gain</option>
//                                     <option value="Skin Glow">Skin Glow</option>
//                                     <option value="Reduce Hair Loss">Reduce Hair Loss</option>
//                                     <option value="Hormonal Issues">Hormonal Issues</option>
//                                     <option value="Reduce Fatty Liver">Reduce Fatty Liver</option>
//                                     <option value="Diabetes Control">Diabetes Control</option>
//                                     <option value="Others">Others</option>
//                                 </Select>
//                                 {errors.healthGoal && <p className="text-sm text-red-500 mt-1">{errors.healthGoal}</p>}
//                             </div>

//                             {/* Health Goal Other */}
//                             {formData.healthGoal === 'Others' && (
//                                 <div>
//                                     <Label htmlFor="healthGoalOther">Please specify your health goal</Label>
//                                     <Input
//                                         id="healthGoalOther"
//                                         value={formData.healthGoalOther}
//                                         onChange={(e) => setFormData({ ...formData, healthGoalOther: e.target.value })}
//                                     />
//                                 </div>
//                             )}

//                             {/* Submit Button */}
//                             <Button type="submit" size="lg" className="w-full" disabled={loading}>
//                                 {loading ? 'Submitting...' : 'Submit & Download'}
//                             </Button>
//                         </form>
//                     </CardContent>
//                 </Card>
//             </div>
//         </div>
//     );
// }
















// V2 page -with checout page modifed 
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCart, CartItem } from '@/lib/cart';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export default function CheckoutPage() {
    const router = useRouter();
    const [cart, setCart] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '+91',
        email: '',
        age: '',
        gender: '',
        weight: '',
        healthGoal: '',
        healthGoalOther: '',
    });

    useEffect(() => {
        const cartItems = getCart();
        if (cartItems.length === 0) {
            router.push('/');
        }
        setCart(cartItems);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            const response = await fetch('/api/submissions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    dietPlanIds: cart.map(item => item._id),
                }),
            });

            const data = await response.json();

            if (response.ok) {
                router.push('/download');
            } else {
                if (data.details) {
                    const newErrors: Record<string, string> = {};
                    data.details.forEach((err: any) => {
                        newErrors[err.path[0]] = err.message;
                    });
                    setErrors(newErrors);
                } else {
                    alert(data.error || 'Failed to submit form');
                }
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit form');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-12">
            <div className="max-w-4xl mx-auto">
                <Link href="/cart" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to cart
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Form */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl md:text-3xl">Complete Your Details</CardTitle>
                                <p className="text-sm md:text-base text-muted-foreground mt-2">
                                    Fill in your information to download your diet plans
                                </p>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                    {/* Name */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="firstName">First Name *</Label>
                                            <Input
                                                id="firstName"
                                                value={formData.firstName}
                                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                required
                                            />
                                            {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>}
                                        </div>
                                        <div>
                                            <Label htmlFor="lastName">Last Name *</Label>
                                            <Input
                                                id="lastName"
                                                value={formData.lastName}
                                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                required
                                            />
                                            {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>}
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <Label htmlFor="phone">Phone *</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="+91 1234567890"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            required
                                        />
                                        {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <Label htmlFor="email">Email *</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                                    </div>

                                    {/* Age Band */}
                                    <div>
                                        <Label htmlFor="age">Age Band *</Label>
                                        <select
                                            id="age"
                                            value={formData.age}
                                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                            required
                                            className="w-full border rounded-md px-3 py-2 hover:cursor-pointer"
                                        >
                                            <option value="">Select age band</option>
                                            <option value="18-25">18-25</option>
                                            <option value="25-35">25-35</option>
                                            <option value="35-50">35-50</option>
                                            <option value="50-65">50-65</option>
                                            <option value="65+">65+</option>
                                        </select>
                                        {errors.age && <p className="text-sm text-red-500 mt-1">{errors.age}</p>}
                                    </div>

                                    {/* Gender */}
                                    <div>
                                        <Label>Gender *</Label>
                                        <div className="flex gap-4 md:gap-6 mt-2">
                                            {['M', 'F', 'Other'].map((gender) => (
                                                <label key={gender} className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        value={gender}
                                                        checked={formData.gender === gender}
                                                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                                        required
                                                        className="w-4 h-4"
                                                    />
                                                    <span className="text-sm md:text-base">{gender === 'M' ? 'Male' : gender === 'F' ? 'Female' : 'Other'}</span>
                                                </label>
                                            ))}
                                        </div>
                                        {errors.gender && <p className="text-sm text-red-500 mt-1">{errors.gender}</p>}
                                    </div>

                                    {/* Weight */}
                                    <div>
                                        <Label htmlFor="weight">Weight in Kgs *</Label>
                                        <Input
                                            id="weight"
                                            type="number"
                                            step="0.1"
                                            value={formData.weight}
                                            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                            required
                                        />
                                        {errors.weight && <p className="text-sm text-red-500 mt-1">{errors.weight}</p>}
                                    </div>

                                    {/* Health Goal */}
                                    <div>
                                        <Label htmlFor="healthGoal">Health Goal *</Label>
                                        <select
                                            id="healthGoal"
                                            value={formData.healthGoal}
                                            onChange={(e) => setFormData({ ...formData, healthGoal: e.target.value })}
                                            required
                                            className="w-full border rounded-md px-3 py-2 hover:cursor-pointer"
                                        >
                                            <option value="">Select health goal</option>
                                            <option value="Weight Loss">Weight Loss</option>
                                            <option value="Weight Gain">Weight Gain</option>
                                            <option value="Muscle Gain">Muscle Gain</option>
                                            <option value="Skin Glow">Skin Glow</option>
                                            <option value="Reduce Hair Loss">Reduce Hair Loss</option>
                                            <option value="Hormonal Issues">Hormonal Issues</option>
                                            <option value="Reduce Fatty Liver">Reduce Fatty Liver</option>
                                            <option value="Diabetes Control">Diabetes Control</option>
                                            <option value="Others">Others</option>
                                        </select>
                                        {errors.healthGoal && <p className="text-sm text-red-500 mt-1">{errors.healthGoal}</p>}
                                    </div>

                                    {/* Health Goal Other */}
                                    {formData.healthGoal === 'Others' && (
                                        <div>
                                            <Label htmlFor="healthGoalOther">Please specify your health goal</Label>
                                            <Input
                                                id="healthGoalOther"
                                                value={formData.healthGoalOther}
                                                onChange={(e) => setFormData({ ...formData, healthGoalOther: e.target.value })}
                                            />
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <Button type="submit" size="lg" className=" hover:cursor-pointer w-full" disabled={loading}>
                                        {loading ? 'Submitting...' : 'Submit & Download'}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-4">
                            <CardHeader>
                                <CardTitle className="text-lg md:text-xl">Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    {cart.map((item) => (
                                        <div key={item._id} className="flex gap-3">
                                            <div className="relative w-16 h-16 shrink-0">
                                                <Image
                                                    src={item.imageUrl}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover rounded"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-sm line-clamp-2">{item.title}</p>
                                                <p className="text-xs text-green-600 font-semibold">FREE</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t pt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold">Total:</span>
                                        <span className="text-xl font-bold text-green-600">FREE</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        {cart.length} {cart.length === 1 ? 'item' : 'items'}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}