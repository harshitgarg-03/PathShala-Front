import type { ReactNode } from "react";
import type { NavigateFunction } from "react-router-dom";

interface ButtonProp {
  title: string;
  classname?: string;
  type?: "submit" | "button";
}

export interface Enrollment {
  _id?: string;

  name?: string;
  email?: string;
  course_id?: string;
  user_id?: string;

  course?: course;   // populated data
  user?: User;

  enrolled_at?: string;
  completed?: boolean;

  rating?: number;
  review?: string;

  progress?: number;
  updated_at?: string;
}

interface WrapperProp {
  children: ReactNode;
}

interface PayStoreProp {
  isLoading?: boolean,
  error: null | string,
  createOrder: (courseId: string) => Promise<void>,
  handlePayment: (course: course) => Promise<void>,
}

interface PaymentCardProps {
  title: string;
  price: number;
  discount: number;
  isLoading?: boolean;
  imgstring: string;
  courseId: string;
  isEnroll: boolean
}

interface ProfileProp {
  isEducator: boolean;
  isLoading: boolean;
  error: null | string;
  UpdateProfile: (data: FormData) => Promise<void>
  changedpassword: (data: {oldPassword: string, newPassword: string}) => Promise<void>
}

interface StoreProp {
  isLoading: boolean;
  currency: string;
  courses: dummyCoursesProp[] | null;
  FetchAllCourses: () => void;
  // navigate : NavigateFunction
  CourseRatingFunction: (courses: dummyCoursesProp) => number;
  CourseDetailFunc: (id: Readonly<Params<string>>) => void;
  SpecificCourse: dummyCoursesProp | null;
}

interface AuthSoreProp {
  isAuthenticate: boolean;
  isLoading: boolean;
  isBooting: boolean;
  error: null | string;
  user: {
    name: string;
    _id?: string;
    email: string;
    role?: "student" | "instructor" | "admin";
    bio?: string;
    avatar: string;
  } | null;

  Register: (data: user) => Promoise<boolean>;
  Login: (data: user) => void;
  handleGoogleLogin: () => void;
  CurrentUser: () => void;
  Logout: () => void;
}

interface LoadingProp {
  classname?: string;
}

interface smallCardProp {
  title: string;
  icon: string;
}

interface CourseCardProp {
  course: course;
}

interface SearchBarProp {
  inputSearch: string | undefined;
}

interface CourseDetailProp {
  course: course;
}

interface CourseStoreProp {
  specificCourseId: string | null;
  currency: string;
  courses: course[] | null;
  specificCourse: null | course;
  isLoading: boolean;
  error: null | string;
  UserFetchedCourse: course[] | null;
  UserPurchasedCourse:  course[] | null;
  enrollCourse: string | null;
  specificSection: section | null | {
    _id: string;
    title: string;
    description: string;
    order: string;
    courseId: string;
    lectures: lecture[];
    duration: number;
  };
  FetchSpecificSection: (id: string) => void;
  FetchAllCourse: () => Promise<void>;
  FetchSpecificCourse: (id: string) => void;
  CreateCourse: (formdata: FormData) => Promise<void>;
  AddSection: (Data: {
    title: string;
    description: string;
    order: number;
    courseId: string;
  }) => Promise<boolean>;

  updateCourse: (courseId: string, data: FormData) => Promise<void>;
  DeleteCourse: (courseId: string) => Promise<void>;
  AddLecture: (Data: FormData) => Promise<[]>;
  GetManageCourse: () => Promise<void>;
  GetPurchaseCoures: () => Promise<void>;
  GetEnrolledCourse: () => Promise<void>;
}

interface AnalyticsStoreProp {
  TotalStudents: number;
  AvgCoursePrice: number;
  AverageRating: number;
  TotalIncomefromCourses: number;
  TotalRevenue: () => void;
}

interface lecture {
  _id: string;
  title: string;
  description: string;
  videoUrl?: string;
  videoPublicId?: string;
  duration?: number;
  durationFormatted?: string;
  thumbnail?: string;
  thumbnailPublicId?: string;
  isPreviewFree?: boolean;
  courseId?: string;
  sectionId?: string;
  resourceFiles?: string[]; // PDFs, notes, etc.
  captions?: string; // subtitle file
  transcript?: string;
  views?: number;
  order?: number;
}

interface section {
  _id: string;
  title: string;
  description: string;
  order?: string;
  courseId?: string;
  lectures?: lecture[];
  duration?: number;
}

interface course {
  _id: string;
  title: string;
  slug?: string;
  discount?: number;
  description: string;
  category?: string;
  duration: number;
  level?: "Beginner" | "Intermediate" | "Advanced";
  language?: "Hindi" | "English" | "Hinglish";
  thumbnail?: string;
  instructor?: {
    _id: string;
    name: string;
    avatar?: string;
  };
  sections?: section[];

  enrollStudents?: {
    name: string;
    email: string;
  }[];

  price: string;
  isFree?: boolean;
  reviews?: {
    id: string;
  }[];
  averageRating?: number;
  status?: "Draft" | "Published" | "Archived";
  publishedAt?: date;
  lastUpdated?: date;
}

interface dummyCoursesProp {
  _id: string;
  courseTitle: string;
  courseDescription: string;
  coursePrice: number;
  isPublished: boolean;
  discount: number;
  courseContent: {
    chapterId: string;
    chapterOrder: number;
    chapterTitle: string;
    chapterContent: {
      lectureId: string;
      lectureTitle: string;
      lectureDuration: number;
      lectureUrl: string;
      isPreviewFree: boolean;
      lectureOrder: number;
    }[];
  }[];
  educator: string;
  enrolledStudents: string[];
  courseRatings: {
    userId: string;
    rating: number;
    _id: string;
  }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  courseThumbnail: string;
}
[];

interface studentStoreprop {
  status: "error" | "success" | "ideal"  | "loading";
  error: string | null;
  publishedCourses: course[] | null;

  getPublishedCourse: () => Promise<void>;
};