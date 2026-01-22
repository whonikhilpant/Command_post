const mongoose = require('mongoose');
const Notification = require('./models/Notification');
require('dotenv').config();

const notifications = [
  {
    title: "CDS I 2024 Notification Released",
    type: "CDS",
    category: "exam_notification",
    message: "Union Public Service Commission (UPSC) has released the notification for Combined Defence Services Examination (I), 2024.",
    priority: "high",
    examDate: "2024-04-21",
    lastDateToApply: "2024-01-09",
    link: "https://upsc.gov.in",
  },
  // ... feel free to add more sample data
];

const seedNotifications = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    await Notification.deleteMany({});
    await Notification.insertMany(notifications);
    console.log('Database seeded!');
    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

seedNotifications();