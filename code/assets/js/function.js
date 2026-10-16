/*************************************/
/*************************************/
/*************************************/
/*************************************/
/************** JN FORM **************/
/**************VALIDATION*************/
/*************************************/
/*************************************/
/*************************************/
/*************************************/

/*
 *   Version: 2.0.0                                                                 
 *   Author: Aditya Chauhan                                                         
 *   License: MIT                                                                   
 *   Description: This script provides the validation logic for form fields such    
 *   as email, password, text, and other input types. It highlights invalid         
 *   fields and displays error messages accordingly.                                
*/

console.log(
    "%cJN Form Validation by Aditya Chauhan",
    "background: #0a383f; color: #ffffff; display: block;padding:5px 15px;border-radius:7px"
);


class JnFormValidation {
    constructor(options = {}) {
        // Set default values with nested objects
        this.formClass = options.formClass || '';
        this.showErrorMessages = options.showErrorMessages !== undefined ? options.showErrorMessages : true;
        // Merge user-provided error messages with defaults
        const defaultErrorMessages = {
            email: "Please enter a valid email address.",
            text: "Please enter some text.",
            password: "Please enter a valid password.",
            tel: "Please enter a valid phone number.",
            number: "Please enter a valid number.",
            checkbox: "This option must be checked.",
            radio: "Please select an option.",
            select: "Please select an option.",
            textarea: "Please enter some text.",
            file: "Please upload a valid file.",
            search: "Please type for search",
            url: "Please enter a valid url",
            date: "Please enter a valid date.",
            time: "Please enter a valid time.",
            datetimeLocal: "Please enter a valid date and time.",
            month: "Please enter a valid month.",
            week: "Please enter a valid week.",
            range: "Please enter a valid range.",
            color: "Please select a color."
        };

        this.errorMessages = { ...defaultErrorMessages, ...options.errorMessages }; // Merge default and custom messages
        // Automatically run validation setup
        this.jnSetupValidation();
    }

    // Method to set up validation logic
    jnSetupValidation() {
        if(this.formClass === ''){
            console.log(
                "%cForm Class is not added",
                "background:rgb(153, 31, 0); color: #ffffff; display: block;padding:5px 15px;border-radius:7px"
            );
            // hide form 
            return;
        }
        jn_validator(this);
    }
}


//  Main Function for validation
function jn_validator(allData){
    console.log(allData);
    // JavaScript Validation Library

    // Configuration options
    const showErrorMessages = allData.showErrorMessages; // Set to true to show error messages, false to highlight with red outline only

    // Function to validate form fields
    function validateForm(event) {
        event.preventDefault(); // Prevent form submission initially
        const currentForm = event.target;

        console.log(currentForm);
        // Reset previous error messages and outlines
        clearErrorClass(currentForm);
        clearErrorMessages(currentForm);
        clearRedOutlines();

        // Select all input elements with class 'jn-input-wrap'
        const inputWraps = currentForm.querySelectorAll(".jn-input-wrap");

        let isValid = true;

        // Iterate over each input wrapper
        inputWraps.forEach((inputWrap) => {
            const input = inputWrap.querySelector("input, select, textarea");

            if (input) {
                let inputType;
                if (input.tagName == "SELECT" || input.tagName == "TEXTAREA") {
                    inputType = input.tagName.toLowerCase();
                } else {
                    inputType = input.getAttribute("type");
                }
                const value = input.value.trim();

                // Validate based on input type
                switch (inputType) {
                    case "email":
                        if (!isValidEmail(value)) {
                            if (showErrorMessages) {
                                appendError(inputWrap,  allData.errorMessages.email);
                            } else {
                                addRedOutline(input);
                            }
                            isValid = false;
                        }
                        break;
                    case "text":
                        if (value === "") {
                            if (showErrorMessages) {
                                appendError(inputWrap, allData.errorMessages.text);
                            } else {
                                addRedOutline(input);
                            }
                            isValid = false;
                        }
                        break;
                    case "password":
                        if (value === "") {
                            if (showErrorMessages) {
                                appendError(inputWrap, allData.errorMessages.password);
                            } else {
                                addRedOutline(input);
                            }
                            isValid = false;
                        }
                        break;
                    case "tel":
                        if (!isValidPhoneNumber(value)) {
                            if (showErrorMessages) {
                                appendError(inputWrap,  allData.errorMessages.tel);
                            } else {
                                addRedOutline(input);
                            }
                            isValid = false;
                        }
                        break;
                    case "number":
                        if (!isValidNumber(value)) {
                            if (showErrorMessages) {
                                appendError(inputWrap,  allData.errorMessages.number);
                            } else {
                                addRedOutline(input);
                            }
                            isValid = false;
                        }
                        break;
                    case "checkbox":
                        var name = input.getAttribute("name");
                        var group = currentForm.querySelectorAll(`input[name="${name}"]`);
                        var isChecked = Array.from(group).some((radio) => radio.checked);
                
                        if (!isChecked) {
                            if (showErrorMessages) {
                                appendError(inputWrap, allData.errorMessages.checkbox);
                            } else {
                                group.forEach(radio => addRedOutline(radio));
                            }
                            isValid = false;
                        }
                        break;
                    case "radio":
                        var name = input.getAttribute("name");
                        var group = currentForm.querySelectorAll(`input[name="${name}"]`);
                        var isChecked = Array.from(group).some((radio) => radio.checked);
                
                        if (!isChecked) {
                            if (showErrorMessages) {
                                appendError(inputWrap, allData.errorMessages.radio);
                            } else {
                                group.forEach(radio => addRedOutline(radio));
                            }
                            isValid = false;
                        }
                        break;
                    case "select":
                        if (value === "") {
                            if (showErrorMessages) {
                                appendError(inputWrap, allData.errorMessages.select);
                            } else {
                                addRedOutline(input);
                            }
                            isValid = false;
                        }
                        break;
                    case "textarea":
                        if (value === "") {
                            if (showErrorMessages) {
                                appendError(inputWrap, allData.errorMessages.textarea);
                            } else {
                                addRedOutline(input);
                            }
                            isValid = false;
                        }
                        break;
                    case "file":
                        const file = input.files[0];
                        if (!isValidFile(file)) {
                            if (showErrorMessages) {
                                appendError(
                                    inputWrap, allData.errorMessages.file);
                            } else {
                                addRedOutline(input);
                            }
                            isValid = false;
                        }
                        break;
                    case "search": // Added 'search' type
                        if (value === "") {
                            if (showErrorMessages) {
                                appendError(inputWrap, allData.errorMessages.search);
                            } else {
                                addRedOutline(input);
                            }
                            isValid = false;
                        }
                        break;
                    case "url":
                        if (!isValidURL(value)) {
                            if (showErrorMessages) {
                                appendError(inputWrap, allData.errorMessages.url);
                            } else {
                                addRedOutline(input);
                            }
                            isValid = false;
                        }
                        break;
                    case "date":
                        if (value === "") {
                            if (showErrorMessages) {
                                appendError(inputWrap, allData.errorMessages.date);
                            } else {
                                addRedOutline(input);
                            }
                            isValid = false;
                        }
                        break;
                    case "time":
                        if (value === "") {
                            if (showErrorMessages) {
                                appendError(inputWrap, allData.errorMessages.time);
                            } else {
                                addRedOutline(input);
                            }
                            isValid = false;
                        }
                        break;
                    case "datetime-local":
                        if (value === "") {
                            if (showErrorMessages) {
                                appendError(inputWrap, allData.errorMessages.datetimeLocal);
                            } else {
                                addRedOutline(input);
                            }
                            isValid = false;
                        }
                        break;
                    case "month":
                        if (value === "") {
                            if (showErrorMessages) {
                                appendError(inputWrap, allData.errorMessages.month);
                            } else {
                                addRedOutline(input);
                            }
                            isValid = false;
                        }
                        break;
                    case "week":
                        if (value === "") {
                            if (showErrorMessages) {
                                appendError(inputWrap, allData.errorMessages.week);
                            } else {
                                addRedOutline(input);
                            }
                            isValid = false;
                        }
                        break;
                    case "range":
                        if (value === "") {
                            if (showErrorMessages) {
                                appendError(inputWrap, allData.errorMessages.range);
                            } else {
                                addRedOutline(input);
                            }
                            isValid = false;
                        }
                        break;
                    case "color":
                            if (value === "") {
                                if (showErrorMessages) {
                                    appendError(inputWrap, allData.errorMessages.color);
                                } else {
                                    addRedOutline(input);
                                }
                                isValid = false;
                            }
                            break;
                    default:
                        break;
                }
            }
        });

        // If form is valid, submit it
        if (isValid) {
            event.target.submit();
        }
    }

    // Function to append error message to input wrapper
    function appendError(inputWrap, errorMessageText) {
        const errorMessage = document.createElement("div");
        inputWrap.classList.add("jn-error-wrap");
        errorMessage.classList.add("jn-error-message");
        errorMessage.textContent = errorMessageText;
        inputWrap.appendChild(errorMessage);
    }

    // Function to clear error Class from Input Wrap
    function clearErrorClass(currentForm) {
        currentForm.querySelectorAll(".jn-input-wrap").forEach((element) => {
            element.classList.remove("jn-error-wrap")
        }); /// need to work here 
    }

    // Function to clear error Class Messages
    function clearErrorMessages(currentForm) {
        const errorMessages = currentForm.querySelectorAll(".jn-input-wrap .jn-error-message");
        errorMessages.forEach((errorMessage) => {
            errorMessage.remove();
        });
    }

    // Function to add red outline to input
    function addRedOutline(input) {
        // input.classList.add("error-outline");
        input.style.setProperty("outline", "1px solid #ff2200", "important");
    }

    // Function to clear red outlines
    function clearRedOutlines() {
        const inputs = document.querySelectorAll(
            ".jn-input-wrap input, .jn-input-wrap select, .jn-input-wrap textarea"
        );
        inputs.forEach((input) => {
            input.classList.remove("error-outline");
        });
    }

    // Validation functions for specific input types
    function isValidEmail(email) {
        // Regular expression for basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhoneNumber(phone) {
        // Regular expression to match 10 digit phone number
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    }

    function isValidURL(url) {
        // Regular expression for basic URL validation
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        return urlRegex.test(url);
    }

    function isValidNumber(number) {
        // Regular expression for integer number validation
        const numberRegex = /^\d+$/;
        return numberRegex.test(number);
    }

    function isValidFile(file) {
        // Check file type (example checks for PNG, JPG, GIF, PDF)
        if (!file) return false;
        const fileType = file.type;
        return (
            fileType === "image/png" ||
            fileType === "image/jpeg" ||
            fileType === "image/gif" ||
            fileType === "application/pdf"
        );
    }

    // // Attach validation function to form submit event
    const forms = document.querySelectorAll(allData.formClass);

    forms.forEach(form => {
        form.addEventListener("submit", validateForm);
    });


}



