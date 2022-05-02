import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './assets/css/style.css';
import { config } from './modules/config';
import { addMessageIntoDOM } from './modules/message';
import { formatDate } from './modules/date';
import './modules/modal';

const fetchRecords = async () => {
  const response = await fetch(`${config.nodeAPI}/tb01`);
  const records = await response.json();

  if (records.status >= 400) {
    throw new Error(records.message);
  }

  return records.data;
};

const addRecordsIntoDOM = (records) => {
  const recordsTableBody = document.querySelector('#records-table-body');

  recordsTableBody.innerHTML = '';

  for (const record of records) {
    recordsTableBody.innerHTML += `
      <tr>
        <th scope="row">${record.id}</th>
        <td>${record.col_text}</td>
        <td>${formatDate(record.col_dt)}</td>
      </tr>
    `;
  }
};

const initApp = async () => {
  try {
    const records = await fetchRecords();

    addRecordsIntoDOM(records);
  } catch (error) {
    addMessageIntoDOM(error.message, true);
  }
};
initApp();

const createNewRecord = async (text) => {
  const formattedText = JSON.stringify({ col_text: text });
  const response = await fetch(`${config.goAPI}/tb01`, {
    body: formattedText,
    method: 'POST',
  });
  const jsonResponse = await response.json();

  if (jsonResponse.status >= 400) {
    throw new Error(jsonResponse.message);
  }

  return jsonResponse;
};

const submitRecordForm = async (event) => {
  event.preventDefault();

  try {
    const textarea = document.querySelector('#col_text');

    const response = await createNewRecord(textarea.value);

    addMessageIntoDOM(response.message, false);

    initApp();
  } catch (error) {
    addMessageIntoDOM(error.message, true);
  }
};

const createRecordForm = document.querySelector('#create-record-form');

createRecordForm.addEventListener('submit', submitRecordForm);
