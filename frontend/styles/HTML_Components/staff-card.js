class StaffCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const id = this.getAttribute('staff-id') || '00000000';
    const name = this.getAttribute('staff-name') || 'Unknown';

    this.shadowRoot.innerHTML = `
      <style>
        .card {
          background-color: #F4F8F7;
          color: black;
          border-radius: 20px;
          padding: 20px 30px;
          margin-bottom: 20px;
          font-family: 'Inter', sans-serif;
          width: 100%;
          box-sizing: border-box;
        }

        .row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .column {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          font-size: 16px;
          font-weight: 500;
          color: black;
          word-break: break-word;
        }

        .column span {
          margin-top: 4px;
          font-weight: normal;
        }

        .separator {
          color: #939796;
        }

        .action-button,
        .delete-button {
          background: none;
          border: none;
          font-weight: 500;
          cursor: pointer;
          font-size: 16px;
          padding: 5px;
          transition: transform 0.2s;
        }

        .action-button {
          color: black;
        }

        .action-button:hover,
        .delete-button:hover {
          transform: scale(1.1);
          text-decoration: underline;
        }

        .delete-button {
          color: red;
        }
      </style>

      <div class="card">
        <div class="row">
          <div class="column">ID:<span>${id}</span></div>
          <div class="separator">|</div>
          <div class="column">Name:<span>${name}</span></div>
          <div class="separator">|</div>
          <div class="column"><button class="action-button" id="editBtn">View More & Edit</button></div>
          <div class="separator">|</div>
          <div class="column"><button class="delete-button" id="deleteBtn">Delete</button></div>
        </div>
      </div>
    `;

    this.shadowRoot.querySelector('#editBtn').addEventListener('click', () => {
      window.location.href = '../View_More/viewmore.html';
    });

    this.shadowRoot.querySelector('#deleteBtn').addEventListener('click', () => {
      if (confirm('Are you sure you want to delete this staff member?')) {
        this.remove();
      }
    });
  }
}

customElements.define('staff-card', StaffCard);
