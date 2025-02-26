
export class CreateSessionDto {
    title: string;
    duration: number;
    fileUrl: string; // ✅ Required
    image?: string;  // Optional
    userId: number;
    courseId?: number; // Optional
  }