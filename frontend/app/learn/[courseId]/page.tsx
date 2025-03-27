import { courses } from "@/lib/courses";
import ClientPage from './ClientPage'

// Add generateStaticParams function for static site generation
export async function generateStaticParams() {
  return courses.map((course) => ({
    courseId: course.id.toString(),
  }));
}

export default function CourseDetailPage({ params }: { params: { courseId: string } }) {
  const course = courses.find((c) => c.id === parseInt(params.courseId));
  if (!course) return <div>Course not found</div>;

  return <ClientPage courseId={params.courseId} initialData={course} />;
}