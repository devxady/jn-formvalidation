# JN Form Validation

## Overview
The **JN Form Validation** library is designed to simplify the process of validating HTML forms. It supports various input types, including text, email, password, number, and more. The library ensures that users enter valid data into forms and displays error messages or highlights invalid fields as needed.

---

## Features
- Supports multiple input types: `text`, `email`, `password`, `tel`, `checkbox`, `radio`, `select`, and `textarea`.
- Customizable error messages.
- Easy integration into any project.
- Lightweight and efficient.
- Fully customizable for advanced use cases.

---

## Installation

<!-- ### Using npm (Recommended)
```bash
npm install jn-form-validation
``` -->

### Manual Integration
1. Download the library from the repository.
2. Include the `jn-form-validation.js` file in your HTML:
   ```html
   <script src="path/to/jn-form-validation.js"></script>
   ```

---

## Usage

### Basic Setup
1. Create an instance of the `JNFormValidation` class:
   ```javascript
   const formValidator = new JNFormValidation({
       formClass: 'validate-me',
       showErrorMessages: true
   });
   ```

2. Add the `validate-me` class to your HTML form:
   ```html
   <form class="validate-me">
      <label class="jn-input-wrap">
       <input type="text" name="username" required>
      </label>
      <label class="jn-input-wrap">
       <input type="email" name="email" required>
      </label>
      <label class="jn-input-wrap">
       <button type="submit">Submit</button>
      </label>
   </form>
   ```

3. Add following css for error messages:
   ```css
   .jn-error-wrap > .jn-error-message{
        background: #c44106;
        color: #fff;
        font-size: 12px;
        padding: 4px 15px;
        border-radius: 0 0 5px 5px;
        width: 100%;
    }

    .jn-error-wrap input:not([type="radio"]):not([type="checkbox"]),
    .jn-error-wrap select,
    .jn-error-wrap .fileDesign,
    .jn-error-wrap textarea {
        border: 1px solid #c44106!important;
    }
   ```

---

## Options
The `JNFormValidation` class accepts an options object to customize its behavior:

| Option             | Type    | Default | Description                                      |
|--------------------|---------|---------|--------------------------------------------------|
| `formClass`        | String  | `''`    | CSS class name for the forms to validate.        |
| `showErrorMessages`| Boolean | `true`  | Whether to show error messages for invalid fields.|
| `errorMessages`    | Object  | `{}`    | Custom error messages for specific field types.  |

### Default Error Messages
```javascript
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
    file: "Please upload a valid file."
};
```

---

## Advanced Usage
### Custom Error Handling
You can override the default error messages by passing a custom `errorMessages` object:
```javascript
const formValidator = new JNFormValidation({
    errorMessages: {
        email: "Invalid email format.",
        password: "Password must contain at least 8 characters."
    }
});
```

---

## License
This library is open-source and licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

## Author
**[Your Name]**  
For inquiries or support, contact: [aditya07acc@gmail.com]

---

## Version History
| Version | Date       | Changes                                       |
|---------|------------|-----------------------------------------------|
| 1.0.0   | 2024-12-23 | Initial release with basic validation support.|

---

## Contribution
Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.

---

## Acknowledgments
Thanks to all contributors and the open-source community for their support!
