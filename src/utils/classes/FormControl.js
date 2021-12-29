class FormControl extends FormData {
  constructor(form) {
    super(form);
  }

  get values() {
    const values = {};
    const entries = this.entries();
    for (let entry of entries) {
      const [field, value] = entry;
      values[field] = value;
    }
    return values;
  }
}

export default FormControl;
