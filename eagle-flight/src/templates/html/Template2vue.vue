export function generateTemplate2HTML(resumeData) {
    return `
        <div style="font-family: Times, serif; width: 800px; padding: 20px; background: white; border: 1px solid #ddd;">
            <h1 style="font-size: 20px; font-weight: bold; margin-bottom: 5px;">
                ${resumeData.firstName || "First Name"} ${resumeData.lastName || "Last Name"}
            </h1>
            <p style="font-size: 10px; margin-top: 5px;">
                ${resumeData.city || "City"}, ${resumeData.state || "State"} | 
                ${resumeData.phoneNumber || "(555) 555-5555"} | 
                ${resumeData.email || "email@example.com"} | 
                ${resumeData.website || "LinkedIn/Website URL (optional)"}
            </p>
            
            <h2 style="font-size: 12px; font-weight: bold; margin-top: 20px; margin-bottom: 5px;">
                PROFESSIONAL SUMMARY (Optional)
            </h2>
            <p style="font-size: 12px; margin-top: 5px;">
                ${resumeData.professionalSummary ||
                    "Tells the reader the purpose of your resume in 3 (2-4 is okay) sentences • Should identify the kind of work you want to perform • If seeking an internship or co-op, include the time period when you are available to start. Example: Seeking a summer 2020 internship in Marketing or Public Relations."}
            </p>

            <h2 style="font-size: 12px; font-weight: bold; margin-top: 20px; margin-bottom: 5px;">
                EDUCATION
            </h2>
            <p style="font-size: 12px; font-weight: bold; margin-top: 5px;">
                ${resumeData.universityName || "University of Oklahoma"}
                <span style="font-weight: normal;"> | ${resumeData.universityStart || "August 2023"} - ${resumeData.universityEnd || "Projected May 2026"}</span>
            </p>
            <p style="font-size: 12px; font-style: italic; margin-top: 5px;">
                ${resumeData.degree || "Master of XX"}
            </p>
            <p style="font-size: 12px; margin-top: 5px;">
                GPA ${resumeData.gpa || "4.0"}
            </p>

            <h2 style="font-size: 12px; font-weight: bold; margin-top: 20px; margin-bottom: 5px;">
                EXPERIENCE
            </h2>
            <p style="font-size: 12px; font-weight: bold; margin-top: 5px;">
                ${resumeData.jobTitle || "Job Role"}
                <span style="font-weight: normal;">, ${resumeData.companyName || "Name of Company"} | ${resumeData.companyStart || "08/2022"} - ${resumeData.companyEnd || "Present"}</span>
            </p>
            <ul style="font-size: 12px; margin-top: 5px; padding-left: 20px;">
                <li>${resumeData.workBullet1 || "Accomplished {X} as measured by {Y}, by doing {Z}"}</li>
                <li>${resumeData.workBullet2 || "Action + Project/Problem = Results"}</li>
                <li>${resumeData.workBullet3 || "Three bullet points is sufficient for the most relevant position."}</li>
            </ul>
        </div>
    `;
}