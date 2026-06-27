document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. POPULATE CLIENT DATA FROM LOCALSTORAGE
    // ==========================================
    const savedData = JSON.parse(localStorage.getItem('currentClient'));
    
    if (savedData) {
        console.log("Client data loaded:", savedData);

        // Core fields setup
        if(document.getElementById("top-client-name")) document.getElementById("top-client-name").value = savedData.CLIENTS_NAME || '';
        if(document.getElementById("top-client-address")) document.getElementById("top-client-address").value = savedData.ADDRESS || '';
        if(document.getElementById("top-client-contact")) document.getElementById("top-client-contact").value = savedData.CONTACT_NO || '';
        if(document.getElementById("top-client-credentials")) document.getElementById("top-client-credentials").value = savedData.CREDENTIALS || '';
        if(document.getElementById("summary-mbps")) document.getElementById("summary-mbps").value = savedData.PLAN || '';

        // Payment Stub 1 Information
        if(document.getElementById("stub-client-name")) document.getElementById("stub-client-name").value = savedData.CLIENTS_NAME || '';
        if(document.getElementById("stub-client-address")) document.getElementById("stub-client-address").value = savedData.ADDRESS || '';
        if(document.getElementById("stub-credentials")) document.getElementById("stub-credentials").value = savedData.CREDENTIALS || '';

        // Payment Stub 2 Information
        if(document.getElementById("stub2-client-name")) document.getElementById("stub2-client-name").value = savedData.CLIENTS_NAME || '';
        if(document.getElementById("stub2-client-address")) document.getElementById("stub2-client-address").value = savedData.ADDRESS || '';
        if(document.getElementById("stub2-credentials")) document.getElementById("stub2-credentials").value = savedData.CREDENTIALS || '';

        // Financial breakdowns
        const balance = Number(savedData.BALANCE || 0);
        const installment = Number(savedData.INSTALLMENT || 0);

        if(document.getElementById("summary-previous-amount")) document.getElementById("summary-previous-amount").value = "P " + balance.toLocaleString();
        if(document.getElementById("summary-previous-total")) document.getElementById("summary-previous-total").value = "P " + balance.toLocaleString();
        if(document.getElementById("summary-amount-due")) document.getElementById("summary-amount-due").value = "P " + installment.toLocaleString();

        // Totals formulations
        const grandTotalString = "P " + (installment + balance).toLocaleString() + ".00";
        const summaryTotalString = "P " + installment.toLocaleString() + ".00";

        if(document.getElementById("top-client-amount-due")) document.getElementById("top-client-amount-due").value = grandTotalString;
        if(document.getElementById("summary-total")) document.getElementById("summary-total").value = summaryTotalString;
        if(document.getElementById("summary-amount-to-pay")) document.getElementById("summary-amount-to-pay").value = grandTotalString;
        if(document.getElementById("stub-amount-due")) document.getElementById("stub-amount-due").value = grandTotalString;
        if(document.getElementById("stub2-amount-due")) document.getElementById("stub2-amount-due").value = grandTotalString;

        localStorage.removeItem('currentClient');
    }

    // ==========================================
    // 2. DYNAMIC FUTURE-PROOF DROPDOWN OPTIONS GENERATION
    // ==========================================
    const topBilling = document.getElementById("top-billing-period");
    const topDueDate = document.getElementById("top-due-date");
    const stubBillings = document.querySelectorAll(".stub-billing-input");
    const stubDueDates = document.querySelectorAll(".stub-due-date-input");

    const today = new Date();
    const currentMonth = today.getMonth(); 
    const currentYear = today.getFullYear();

    const months = [
        "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
        "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
    ];

    if (topBilling && topDueDate) {
        // Clear anything hardcoded just in case
        topBilling.innerHTML = "";
        topDueDate.innerHTML = "";

        // Build Billing Period choices dynamically for whatever the current active year is
        for (let m = 0; m < 12; m++) {
            const lastDayOfM = new Date(currentYear, m + 1, 0).getDate();
            const optionText = `${months[m]} 1-${lastDayOfM}, ${currentYear}`;
            
            const opt = document.createElement("option");
            opt.value = optionText;
            opt.textContent = optionText;
            topBilling.appendChild(opt);
        }

        // Build Due Date choices dynamically for the current year
        for (let m = 0; m < 12; m++) {
            const optionText = `${months[m]} 1, ${currentYear}`;
            
            const opt = document.createElement("option");
            opt.value = optionText;
            opt.textContent = optionText;
            topDueDate.appendChild(opt);
        }

        // Add a 13th option for January of the next year (vital if the bill is generated in December)
        const nextYearJanText = `${months} 1, ${currentYear + 1}`;
        const nextYearOpt = document.createElement("option");
        nextYearOpt.value = nextYearJanText;
        nextYearOpt.textContent = nextYearJanText;
        topDueDate.appendChild(nextYearOpt);
    }

    // ==========================================
    // 3. AUTOMATIC TODAY/NEXT-MONTH AUTO-SELECTION
    // ==========================================
    const lastDayCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const nextMonthIndex = (currentMonth + 1) % 12;
    const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear;

    const targetBillingValue = `${months[currentMonth]} 1-${lastDayCurrentMonth}, ${currentYear}`;
    const targetDueDateValue = `${months[nextMonthIndex]} 1, ${nextMonthYear}`;

    if (topBilling) topBilling.value = targetBillingValue;
    if (topDueDate) topDueDate.value = targetDueDateValue;

    // ==========================================
    // 4. INTERACTIVE STUB SYNC SYSTEM
    // ==========================================
    function syncBilling() {
        if (topBilling) {
            stubBillings.forEach(input => {
                input.value = topBilling.value;
            });
        }
    }

    function syncDueDate() {
        if (topDueDate) {
            stubDueDates.forEach(input => {
                input.value = topDueDate.value;
            });
        }
    }

    if (topBilling) topBilling.addEventListener("change", syncBilling);
    if (topDueDate) topDueDate.addEventListener("change", syncDueDate);

    // Run synchronization mapping instantly on load
    syncBilling();
    syncDueDate();
});