const StudentDb = require('../../Model/Student/studentSchema.js');
const ApplicationDb = require('../../Model/Application/applicationSchema.js');
const sendMail = require('../utils/mailer');

export const createStudentFromApplication = async (req, res) => {
  const app = await ApplicationDb.findById(req.params.applicationId).populate('enquiryId');

  if (!app || app.status !== 'approved') {
    return res.status(400).json({ error: 'Application not approved or not found' });
  }

  const existing = await StudentDb.findOne({ enquiryId: app.enquiryId._id });
  if (existing) {
    return res.status(409).json({ message: 'Student already created' });
  }

  const student = new StudentDb({
    name: app.enquiryId.name,
    email: app.enquiryId.email,
    phone: app.enquiryId.phone,
    course: app.course,
    enquiryId: app.enquiryId._id
  });

  await student.save();

  await sendMail(student.email, 'Welcome Onboard', `Hi ${student.name}, welcome to our course: ${student.course}`);

  res.status(201).json(student);
};


