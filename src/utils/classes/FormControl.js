import CryptoJS from 'crypto-js';

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

  get formData() {
    return this.values;
  }

  get encryptData() {
    const keys = Object.keys(this.values);
    const encryptedData = {};
    for (let key of keys) {
      if (this.values[key].length !== 0) {
        encryptedData[key] = CryptoJS.AES.encrypt(
          this.values[key],
          process.env.NOTE_SECRET
        ).toString();
      } else {
        encryptedData[key] = null;
      }
    }
    return encryptedData;
  }

  static encryptValue(value) {
    return CryptoJS.AES.encrypt(value, process.env.NOTE_SECRET).toString();
  }

  static decryptValue(value) {
    try {
      const decrypted = CryptoJS.AES.decrypt(value, process.env.NOTE_SECRET);
      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch {
      return value;
    }
  }

  static decryptData(values) {
    const keys = Object.keys(values);
    const decryptedData = {};
    for (let key of keys) {
      const value = values[key];
      const decryptedValue = CryptoJS.AES.decrypt(value, process.env.NOTE_SECRET);
      if (decryptedValue.sigBytes > 0) {
        decryptedData[key] = decryptedValue.toString(CryptoJS.enc.Utf8);
      } else {
        decryptedData[key] = values[key];
      }
    }
    return decryptedData;
  }
}

export default FormControl;
