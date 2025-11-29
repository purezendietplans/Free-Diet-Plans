import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { DietPlan } from '@/types';
import { ObjectId } from 'mongodb';
import { auth } from '@/lib/auth';

// GET /api/diet-plans - List all diet plans with search and pagination
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const search = searchParams.get('search') || '';
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '12');
        const skip = (page - 1) * limit;

        const client = await clientPromise;
        const db = client.db('dietplans');
        const collection = db.collection('dietplans');

        // Build search query
        const query = search
            ? {
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } },
                ],
            }
            : {};

        // Get total count
        const total = await collection.countDocuments(query);

        // Get diet plans
        const dietPlans = await collection
            .find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .toArray();

        // Convert _id to string
        const formattedDietPlans = dietPlans.map((plan) => ({
            ...plan,
            _id: plan._id?.toString(),
        }));

        return NextResponse.json({
            dietPlans: formattedDietPlans,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('Error fetching diet plans:', error);
        return NextResponse.json(
            { error: 'Failed to fetch diet plans' },
            { status: 500 }
        );
    }
}

// POST /api/diet-plans - Create new diet plan (admin only)
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await request.formData();
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const price = parseFloat(formData.get('price') as string) || 0;
        const imageUrl = formData.get('imageUrl') as string;
        const pdfUrl = formData.get('pdfUrl') as string;

        if (!title || !description || !imageUrl || !pdfUrl) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db('dietplans');
        const collection = db.collection('dietplans');

        const newDietPlan: Omit<DietPlan, '_id'> = {
            title,
            description,
            imageUrl,
            pdfUrl,
            price,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await collection.insertOne(newDietPlan as any);

        return NextResponse.json({
            success: true,
            dietPlan: {
                ...newDietPlan,
                _id: result.insertedId.toString(),
            },
        });
    } catch (error) {
        console.error('Error creating diet plan:', error);
        return NextResponse.json(
            { error: 'Failed to create diet plan' },
            { status: 500 }
        );
    }
}
