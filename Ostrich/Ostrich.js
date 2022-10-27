function soma() {
    let h = document.getElementById('Head');
    h.innerHTML = `<input type="number" id="Number" placeholder="Valor">
    <input type="text" id="Letter" placeholder="Nome">
    <button onclick="setValue()" id="Adic">+</button>`
}
function pesquisa() {
    let h = document.getElementById('Head');
    h.innerHTML = `<button id="SearchB" onclick="FilteValue()">&#128269</button>
    <ul id="ul">
        <li><select id="Filter0">
            <option value="1">Nome</option>
            <option value="2">Valor</option>
            <option value="3">Dia</option>
            <option value="4">Mês</option>
            <option value="5">Ano</option>
            <option value="6">Hora</option>
            <option value="7">Minuto</option>
        </select>
        <input type="text" id="Input0">
    </li>
    </ul>
    <button id='SearchF'onclick="AddF()">+</button>`
}    
var numeroInformado;
function getTime() {
    let time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth();
    var day = time.getDate();
    var hour = time.getHours();
    var minute = time.getMinutes();

    day >= 10 ? numeroInformado = `${day}/` : numeroInformado = `0${day}/`;

    month >= 9 ? numeroInformado += `${month + 1}/` : numeroInformado += `0${month + 1}/`;

    numeroInformado += `${year}-`

    hour >= 10 ? numeroInformado += `${hour}:` : numeroInformado += `0${hour}:`;

    minute >= 10 ? numeroInformado += `${minute}` : numeroInformado += `0${minute}`;

}

function setValue() {
    //1° uso
    if (localStorage.getItem('numeroDeValoresSalvos') == null) {
        localStorage.setItem('numeroDeValoresSalvos', 0);
    }
    //Pega a hora e data em q foi salvo
    getTime();
    //Pega os Valores
    let valorNumerico = document.getElementById('Number').value;
    let valorString = document.getElementById('Letter').value;
    //Caso variavel invalida
    if (valorNumerico == '' || Number(valorNumerico) < 0 || valorString.length > 20) {
        alert('Valor ou Nome Invalido! Tente novamente!')
    }
    else {
        numeroInformado += `-${valorNumerico}`;
        numeroInformado += `-${valorString}`;
        let numeroDeValoresSalvosOfValue = Number(localStorage.numeroDeValoresSalvos);
        localStorage.setItem(`n${numeroDeValoresSalvosOfValue}`, numeroInformado)
        localStorage.setItem('numeroDeValoresSalvos', numeroDeValoresSalvosOfValue + 1);
        listaDeValoresSalvos();
    }
}

function listaDeValoresSalvos() {
    //
    localStorage.NumeroDefiltrosPraPesquisa = 1;
    //
    document.getElementById('Number').value="";
    document.getElementById('Letter').value="";
    let table = document.getElementsByTagName('table')[0];
    table.innerHTML = '<thread><th>Nome</th><th>Valor</th><th>Data</th></thread>';
    let numeroDeValoresSalvosLS = Number(localStorage.numeroDeValoresSalvos - 1);
    let inicioDoValorRequisitado = 0;
    let finalDoValorRequisitado = 0;
    for (let i = 0; i <= 10; i++) {
        let valorSetadoAtualmente = localStorage.getItem(`n${numeroDeValoresSalvosLS - i}`)
        let j = 0;
        let tr = document.createElement('tr');
        table.appendChild(tr);
        while (j < 3) {
            switch (j) {
                case 0:
                    inicioDoValorRequisitado = valorSetadoAtualmente.lastIndexOf('-') + 1;
                    finalDoValorRequisitado = valorSetadoAtualmente.length;
                    let dif = finalDoValorRequisitado - inicioDoValorRequisitado;
                    break;
                case 1:
                    inicioDoValorRequisitado = 17;
                    finalDoValorRequisitado = valorSetadoAtualmente.lastIndexOf('-');
                    break;
                case 2:
                    inicioDoValorRequisitado = 0;
                    finalDoValorRequisitado = 16;
                default:
                    break;
            }
            let td = document.createElement('td');
            tr.appendChild(td);
            td.innerHTML = valorSetadoAtualmente.slice(inicioDoValorRequisitado, finalDoValorRequisitado);
            j++;
        }
    }
}
//Pior parte até agora 
function DeleteValue() {
    let Ll = Number(localStorage.numeroDeValoresSalvos) - 1;
    for (let i = 0; i < Ll; i++) {
        let j = i + 1;
        let CurrentValue = localStorage.getItem(`n${i}`);
        if (CurrentValue == null) {
            localStorage.setItem(`n${i}`, localStorage.getItem(`n${j}`));
            localStorage.removeItem(`n${j}`)
        }
    }
    localStorage.setItem('numeroDeValoresSalvos', Ll);
}
function AddF() {
    let LF = Number(localStorage.getItem('NumeroDefiltrosPraPesquisa'));
    let li = document.createElement('li');
    document.getElementById('ul').appendChild(li);
    let select = document.createElement('select')
    li.appendChild(select);
    select.setAttribute('id', `Filter${LF}`)
    for (let i = 1; i < 8; i++) {
        let op = document.createElement('option');
        select.appendChild(op);
        op.innerText = `${valorFiltro(i)}`;
        op.setAttribute('value', i);
    }
    let Inpt = document.createElement('input');
    li.appendChild(Inpt);
    Inpt.setAttribute('id', `Input${LF}`)
    localStorage.NumeroDefiltrosPraPesquisa = LF + 1;
    localStorage.NumeroDefiltrosPraPesquisa == 7 ? document.getElementById('SearchF').disabled = true : 0;
}
function valorFiltro(n) {
    switch (n) {
        case 1:
            n = 'Nome';
            break;
        case 2:
            n = 'Valor';
            break;
        case 3:
            n = 'Dia';
            break;
        case 4:
            n = 'Mês';
            break;
        case 5:
            n = 'Ano';
            break;
        case 6:
            n = 'Hora';
            break;
        case 7:
            n = 'Minuto';
            break;
        default:
            break;
    }
    return n;
}

function FilteValue() {
    let LF = Number(localStorage.getItem('NumeroDefiltrosPraPesquisa'));
    let quantFilters = '';
    let bS = [];
    for (let i = 0; i < LF; i++) {
        let asdas = document.getElementById(`Filter${i}`).value;
        let Inpt = document.getElementById(`Input${i}`).value;
        bS[i] = `${Inpt}`;
        quantFilters += `${asdas}`;
    }
    SearchValue(quantFilters, bS);
    pesquisa();
}
function SearchValue(qF, bS) {
    /*
    1 = minute
    2 = hour
    3 = day
    4 = month
    5 = year
    6 = number
    7 = name
    */
    let exeCode = 0;
    var rarray = [];
    let Ll = Number(localStorage.getItem('numeroDeValoresSalvos'));
    while (exeCode < Number(qF.length)) {
        let j = 0;
        let searhmethod = Number(qF[exeCode]);
        let barOfSearch = bS[exeCode]
        let typesearh;
        switch (searhmethod) {
            case 7:
                typesearh = `:${barOfSearch}-`;
                break;
            case 6:
                typesearh = `${barOfSearch}:`
                break;
            case 5:
                typesearh = `/${barOfSearch}-`
                break;
            case 4:
                typesearh = `/${barOfSearch}/`
                break;
            case 3:
                typesearh = `${barOfSearch}/`

                break;
            case 2:
                typesearh = `-${barOfSearch}-`
                break;
            case 1:
                typesearh = `-${barOfSearch}`;
                break;
        }
        if (exeCode >= 1) {
            for (let i = 0; i < rarray.length; i++) {
                //searchInOtherFilterSearched
                if (localStorage.getItem(`n${rarray[i]}`).search(typesearh) == -1) {
                    rarray[i] = rarray[rarray.length];
                    j = j + 1;
                }
            }
            rarray.sort()
            i = 0;
            while (i < j) {
                rarray.pop();
                i++;
            }
        } else {
            for (let i = 0; i < Ll; i++) {
                //searchName
                if (localStorage.getItem(`n${i}`).search(typesearh) != -1) {
                    rarray[j] = i;
                    j = j + 1;
                }
            }

        }
        exeCode = exeCode + 1;
    }
    let table = document.getElementsByTagName('table')[0];
    table.innerHTML = '<thread><th>Nome</th><th>Valor</th><th>Data</th></thread>';
    let inicioDoValorRequisitado = 0;
    let finalDoValorRequisitado = 0;
    for (let i = 0; i < rarray.length; i++) {
        //console.log(localStorage.getItem(`n${rarray[i]}`));
        let valorSetadoAtualmente = localStorage.getItem(`n${rarray[rarray.length-1-i]}`);
        let j = 0;
        let tr = document.createElement('tr');
        table.appendChild(tr);
        while (j < 3) {
            switch (j) {
                case 0:
                    inicioDoValorRequisitado = valorSetadoAtualmente.lastIndexOf('-') + 1;
                    finalDoValorRequisitado = valorSetadoAtualmente.length;
                    let dif = finalDoValorRequisitado - inicioDoValorRequisitado;
                    break;
                case 1:
                    inicioDoValorRequisitado = 17;
                    finalDoValorRequisitado = valorSetadoAtualmente.lastIndexOf('-');
                    break;
                case 2:
                    inicioDoValorRequisitado = 0;
                    finalDoValorRequisitado = 16;
                default:
                    break;
            }
            let td = document.createElement('td');
            tr.appendChild(td);
            td.innerHTML = valorSetadoAtualmente.slice(inicioDoValorRequisitado, finalDoValorRequisitado);
            j++;
        }
    }
}