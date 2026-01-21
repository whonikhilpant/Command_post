// Mock notifications data for defence exams

export const mockNotifications = [
  {
    id: 1,
    title: "CDS I 2024 Notification Released",
    type: "CDS",
    category: "exam_notification",
    message: "Union Public Service Commission (UPSC) has released the notification for Combined Defence Services Examination (I), 2024. Last date to apply: 9th January 2024.",
    date: "2024-01-02",
    priority: "high",
    examDate: "2024-04-21",
    lastDateToApply: "2024-01-09",
    link: "https://upsc.gov.in",
    isRead: false
  },
  {
    id: 2,
    title: "NDA II 2024 Application Form Available",
    type: "NDA",
    category: "application_open",
    message: "Online applications are now open for NDA II 2024 examination. Candidates can apply till 16th January 2024. Exam scheduled for 14th April 2024.",
    date: "2024-01-05",
    priority: "high",
    examDate: "2024-04-14",
    lastDateToApply: "2024-01-16",
    link: "https://upsc.gov.in",
    isRead: false
  },
  {
    id: 3,
    title: "AFCAT 2/2024 Registration Started",
    type: "AFCAT",
    category: "application_open",
    message: "Indian Air Force has commenced online registration for AFCAT 2/2024. Apply before 30th January 2024. Examination will be conducted on 23rd March 2024.",
    date: "2024-01-10",
    priority: "high",
    examDate: "2024-03-23",
    lastDateToApply: "2024-01-30",
    link: "https://afcat.cdac.in",
    isRead: false
  },
  {
    id: 4,
    title: "CAPF AC 2024 Admit Card Released",
    type: "CAPF",
    category: "admit_card",
    message: "UPSC has released the admit cards for CAPF Assistant Commandant Examination 2024. Download from official website using registration ID.",
    date: "2024-01-12",
    priority: "high",
    examDate: "2024-02-18",
    lastDateToApply: null,
    link: "https://upsc.gov.in",
    isRead: false
  },
  {
    id: 5,
    title: "CDS II 2024 Written Results Declared",
    type: "CDS",
    category: "result",
    message: "Results for CDS II 2023 written examination have been declared. Qualified candidates can check SSB interview dates on the official website.",
    date: "2024-01-08",
    priority: "medium",
    examDate: null,
    lastDateToApply: null,
    link: "https://upsc.gov.in",
    isRead: true
  },
  {
    id: 6,
    title: "NDA I 2024 SSB Interview Schedule",
    type: "NDA",
    category: "interview_schedule",
    message: "SSB interview dates for NDA I 2024 qualified candidates have been announced. Interviews will commence from 15th February 2024.",
    date: "2024-01-14",
    priority: "high",
    examDate: "2024-02-15",
    lastDateToApply: null,
    link: "https://joinindianarmy.nic.in",
    isRead: false
  },
  {
    id: 7,
    title: "AFCAT 1/2024 Final Merit List Published",
    type: "AFCAT",
    category: "result",
    message: "Indian Air Force has published the final merit list for AFCAT 1/2024. Selected candidates will receive call letters for medical examination.",
    date: "2024-01-06",
    priority: "medium",
    examDate: null,
    lastDateToApply: null,
    link: "https://afcat.cdac.in",
    isRead: true
  },
  {
    id: 8,
    title: "CAPF AC 2024 Physical Efficiency Test Notice",
    type: "CAPF",
    category: "exam_notification",
    message: "Notice regarding Physical Efficiency Test (PET) for CAPF Assistant Commandant 2024 has been released. PET will be conducted at designated centers.",
    date: "2024-01-15",
    priority: "medium",
    examDate: "2024-03-10",
    lastDateToApply: null,
    link: "https://upsc.gov.in",
    isRead: false
  },
  {
    id: 9,
    title: "SSB Interview Guidelines Updated for 2024",
    type: "SSB",
    category: "guideline_update",
    message: "Services Selection Board has updated the interview guidelines and selection procedure for 2024. Candidates are advised to check the official notification.",
    date: "2024-01-11",
    priority: "medium",
    examDate: null,
    lastDateToApply: null,
    link: "https://ssb.gov.in",
    isRead: false
  },
  {
    id: 10,
    title: "CDS I 2024 Eligibility Criteria Revised",
    type: "CDS",
    category: "guideline_update",
    message: "UPSC has revised certain eligibility criteria for CDS I 2024. Please review the official notification carefully before applying.",
    date: "2024-01-03",
    priority: "high",
    examDate: null,
    lastDateToApply: null,
    link: "https://upsc.gov.in",
    isRead: true
  }
];

// Get notifications by exam type
export const getNotificationsByExam = (examType) => {
  if (!examType || examType === 'All') return mockNotifications;
  return mockNotifications.filter(notification => notification.type === examType);
};

// Get unread notifications count
export const getUnreadCount = () => {
  return mockNotifications.filter(n => !n.isRead).length;
};

// Get notifications by category
export const getNotificationsByCategory = (category) => {
  if (!category || category === 'All') return mockNotifications;
  return mockNotifications.filter(notification => notification.category === category);
};

// Get priority notifications
export const getPriorityNotifications = () => {
  return mockNotifications.filter(n => n.priority === 'high');
};