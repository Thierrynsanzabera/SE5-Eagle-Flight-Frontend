export function generateTemplate4HTML(resumeData) {
    return `
        <div style="font-family: Times, serif; padding: 20px; max-width: 800px; margin: auto;">
            <h2 style="text-align: center; font-weight: bold; font-size: 24px;">
                ${resumeData.firstName || "First Name"} ${resumeData.lastName || "Last Name"}
            </h2>
            <p style="text-align: center; font-size: 12px;">
                ${resumeData.city || "City"}, ${resumeData.state || "State"} | 
                ${resumeData.phoneNumber || "Phone Number"} | 
                ${resumeData.email || "Email Address"} | 
                ${resumeData.website || "LinkedIn or Website URL"}
            </p>

            <h3 style="font-size: 16px; font-weight: bold; margin-top: 20px;">OBJECTIVE</h3>
            <p style="font-size: 12px;">
                ${resumeData.objective || "Recent graduate with a degree in marketing seeking an entry-level position in digital marketing. Experienced in creating social media campaigns and analyzing data to drive engagement and sales."}
            </p>

            <h3 style="font-size: 16px; font-weight: bold; margin-top: 20px;">EDUCATION</h3>
            <p style="font-size: 12px; font-weight: bold;">
                ${resumeData.universityName || "Oklahoma Christian University"}, ${resumeData.universityCity || "City"}, ${resumeData.universityState || "State"}
            </p>
            <p style="font-size: 12px;">
                ${resumeData.startDate || "Start Month, Year"} - ${resumeData.endDate || "Projected Month, Year"}<br>
                Bachelor of ${resumeData.degree || "Arts/Science in XX"}<br>
                Minor(s): ${resumeData.minor || "(if applicable)"}<br>
                Major GPR: ${resumeData.majorGPR || "#.##"}; Cumulative GPR: ${resumeData.cumulativeGPR || "#.##"}<br>
                Coursework: ${resumeData.coursework || "(optional, only list if specifically requested)"}
            </p>

            <h3 style="font-size: 16px; font-weight: bold; margin-top: 20px;">LEADERSHIP (or WORK EXPERIENCE, ACTIVITIES, VOLUNTEER WORK)</h3>
            <div style="margin-left: 20px;">
                <p style="font-size: 12px; font-weight: bold;">
                    ${resumeData.leadershipOrg || "Organization Name"}<br>
                    ${resumeData.positionTitle || "Position Title"}
                </p>
                <p style="font-size: 12px;">
                    ${resumeData.startDateLeadership || "Month Year"} - ${resumeData.endDateLeadership || "Month Year"}
                </p>
                <ul style="font-size: 12px;">
                    <li>${resumeData.leadershipBullet1 || "Action Verb, followed by description of most relevant or important duties and accomplishments"}</li>
                    <li>${resumeData.leadershipBullet2 || "Action Verb, followed by description of most relevant or important duties and accomplishments"}</li>
                </ul>
            </div>

            <h3 style="font-size: 16px; font-weight: bold; margin-top: 20px;">WORK EXPERIENCE (or LEADERSHIP, ACTIVITIES, VOLUNTEER WORK)</h3>
            <div style="margin-left: 20px;">
                <p style="font-size: 12px; font-weight: bold;">
                    ${resumeData.companyName || "Company Name"}, ${resumeData.companyCity || "City"}, ${resumeData.companyState || "State"}
                </p>
                <p style="font-size: 12px;">
                    ${resumeData.companyStart || "Month Year"} - ${resumeData.companyEnd || "Month Year"}<br>
                    ${resumeData.jobTitle || "Job Title"}
                </p>
                <ul style="font-size: 12px;">
                    <li>${resumeData.workBullet1 || "Action Verb, followed by description of most relevant or important duties and accomplishments"}</li>
                    <li>${resumeData.workBullet2 || "Action Verb, followed by description of most relevant or important duties and accomplishments"}</li>
                </ul>
            </div>

            <h3 style="font-size: 16px; font-weight: bold; margin-top: 20px;">HONORS (and/or AWARDS)</h3>
            <p style="font-size: 12px; font-weight: bold;">
                ${resumeData.honorTitle || "Honor/Award/Organization"}<br>
                ${resumeData.honorDate || "Month Year - Month Year"}
            </p>
            <p style="font-size: 12px;">
                ${resumeData.honorDescription || "Action Verb, followed by criteria for selection or explanation of involvement"}
            </p>

            <h3 style="font-size: 16px; font-weight: bold; margin-top: 20px;">SKILLS</h3>
            <p style="font-size: 12px;">
                ${resumeData.skills || "List language skills and declare fluency (if applicable) | List relevant computer skills"}
            </p>
        </div>
    `;
}