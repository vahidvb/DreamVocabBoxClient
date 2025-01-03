export default {
  install(app) {
    app.config.globalProperties.MessageBox = {
      show(message, title = '', type = 'info') {
        const modal = document.createElement('div');
        modal.className = 'custom-message-box modal fade';

        modal.innerHTML = `
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content border-${type}">
              ${
                title
                  ? `<div class="modal-header bg-${type} text-white">
                       <h5 class="modal-title">${title}</h5>
                       <button type="button" class="btn-close close-modal" aria-label="Close"></button>
                     </div>`
                  : ''
              }
              <div class="modal-body">
                <p>${message}</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary close-modal">Close</button>
              </div>
            </div>
          </div>
        `;

        document.body.appendChild(modal);

        const closeButtons = modal.querySelectorAll('.close-modal');
        closeButtons.forEach((button) => {
          button.addEventListener('click', () => {
            modal.remove();
          });
        });

        modal.classList.add('show');
        modal.style.display = 'block';
      },

      info(message, title) {
        this.show(message, title, 'info');
      },

      success(message, title) {
        this.show(message, title, 'success');
      },

      warning(message, title) {
        this.show(message, title, 'warning');
      },

      error(message, title) {
        this.show(message, title, 'danger');
      },
    };
  },
};
