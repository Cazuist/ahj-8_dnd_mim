import ImageBox from './ImageBox';
import ErrorBox from './ErrorBox';

export default class Listeners {
  static onDropClick(event) {
    event.currentTarget.classList.add('hidden');
  }

  static onDrag(event) {
    event.preventDefault();
  }

  static onDrop(event) {
    event.preventDefault();
    const { files } = event.dataTransfer;

    if (files.length === 1 && !files[0].type.startsWith('image/')) {
      const message = 'Invalid type file!';
      ErrorBox.createErrorBox(message, this.dropEl);
    }

    files.forEach((file) => {
      if (!file.type.startsWith('image/')) {
        return;
      }

      const { name } = file;
      const reader = new FileReader();

      reader.onload = () => {
        const src = event.target.result;
        const clonedBox = this.imgEl.cloneNode(true);

        const box = new ImageBox(name, src);
        const newElement = box.createElement(clonedBox);

        this.ribbonEl.append(newElement);
      };

      reader.readAsDataURL(file);
    });
  }

  static onChange(event) {
    const { files } = event.currentTarget;

    if (files.length === 1 && !files[0].type.startsWith('image/')) {
      const message = 'Invalid type file!';
      ErrorBox.createErrorBox(message, this.formEl);
      this.inputEl.value = '';
      return;
    }

    files.forEach((file) => {
      if (!file.type.startsWith('image/')) {
        return;
      }

      const { name } = file;
      const src = URL.createObjectURL(file);

      const clonedBox = this.imgEl.cloneNode(true);
      const box = new ImageBox(name, src);
      const newElement = box.createElement(clonedBox);

      newElement.querySelector('img').onload = () => {
        URL.revokeObjectURL(src);
      };

      this.ribbonEl.append(newElement);
    });

    this.inputEl.value = '';
  }
}
