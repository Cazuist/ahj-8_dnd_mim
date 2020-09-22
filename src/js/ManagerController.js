import Listener from './Listener';

export default class ManagerController {
  constructor() {
    this.formEl = document.querySelector('fieldset');
    this.inputEl = document.querySelector('.file-field');
    this.dropEl = document.querySelector('.drop-area');
    this.ribbonEl = document.querySelector('.img-ribbon');
    this.imgEl = document.querySelector('.img-box');
    this.imgDelEl = this.imgEl.querySelector('.del-box');
  }

  init() {
    this.registerListeners();
  }

  registerListeners() {
    this.inputEl.addEventListener('change', (event) => Listener.onChange.call(this, event));

    this.dropEl.addEventListener('click', (event) => Listener.onDropClick.call(this, event));
    this.dropEl.addEventListener('dragover', (event) => Listener.onDrag.call(this, event));
    this.dropEl.addEventListener('drop', (event) => Listener.onDrop.call(this, event));
  }
}
