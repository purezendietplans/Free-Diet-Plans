export interface DietPlan {
    _id?: string;
    title: string;
    description: string;
    imageUrl: string;
    pdfUrl: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Submission {
    _id?: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    age: string;
    gender: string;
    weight: string;
    healthGoal: string;
    healthGoalOther?: string;
    dietPlanId: string;
    dietPlanTitle: string;
    submittedAt: Date;
}

export interface AdminUser {
    email: string;
    password: string;
}

export interface CacheData {
  data: {
    dietPlans: DietPlan[];
    pagination: {
      totalPages: number;
      currentPage: number;
    };
  };
  timestamp: number;
  search: string;
  page: number;
}