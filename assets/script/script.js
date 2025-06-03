const MONTHS = [
    { name: 'январь', season: 'winter' },
    { name: 'февраль', season: 'winter' },
    { name: 'март', season: 'spring' },
    { name: 'апрель', season: 'spring' },
    { name: 'май', season: 'spring' },
    { name: 'июнь', season: 'summer' },
    { name: 'июль', season: 'summer' },
    { name: 'август', season: 'summer' },
    { name: 'сентябрь', season: 'autumn' },
    { name: 'октябрь', season: 'autumn' },
    { name: 'ноябрь', season: 'autumn' },
    { name: 'декабрь', season: 'winter' }
];

const SEASONS = ['winter', 'spring', 'summer', 'autumn'];

function getRandomMonths() {
    const rows = Math.floor(Math.random() * 3) + 3;
    const pool = [...MONTHS];
    const res = [];
    for (let i = 0; i < rows; i++) {
        const idx = Math.floor(Math.random() * pool.length);
        res.push(pool.splice(idx, 1)[0]);
    }
    return res;
}

const monthsInTask = getRandomMonths();
const tbody = document.getElementById('task-body');

monthsInTask.forEach((monthObj, rowIdx) => {
    const tr = document.createElement('tr');

    const monthTd = document.createElement('td');
    monthTd.className = 'month-cell';
    monthTd.textContent = monthObj.name;
    tr.appendChild(monthTd);

    SEASONS.forEach(season => {
        const td = document.createElement('td');
        td.className = 'selection-cell';

        const label = document.createElement('label');
        label.className = 'check-wrap';

        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.name = `row-${rowIdx}`;      
        cb.value = season;
        cb.className = 'check-answer';

        const box = document.createElement('span');
        box.className = 'check-box';

        label.append(cb, box);
        td.appendChild(label);
        tr.appendChild(td);
    });


    tbody.appendChild(tr);
});

document.querySelector('.send-answer').addEventListener('click', () => {
    let correct = 0;
    monthsInTask.forEach((monthObj, rowIdx) => {
        const checked = document.querySelector(`input[name="row-${rowIdx}"]:checked`);
        if (checked && checked.value === monthObj.season) correct++;
    });
    console.log(`${correct} из ${monthsInTask.length}`);
});

tbody.addEventListener('change',e=>{
    if(!e.target.matches('.check-answer')) return;
    const name=e.target.name;
    if(e.target.checked){
        document.querySelectorAll(`input[name="${name}"]`).forEach(el=>{
            if(el!==e.target) el.checked=false;
        });
    }
});
