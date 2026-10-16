document.querySelectorAll("form.example-form").forEach((form) => {
  const status = form.querySelector(".example-form__status");

  // The bundled validator calls form.submit() after a valid check. Replace that
  // call on this form instance so the demo can show success without sending data.
  form.submit = function showLocalSuccess() {
    form.reset();
    status.textContent = form.dataset.success || "Validation passed. Nothing was sent or saved.";
    status.hidden = false;
    status.focus();
  };

  const dismissStatus = () => {
    status.hidden = true;
  };
  form.addEventListener("input", dismissStatus);
  form.addEventListener("change", dismissStatus);

  new JnFormValidation({
    showErrorMessages: true,
    formClass: ".example-form",
  });
});
