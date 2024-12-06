enum StudentStatus {
  Active = "Active",
  Academic_Leave = "Academic_Leave",
  Graduated = "Graduated",
  Expelled = "Expelled",
}

enum CourseType {
  Mandatory = "Mandatory",
  Optional = "Optional",
  Special = "Special",
}

enum Semester {
  First = "First",
  Second = "Second",
}

enum GradeValue {
  Excellent = 5,
  Good = 4,
  Satisfactory = 3,
  Unsatisfactory = 2,
}

enum Faculty {
  Computer_Science = "Computer_Science",
  Economics = "Economics",
  Law = "Law",
  Engineering = "Engineering",
}

interface Student {
  id: number;
  fullName: string;
  faculty: Faculty;
  year: number;
  status: StudentStatus;
  enrollmentDate: Date;
  groupNumber: string;
}

interface Course {
  id: number;
  name: string;
  type: CourseType;
  credits: number;
  semester: Semester;
  faculty: Faculty;
  maxStudents: number;
}

interface Grade {
  studentId: number;
  courseId: number;
  grade: GradeValue;
  date: Date;
  semester: Semester;
}

class UniversityManagementSystem {
  private students: Student[] = [];
  private courses: Course[] = [];
  private grades: Grade[] = [];
  private studentIdCounter = 1;
  private courseIdCounter = 1;

  // Реєструє нового студента
  enrollStudent(student: Omit<Student, "id">): Student {
    const newStudent: Student = { id: this.studentIdCounter++, ...student };
    this.students.push(newStudent);
    return newStudent;
  }

  // Реєструє студента на курс
  registerForCourse(studentId: number, courseId: number): void {
    const student = this.students.find(s => s.id === studentId);
    const course = this.courses.find(c => c.id === courseId);

    if (!student || !course) {
      throw new Error("Student or Course not found");
    }

    if (course.faculty !== student.faculty) {
      throw new Error("Student cannot register for a course from a different faculty");
    }

    const enrolledCount = this.grades.filter(g => g.courseId === courseId).length;
    if (enrolledCount >= course.maxStudents) {
      throw new Error("Course is full");
    }

    this.grades.push({
      studentId,
      courseId,
      grade: GradeValue.Unsatisfactory, // Default grade
      date: new Date(),
      semester: course.semester,
    });
  }

  // Встановлює оцінку для студента
  setGrade(studentId: number, courseId: number, grade: GradeValue): void {
    const existingGrade = this.grades.find(g => g.studentId === studentId && g.courseId === courseId);

    if (!existingGrade) {
      throw new Error("Student is not registered for this course");
    }

    existingGrade.grade = grade;
    existingGrade.date = new Date();
  }

  // Оновлює статус студента
  updateStudentStatus(studentId: number, newStatus: StudentStatus): void {
    const student = this.students.find(s => s.id === studentId);

    if (!student) {
      throw new Error("Student not found");
    }

    if (newStatus === StudentStatus.Graduated && student.status !== StudentStatus.Active) {
      throw new Error("Only active students can graduate");
    }

    student.status = newStatus;
  }

  // Отримує список студентів певного факультету
  getStudentsByFaculty(faculty: Faculty): Student[] {
    return this.students.filter(s => s.faculty === faculty);
  }

  // Отримує список оцінок студента
  getStudentGrades(studentId: number): Grade[] {
    return this.grades.filter(g => g.studentId === studentId);
  }

  // Отримує доступні курси за факультетом і семестром
  getAvailableCourses(faculty: Faculty, semester: Semester): Course[] {
    return this.courses.filter(c => c.faculty === faculty && c.semester === semester);
  }

  // Обчислює середній бал студента
  calculateAverageGrade(studentId: number): number {
    const studentGrades = this.grades.filter(g => g.studentId === studentId);

    if (studentGrades.length === 0) {
      return 0;
    }

    const total = studentGrades.reduce((sum, g) => sum + g.grade, 0);
    return total / studentGrades.length;
  }

  // Отримує список відмінників факультету
  getFacultyTopStudents(faculty: Faculty): Student[] {
    const studentsByFaculty = this.getStudentsByFaculty(faculty);

    return studentsByFaculty.filter(student => {
      const avgGrade = this.calculateAverageGrade(student.id);
      return avgGrade >= GradeValue.Excellent;
    });
  }
}

// Приклад використання
const ums = new UniversityManagementSystem();

// Реєстрація студента
const student1 = ums.enrollStudent({
  fullName: "John Doe",
  faculty: Faculty.Computer_Science,
  year: 1,
  status: StudentStatus.Active,
  enrollmentDate: new Date(),
  groupNumber: "CS-101",
});

// Додавання курсу
const course1: Course = {
  id: 1,
  name: "Introduction to Programming",
  type: CourseType.Mandatory,
  credits: 3,
  semester: Semester.First,
  faculty: Faculty.Computer_Science,
  maxStudents: 30,
};

ums['courses'].push(course1); // Додаємо курс напряму в масив

// Реєстрація студента на курс
ums.registerForCourse(student1.id, course1.id);

// Встановлення оцінки
ums.setGrade(student1.id, course1.id, GradeValue.Excellent);

// Виведення середнього бала студента
console.log("Average grade:", ums.calculateAverageGrade(student1.id));

// Виведення всіх студентів факультету
console.log("Students by faculty:", ums.getStudentsByFaculty(Faculty.Computer_Science));
