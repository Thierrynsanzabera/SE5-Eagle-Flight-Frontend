import html2canvas from 'html2canvas';
import { generateTemplate1HTML } from '../templates/html/Template1vue.vue';
import { generateTemplate2HTML } from '../templates/html/Template2vue.vue';
import { generateTemplate3HTML } from '../templates/html/Template3vue.vue';
import { generateTemplate4HTML } from '../templates/html/Template4vue.vue';

/**
 * Generate a preview of the resume as an HTML image.
 * @param {Object} resumeData - The data to populate the resume.
 * @param {String} templateId - The selected template ID (e.g., 'T1', 'T2').
 * @returns {Promise<String>} - A promise that resolves to a base64 image string.
 */
export async function generateHTMLPreview(resumeData, templateId) {
    // Create a temporary div element for the preview content
    const previewContainer = document.createElement('div');
    previewContainer.style.width = '800px'; // Set width for preview
    previewContainer.style.padding = '20px';
    previewContainer.style.background = 'white';
    previewContainer.style.border = '1px solid #ddd';
    previewContainer.style.position = 'absolute';
    previewContainer.style.top = '-10000px'; // Hide off-screen

    // Populate the HTML content based on the template and data
    switch (templateId) {
        case "T1":
            previewContainer.innerHTML = generateTemplate1HTML(resumeData);
            break;
        case "T2":
            previewContainer.innerHTML = generateTemplate2HTML(resumeData);
            break;
        case "T3":
            previewContainer.innerHTML = generateTemplate3HTML(resumeData);
            break;
        case "T4":
            previewContainer.innerHTML = generateTemplate4HTML(resumeData);
            break;
        default:
            console.error(`Template ID "${templateId}" is not recognized.`);
            return null;
    }

    // Append the preview container to the body temporarily
    document.body.appendChild(previewContainer);

    // Convert the HTML content to a canvas and get it as a base64 image
    const canvas = await html2canvas(previewContainer);
    const imgData = canvas.toDataURL('image/png');

    // Clean up by removing the temporary preview container
    document.body.removeChild(previewContainer);

    return imgData; // Return the image data
}