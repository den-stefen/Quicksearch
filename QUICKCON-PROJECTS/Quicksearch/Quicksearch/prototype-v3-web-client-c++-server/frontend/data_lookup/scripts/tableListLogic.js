

/* ============================================================
    2. VIEW CONTROLLER (Template Loading)
============================================================ */
function loadTemplates(templateId) {

    // kills spelling correction that pesky red line squigles
    document.querySelectorAll('[contenteditable]').forEach(el => {
        el.setAttribute('spellcheck', 'false');
    });

    let container = document.getElementById('app-container');
    let template = document.getElementById(templateId);

    if (template === null) return;

    container.innerHTML = '';
    let instance = template.content.cloneNode(true);
    container.appendChild(instance);

    // Dynamic Sidebar State Management
    let navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
        
        // Extract the keywords (e.g., 'list', 'profile', 'history')
        let text = item.innerText.toLowerCase();
        
        // If the template ID (view-payment-history) contains the word 'history'
        if (templateId.toLowerCase().includes(text.split(' ')[text.split(' ').length - 1])) {
            item.classList.add('active');
        }
    });
}

/* ============================================================
    3. DATA FETCHING (C++ Backend Interaction)
============================================================ */
function renderTableRows(dataList) {
    const tableBody = document.getElementById("tableBody");
    const customerTable = document.getElementById("customerTable");

    /* CLEAR OLD */
    tableBody.textContent = "";

    /* ALLOW TABLE TO EXPAND */
    customerTable.style.width = "max-content";
    customerTable.style.minWidth = "100%";

    // 1. Remove inline event listeners and use Event Delegation instead
    // Only attach this once if it hasn't been attached already
    if (!tableBody.dataset.listenerAttached) {
        tableBody.addEventListener("click", function(event) {
            const deleteBtn = event.target.closest(".delete-btn");
            if (deleteBtn) {
                deleteCustomer(event);
            }
        });
        tableBody.dataset.listenerAttached = "true";
    }

    // 2. Map statuses to classes to eliminate the heavy if-else chain
    const statusMap = {
        "CURRENT": "badge-current",
        "DELIQUENT": "badge-delinquent", // Kept spelling to match your original condition
        "DELINQUENT": "badge-delinquent", // Added correct spelling just in case
        "DISCONNECTED": "badge-disconnected",
        "PULL-OUT": "badge-pull-out",
        "NEWINSTALL": "badge-new-install"
    };

    const CHUNK_SIZE = 200; // Render 200 rows at a time to keep UI responsive
    let index = 0;

    function renderChunk() {
        const fragment = document.createDocumentFragment();
        const endIndex = Math.min(index + CHUNK_SIZE, dataList.length);

        for (let i = index; i < endIndex; i++) {
            const c = dataList[i];
            const row = document.createElement("tr");

            const currentStatus = (c.STATUS ?? "").toUpperCase().trim();
            const badgeClass = statusMap[currentStatus] || "badge-default";

            // Removed inline onclick="deleteCustomer(event)" -> handled by delegation now
            row.innerHTML = `
                <td>
                    <button class="delete-btn" data-id="${c.ID}">
                        <img src="../assets/trasbhin.png">
                    </button>
                </td>
                <td><span class="status-badge ${badgeClass}">${c.STATUS ?? ""}</span></td>
                <td>${c.ID ?? ""}</td>
                <td>${c.CLIENTS_NAME ?? ""}</td>
                <td>${c.BALANCE ?? ""}</td>
                <td>${c.CREDENTIALS ?? ""}</td>
                <td>${c.ADDRESS ?? ""}</td>
                <td>${c.PLAN ?? ""}</td>
                <td>${c.DATE_APPLIED ?? ""}</td>
                <td>${c.CONTACT_NO ?? ""}</td>
                <td>${c.AGE ?? ""}</td>
                <td>${c.SEX ?? ""}</td>
                <td>${c.SOCIAL_MEDIA ?? ""}</td>
                <td>${c.OCCUPATION ?? ""}</td>
                <td>${c.DATE_OF_BIRTH ?? ""}</td>
                <td>${c.PLACE_OF_BIRTH ?? ""}</td>
                <td>${c.OPTICAL_INFO ?? ""}</td>
                <td>${c.SC_CONNECTOR ?? ""}</td>
                <td>${c.FIBER_DROP ?? ""}</td>
                <td>${c.TAPPING_CLIP ?? ""}</td>
                <td>${c.CABLE_TIE ?? ""}</td>
                <td>${c.F_CLAMP ?? ""}</td>
                <td>${c.REMARKS ?? ""}</td>
                <td>${c.INSTALLED_BY ?? ""}</td>
                <td>${c.INSTALLMENT ?? ""}</td>
            `;
            fragment.appendChild(row);
        }

        tableBody.appendChild(fragment);
        index = endIndex;

        // If there's more data, schedule the next chunk in the next animation frame
        if (index < dataList.length) {
            requestAnimationFrame(renderChunk);
        }
    }

    // Start the progressive rendering
    renderChunk();

    document.getElementById("rowCount").textContent = `${dataList.length} Records Loaded`;
}

/* ============================================================
    5. SEARCH LOGIC (Imperative Logic)
============================================================ */
function filterTable() {
    let input = document.getElementById("tableSearch").value.toUpperCase().trim().split(" "); // split into words
    let rows = document.querySelectorAll("#tableBody tr");
    let count = 0;

    rows.forEach(row => {

        let text = row.textContent.toUpperCase();
        let match = input.every(word => text.includes(word));

        if (match) { row.style.display = ""; count++;
        } else { row.style.display = "none"; }
    });

    document.getElementById('rowCount').innerText = count + " Records Found";
}

// Entry Point
window.onload = function() {
    loadTemplates('view-client-list');   
    fetchClientmasterList();
};