'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Upload } from 'lucide-react';
import { DietPlan } from '@/types';

export default function EditDietPlanPage() {
    const params = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '0',
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');

    useEffect(() => {
        fetchDietPlan();
    }, [params.id]);

    const fetchDietPlan = async () => {
        try {
            const response = await fetch(`/api/diet-plans/${params.id}`);
            if (response.ok) {
                const data = await response.json();
                setDietPlan(data);
                setFormData({
                    title: data.title,
                    description: data.description,
                    price: data.price.toString(),
                });
                setImagePreview(data.imageUrl);
            }
        } catch (error) {
            console.error('Error fetching diet plan:', error);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPdfFile(file);
        }
    };

    const uploadFile = async (file: File, type: 'image' | 'pdf'): Promise<string> => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', type);

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to upload file');
        }

        const data = await response.json();
        return data.url;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = dietPlan?.imageUrl || '';
            let pdfUrl = dietPlan?.pdfUrl || '';

            // Upload new files if selected
            if (imageFile) {
                imageUrl = await uploadFile(imageFile, 'image');
            }
            if (pdfFile) {
                pdfUrl = await uploadFile(pdfFile, 'pdf');
            }

            // Update diet plan
            const dietPlanData = new FormData();
            dietPlanData.append('title', formData.title);
            dietPlanData.append('description', formData.description);
            dietPlanData.append('price', formData.price);
            dietPlanData.append('imageUrl', imageUrl);
            dietPlanData.append('pdfUrl', pdfUrl);

            const response = await fetch(`/api/diet-plans/${params.id}`, {
                method: 'PUT',
                body: dietPlanData,
            });

            if (response.ok) {
                router.push('/admin/dashboard');
            } else {
                alert('Failed to update diet plan');
            }
        } catch (error) {
            console.error('Error updating diet plan:', error);
            alert('Failed to update diet plan');
        } finally {
            setLoading(false);
        }
    };

    if (!dietPlan) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">Loading...</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <Link href="/admin/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to dashboard
                </Link>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl">Edit Diet Plan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Title */}
                            <div>
                                <Label htmlFor="title">Title *</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <Label htmlFor="description">Description *</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={6}
                                    required
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <Label htmlFor="price">Price (₹)</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                />
                                <p className="text-sm text-muted-foreground mt-1">
                                    Set to 0 for free diet plans
                                </p>
                            </div>

                            {/* Image Upload */}
                            <div>
                                <Label htmlFor="image">Diet Plan Image</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                <p className="text-sm text-muted-foreground mt-1">
                                    Leave empty to keep current image
                                </p>
                                {imagePreview && (
                                    <div className="mt-4">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full max-w-md rounded-lg border"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* PDF Upload */}
                            <div>
                                <Label htmlFor="pdf">Diet Plan PDF</Label>
                                <Input
                                    id="pdf"
                                    type="file"
                                    accept="application/pdf"
                                    onChange={handlePdfChange}
                                />
                                <p className="text-sm text-muted-foreground mt-1">
                                    Leave empty to keep current PDF
                                </p>
                                {pdfFile && (
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Selected: {pdfFile.name}
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="flex gap-3">
                                <Button type="submit" disabled={loading} className="flex-1">
                                    {loading ? (
                                        <>
                                            <Upload className="mr-2 h-4 w-4 animate-spin" />
                                            Updating...
                                        </>
                                    ) : (
                                        'Update Diet Plan'
                                    )}
                                </Button>
                                <Link href="/admin/dashboard">
                                    <Button type="button" variant="outline">
                                        Cancel
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
