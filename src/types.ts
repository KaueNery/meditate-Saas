export type MeditationItem = {
    id: number;
    title: string;
    duration: number;
    description?: string;
    image: string;
    fileUrl: string;
  };
  
  export type CourseItem = {
    id: number;
    title: string;
    description: string;
    image: string;
    sessions: SessionItem[];
  };
  
  export type SessionItem = {
    id: number;
    title: string;
    duration: number;
    description: string;
    image: string;
    fileUrl: string;
  };
  
  export type RootStackParamList = {
    Index: undefined;
    Detail: { meditation: MeditationItem };
    CourseDetail: { course: CourseItem };
  };