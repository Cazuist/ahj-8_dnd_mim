export default class ImageBox {
  constructor(name, url) {
    this.name = name;
    this.src = url;
  }

  createElement(container) {
    const delEl = container.querySelector('.del-box');
    const img = container.querySelector('img');

    delEl.addEventListener('click', (event) => event.target.closest('.img-box').remove());
    img.src = this.src;
    img.title = this.name;
    container.classList.remove('hidden');

    return container;
  }
}
