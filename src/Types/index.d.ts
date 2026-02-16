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

interface ProfileProp {
isEducator: boolean
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
    id?: string;
    email: string;
    role?: "student" | "instructor" | "admin";
    bio?: string;
  } | null;

  Register: (data: user) => void;
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
  course: dummyCoursesProp;
}

interface CourseStoreProp {
  currency: string;
  courses: course[] | null;
  specificCourse: null | course;
  isLoading: boolean;
  error: null | string;
  FetchAllCourse: () => Promise<void>;
  FetchSpecificCourse: (id: string) => Promise<void>;
  CreateCourse: (formdata : FormData) => Promise<void>;
  AddSection: (Data :{
    title: string,
    description: string,
    order: number,
    courseId: string;
  }) => Promise<boolean>;

  AddLecture: (Data : {
    title: string,
    order: number,
    isPrevieFree: boolean,
    duration: string,
    courseId: string,
    sectionId: string
  }) => Promise<void>
}

interface course {
  _id: string;
  title: string;
  slug?: string;
  discount: number;
  description: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  language: "Hindi" | "English" | "Hinglish";
  thumbnail: string;
  instructor: {
    name: string;
    avatar?: string;
  };
  sections: {
    _id: string
    title: string;
    description: string;
    order: string;
    courseId: string;
    lectures: {
      title: string;
      description: string;
      videoUrl: string;
      videoPublicId: string;
      duration: number;
      durationFormatted: string;
      thumbnail: string;
      thumbnailPublicId: string;
      isPreviewFree: boolean;
      courseId: string;
      sectionId: string;
      resourceFiles: string[]; // PDFs, notes, etc.
      captions: string; // subtitle file
      transcript: string;
      views: number;
      order: number;
    }[];
    duration: number;
  }[];

  enrollStudents: {
    name: string;
    email: string;
  }[];

  price: number;
  isFree: boolean;
  reviews: {
    id: string;
  }[];
  averageRating: number;
  status: "Draft" | "Published" | "Archived";
  publishedAt: date;
  lastUpdated: date;
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
