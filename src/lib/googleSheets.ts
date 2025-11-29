import { google } from 'googleapis';
import { Submission } from '@/types';

const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const spreadsheetId = process.env.GOOGLE_SHEET_ID;

export async function appendToGoogleSheet(submission: Submission): Promise<void> {
    if (!spreadsheetId) {
        throw new Error('Google Sheet ID is not configured');
    }

    try {
        // Check if headers exist
        const headerResponse = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: 'Sheet1!A1:L1',
        });

        // If no headers, add them
        if (!headerResponse.data.values || headerResponse.data.values.length === 0) {
            await sheets.spreadsheets.values.update({
                spreadsheetId,
                range: 'Sheet1!A1:L1',
                valueInputOption: 'RAW',
                requestBody: {
                    values: [[
                        'Timestamp',
                        'First Name',
                        'Last Name',
                        'Phone',
                        'Email',
                        'Age Band',
                        'Gender',
                        'Weight (Kgs)',
                        'Health Goal',
                        'Health Goal (Other)',
                        'Diet Plan',
                        'Diet Plan ID',
                    ]],
                },
            });
        }

        // Append the submission data
        const values = [[
            new Date(submission.submittedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
            submission.firstName,
            submission.lastName,
            submission.phone,
            submission.email,
            submission.age,
            submission.gender,
            submission.weight,
            submission.healthGoal,
            submission.healthGoalOther || '',
            submission.dietPlanTitle,
            submission.dietPlanId,
        ]];

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: 'Sheet1!A:L',
            valueInputOption: 'RAW',
            requestBody: {
                values,
            },
        });
    } catch (error) {
        console.error('Error appending to Google Sheet:', error);
        throw error;
    }
}
