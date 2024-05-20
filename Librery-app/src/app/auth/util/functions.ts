import { FormGroup } from "@angular/forms";

export const comparePasswords = (formGroup: FormGroup):any => {
  const passwordControl = formGroup.get('password');
  const confirmPasswordControl = formGroup.get('confirmPass');

  if (!passwordControl || !confirmPasswordControl) {
    return null;
  }

  if (passwordControl.value !== confirmPasswordControl.value) {
    confirmPasswordControl.setErrors({ mismatch: true });
  } else {
    confirmPasswordControl.setErrors(null);
  }
}
