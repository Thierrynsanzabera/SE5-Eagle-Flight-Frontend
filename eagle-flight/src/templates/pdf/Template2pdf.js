export function generateTemplate2(doc, resumeData) {
    // width and height in mm for letter-type document.
    const TOTAL_WIDTH = 216;
    const TOTAL_HEIGHT = 279.4;
    const DEFAULT_MARGIN = 25.4; // 1 inch margin, default for our resume
    const PARAGRAPH_SPACING = 0.15; // multiplied by font size, will give the spacing to next line
    let font_height;

    let currentY = DEFAULT_MARGIN; // Start Y position

    // Title - Full Name
    doc.setFontSize(18);
    doc.setFont("arial", "bold");
    font_height = 6.35;
    currentY += font_height;
    doc.text(`${resumeData.fName} ${resumeData.lName}`, DEFAULT_MARGIN, currentY);
    currentY += font_height * PARAGRAPH_SPACING;

    // Contact Information
    doc.setFontSize(11);
    doc.setFont("times", "normal");
    font_height = 3.88;
    currentY += font_height;
    doc.text(
        `${resumeData.city}, ${resumeData.state} | ${resumeData.phoneNumber} | ${resumeData.email} ${resumeData.linkedInUrl ? "| " + resumeData.linkedInUrl : ""}`,
        DEFAULT_MARGIN,
        currentY
    );
    currentY += font_height * PARAGRAPH_SPACING;

    // in the original template, there was an empty line here
    currentY += font_height + font_height * PARAGRAPH_SPACING;

    // Professional Summary
    doc.setFontSize(11);
    doc.setFont("arial", "bold");
    currentY += font_height;
    doc.text("PROFESSIONAL SUMMARY", DEFAULT_MARGIN, currentY);

    currentY += font_height; // Adjust based on what I see on the template

    doc.setFont("times", "normal");
    const summary_text = resumeData.summary
    const lines = doc.splitTextToSize(summary_text, TOTAL_WIDTH - 2 * DEFAULT_MARGIN);
    const lineHeight = 3.88 * 1.5;  // Font height (11pt) multiplied by the lineHeightFactor (1.5)
    const totalHeight = lines.length * lineHeight;
    doc.text(lines, DEFAULT_MARGIN, currentY, { maxWidth: TOTAL_WIDTH - 2 * DEFAULT_MARGIN, lineHeightFactor: 1.5 });
    currentY += totalHeight;

    // in the original template, there was an empty line here
    currentY += font_height + font_height * PARAGRAPH_SPACING;

    // Education Section
    doc.setFont("times", "bold");
    doc.text("EDUCATION", DEFAULT_MARGIN, currentY);

    currentY += font_height;

    // start of sections that will make use of this map
    const monthMap = {
        "01": "January",
        "02": "February",
        "03": "March",
        "04": "April",
        "05": "May",
        "06": "June",
        "07": "July",
        "08": "August",
        "09": "September",
        "10": "October",
        "11": "November",
        "12": "December"
    };
    resumeData.educations.forEach((education) => {
        // institutionName dates
        let startYear = education.startDate.split("-")[0];
        let startMonth = monthMap[education.startDate.split("-")[1]];
        let endYear = education.endDate.split("-")[0];
        let endMonth = monthMap[education.endDate.split("-")[1]];
        let combined = `${startMonth} ${startYear} - ${endMonth}, ${endYear}`;
        
        doc.setFont("times", "bold");
        let institutionName = education.institutionName;
        doc.text(`${institutionName}`, DEFAULT_MARGIN, currentY);
        doc.setFont("times", "normal");
        doc.text(`| ${combined}`, DEFAULT_MARGIN + doc.getTextWidth(institutionName) + 5, currentY);

        currentY += font_height + font_height * PARAGRAPH_SPACING;

        // bachalorName
        doc.setFont("times", "bolditalic");
        doc.text(`${education.bachalorName}`, DEFAULT_MARGIN, currentY);
        currentY += font_height + font_height * PARAGRAPH_SPACING;

        doc.setFont("times", "normal");
        doc.text(`GPA: ${education.gpa}`, DEFAULT_MARGIN, currentY);
        currentY += font_height + font_height * PARAGRAPH_SPACING + 2;
    });
    // still no Accounting, Awards and Coursework

    // in the original template, there was an empty line here
    currentY += font_height + font_height * PARAGRAPH_SPACING;

    // Experience
    doc.setFont("times", "bold");
    doc.text("EXPERIENCE", DEFAULT_MARGIN, currentY);

    currentY += font_height;

    resumeData.experiences.forEach((experience) => {

        let startYear = experience.startDate.split("-")[0];
        let startMonth = experience.startDate.split("-")[1];
        let endYear = experience.endDate.split("-")[0];
        let endMonth = experience.endDate.split("-")[1];
        let combined = `${startMonth}/${startYear} - ${endMonth}/${endYear}`;

        // employer, title, city, state
        doc.setFont("times", "bold");
        let employerName = experience.companyName + ", "
        let jobTitle = experience.jobRole + ", "
        doc.text(employerName, DEFAULT_MARGIN, currentY);
        doc.setFont("times", "italic");
        doc.text(jobTitle, DEFAULT_MARGIN + doc.getTextWidth(employerName) + 3, currentY);
        doc.setFont("times", "normal");
        doc.text(` | ${combined}`, DEFAULT_MARGIN + doc.getTextWidth(employerName) + doc.getTextWidth(jobTitle) + 2, currentY);

        currentY += font_height + font_height * PARAGRAPH_SPACING;

        // list of accomplishments

        const accomplishment_text = experience.accomplishment;
        const lines = doc.splitTextToSize(accomplishment_text, TOTAL_WIDTH - 2 * DEFAULT_MARGIN);
        const lineHeight = 3.88 * 1.5;  // Font height (11pt) multiplied by the lineHeightFactor (1.5)
        const totalHeight = lines.length * lineHeight;
        lines.forEach((line, index) => {
            const bullet = "• ";
            doc.text(bullet + line, DEFAULT_MARGIN + 5, currentY + index * lineHeight);
        });
        currentY += totalHeight;
    });
    // NEED TO CHANGE HOW THE ACCOMPLISHMENTS WORK (WHEN I HAVE TIME)

    // in the original template, there was an empty line here
    currentY += font_height + font_height * PARAGRAPH_SPACING;

    currentY += font_height;

}
