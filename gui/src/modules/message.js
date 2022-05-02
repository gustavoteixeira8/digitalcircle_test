const messageContainer = document.querySelector('.message-container');

export const removeMessageFromDOM = () => {
  messageContainer.style.display = 'none';
  messageContainer.innerHTML = '';
};

export const addMessageIntoDOM = (message, isError) => {
  removeMessageFromDOM();

  messageContainer.style.display = 'block';

  messageContainer.innerHTML = `
    <div class="alert alert-${isError ? 'danger' : 'success'}">
      ${message || 'Error'}
    </div>
  `;

  setTimeout(removeMessageFromDOM, 10_000);
};
