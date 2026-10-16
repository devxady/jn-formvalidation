# JN Form Validation browser distribution

This directory contains the browser build used by the project website. The downloadable 2.0.0 archive has the same asset layout at its root.

## Files

- assets/js/jn.formvalidation.js — non-minified browser build
- assets/js/jn.formvalidation.min.js — minified browser build
- assets/css/jn-formvalidation.css — default error styles
- assets/css/jn-formvalidation.min.css — minified default error styles
- index.html — interactive field type gallery

## Setup

Include the styles and script, wrap each field to check in jn-input-wrap, and select the form with formClass:

    <link rel="stylesheet" href="assets/css/jn-formvalidation.min.css">
    <script src="assets/js/jn.formvalidation.min.js"></script>

    <form class="jnForm" action="/submit" method="post" novalidate>
      <div class="jn-input-wrap">
        <label for="email">Email</label>
        <input id="email" name="email" type="email">
      </div>
      <button type="submit">Submit</button>
    </form>

    <script>
      new JnFormValidation({ formClass: ".jnForm" });
    </script>

See the repository's root README and website documentation for the options, exact input checks, and known behavior.
