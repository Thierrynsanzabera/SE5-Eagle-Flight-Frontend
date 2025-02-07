export function generateTemplate3HTML(resumeData) {
    return `
        <div style="font-family: Times, serif; width: 800px; padding: 20px; background: white; border: 1px solid #ddd;">
            <h1 style="font-size: 20px; font-weight: bold; text-align: center;">
                ${resumeData.firstName || "First Name"} ${resumeData.lastName || "Last Name"}
            </h1>
            <p style="font-size: 10px; text-align: center; margin-top: 5px;">
                ${resumeData.city || "City"}, ${resumeData.state || "State"} | 
                ${resumeData.phoneNumber || "(555) 555-5555"} | 
                ${resumeData.email || "email@example.com"} | 
                ${resumeData.website || "LinkedIn Url / Website Url (optional)"}
            </p>
            <hr style="margin-top: 5px; border-top: 1px solid #000;"/>

            <p style="font-size: 12px; margin-top: 10px;">
                ${resumeData.professionalSummary ||
                    "Analytic-focused data professional with 2+ years’ experience developing computational models and executing statistical projects to drive insights. Demonstrated ability to translate complex datasets into actionable information and support overarching research initiatives."}
            </p>

            <h2 style="font-size: 14px; font-weight: bold; margin-top: 20px;">EDUCATION</h2>
            <hr style="border-top: 1px solid #000;"/>
            <p style="font-size: 12px; font-weight: bold; margin-top: 5px;">
                ${resumeData.universityName || "Oklahoma Christian University"}
                <span style="font-weight: normal;">, ${resumeData.universityCity || "City"}, ${resumeData.universityState || "State"}</span>
            </p>
            <p style="font-size: 12px; margin-top: 5px;">
                ${resumeData.universityEnd || "Projected May, 20xx"}
                <span style="float: right;">GPA: ${resumeData.gpa || "3.xx/4.x"}</span>
            </p>
            <p style="font-size: 12px; margin-top: 5px;">
                ${resumeData.degree || "Bachelor of Science in Computer Engineering"}
            </p>

            <h2 style="font-size: 14px; font-weight: bold; margin-top: 20px;">EXPERIENCE</h2>
            <hr style="border-top: 1px solid #000;"/>
            <p style="font-size: 12px; font-weight: bold; margin-top: 5px;">
                ${resumeData.companyName || "Oklahoma Christian University"}
                <span style="font-weight: normal;">, ${resumeData.companyCity || "City"}, ${resumeData.companyState || "State"}</span>
            </p>
            <p style="font-size: 12px; margin-top: 5px;">
                ${resumeData.companyStart || "August, 20xx"} – ${resumeData.companyEnd || "Present"}
                <span style="float: right;">${resumeData.jobTitle || "Job Title"}</span>
            </p>

            <ul style="font-size: 12px; margin-top: 5px; padding-left: 20px;">
                <li>${resumeData.workBullet1 || "Collaborated with cross-functional team of computer, electrical, and mechanical engineers to define and prioritize data science projects, driving $1.5M NIST-funded research in multimedia storage systems"}</li>
                <li>${resumeData.workBullet2 || "Conducted exploratory data analysis (EDA) on large datasets using Python and SQL, identifying key trends and patterns to inform research focused on multimedia bit rate conversion"}</li>
                <li>${resumeData.workBullet3 || "Conducted statistical analysis of experimental results to evaluate the effectiveness of algorithms and models"}</li>
                <li>${resumeData.workBullet4 || "Developed software tools and libraries in Python to facilitate data analysis, visualization, and modeling"}</li>
                <li>${resumeData.workBullet5 || "Presented weekly research updates with Tableau dashboards and made recommendations to primary investigator on study direction"}</li>
            </ul>

            <h2 style="font-size: 14px; font-weight: bold; margin-top: 20px;">PROJECTS</h2>
            <hr style="border-top: 1px solid #000;"/>
            <p style="font-size: 12px; font-weight: bold; margin-top: 5px;">
                ${resumeData.projectInstitution || "Oklahoma Christian University"}
                <span style="font-weight: normal;">, ${resumeData.projectCity || "City"}, ${resumeData.projectState || "State"}</span>
            </p>
            <p style="font-size: 12px; margin-top: 5px;">
                ${resumeData.projectStart || "June, 20xx"} – ${resumeData.projectEnd || "August, 20xx"}
                <span style="float: right;">${resumeData.projectTitle || "Undergraduate Researcher for the Computer Science Lab"}</span>
            </p>

            <ul style="font-size: 12px; margin-top: 5px; padding-left: 20px;">
                <li>${resumeData.projectBullet1 || "Used SQL to extract and manipulate data from relational databases for $250K funding"}</li>
                <li>${resumeData.projectBullet2 || "Maintained and updated existing data pipelines and extract, transform, and load (ETL) workflows to ensure data integrity and reliability"}</li>
                <li>${resumeData.projectBullet3 || "Implemented data cleaning and preprocessing from raw Excel data to transfer into Stata for further analyses"}</li>
            </ul>

            <h2 style="font-size: 14px; font-weight: bold; margin-top: 20px;">SKILLS</h2>
            <hr style="border-top: 1px solid #000;"/>
            <p style="font-size: 12px; margin-top: 5px;">
                ${resumeData.skills || "Simple Linear Regression | Multivariate Linear Regression | Statistical Modeling | Data Integrity | Parametric Tests | Nonparametric Tests | Sampling Methods | Natural Language Processing (NLP) Tableau | R | VBA | Excel | Python | SQL | Java"}
            </p>
        </div>
    `;
}