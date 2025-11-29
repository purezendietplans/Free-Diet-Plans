import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { DietPlan } from '@/types';
import { ObjectId } from 'mongodb';
import { auth } from '@/lib/auth';
import { deleteFromCloudinary, extractPublicIdFromUrl } from '@/lib/cloudinary';

// GET /api/diet-plans/[id] - Get single diet plan
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db('dietplans');
        const collection = db.collection('dietplans');

        const dietPlan = await collection.findOne({ _id: new ObjectId(id) }) as any;

        if (!dietPlan) {
            return NextResponse.json({ error: 'Diet plan not found' }, { status: 404 });
        }

        return NextResponse.json({
            ...dietPlan,
            _id: dietPlan._id?.toString(),
        });
    } catch (error) {
        console.error('Error fetching diet plan:', error);
        return NextResponse.json(
            { error: 'Failed to fetch diet plan' },
            { status: 500 }
        );
    }
}

// PUT /api/diet-plans/[id] - Update diet plan (admin only)
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        const formData = await request.formData();
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const price = parseFloat(formData.get('price') as string) || 0;
        const imageUrl = formData.get('imageUrl') as string;
        const pdfUrl = formData.get('pdfUrl') as string;

        const client = await clientPromise;
        const db = client.db('dietplans');
        const collection = db.collection('dietplans');

        const updateData: Partial<DietPlan> = {
            title,
            description,
            price,
            updatedAt: new Date(),
        };

        if (imageUrl) updateData.imageUrl = imageUrl;
        if (pdfUrl) updateData.pdfUrl = pdfUrl;

        const result = await collection.findOneAndUpdate(
            { _id: new ObjectId(id) } as any,
            { $set: updateData },
            { returnDocument: 'after' }
        ) as any;

        if (!result) {
            return NextResponse.json({ error: 'Diet plan not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            dietPlan: {
                ...result,
                _id: result._id?.toString(),
            },
        });
    } catch (error) {
        console.error('Error updating diet plan:', error);
        return NextResponse.json(
            { error: 'Failed to update diet plan' },
            { status: 500 }
        );
    }
}

// DELETE /api/diet-plans/[id] - Delete diet plan (admin only)
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db('dietplans');
        const collection = db.collection('dietplans');

        // Get the diet plan first to delete files from R2
        const dietPlan = await collection.findOne({ _id: new ObjectId(id) }) as any;

        if (!dietPlan) {
            return NextResponse.json({ error: 'Diet plan not found' }, { status: 404 });
        }

        // Delete files from Cloudinary
        try {
            if (dietPlan.imageUrl) {
                const publicId = extractPublicIdFromUrl(dietPlan.imageUrl);
                await deleteFromCloudinary(publicId);
            }
            if (dietPlan.pdfUrl) {
                const publicId = extractPublicIdFromUrl(dietPlan.pdfUrl);
                await deleteFromCloudinary(publicId);
            }
        } catch (error) {
            console.error('Error deleting files from Cloudinary:', error);
            // Continue with deletion even if Cloudinary deletion fails
        }

        // Delete from database
        await collection.deleteOne({ _id: new ObjectId(id) } as any);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting diet plan:', error);
        return NextResponse.json(
            { error: 'Failed to delete diet plan' },
            { status: 500 }
        );
    }
}
