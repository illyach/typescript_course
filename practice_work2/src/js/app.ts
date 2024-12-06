// regex for validation
const strRegex: RegExp = /^[a-zA-Z\s]*$/; // containing only letters
const emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex: RegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
/* supports following number formats - (123) 456-7890, (123)456-7890, 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725 */
const digitRegex: RegExp = /^\d+$/;

const mainForm = document.getElementById('cv-form') as HTMLFormElement;
const validType = {
    TEXT: 'text',
    TEXT_EMP: 'text_emp',
    EMAIL: 'email',
    DIGIT: 'digit',
    PHONENO: 'phoneno',
    ANY: 'any',
} as const;

// user inputs elements
let firstnameElem: HTMLInputElement = mainForm.firstname as HTMLInputElement,
    middlenameElem: HTMLInputElement = mainForm.middlename as HTMLInputElement,
    lastnameElem: HTMLInputElement = mainForm.lastname as HTMLInputElement,
    imageElem: HTMLInputElement = mainForm.image as HTMLInputElement,
    designationElem: HTMLInputElement = mainForm.designation as HTMLInputElement,
    addressElem: HTMLInputElement = mainForm.address as HTMLInputElement,
    emailElem: HTMLInputElement = mainForm.email as HTMLInputElement,
    phonenoElem: HTMLInputElement = mainForm.phoneno as HTMLInputElement,
    summaryElem: HTMLTextAreaElement = mainForm.summary as HTMLTextAreaElement;

// display elements
let nameDsp: HTMLElement = document.getElementById('fullname_dsp') as HTMLElement,
    imageDsp: HTMLImageElement = document.getElementById('image_dsp') as HTMLImageElement,
    phonenoDsp: HTMLElement = document.getElementById('phoneno_dsp') as HTMLElement,
    emailDsp: HTMLElement = document.getElementById('email_dsp') as HTMLElement,
    addressDsp: HTMLElement = document.getElementById('address_dsp') as HTMLElement,
    designationDsp: HTMLElement = document.getElementById('designation_dsp') as HTMLElement,
    summaryDsp: HTMLElement = document.getElementById('summary_dsp') as HTMLElement,
    projectsDsp: HTMLElement = document.getElementById('projects_dsp') as HTMLElement,
    achievementsDsp: HTMLElement = document.getElementById('achievements_dsp') as HTMLElement,
    skillsDsp: HTMLElement = document.getElementById('skills_dsp') as HTMLElement,
    educationsDsp: HTMLElement = document.getElementById('educations_dsp') as HTMLElement,
    experiencesDsp: HTMLElement = document.getElementById('experiences_dsp') as HTMLElement;

// first value is for the attributes and second one passes the nodelists
const fetchValues = <T>(attrs: string[], ...nodeLists: HTMLInputElement[][]): T[] => {
    let elemsAttrsCount = nodeLists.length;
    let elemsDataCount = nodeLists[0].length;
    let tempDataArr: T[] = [];

    // first loop deals with the no of repeaters value
    for (let i = 0; i < elemsDataCount; i++) {
        let dataObj: Record<string, string> = {}; // creating an empty object to fill the data
        // second loop fetches the data for each repeaters value or attributes 
        for (let j = 0; j < elemsAttrsCount; j++) {
            // setting the key name for the object and fill it with data
            dataObj[`${attrs[j]}`] = nodeLists[j][i].value;
        }
        tempDataArr.push(dataObj as T);
    }

    return tempDataArr;
}

const getUserInputs = () => {

    // achievements 
    let achievementsTitleElem = document.querySelectorAll('.achieve_title') as NodeListOf<HTMLInputElement>,
        achievementsDescriptionElem = document.querySelectorAll('.achieve_description') as NodeListOf<HTMLInputElement>;

    // experiences
    let expTitleElem = document.querySelectorAll('.exp_title') as NodeListOf<HTMLInputElement>,
        expOrganizationElem = document.querySelectorAll('.exp_organization') as NodeListOf<HTMLInputElement>,
        expLocationElem = document.querySelectorAll('.exp_location') as NodeListOf<HTMLInputElement>,
        expStartDateElem = document.querySelectorAll('.exp_start_date') as NodeListOf<HTMLInputElement>,
        expEndDateElem = document.querySelectorAll('.exp_end_date') as NodeListOf<HTMLInputElement>,
        expDescriptionElem = document.querySelectorAll('.exp_description') as NodeListOf<HTMLInputElement>;

    // education
    let eduSchoolElem = document.querySelectorAll('.edu_school') as NodeListOf<HTMLInputElement>,
        eduDegreeElem = document.querySelectorAll('.edu_degree') as NodeListOf<HTMLInputElement>,
        eduCityElem = document.querySelectorAll('.edu_city') as NodeListOf<HTMLInputElement>,
        eduStartDateElem = document.querySelectorAll('.edu_start_date') as NodeListOf<HTMLInputElement>,
        eduGraduationDateElem = document.querySelectorAll('.edu_graduation_date') as NodeListOf<HTMLInputElement>,
        eduDescriptionElem = document.querySelectorAll('.edu_description') as NodeListOf<HTMLInputElement>;

    let projTitleElem = document.querySelectorAll('.proj_title') as NodeListOf<HTMLInputElement>,
        projLinkElem = document.querySelectorAll('.proj_link') as NodeListOf<HTMLInputElement>,
        projDescriptionElem = document.querySelectorAll('.proj_description') as NodeListOf<HTMLInputElement>;

    let skillElem = document.querySelectorAll('.skill') as NodeListOf<HTMLInputElement>;

    // event listeners for form validation
    firstnameElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.TEXT, 'First Name'));
    middlenameElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.TEXT_EMP, 'Middle Name'));
    lastnameElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.TEXT, 'Last Name'));
    phonenoElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.PHONENO, 'Phone Number'));
    emailElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.EMAIL, 'Email'));
    addressElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Address'));
    designationElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.TEXT, 'Designation'));

    achievementsTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Title')));
    achievementsDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Description')));
    expTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Title')));
    expOrganizationElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Organization')));
    expLocationElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, "Location")));
    expStartDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'End Date')));
    expEndDateElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'End Date')));
    expDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Description')));
    eduSchoolElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'School')));
    eduDegreeElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Degree')));
    eduCityElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'City')));
    eduStartDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Start Date')));
    eduGraduationDateElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Graduation Date')));
    eduDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Description')));
    projTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Project Title')));
    projLinkElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Project Link')));
    projDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Project Description')));
    skillElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Skill')));
};
