const sonad = ["KAALIKAS", "MAAILM", "SININE", "KASSIPOEG", "KASEMAHL", "LAUDLINA"];
let sona = "";
const arvatav_sona = []; //arvatavale sõnale teen tühja listi, mille hiljem jagan tükkideks/tähdedeks
const veeretanupp = document.getElementById("veeretanupp"); //veeretab täringut väärtuses 1-20
const veeretanupp2 = document.getElementById("veeretanupp2"); // veeretab 10-tahulist täringut väärtuses 0-90)
let elusid = 6;

//leian juhusliku sõna listist
const juhuslik_arv = Math.floor(Math.random() * sonad.length); //Juhuslik arv sõna valimiseks. Math.floor ümardab indexi allapoole täisarvuks
console.log(juhuslik_arv);
sona = sonad[juhuslik_arv];
console.log(sona);
for (let i = 0; i < sona.length; i++) { //tärnid pannakse tühjadele kohtadele tähe asemele kuniks pole avatud tähti
    arvatav_sona.push("*");
}
console.log(arvatav_sona);
document.querySelector("h1").innerHTML = arvatav_sona.join(""); //html-is näitamiseks peab lisama documendi ja siis arvatava sõna tähed jälle kokku liitma

//veeretan täringut D20 ja leian juhusliku arv 1-20
veeretanupp.addEventListener("click", () => {
    const juhuslik_arv = Math.floor(Math.random() * 20) + 1;

    if (juhuslik_arv === 20) {// kontorllin, kas täring 20 on veeretanud 1-e või 20-ne
        console.log("said ühe punkti juurde");
        elusid = elusid + 1;
    }
    if (juhuslik_arv === 1) {
        console.log("langesid välja");
        document.querySelector("h1").innerHTML = sona;
    } else {
        veeretanupp2.disabled = false; //kui oled vajutanud veereta nuppu, siis lubatakse teine veereta nupp
    }
    veeretanupp.disabled = true; //keelatakse, kui oled vajutanud esimest nuppu või mäng on läbi
    console.log("Veeretasin D20 ja sain tulemuseks: " + juhuslik_arv);
    document.getElementById("elusid").innerHTML = "Sul on veel elusid järgi: " + elusid;
});

//veeretan täringut D%, leian juhuslikub arvu 0-90 ja jagan selle pooleks, tulemus võrdub % juhusliku
// sõna tähtede arvust, mida mängijale kuvatakse. Juhuslik arv ümardatakse allapoole Math.floor-ga.
veeretanupp2.addEventListener("click", () => {
    const juhuslik_arv2 = Math.floor(Math.random() * 10) * 10;
    const pool = juhuslik_arv2 / 2;
    const avada = (sona.length * pool) / 100; // mitu tähte mängijale avatakse (pole veel täisarv)
    console.log("Veeretasid D%, mille veeretamise tulemus oli " + juhuslik_arv2 + ". Valitud sõnas on " + sona.length + "tähte," +
        "seega " + pool + "% " + sona.length + "-st on " + avada + " , ehk kasutajale avatakse " + Math.floor(avada) + " tähte."
    );
    for (let i = 0; i < Math.floor(avada); i++) { // iga avatava tähe jaoks käin sõna läbi
        // SININE
        const juhuslik_taht = Math.floor(Math.random() * sona.length); //arvutan välja juhusliku tähe koha
        arvatav_sona[juhuslik_taht] = sona[juhuslik_taht]; //asendan tärni õige tähega
    }
    console.log(arvatav_sona);
    document.querySelector("h1").innerHTML = arvatav_sona.join(""); //näitan arvatavat sõna uuesti uute tähtedega
    veeretanupp2.disabled = true; // kui oled vajutanud veereta2 nuppu, siis lubatakse arvamise nupp
    document.getElementById("lisataht").disabled = false;
});

document.getElementById("lisataht").addEventListener("click", () => {
    const taht = document.getElementById("sisestataht").value.toUpperCase(); //lisan suurte tähtede tegemise funk. juhul, kui mängija peaks väiksed sisestama
    if (taht > "") { //kontrollin, et sisestatud oleks täht, mitte midagi muud (tühik)
        let taht_leitud = false; //vaikimisi ütlen, et tähte ei leitud
        for (let i = 0; i < sona.length; i++) { //käin tähed läbi, kontrollin, kas sisestatud täht on juba olemas ja õige tähe korral asendan
            if (sona[i] === taht) {
                arvatav_sona[i] = sona[i]; //tärni asemele panen tähe algsest sõnast
                taht_leitud = true; //tõeväärtuse kontroll, kui tähe leidsin (et elusid maha ei võetaks)
            }
        }
        if (taht_leitud === false) { //kontrollin, kas tähte ei olnud ja võtan elu maha
            elusid = elusid - 1;
        }
        if (elusid === 0) {
            console.log("Mäng läbi");
            document.querySelector("h1").innerHTML = sona; //näitab arvatavat sõna
            document.getElementById("lisataht").disabled = true; //lisamise nupp on keelatud, kui elusid on 0
        } else {
            document.querySelector("h1").innerHTML = arvatav_sona.join(""); //näitan arvatavat sõna uuesti uute tähtedega
        }
        if (arvatav_sona.filter(t => t === "*").length === 0) { //filtreerib massiivi, tulemuseks on allesolevad tärnid
            console.log("Arvasid ära sõna " + sona + ", oled mängu võitnud!");
            document.getElementById("lisataht").disabled = true; // lisamise nupp on keelatud, kui mäng on võidetud
        }
    }
    document.getElementById("sisestataht").value = ""; //tühjendab input kasti
    document.getElementById("elusid").innerHTML = "Elusid on " + elusid; //näitab elusid ekraanil
});





