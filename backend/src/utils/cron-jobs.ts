import cron from 'node-cron';
import mongoose from 'mongoose';
import { Employee } from '../models/employee.model';
import { Assessment, AssessmentData } from '../models/assessment.model';

// Create assessments function
export const createAssessments = async () => {
    const employees = await Employee.find({ role: "admin" });
    console.log(employees);

    await Assessment.deleteMany();
    await AssessmentData.deleteMany();

    if (employees.length === 0) {
        console.log("No employees found to create assessments.");
        return;
    }

    const currentDate = new Date();
    const endDate = new Date(currentDate);
    endDate.setMonth(currentDate.getMonth() + 6);  // Set the end date 6 months from the current date

    const assessmentPromises = employees.map(async (employee) => {
        const assessmentName = `${currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;

        console.log(assessmentName);

        // Create self-assessment and manager-assessment data
        const [selfAssessmentData, managerAssessmentData] = await Promise.all([
            new AssessmentData({ answer1: null, answer2: null, answer3: null, answer4: null, isSubmitted: false }).save(),
            new AssessmentData({ answer1: null, answer2: null, answer3: null, answer4: null, isSubmitted: false }).save()
        ]);

        // Create the assessment
        const assessment = new Assessment({
            employee: employee._id,
            name: assessmentName,
            selfAssessment: selfAssessmentData._id,
            managerAssessment: managerAssessmentData._id,
            isCompleted: false,
        });

        await assessment.save();
        console.log(`Created assessment for employee: ${employee.name}`);
    });

    await Promise.all(assessmentPromises);
};

// Schedule the task to run every 6 months (at the start of January and July)
cron.schedule('0 0 1 1,7 *', async () => {  // At 00:00 on January 1st and July 1st
    console.log('Running scheduled assessments creation for every 6 months...');
    try {
        // await createAssessments();
    } catch (error) {
        console.error('Error creating assessments:', error);
    }
});

export default createAssessments;
