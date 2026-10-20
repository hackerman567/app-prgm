import { UserProfile, TimetableClass, Assignment, StudySession, ExamInfo } from '../types';

export const CURRENT_STUDENT: UserProfile = {
  id: 'student-24z999',
  name: 'Ram Malhotra',
  email: 'ram.malhotra@college.edu',
  roll_no: '24Z999',
  dept: 'Computer Science and Engineering',
  batch: '2024-2028',
  semester: 'Semester 5',
  cgpa: 8.64
};

export const WEEKLY_TIMETABLE: TimetableClass[] = [
  // Monday
  { id: 'c-1', subjectCode: 'CS501', subjectName: 'Data Structures & Algorithms', faculty: 'Dr. Saranya K G', room: 'LH 302', time: '09:00 AM - 10:30 AM', day: 'Monday', type: 'Lecture', credits: 4, attendance: 92 },
  { id: 'c-2', subjectCode: 'MA501', subjectName: 'Discrete Maths & Graph Theory', faculty: 'Dr. Prasanna', room: 'LH 101', time: '10:45 AM - 12:15 PM', day: 'Monday', type: 'Lecture', credits: 4, attendance: 88 },
  { id: 'c-3', subjectCode: 'CS502', subjectName: 'Operating Systems Principles', faculty: 'Prof. Niruban T S', room: 'LH 201', time: '01:15 PM - 02:45 PM', day: 'Monday', type: 'Lecture', credits: 3, attendance: 85 },
  { id: 'c-4', subjectCode: 'CS503', subjectName: 'DBMS Lab Hands-on', faculty: 'Dr. Agashraj', room: 'Lab 4 (Systems Wing)', time: '03:00 PM - 05:00 PM', day: 'Monday', type: 'Lab', credits: 2, attendance: 96 },

  // Tuesday
  { id: 'c-5', subjectCode: 'CS504', subjectName: 'Computer Networks & Security', faculty: 'Dr. Niruban T S', room: 'LH 102', time: '09:00 AM - 10:30 AM', day: 'Tuesday', type: 'Lecture', credits: 3, attendance: 84 },
  { id: 'c-6', subjectCode: 'OE501', subjectName: 'Open Elective: Environmental Studies', faculty: 'Prof. Karthick T', room: 'LH 105', time: '10:45 AM - 12:15 PM', day: 'Tuesday', type: 'Lecture', credits: 3, attendance: 90 },
  { id: 'c-7', subjectCode: 'CS505', subjectName: 'Theory of Computation', faculty: 'Dr. Dhanush M', room: 'LH 204', time: '01:15 PM - 02:45 PM', day: 'Tuesday', type: 'Lecture', credits: 4, attendance: 78 },

  // Wednesday
  { id: 'c-8', subjectCode: 'CS501', subjectName: 'Data Structures & Algorithms', faculty: 'Dr. Saranya K G', room: 'LH 302', time: '09:00 AM - 10:30 AM', day: 'Wednesday', type: 'Lecture', credits: 4, attendance: 92 },
  { id: 'c-9', subjectCode: 'CS506', subjectName: 'Software Engineering & Agile Lab', faculty: 'Dr. Prasannakumar', room: 'Software Lab 2', time: '10:45 AM - 12:45 PM', day: 'Wednesday', type: 'Lab', credits: 2, attendance: 94 },
  { id: 'c-10', subjectCode: 'MA501', subjectName: 'Discrete Maths Tutorial', faculty: 'Dr. Prasanna', room: 'LH 101', time: '02:00 PM - 03:30 PM', day: 'Wednesday', type: 'Tutorial', credits: 1, attendance: 88 },

  // Thursday
  { id: 'c-11', subjectCode: 'CS502', subjectName: 'Operating Systems Principles', faculty: 'Prof. Niruban T S', room: 'LH 201', time: '09:00 AM - 10:30 AM', day: 'Thursday', type: 'Lecture', credits: 3, attendance: 85 },
  { id: 'c-12', subjectCode: 'CS504', subjectName: 'Computer Networks & Security', faculty: 'Dr. Niruban T S', room: 'LH 102', time: '10:45 AM - 12:15 PM', day: 'Thursday', type: 'Lecture', credits: 3, attendance: 84 },
  { id: 'c-13', subjectCode: 'CS507', subjectName: 'AI & Expert Systems Essentials', faculty: 'Prof. Prasanna', room: 'LH 305', time: '01:15 PM - 02:45 PM', day: 'Thursday', type: 'Lecture', credits: 3, attendance: 89 },

  // Friday
  { id: 'c-14', subjectCode: 'CS505', subjectName: 'Theory of Computation', faculty: 'Dr. Dhanush M', room: 'LH 204', time: '09:00 AM - 10:30 AM', day: 'Friday', type: 'Lecture', credits: 4, attendance: 78 },
  { id: 'c-15', subjectCode: 'CS508', subjectName: 'Database Design & SQL Practice', faculty: 'Dr. Karthick T', room: 'Lab 2', time: '10:45 AM - 12:45 PM', day: 'Friday', type: 'Lab', credits: 2, attendance: 95 },
  { id: 'c-16', subjectCode: 'HS501', subjectName: 'Ethics & Professional Values', faculty: 'Prof. Dhanush M', room: 'LH 101', time: '02:00 PM - 03:30 PM', day: 'Friday', type: 'Lecture', credits: 2, attendance: 91 },

  // Saturday
  { id: 'c-17', subjectCode: 'CS509', subjectName: 'Mini Project Milestone Review', faculty: 'Dept. Mentors Panel', room: 'Project Hub', time: '09:30 AM - 11:30 AM', day: 'Saturday', type: 'Lab', credits: 2, attendance: 100 },
  { id: 'c-18', subjectCode: 'CS510', subjectName: 'Technical Seminar & Paper Pitch', faculty: 'Head of Dept', room: 'Seminar Hall 1', time: '11:45 AM - 01:00 PM', day: 'Saturday', type: 'Tutorial', credits: 1, attendance: 92 }
];

export const STUDENT_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-1',
    title: 'Graph Traversal (BFS & DFS) in C++',
    subject: 'Data Structures & Algorithms',
    dueDate: 'Tomorrow, 11:59 PM',
    priority: 'High',
    status: 'In Progress',
    description: 'Implement adjacency lists, cycle detection, and shortest path using BFS.',
    type: 'Assignment'
  },
  {
    id: 'asg-2',
    title: 'CPU Scheduling Algorithms Simulation',
    subject: 'Operating Systems Principles',
    dueDate: 'In 3 Days',
    priority: 'High',
    status: 'Pending',
    description: 'Simulate Round-Robin vs SJF scheduling and compare turnaround times.',
    type: 'Assignment'
  },
  {
    id: 'asg-3',
    title: 'PL/SQL Triggers & Stored Procedures Record',
    subject: 'DBMS Lab Hands-on',
    dueDate: 'Friday, 05:00 PM',
    priority: 'Medium',
    status: 'Pending',
    description: 'Write up Experiment 6 with verified query outputs for faculty signature.',
    type: 'Lab Record'
  },
  {
    id: 'asg-4',
    title: 'DFA Minimization & Regular Expression Proofs',
    subject: 'Theory of Computation',
    dueDate: 'Next Monday',
    priority: 'Medium',
    status: 'Pending',
    description: 'Solve problem set 3 on Myhill-Nerode theorem and state reduction.',
    type: 'Assignment'
  },
  {
    id: 'asg-5',
    title: 'Packet Sniffing with Wireshark Lab Record',
    subject: 'Computer Networks & Security',
    dueDate: 'Completed',
    priority: 'Low',
    status: 'Completed',
    description: 'Analyze TCP three-way handshake and HTTP headers from pcap file.',
    type: 'Lab Record'
  }
];

export const STUDY_SESSIONS: StudySession[] = [
  { id: 'ss-1', subject: 'Data Structures', topic: 'Binary Search Trees & Red-Black Balancing', timeSlot: '05:30 PM - 07:00 PM', day: 'Monday', durationMinutes: 90, type: 'Deep Focus', completed: true },
  { id: 'ss-2', subject: 'Operating Systems', topic: 'Deadlock Avoidance (Banker\'s Algorithm)', timeSlot: '07:30 PM - 09:00 PM', day: 'Monday', durationMinutes: 90, type: 'Problem Solving', completed: false },
  { id: 'ss-3', subject: 'Discrete Maths', topic: 'Recurrence Relations & Generating Functions', timeSlot: '05:30 PM - 07:00 PM', day: 'Tuesday', durationMinutes: 90, type: 'Problem Solving', completed: false },
  { id: 'ss-4', subject: 'Theory of Computation', topic: 'Pumping Lemma for Regular Languages', timeSlot: '07:30 PM - 08:45 PM', day: 'Tuesday', durationMinutes: 75, type: 'Deep Focus', completed: false },
  { id: 'ss-5', subject: 'DBMS Lab Prep', topic: 'Complex Subqueries & Index Optimization', timeSlot: '05:30 PM - 07:00 PM', day: 'Wednesday', durationMinutes: 90, type: 'Lab Prep', completed: false },
  { id: 'ss-6', subject: 'Computer Networks', topic: 'Subnetting & CIDR Address Calculations', timeSlot: '05:30 PM - 07:00 PM', day: 'Thursday', durationMinutes: 90, type: 'Problem Solving', completed: false },
  { id: 'ss-7', subject: 'Mini Project Coding', topic: 'Sprint 3 API Integration & Testing', timeSlot: '03:00 PM - 06:00 PM', day: 'Saturday', durationMinutes: 180, type: 'Deep Focus', completed: false }
];

export const UPCOMING_EXAMS: ExamInfo[] = [
  { subjectCode: 'CS501', subjectName: 'Data Structures & Algorithms', examDate: 'Nov 02, 2026', time: '09:30 AM - 12:30 PM', daysRemaining: 14, syllabusUnits: 5, revisedUnits: 4 },
  { subjectCode: 'CS502', subjectName: 'Operating Systems Principles', examDate: 'Nov 05, 2026', time: '09:30 AM - 12:30 PM', daysRemaining: 17, syllabusUnits: 5, revisedUnits: 3 },
  { subjectCode: 'MA501', subjectName: 'Discrete Mathematics & Graph Theory', examDate: 'Nov 09, 2026', time: '09:30 AM - 12:30 PM', daysRemaining: 21, syllabusUnits: 5, revisedUnits: 3 },
  { subjectCode: 'CS505', subjectName: 'Theory of Computation', examDate: 'Nov 12, 2026', time: '09:30 AM - 12:30 PM', daysRemaining: 24, syllabusUnits: 5, revisedUnits: 2 },
  { subjectCode: 'CS504', subjectName: 'Computer Networks & Security', examDate: 'Nov 16, 2026', time: '09:30 AM - 12:30 PM', daysRemaining: 28, syllabusUnits: 5, revisedUnits: 2 }
];
