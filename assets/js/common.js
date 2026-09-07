/**
 * Shared page widgets, reused by any current or future topic page. Load after nav.js.
 */

// Quiz / flashcard answer reveal — used by quiz.html (and any future flashcard page)
function toggleAnswer(id) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('hidden');
}

// Generic table search filter — used by tables.html (and any future searchable table)
function initTableSearch(inputId, bodyId) {
    const input = document.getElementById(inputId);
    const body = document.getElementById(bodyId);
    if (!input || !body) return;
    input.addEventListener('keyup', (e) => {
        const query = e.target.value.toLowerCase();
        Array.from(body.getElementsByTagName('tr')).forEach(row => {
            row.style.display = row.innerText.toLowerCase().includes(query) ? '' : 'none';
        });
    });
}

// SD Item Category / Schedule Line Category determination simulator — used by simulator.html
function initSimulator(ids) {
    const simDocType = document.getElementById(ids.docType);
    const simItemGrp = document.getElementById(ids.itemGrp);
    const simMrpType = document.getElementById(ids.mrpType);
    const resItemCat = document.getElementById(ids.resItemCat);
    const resItemDesc = document.getElementById(ids.resItemDesc);
    const resSchedCat = document.getElementById(ids.resSchedCat);
    const resSchedDesc = document.getElementById(ids.resSchedDesc);
    if (!simDocType || !simItemGrp || !simMrpType) return;

    function update() {
        const doc = simDocType.value;
        const grp = simItemGrp.value;
        const mrp = simMrpType.value;

        let itemCat = 'TAN';
        let itemDesc = 'Standard item: priced, delivery-relevant, schedule lines allowed.';
        let schedCat = 'CP';
        let schedDesc = 'MRP requirements active, availability check active, movement type 601.';

        if (grp === 'TEXT') {
            itemCat = 'TATX';
            itemDesc = 'Text item: non-priced, non-deliverable, no schedule lines.';
            schedCat = 'N/A';
            schedDesc = 'No schedule lines permitted for text items.';
        } else if (grp === 'BANS') {
            itemCat = 'TAS';
            itemDesc = 'Third-party item: triggers automatic Purchase Requisition.';
            schedCat = 'CS';
            schedDesc = 'Third-party schedule line: creates PR, no inventory movement.';
        } else if (grp === 'DIEN') {
            itemCat = 'TAD';
            itemDesc = 'Service item: priced, non-deliverable (order-related billing).';
            schedCat = 'N/A';
            schedDesc = 'No inventory movement for services.';
        } else if (doc === 'QT') {
            itemCat = 'AGN';
            itemDesc = 'Quotation item: non-deliverable quotation line.';
            schedCat = 'DG';
            schedDesc = 'Quotation schedule line: non-inventory active.';
        } else if (doc === 'RE') {
            itemCat = 'REN';
            itemDesc = 'Returns item: returns processing active, credit active.';
            schedCat = 'DN';
            schedDesc = 'Returns schedule line: receipt movement type 651.';
        } else if (doc === 'BV') {
            itemCat = 'BVNN';
            itemDesc = 'Cash sale item: immediate delivery & invoice generation.';
            schedCat = 'CP';
            schedDesc = 'Standard schedule line with immediate goods movement.';
        }

        if (mrp === 'ND' && itemCat === 'TAN') {
            schedCat = 'C0';
            schedDesc = 'No MRP requirements planning, availability check only.';
        }

        resItemCat.innerText = itemCat;
        resItemDesc.innerText = itemDesc;
        resSchedCat.innerText = schedCat;
        resSchedDesc.innerText = schedDesc;
    }

    simDocType.addEventListener('change', update);
    simItemGrp.addEventListener('change', update);
    simMrpType.addEventListener('change', update);
}
