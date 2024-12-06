// Визначення базових типів
type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
type TimeSlot =
  | "8:30-10:00"
  | "10:15-11:45"
  | "12:15-13:45"
  | "14:00-15:30"
  | "15:45-17:15";
type CourseType = "Lecture" | "Seminar" | "Lab" | "Practice";

// Основні структури
type Professor = {
  id: number;
  name: string;
  department: string;
};

type Classroom = {
  number: string;
  capacity: number;
  hasProjector: boolean;
};

type Course = {
  id: number;
  name: string;
  type: CourseType;
};

type Lesson = {
  courseId: number;
  professorId: number;
  classroomNumber: string;
  dayOfWeek: DayOfWeek;
  timeSlot: TimeSlot;
};

type ScheduleConflict = {
  type: "ProfessorConflict" | "ClassroomConflict";
  lessonDetails: Lesson;
};

// Масиви даних
const professors: Professor[] = [];
const classrooms: Classroom[] = [];
const courses: Course[] = [];
const schedule: Lesson[] = [];

// Функції для роботи з даними

// Додавання професора
function addProfessor(professor: Professor): void {
  professors.push(professor);
}

// Додавання заняття до розкладу
function addLesson(lesson: Lesson): boolean {
  const conflict = validateLesson(lesson);
  if (conflict) {
    console.log("Конфлікт:", conflict);
    return false;
  }
  schedule.push(lesson);
  return true;
}

// Перевірка наявності конфліктів
function validateLesson(lesson: Lesson): ScheduleConflict | null {
  for (const existingLesson of schedule) {
    if (
      existingLesson.dayOfWeek === lesson.dayOfWeek &&
      existingLesson.timeSlot === lesson.timeSlot
    ) {
      if (existingLesson.professorId === lesson.professorId) {
        return {
          type: "ProfessorConflict",
          lessonDetails: existingLesson,
        };
      }
      if (existingLesson.classroomNumber === lesson.classroomNumber) {
        return {
          type: "ClassroomConflict",
          lessonDetails: existingLesson,
        };
      }
    }
  }
  return null;
}

// Пошук вільних аудиторій
function findAvailableClassrooms(
  timeSlot: TimeSlot,
  dayOfWeek: DayOfWeek
): string[] {
  const occupiedClassrooms = schedule
    .filter(
      (lesson) =>
        lesson.timeSlot === timeSlot && lesson.dayOfWeek === dayOfWeek
    )
    .map((lesson) => lesson.classroomNumber);
  return classrooms
    .map((classroom) => classroom.number)
    .filter((number) => !occupiedClassrooms.includes(number));
}

// Розклад професора
function getProfessorSchedule(professorId: number): Lesson[] {
  return schedule.filter((lesson) => lesson.professorId === professorId);
}

// Використання аудиторії
function getClassroomUtilization(classroomNumber: string): number {
  const totalSlots = 5 * 5; // Дні на тиждень * Слоти на день
  const usedSlots = schedule.filter(
    (lesson) => lesson.classroomNumber === classroomNumber
  ).length;
  return (usedSlots / totalSlots) * 100;
}

// Найпопулярніший тип занять
// Найпопулярніший тип занять
function getMostPopularCourseType(): CourseType {
    const typeCounts: Record<CourseType, number> = {
      Lecture: 0,
      Seminar: 0,
      Lab: 0,
      Practice: 0,
    };
  
    for (const lesson of schedule) {
      const course = courses.find((c) => c.id === lesson.courseId);
      if (course) {
        typeCounts[course.type]++;
      }
    }
  
    // Исправленный reduce с типами
    return Object.entries(typeCounts).reduce(
      (max: [string, number], current: [string, number]) => (current[1] > max[1] ? current : max)
    )[0] as CourseType; // Возвращаем первый элемент кортежа как CourseType
  }
  

// Модифікація розкладу
function reassignClassroom(
  lessonId: number,
  newClassroomNumber: string
): boolean {
  const lesson = schedule.find((l) => l.courseId === lessonId);
  if (!lesson) return false;

  const conflict = validateLesson({
    ...lesson,
    classroomNumber: newClassroomNumber,
  });
  if (conflict) {
    console.log("Неможливо перенести заняття. Конфлікт:", conflict);
    return false;
  }

  lesson.classroomNumber = newClassroomNumber;
  return true;
}

function cancelLesson(lessonId: number): void {
  const index = schedule.findIndex((l) => l.courseId === lessonId);
  if (index !== -1) {
    schedule.splice(index, 1);
  }
}

// Тестові дані
addProfessor({ id: 1, name: "Іван Іванович", department: "Math" });
classrooms.push({ number: "101", capacity: 30, hasProjector: true });
courses.push({ id: 1, name: "Математика", type: "Lecture" });

addLesson({
  courseId: 1,
  professorId: 1,
  classroomNumber: "101",
  dayOfWeek: "Monday",
  timeSlot: "8:30-10:00",
});


console.log("Розклад професора:", getProfessorSchedule(1));
console.log("Вільні аудиторії:", findAvailableClassrooms("8:30-10:00", "Monday"));
console.log("Використання аудиторії 101:", getClassroomUtilization("101"), "%");
