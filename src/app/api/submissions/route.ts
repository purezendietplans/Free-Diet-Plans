// import { NextRequest, NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';
// import { appendToGoogleSheet } from '@/lib/googleSheets';
// import { Submission } from '@/types';
// import { submissionSchema } from '@/lib/validations';
// import { ObjectId } from 'mongodb';

// export async function POST(request: NextRequest) {
//     try {
//         const body = await request.json();

//         // Validate input
//         const validatedData = submissionSchema.parse(body);

//         // Get diet plan details
//         const client = await clientPromise;
//         const db = client.db('dietplans');
//         const dietPlansCollection = db.collection('dietplans');

//         const dietPlan = await dietPlansCollection.findOne({
//             _id: new ObjectId(body.dietPlanId),
//         });

//         if (!dietPlan) {
//             return NextResponse.json(
//                 { error: 'Diet plan not found' },
//                 { status: 404 }
//             );
//         }

//         // Create submission object
//         const submission: Omit<Submission, '_id'> = {
//             ...validatedData,
//             dietPlanId: body.dietPlanId,
//             dietPlanTitle: dietPlan.title,
//             submittedAt: new Date(),
//         };

//         // Save to MongoDB
//         const submissionsCollection = db.collection<Submission>('submissions');
//         const result = await submissionsCollection.insertOne(submission as any);

//         // Append to Google Sheets
//         try {
//             await appendToGoogleSheet({
//                 ...submission,
//                 _id: result.insertedId.toString(),
//             } as Submission);
//         } catch (error) {
//             console.error('Error appending to Google Sheet:', error);
//             // Don't fail the request if Google Sheets fails
//         }

//         return NextResponse.json({
//             success: true,
//             submissionId: result.insertedId.toString(),
//             pdfUrl: dietPlan.pdfUrl,
//         });
//     } catch (error: any) {
//         console.error('Error creating submission:', error);

//         if (error.name === 'ZodError') {
//             return NextResponse.json(
//                 { error: 'Validation failed', details: error.errors },
//                 { status: 400 }
//             );
//         }

//         return NextResponse.json(
//             { error: 'Failed to create submission' },
//             { status: 500 }
//         );
//     }
// }




// V2
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { appendToGoogleSheet } from '@/lib/googleSheets';
import { Submission } from '@/types';
import { submissionSchema } from '@/lib/validations';
import { ObjectId } from 'mongodb';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate input
        const validatedData = submissionSchema.parse(body);

        const client = await clientPromise;
        const db = client.db('dietplans');
        const dietPlansCollection = db.collection('dietplans');
        const submissionsCollection = db.collection<Submission>('submissions');

        // Handle multiple diet plans
        const dietPlanIds = Array.isArray(body.dietPlanIds) 
            ? body.dietPlanIds 
            : [body.dietPlanId];

        if (!dietPlanIds || dietPlanIds.length === 0) {
            return NextResponse.json(
                { error: 'No diet plans selected' },
                { status: 400 }
            );
        }

        // Get all diet plan details
        const dietPlans = await dietPlansCollection
            .find({
                _id: { $in: dietPlanIds.map((id: string) => new ObjectId(id)) },
            })
            .toArray();

        if (dietPlans.length === 0) {
            return NextResponse.json(
                { error: 'No valid diet plans found' },
                { status: 404 }
            );
        }

        // Create submissions for each diet plan
        const submissions = dietPlans.map((dietPlan) => ({
            ...validatedData,
            dietPlanId: dietPlan._id.toString(),
            dietPlanTitle: dietPlan.title,
            submittedAt: new Date(),
        }));

        // Save all submissions to MongoDB
        const result = await submissionsCollection.insertMany(submissions as any);

        // Append each submission to Google Sheets
        const insertedSubmissions = Object.values(result.insertedIds).map((id, index) => ({
            ...submissions[index],
            _id: id.toString(),
        }));

        // Append to Google Sheets (don't fail if it errors)
        try {
            for (const submission of insertedSubmissions) {
                await appendToGoogleSheet(submission as Submission);
            }
        } catch (error) {
            console.error('Error appending to Google Sheets:', error);
        }

        // Return all PDF URLs
        const pdfUrls = dietPlans.map((plan) => ({
            dietPlanId: plan._id.toString(),
            title: plan.title,
            pdfUrl: plan.pdfUrl,
        }));

        return NextResponse.json({
            success: true,
            submissionIds: Object.values(result.insertedIds).map((id) => id.toString()),
            dietPlans: pdfUrls,
            message: `Successfully submitted ${dietPlans.length} diet plan(s)`,
        });
    } catch (error: any) {
        console.error('Error creating submission:', error);

        if (error.name === 'ZodError') {
            return NextResponse.json(
                { error: 'Validation failed', details: error.errors },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to create submission' },
            { status: 500 }
        );
    }
}