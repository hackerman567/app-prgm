import React from 'react';

export type Theme = 'cyber' | 'royal';

export interface NavItem {
  label: string;
  href: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  roll_no: string;
  dept: string;
  batch: string;
  semester: string;
  cgpa: number;
}

export interface TimetableClass {
  id: string;
  subjectCode: string;
  subjectName: string;
  faculty: string;
  room: string;
  time: string;
  day: string;
  type: 'Lecture' | 'Lab' | 'Tutorial';
  credits: number;
  attendance: number; // percentage
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'Completed' | 'In Progress';
  description: string;
  type: 'Assignment' | 'Lab Record' | 'Project' | 'Seminar';
}

export interface StudySession {
  id: string;
  subject: string;
  topic: string;
  timeSlot: string;
  day: string;
  durationMinutes: number;
  type: 'Deep Focus' | 'Problem Solving' | 'Quick Review' | 'Lab Prep';
  completed: boolean;
}

export interface ExamInfo {
  subjectCode: string;
  subjectName: string;
  examDate: string;
  time: string;
  daysRemaining: number;
  syllabusUnits: number;
  revisedUnits: number;
}
