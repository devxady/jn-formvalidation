# JN Form Validation

JN Form Validation is a small, dependency-free browser library for checking common form fields when a form is submitted. It adds field-level error messages by default.

This README describes the current 2.0.0 implementation in this repository. Validation is client-side convenience; validate submitted data again on your server.

## Install

The repository includes a downloadable ZIP:

- [Download jn-form-validation-2.0.0.zip](./download/jn-form-validation-2.0.0.zip)
- The archive contains assets/js/jn.formvalidation.min.js and assets/css/jn-formvalidation.min.css.
- In the supplied ZIP, assets/js/function.js is only an attribution log; it is not the validator entry point. Use the jn.formvalidation files.
- There is no npm package manifest in this repository.

Include the files from the extracted package:

    <link rel="stylesheet" href="assets/css/jn-formvalidation.min.css">
    <script src="assets/js/jn.formvalidation.min.js"></script>

The project website also uses jsDelivr URLs pointing to the repository's code/assets directory. Those URLs follow the repository's current default branch:

    <link rel="stylesheet"
      href="https://cdn.jsdelivr.net/gh/chauhan07/jn-formvalidation/code/assets/css/jn-formvalidation.min.css">
    <script
      src="https://cdn.jsdelivr.net/gh/chauhan07/jn-formvalidation/code/assets/js/jn.formvalidation.min.js"></script>

## Basic usage

Pass a CSS selector to **formClass**. Add **jn-input-wrap** to each field wrapper; the library checks the first input, select, or textarea inside each wrapper.

    <form class="checkout-form" action="/checkout" method="post" novalidate>
      <div class="jn-input-wrap">
        <label for="checkout-email">Email</label>
        <input id="checkout-email" name="email" type="email">
      </div>
      <button type="submit">Continue</button>
    </form>

    <script>
      new JnFormValidation({
        formClass: ".checkout-form",
        showErrorMessages: true
      });
    </script>

The library attaches a submit listener. Use **novalidate** when the browser's native constraint checks would prevent that listener from receiving an empty or malformed value. Choose the correct **action** and **method** for your application.

If every checked field passes, the current implementation calls **form.submit()**. This sends the form to its configured destination and bypasses other submit listeners and native constraint validation. Do not point a production form at an unintended destination.

## Options

| Option | Type | Default | Behavior |
| --- | --- | --- | --- |
| formClass | String | empty string | CSS selector for forms to validate. An empty string logs a message and skips setup. |
| showErrorMessages | Boolean | true | Append an error message when true; add a red inline outline when false. |
| errorMessages | Object | Built-in message map | Override matching message keys while keeping defaults for keys not supplied. |

Example override:

    new JnFormValidation({
      formClass: ".checkout-form",
      errorMessages: {
        email: "Enter a valid email address.",
        text: "This field cannot be empty."
      }
    });

### Default message keys

The available keys are **email**, **text**, **password**, **tel**, **number**, **checkbox**, **radio**, **select**, **textarea**, **file**, **search**, **url**, **date**, **time**, **datetimeLocal**, **month**, **week**, **range**, and **color**. A datetime-local control uses the datetimeLocal key.

## Supported field checks

All checks run on submit and only for controls within jn-input-wrap.

| Type | Current check |
| --- | --- |
| text, password, search, select, textarea | Trimmed value must not be empty. |
| email | Basic address pattern; not a full standards check. |
| tel | Exactly ten digits. |
| number | Digits only; this check does not accept decimals or negative signs. |
| url | Basic pattern accepts ftp://, http://, or https:// URLs. |
| checkbox, radio | At least one control with the same name in the form must be selected. |
| file | Selected MIME type must be PNG, JPEG, GIF, or PDF. |
| date, time, datetime-local, month, week, range, color | Value must not be empty; there are no date bounds or range options. |

The password check does not implement strength requirements. Give checkbox and radio groups a shared, non-empty name. Other input types are not checked by the current implementation.

## Error feedback and accessibility

When messages are enabled, the library appends a jn-error-message element and adds jn-error-wrap to the wrapper. The package CSS provides basic error styling. The library itself does not associate generated messages with controls using aria-describedby or set aria-invalid; the website preview adds those attributes as a site-only enhancement.

In version 2.0.0, outline mode sets an inline outline style. Its reset code removes an error-outline class rather than the inline style, so an outline may remain after a later submit attempt.

## Browser support

The JavaScript uses modern syntax, including classes and object spread. The older browser/device list previously shown on the website was not backed by a current test matrix; no legacy-browser support is claimed here.

## License and project

The pre-existing project README identifies the library as MIT licensed. No separate LICENSE file appears in this workspace or in the supplied ZIP archive. Confirm that the license text is present upstream before redistributing the package. See the [GitHub repository](https://github.com/chauhan07/jn-formvalidation) for the source and issue tracker.

## Future Library Improvements — Approval Required

These findings are recorded for a separate library phase. They have not been implemented as part of the website redesign:

- Clear the inline error outline reliably when a later validation attempt runs.
- Associate errors with their controls and expose invalid state from the library itself.
- Revisit how a successful validation submits the form so application submit handlers and native constraint behavior are not silently bypassed.
- Avoid debug logging during normal initialization and form submission.
- Review group selection when names are missing, and clarify the one-control-per-wrapper behavior.
- Add an automated browser matrix and test cases for the documented input checks; remove or substantiate legacy compatibility claims.
- Confirm the published, unminified and minified distribution builds remain aligned with the maintained source.
- Reconcile code/assets/js/function.js, which contains a validator copy, with the console-only function.js inside the downloadable ZIP.
- Confirm and include the MIT license text in the repository and downloadable archive.

## Version history

| Version | Date | Notes |
| --- | --- | --- |
| 1.0.0 | 2024-12-23 | Initial release, as listed in the existing project README. |

## Contributing

Use the GitHub repository to discuss bugs, documentation issues, and proposed changes. Library behavior changes require a separate review from this website-only redesign.
