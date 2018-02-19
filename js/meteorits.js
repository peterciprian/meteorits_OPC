function getData(url, callbackFunc) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callbackFunc(this);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function successAjax(xhttp) {
    // itt a json content, benne a data változóban
    var data = xhttp.responseText;
    // Innen, ide dolgozz... Itt hívd meg a függvényeid stb. A json file tartalma innen érhető csak
    ///////////////////////////////////////////////////////////////////////////////////////////



    var datas = JSON.parse(data);

    var table = document.createElement("TABLE");
    table.setAttribute('class', 'meteorits');
    document.body.appendChild(table);

    var tab = `<tr>
    <td> id </td>
    <td> mass </td>
    <td> name </td>
    <td> nametype </td>
    <td> recclass </td>
    <td> reclat </td>
    <td> reclong </td>
    <td> year </td>
    </tr>`;
    //document.querySelector('.meteorits').innerHTML = tab;


    function createTable() {


        for (var i = 0; i < datas.length; i++) {
            tab += '<tr>';
            tab += `
            <tr>
            <td> ${Number(datas[i].id).toFixed(2)} </td>
            <td> ${Number(datas[i].mass).toFixed(2)} </td>
            <td> ${datas[i].name} </td>
            <td> ${datas[i].nametype} </td>
            <td> ${datas[i].recclass} </td>
            <td> ${Number(datas[i].reclat).toFixed(2)} </td>
            <td> ${Number(datas[i].reclong).toFixed(2)} </td>
            <td> ${datas[i].year}. </td>
            </tr>`;
        }
        document.querySelector('.meteorits').innerHTML = tab;
        table.getElementsByTagName('TD')[0].setAttribute('onclick', "sort('id')");
        table.getElementsByTagName('TD')[1].setAttribute('onclick', "sort('mass')");
        table.getElementsByTagName('TD')[2].setAttribute('onclick', "sort('name')");
        table.getElementsByTagName('TD')[4].setAttribute('onclick', "sort('recclass')");
    }
    createTable();

    function sort(attr) {

        var tmp;
        for (var i = 0; i < datas.length - 1; i++) {
            for (var j = i + 1; j < datas.length; j++) {
                if (datas[i][attr] > datas[j][attr]) {
                    tmp = datas[i];
                    datas[i] = datas[j];
                    datas[j] = tmp;
                }
            }
        }
        createTable();
    }
    calculate();

    function calculate() {
        var result = [];
        result.sum = 0;
        result.min = datas[0];
        result.max = datas[0];
        result.avg = datas[0];
        result.db = 0;
        result.greats = 0;
        for (i in datas) {
            if (datas[i].mass < result.min.mass) {
                result.min = datas[i];
            }
            if (datas[i].mass > result.max.mass) {
                result.max = datas[i];
            }
            result.sum += datas[i].mass;
        }
        result.avg = result.sum / datas.length;

        var min = document.createElement("P");
        min.setAttribute('class', 'min');
        min.setAttribute('innertext', result.min.mass);
        document.body.appendChild(min);

        var max = document.createElement("P");
        max.setAttribute('class', 'max');
        max.setAttribute('innertext', result.max.mass);
        document.body.appendChild(max);

        var avg = document.createElement("P");
        avg.setAttribute('class', 'avg');
        avg.setAttribute('innertext', result.avg.mass);
        document.body.appendChild(avg);
        console.log(result);
    }


    /////////////////////////////////////////////////////////////////////////////////////////
    // Live servert használd mindig
}

getData('/js/meteorits.json', successAjax);



/* 
    A kapott JSON file a Föld-be csapódott meteoritok adatait tartalmazza.

    FELADATOK:
    1. Írasd ki egy táblázatba a következő adatait a meteoritoknak:
        id
        mass
        name
        nametype
        recclass
        reclat
        reclong
        year

     Pozitív, ha ezeket az elemeket nem az innerHTML segítségével hozod létre. 

    2. A táblázatban formázd a tömeget 2 tizedes jegy pontosan. Ha kell kerekíts a legközelebbi egészre.
       A matamatikai kerekítés szabályait használd. Ha valahol egész érték van, ott is legyen a 00 kiiratva
       az egész érték után .
       Formázd a dátumot az alábbi formátumba: 1990. 01. 02. 
    
    3. A táblázat fejlécére kattintva növekvő sorrendbe lehessen rendezni a táblázat adatait az alábbi
       meteorit tulajdonságok szerint: id, mass, name, és reclass.
       Az id és a mass szerinti rendezés számok alapján rendezzen.

    4.  Valósítsd meg a rendezést úgy, hogy nem csak növekvő, hanem csökkenő sorrendbe is lehessen az adatokat rendezni.
        Ha az adatok még nincsenek rendezve, akkor az adott fejlév/tulajdonság alapján növekvő sorrendbe rendezze az adatokat kattintásra.
        Amennyiben még egyszer ugyanarra a fejlécre kattintanak, akkor a sorrend legyen csökkenő. És így tovább....
        Amennyiben egy új fejlécre kattintanak, először mindig növekvő sorrend szerint legyenek az  adatok rendezve.

    5. A táblázat alá az alábbi adatokat ki kell iratni/számolni:

        Az összes meteorit összsúlya
        A legkönyebb meteorit súlya
        A legnehezebb meteorit súlya
        A meteoritok súlyának átlaga
        Hány darab meteorit csapódott be 1990-ben
        Hány darab meteorit súlya legalább 10000

        Ezeket az elemeket ne az innerHTML segítségével hozd létre. Használd az ismert node metódusokat. KÖTELEZŐEN!

    6. Legyen szép a táblázat és az adatok. HAsználj CSS-t a formázáshoz.

    7. Töltsd fel az elkészült fileokat egy github repoba, és küld el a repo elérhetőségét.

    8. Szusszanj egyet.

*/