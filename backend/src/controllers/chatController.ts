import { getDatabase } from '../middleware/database.js';

export const processQuery = async (req: any, res: any) => {
  try {
    const { query } = req.body;
    const lowQuery = (query || '').toLowerCase().trim();
    
    let reply = "Hello! I am your College Timetable and Study Planning Assistant. Ask me about your class schedule, free slots, upcoming assignments, exam countdowns, or personalized study plans.";
    let data = null;

    // 1. Timetable / Classes Queries
    if (lowQuery.includes('class') || lowQuery.includes('timetable') || lowQuery.includes('lecture') || lowQuery.includes('lab') || lowQuery.includes('schedule')) {
      const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      const targetDay = days.find(d => lowQuery.includes(d));

      const scheduleData: Record<string, string> = {
        'monday': "Today's Schedule (Monday):\n1. 09:00 AM - 10:30 AM: Data Structures & Algorithms @ LH 302 (Dr. Saranya K G)\n2. 10:45 AM - 12:15 PM: Discrete Maths & Graph Theory @ LH 101 (Dr. Prasanna)\n3. 01:15 PM - 02:45 PM: Operating Systems @ LH 201 (Prof. Niruban T S)\n4. 03:00 PM - 05:00 PM: DBMS Lab @ Systems Lab 4 (Dr. Agashraj)\n💡 Free study window: 12:15 PM - 01:15 PM (Lunch & Quick Review).",
        'tuesday': "Tuesday Schedule:\n1. 09:00 AM - 10:30 AM: Computer Networks @ LH 102 (Dr. Niruban T S)\n2. 10:45 AM - 12:15 PM: Open Elective (Environmental Studies) @ LH 105 (Prof. Karthick)\n3. 01:15 PM - 02:45 PM: Theory of Computation @ LH 204 (Dr. Dhanush M)\n💡 Free study window: 03:00 PM - 05:00 PM (Great for assignment work).",
        'wednesday': "Wednesday Schedule:\n1. 09:00 AM - 10:30 AM: Data Structures & Algorithms @ LH 302\n2. 10:45 AM - 12:45 PM: Software Engineering & Agile Lab @ Lab 2\n3. 02:00 PM - 03:30 PM: Discrete Maths Tutorial @ LH 101.",
        'thursday': "Thursday Schedule:\n1. 09:00 AM - 10:30 AM: Operating Systems Principles @ LH 201\n2. 10:45 AM - 12:15 PM: Computer Networks & Security @ LH 102\n3. 01:15 PM - 02:45 PM: AI & Expert Systems @ LH 305.",
        'friday': "Friday Schedule:\n1. 09:00 AM - 10:30 AM: Theory of Computation @ LH 204\n2. 10:45 AM - 12:45 PM: Database Design & SQL Practice @ Lab 2\n3. 02:00 PM - 03:30 PM: Ethics & Professional Values @ LH 101.",
        'saturday': "Saturday Schedule:\n1. 09:30 AM - 11:30 AM: Mini Project Milestone Review @ Project Hub\n2. 11:45 AM - 01:00 PM: Technical Seminar & Paper Pitch @ Seminar Hall 1."
      };

      if (targetDay) {
        reply = scheduleData[targetDay];
      } else {
        reply = scheduleData['monday'];
      }
    }

    // 2. Free Slots Queries
    else if (lowQuery.includes('free') || lowQuery.includes('gap') || lowQuery.includes('break')) {
      reply = "Your Free Timetable Slots for Today (Monday):\n• 12:15 PM - 01:15 PM (60 min break after Discrete Maths)\n• 02:45 PM - 03:00 PM (15 min transition before DBMS Lab)\n• 05:00 PM onwards (Evening dedicated study block)\n\nRecommended: Use the 12:15 PM slot for quick review of Dijkstra's algorithm before your next class.";
    }

    // 3. Study Plan Queries
    else if (lowQuery.includes('study plan') || lowQuery.includes('plan') || lowQuery.includes('revision') || lowQuery.includes('prepare')) {
      reply = "Here is your Personalized Study Plan for Today (Monday):\n\n🎯 Session 1 (05:30 PM - 07:00 PM | 90m): Data Structures - Binary Search Trees & Red-Black Tree Balancing [Priority: High]\n🎯 Session 2 (07:30 PM - 09:00 PM | 90m): Operating Systems - Banker's Algorithm & Deadlock Avoidance [Priority: High]\n🎯 Session 3 (09:15 PM - 10:00 PM | 45m): DBMS Lab Record write-up for Experiment 6\n\nTotal planned study time: 3.75 hours with adequate rest breaks.";
    }

    // 4. Assignments & Homework Queries
    else if (lowQuery.includes('assignment') || lowQuery.includes('task') || lowQuery.includes('due') || lowQuery.includes('pending') || lowQuery.includes('homework')) {
      reply = "You have 3 active college assignments:\n1. 🚨 Graph Traversal in C++ (Data Structures) — Due Tomorrow, 11:59 PM [Status: In Progress]\n2. ⚠️ CPU Scheduling Simulation (OS) — Due in 3 days [Status: Pending]\n3. 📘 PL/SQL Triggers Lab Record (DBMS) — Due Friday, 05:00 PM [Status: Pending]\n\nTip: Finish the Graph Traversal assignment tonight during your 05:30 PM study session.";
    }

    // 5. Exam Queries
    else if (lowQuery.includes('exam') || lowQuery.includes('cia') || lowQuery.includes('test') || lowQuery.includes('semester')) {
      reply = "Upcoming Semester Exam Schedule:\n• CS501 Data Structures & Algorithms — Nov 02 (14 days left)\n• CS502 Operating Systems Principles — Nov 05 (17 days left)\n• MA501 Discrete Mathematics — Nov 09 (21 days left)\n• CS505 Theory of Computation — Nov 12 (24 days left)\n• CS504 Computer Networks — Nov 16 (28 days left)\n\nSyllabus revision status: 4 of 5 units completed for Data Structures.";
    }

    // 6. Attendance Queries
    else if (lowQuery.includes('attendance') || lowQuery.includes('shortage') || lowQuery.includes('percentage')) {
      reply = "Your Subject Attendance Summary:\n• Data Structures: 92% (Safe)\n• DBMS Lab: 96% (Safe)\n• Discrete Maths: 88% (Safe)\n• Operating Systems: 85% (Safe)\n• Theory of Computation: 78% (⚠️ Close to 75% limit — do not miss Friday's lecture)\n\nOverall Attendance: 87.8% (Eligible for all exams).";
    }

    // 7. General / Help
    else {
      reply = `Hi Ram! I can help you with:\n1. Timetable: "What are my classes today?" or "Show Wednesday schedule"\n2. Study Planning: "Generate study plan for tonight" or "When is my free slot?"\n3. Assignments: "List pending assignments"\n4. Exams: "Show exam countdown and revision targets"\n5. Attendance: "Check my subject attendance"`;
    }

    res.json({ success: true, reply, data });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
