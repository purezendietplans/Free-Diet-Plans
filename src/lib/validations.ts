import { z } from 'zod';

export const dietPlanSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    price: z.number().min(0, 'Price must be 0 or greater').default(0),
});

export const submissionSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    phone: z.string().min(10, 'Valid phone number is required'),
    email: z.string().email('Valid email is required'),
    age: z.enum(['18-25', '25-35', '35-50', '50-65', '65+'], {
        message: 'Please select an age band',
    }),
    gender: z.enum(['M', 'F', 'Other'], {
        message: 'Please select a gender',
    }),
    weight: z.string().min(1, 'Weight is required'),
    healthGoal: z.string().min(1, 'Health goal is required'),
    healthGoalOther: z.string().optional(),
});

export const loginSchema = z.object({
    email: z.string().email('Valid email is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type DietPlanInput = z.infer<typeof dietPlanSchema>;
export type SubmissionInput = z.infer<typeof submissionSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
