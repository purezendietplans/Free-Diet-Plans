# Diet Plan Download Application

A comprehensive Next.js application for browsing and downloading diet plans with an admin panel for content management. Features include Google Sheets integration for form submissions and Cloudflare R2 for file storage.

## Features

### User Features
- 🔍 Browse and search diet plans
- 📱 Responsive design (mobile, tablet, desktop)
- 📄 View detailed diet plan information
- 📋 Checkout form with comprehensive user details
- 📊 Automatic data submission to Google Sheets
- ⬇️ Download diet plan PDFs
- 🎨 Modern UI with shadcn/ui components

### Admin Features
- 🔐 Secure admin authentication
- ➕ Create new diet plans
- ✏️ Edit existing diet plans
- 🗑️ Delete diet plans (with automatic file cleanup)
- 🔍 Search diet plans
- 📤 Upload images and PDFs to Cloudflare R2

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, NextAuth.js
- **Database**: MongoDB
- **File Storage**: Cloudinary
- **Data Export**: Google Sheets API
- **Form Handling**: React Hook Form, Zod validation

## Prerequisites

- Node.js 18+ and npm
- MongoDB database (local or MongoDB Atlas)
- Cloudinary account
- Google Cloud project with Sheets API enabled
- Google Service Account credentials

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/dietplans
# Or use MongoDB Atlas: mongodb+srv://...

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Google Sheets
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your_google_sheet_id

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret_generate_with_openssl_rand_base64_32
NEXTAUTH_URL=http://localhost:3000

# Admin Credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_secure_password

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Set Up Google Sheets

1. Create a Google Cloud project
2. Enable the Google Sheets API
3. Create a Service Account and download the JSON credentials
4. Create a new Google Sheet and share it with the service account email
5. Copy the Sheet ID from the URL and add it to `.env.local`

### 4. Set Up Cloudinary

1. Create a Cloudinary account at https://cloudinary.com
2. Get your Cloud Name, API Key, and API Secret from the dashboard
3. Add credentials to `.env.local`

### 5. Generate NextAuth Secret

```bash
openssl rand -base64 32
```

Add the output to `NEXTAUTH_SECRET` in `.env.local`

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### User Flow

1. Browse diet plans on the homepage
2. Use the search bar to find specific plans
3. Click on a diet plan to view details
4. Click "Download Diet Plan" to proceed to checkout
5. Fill in the required details (name, phone, email, age, gender, weight, health goals)
6. Submit the form to save data to Google Sheets
7. Download the PDF from the confirmation page

### Admin Panel

1. Navigate to `/admin/login`
2. Sign in with admin credentials
3. View all diet plans in the dashboard
4. Click "Add New Diet Plan" to create a new plan
5. Upload an image and PDF, enter details, and submit
6. Edit or delete existing plans using the action buttons

## Form Fields

The checkout form captures the following information:

- First Name & Last Name (required)
- Phone with country code selector (default: India +91)
- Email (required)
- Age Band: 18-25, 25-35, 35-50, 50-65, 65+ (dropdown)
- Gender: Male/Female/Other (radio buttons)
- Weight in Kgs (required)
- Health Goal: Weight Loss, Weight Gain, Muscle Gain, Skin Glow, Reduce Hair Loss, Hormonal Issues, Reduce Fatty Liver, Diabetes Control, Others
- Custom health goal (text field, shown when "Others" is selected)

All data is automatically saved to the configured Google Sheet with timestamps.

## Project Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── dashboard/
│   │   │   ├── edit/[id]/page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── page.tsx
│   │   └── login/page.tsx
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── diet-plans/
│   │   │   ├── [id]/route.ts
│   │   │   └── route.ts
│   │   ├── submissions/route.ts
│   │   └── upload/route.ts
│   ├── checkout/[id]/page.tsx
│   ├── diet-plans/[id]/page.tsx
│   ├── download/[id]/page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       └── textarea.tsx
├── lib/
│   ├── auth.ts
│   ├── googleSheets.ts
│   ├── mongodb.ts
│   ├── r2.ts
│   ├── utils.ts
│   └── validations.ts
├── types/
│   └── index.ts
└── middleware.ts
```

## API Routes

- `GET /api/diet-plans` - List all diet plans (with search & pagination)
- `POST /api/diet-plans` - Create new diet plan (admin only)
- `GET /api/diet-plans/[id]` - Get single diet plan
- `PUT /api/diet-plans/[id]` - Update diet plan (admin only)
- `DELETE /api/diet-plans/[id]` - Delete diet plan (admin only)
- `POST /api/upload` - Upload file to Cloudinary (admin only)
- `POST /api/submissions` - Submit checkout form
- `POST /api/auth/[...nextauth]` - NextAuth endpoints

## Deployment

### Build for Production

```bash
npm run build
npm start
```

### Environment Variables

Make sure to set all environment variables in your production environment.

### Database

Ensure your MongoDB instance is accessible from your production server.

### File Storage

Cloudinary automatically handles CORS and CDN delivery. No additional configuration needed.

## Troubleshooting

### Google Sheets Not Working

- Verify the service account email has edit access to the sheet
- Check that the private key is properly formatted in `.env.local`
- Ensure the Sheet ID is correct

### File Upload Issues

- Verify Cloudinary credentials are correct (Cloud Name, API Key, API Secret)
- Check that your Cloudinary account has sufficient storage quota
- Ensure upload presets are configured if using unsigned uploads

### Admin Login Issues

- Verify `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env.local`
- Check that `NEXTAUTH_SECRET` is set
- Ensure `NEXTAUTH_URL` matches your deployment URL

## License

MIT
