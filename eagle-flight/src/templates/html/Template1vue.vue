<template>
    <div class="resume-template">
        <!-- Full Name -->
        <h1 class="center-align">{{ resumeData.firstName || "First Name" }} {{ resumeData.lastName || "Last Name" }}</h1>
        
        <!-- Contact Information -->
        <p class="center-align">
            {{ resumeData.city || "City" }}, {{ resumeData.state || "State" }} | 
            {{ resumeData.phoneNumber || "(555) 555-5555" }} | 
            {{ resumeData.email || "email@example.com" }} | 
            {{ resumeData.website || "LinkedIn/Website URL (optional)" }}
        </p>

        <!-- Professional Summary -->
        <section>
            <h2>PROFESSIONAL SUMMARY</h2>
            <hr />
            <p>{{ resumeData.professionalSummary || "Enter your professional summary here." }}</p>
        </section>

        <!-- Education Section -->
        <section>
            <h2>EDUCATION</h2>
            <hr />
            <p class="italic">{{ resumeData.universityName || "University Name" }}, {{ resumeData.universityCity || "City" }}, {{ resumeData.universityState || "State" }}</p>
            <p>{{ resumeData.universityStart || "Start Month, Year" }} - {{ resumeData.universityEnd || "Projected Month, Year" }}</p>
            <p>Bachelor of {{ resumeData.degree || "Arts/Science in X" }}</p>
            <p>GPA: {{ resumeData.gpa || "(optional)" }}</p>
            <p>Awards: {{ resumeData.awards || "(optional)" }}</p>
            <p>Coursework: {{ resumeData.coursework || "(optional, only list if specifically requested)" }}</p>
            <p class="italic">(Accounting add your 150 hours)</p>
        </section>

        <!-- Professional Experience -->
        <section>
            <h2>PROFESSIONAL EXPERIENCE</h2>
            <hr />
            <p class="italic">{{ resumeData.companyName || "Employer" }}, {{ resumeData.jobTitle || "Your Title" }}, {{ resumeData.companyCity || "City" }}, {{ resumeData.companyState || "State" }}</p>
            <p>{{ resumeData.companyStart || "Start Month, Year" }} - {{ resumeData.companyEnd || "End Month, Year" }}</p>
            <ul>
                <li>{{ resumeData.workBullet1 || "Accomplished {X} as measured by {Y}, by doing {Z}" }}</li>
                <li>{{ resumeData.workBullet2 || "Action + Project/Problem + Results = Accomplishment" }}</li>
                <li>{{ resumeData.workBullet3 || "Three bullet points is sufficient for the most relevant position." }}</li>
            </ul>
        </section>

        <!-- Skills and Other Sections -->
        <section>
            <h2>SKILLS | LEADERSHIP SKILLS | ACTIVITIES | EXTRACURRICULAR ACTIVITIES</h2>
            <hr />
            <p class="italic">Hard Skills / Computer Skills: {{ resumeData.skills || "(optional)" }}</p>
            <p class="italic">Language Skills: {{ resumeData.languageSkills || "(optional - include levels of proficiency)" }}</p>
        </section>
    </div>
</template>

<script>
export default {
    props: {
        resumeData: {
            type: Object,
            default: () => ({})
        }
    }
};
</script>

<style scoped>
* {
    color: black;
}

.resume-template {
    border: 1px solid #000;
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
    background-color: white;
}

.center-align {
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 10px;
}

h1 {
    font-size: 24px;
    margin-bottom: 10px;
}

h2 {
    font-size: 16px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 5px;
}

p {
    font-size: 14px;
    margin: 5px 0;
}

.italic {
    font-style: italic;
}

hr {
    border: 0.5px solid #000;
    width: 100%;
    margin: 5px 0;
}

ul {
    margin: 10px 0;
    padding-left: 20px;
}

ul li {
    font-size: 14px;
    margin-bottom: 5px;
}
</style>