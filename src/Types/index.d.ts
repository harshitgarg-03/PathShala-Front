import type { ReactNode } from "react";
import type { NavigateFunction } from "react-router-dom";

interface ButtonProp {
  title: string;
  classname?: string;
  type?: "submit" | "button";
}

interface WrapperProp {
  children: ReactNode;
}

interface StoreProp {
  currency: string;
  courses: dummyCoursesProp[] | null;
  FetchAllCourses: () => void;
  // navigate : NavigateFunction
  CourseRatingFunction : (courses : dummyCoursesProp) => number
}

interface AuthSoreProp {
  isAuthenticate : boolean;
  isLoading : boolean;
  isBooting : boolean;
  error : null | string;
  user : {
    name: string;
    id?: string;
    email: string;
    role? : 'student' | 'instructor' | 'admin';
    bio?: string;
  } | null;

  Register : (data : user) => void;
  Login : (data : user) => void;
  handleGoogleLogin : () => void;
}

interface LoadingProp {
  classname? : string;
}

interface smallCardProp {
  title: string;
  icon: string;
}
interface CourseCardProp {
  course: dummyCoursesProp;
}

interface SearchBarProp {
  inputSearch : string | undefined;
}

interface CourseDetailProp {
  course: dummyCoursesProp;

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
