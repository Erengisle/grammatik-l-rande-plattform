// Verbgrupper – tvåstegsformat, blandade grupper
// word = IMPERATIV (det eleverna ser)
// Grupp 1:  imperativ = infinitiv (måla!)
// Grupp 2a: imperativ = stam utan -a (bygg!, kör!)
// Grupp 2b: imperativ = stam utan -a (sök!, köp!)
// Grupp 3:  imperativ = grundformen (tro!, bo!)
// Grupp 4:  stark eller oregelbunden (bind!, skriv!, ta!, var!)

const ALL_VERB = [
  // GRUPP 1  (imperativ = infinitiv)
  {id:"v1_01",type:"two_stage",word:"måla",context:"Han ___ tavlan igår.",groupType:"verb_1234",correctGroup:"1",stageQ:"Välj rätt preteritumform:",options:{A:"målade",B:"målar",C:"målde",D:"målte"},correct:"A"},
  {id:"v1_02",type:"two_stage",word:"jobba",context:"Vi ___ hela helgen.",groupType:"verb_1234",correctGroup:"1",stageQ:"Välj rätt preteritumform:",options:{A:"jobbde",B:"jobbte",C:"jobbade",D:"jobbar"},correct:"C"},
  {id:"v1_03",type:"two_stage",word:"starta",context:"Hon ___ sitt eget företag.",groupType:"verb_1234",correctGroup:"1",stageQ:"Välj rätt preteritumform:",options:{A:"startde",B:"startade",C:"startte",D:"startar"},correct:"B"},
  {id:"v1_04",type:"two_stage",word:"titta",context:"De ___ på film.",groupType:"verb_1234",correctGroup:"1",stageQ:"Välj rätt preteritumform:",options:{A:"tittde",B:"tittar",C:"tittade",D:"tittat"},correct:"C"},
  {id:"v1_05",type:"two_stage",word:"hoppas",context:"Jag ___ att det gick bra.",groupType:"verb_1234",correctGroup:"1",stageQ:"Välj rätt preteritumform:",options:{A:"hoppade",B:"hoppades",C:"hoppas",D:"hoppar"},correct:"B"},
  // GRUPP 2a (imperativ = stam, –de i preteritum)
  {id:"v2a_01",type:"two_stage",word:"bygg",context:"De ___ huset på tre månader.",groupType:"verb_1234",correctGroup:"2a",stageQ:"Välj rätt preteritumform:",options:{A:"byggade",B:"byggde",C:"byggte",D:"byggede"},correct:"B"},
  {id:"v2a_02",type:"two_stage",word:"kör",context:"Han ___ bil till jobbet.",groupType:"verb_1234",correctGroup:"2a",stageQ:"Välj rätt preteritumform:",options:{A:"körde",B:"körade",C:"körte",D:"kör"},correct:"A"},
  {id:"v2a_03",type:"two_stage",word:"lägg",context:"Hon ___ barnet i sängen.",groupType:"verb_1234",correctGroup:"2a",stageQ:"Välj rätt preteritumform:",options:{A:"läggade",B:"lagde",C:"la/lade",D:"läggde"},correct:"C"},
  {id:"v2a_04",type:"two_stage",word:"sälj",context:"De ___ huset förra året.",groupType:"verb_1234",correctGroup:"2a",stageQ:"Välj rätt preteritumform:",options:{A:"säljade",B:"sälde",C:"sälte",D:"sålde"},correct:"D"},
  {id:"v2a_05",type:"two_stage",word:"gör",context:"Vad ___ du igår?",groupType:"verb_1234",correctGroup:"2a",stageQ:"Välj rätt preteritumform:",options:{A:"görade",B:"gjorde",C:"görde",D:"gorde"},correct:"B"},
  {id:"v2a_06",type:"two_stage",word:"sätt",context:"Hon ___ sig vid bordet.",groupType:"verb_1234",correctGroup:"2a",stageQ:"Välj rätt preteritumform:",options:{A:"satte",B:"sätade",C:"sättade",D:"sätte"},correct:"A"},
  // GRUPP 2b (imperativ = stam, –te i preteritum, p/t/k/s/x i stammen)
  {id:"v2b_01",type:"two_stage",word:"sök",context:"Han ___ ett nytt jobb.",groupType:"verb_1234",correctGroup:"2b",stageQ:"Välj rätt preteritumform:",options:{A:"sökte",B:"sökade",C:"sökde",D:"söker"},correct:"A"},
  {id:"v2b_02",type:"two_stage",word:"hjälp",context:"De ___ honom med flytten.",groupType:"verb_1234",correctGroup:"2b",stageQ:"Välj rätt preteritumform:",options:{A:"hjälpade",B:"hjälpde",C:"hjälpte",D:"hjälper"},correct:"C"},
  {id:"v2b_03",type:"two_stage",word:"sköt",context:"Hon ___ sina plikter.",groupType:"verb_1234",correctGroup:"2b",stageQ:"Välj rätt preteritumform:",options:{A:"skötte",B:"skötade",C:"skötde",D:"sköter"},correct:"A"},
  {id:"v2b_04",type:"two_stage",word:"lås",context:"Jag ___ dörren.",groupType:"verb_1234",correctGroup:"2b",stageQ:"Välj rätt preteritumform:",options:{A:"låsade",B:"låste",C:"låsde",D:"låser"},correct:"B"},
  {id:"v2b_05",type:"two_stage",word:"väx",context:"Barnen ___ fort.",groupType:"verb_1234",correctGroup:"2b",stageQ:"Välj rätt preteritumform:",options:{A:"växade",B:"växde",C:"växte",D:"växer"},correct:"C"},
  // GRUPP 3 (imperativ = grundformen, lång vokal)
  {id:"v3_01",type:"two_stage",word:"tro",context:"Jag ___ att han hade rätt.",groupType:"verb_1234",correctGroup:"3",stageQ:"Välj rätt preteritumform:",options:{A:"troade",B:"trode",C:"trodde",D:"troar"},correct:"C"},
  {id:"v3_02",type:"two_stage",word:"bo",context:"De ___ i Stockholm förut.",groupType:"verb_1234",correctGroup:"3",stageQ:"Välj rätt preteritumform:",options:{A:"boade",B:"bode",C:"bodde",D:"bor"},correct:"C"},
  {id:"v3_03",type:"two_stage",word:"sy",context:"Mormor ___ klänningen själv.",groupType:"verb_1234",correctGroup:"3",stageQ:"Välj rätt preteritumform:",options:{A:"syade",B:"syde",C:"sydde",D:"syr"},correct:"C"},
  {id:"v3_04",type:"two_stage",word:"klä",context:"Hon ___ sig snabbt.",groupType:"verb_1234",correctGroup:"3",stageQ:"Välj rätt preteritumform:",options:{A:"kläade",B:"klädde",C:"klätte",D:"klär"},correct:"B"},
  {id:"v3_05",type:"two_stage",word:"nå",context:"Vi ___ äntligen fram.",groupType:"verb_1234",correctGroup:"3",stageQ:"Välj rätt preteritumform:",options:{A:"nådde",B:"nåde",C:"nåade",D:"når"},correct:"A"},
  // GRUPP 4 – starka och oregelbundna
  {id:"v4_01",type:"two_stage",word:"bind",context:"Han ___ paketet med ett snöre.",groupType:"verb_1234",correctGroup:"4",stageQ:"Välj rätt preteritumform:",options:{A:"bindade",B:"band",C:"bindde",D:"bindte"},correct:"B"},
  {id:"v4_02",type:"two_stage",word:"drick",context:"Vi ___ kaffe på mötet.",groupType:"verb_1234",correctGroup:"4",stageQ:"Välj rätt preteritumform:",options:{A:"drack",B:"drackde",C:"drackade",D:"drickade"},correct:"A"},
  {id:"v4_03",type:"two_stage",word:"spring",context:"Hon ___ maraton förra helgen.",groupType:"verb_1234",correctGroup:"4",stageQ:"Välj rätt preteritumform:",options:{A:"springade",B:"sprang",C:"sprungade",D:"springde"},correct:"B"},
  {id:"v4_04",type:"two_stage",word:"sitt",context:"De ___ och väntade i en timme.",groupType:"verb_1234",correctGroup:"4",stageQ:"Välj rätt preteritumform:",options:{A:"satt",B:"sittade",C:"satte",D:"suttade"},correct:"A"},
  {id:"v4_05",type:"two_stage",word:"vinn",context:"Sverige ___ matchen.",groupType:"verb_1234",correctGroup:"4",stageQ:"Välj rätt preteritumform:",options:{A:"vinnde",B:"vann",C:"vunnde",D:"vinnade"},correct:"B"},
  {id:"v4_06",type:"two_stage",word:"skriv",context:"Hon ___ ett långt brev.",groupType:"verb_1234",correctGroup:"4",stageQ:"Välj rätt preteritumform:",options:{A:"skrivade",B:"skrivde",C:"skrev",D:"skrive"},correct:"C"},
  {id:"v4_07",type:"two_stage",word:"stig",context:"Temperaturen ___ snabbt.",groupType:"verb_1234",correctGroup:"4",stageQ:"Välj rätt preteritumform:",options:{A:"stigde",B:"steg",C:"stigade",D:"stigte"},correct:"B"},
  {id:"v4_08",type:"two_stage",word:"bit",context:"Hunden ___ honom i handen.",groupType:"verb_1234",correctGroup:"4",stageQ:"Välj rätt preteritumform:",options:{A:"bitade",B:"bitde",C:"bet",D:"bette"},correct:"C"},
  {id:"v4_09",type:"two_stage",word:"bli",context:"Hon ___ läkare.",groupType:"verb_1234",correctGroup:"4",stageQ:"Välj rätt preteritumform:",options:{A:"blide",B:"bliade",C:"blivde",D:"blev"},correct:"D"},
  {id:"v4_10",type:"two_stage",word:"driv",context:"Strömmen ___ båten mot land.",groupType:"verb_1234",correctGroup:"4",stageQ:"Välj rätt preteritumform:",options:{A:"drivde",B:"drev",C:"drivade",D:"drove"},correct:"B"},
  {id:"v4_11",type:"two_stage",word:"bjud",context:"De ___ oss på middag.",groupType:"verb_1234",correctGroup:"4",stageQ:"Välj rätt preteritumform:",options:{A:"bjudade",B:"bjudde",C:"bjöd",D:"bjude"},correct:"C"},
  {id:"v4_12",type:"two_stage",word:"ljug",context:"Han ___ för polisen.",groupType:"verb_1234",correctGroup:"4",stageQ:"Välj rätt preteritumform:",options:{A:"ljugade",B:"ljög",C:"ljugde",D:"ljuge"},correct:"B"},
  {id:"v4_13",type:"two_stage",word:"bryt",context:"Han ___ armen.",groupType:"verb_1234",correctGroup:"4",stageQ:"Välj rätt preteritumform:",options:{A:"brytade",B:"brytte",C:"bröt",D:"brutade"},correct:"C"},
  {id:"v4_14",type:"two_stage",word:"flyg",context:"Vi ___ till Bangkok.",groupType:"verb_1234",correctGroup:"4",stageQ:"Välj rätt preteritumform:",options:{A:"flygade",B:"flög",C:"flygde",D:"flögte"},correct:"B"},
  {id:"v4_15",type:"two_stage",word:"frys",context:"Det ___ hårt natten till lördag.",groupType:"verb_1234",correctGroup:"4",stageQ:"Välj rätt preteritumform:",options:{A:"frysade",B:"frysde",C:"frös",D:"fröste"},correct:"C"},
  {id:"v4_16",type:"two_stage",word:"stryk",context:"Mamma ___ skjortorna.",groupType:"verb_1234",correctGroup:"4",stageQ:"Välj rätt preteritumform:",options:{A:"strykade",B:"strykde",C:"strök",D:"strukte"},correct:"C"},
  {id:"v4_17",type:"two_stage",word:"dra",context:"Han ___ i bromsen.",groupType:"verb_1234",correctGroup:"4",stageQ:"Välj rätt preteritumform:",options:{A:"drade",B:"drog",C:"drög",D:"drakte"},correct:"B"},
  {id:"v4_18",type:"two_stage",word:"ta",context:"Hon ___ tåget till Göteborg.",groupType:"verb_1234",correctGroup:"4",stageQ:"Välj rätt preteritumform:",options:{A:"taade",B:"tade",C:"tog",D:"tög"},correct:"C"},
  {id:"v4_19",type:"two_stage",word:"slå",context:"Klockan ___ tolv.",groupType:"verb_1234",correctGroup:"4",stageQ:"Välj rätt preteritumform:",options:{A:"slåde",B:"slog",C:"slög",D:"slåade"},correct:"B"},
  {id:"v4_20",type:"two_stage",word:"bär",context:"Han ___ kassen ensam.",groupType:"verb_1234",correctGroup:"4",stageQ:"Välj rätt preteritumform:",options:{A:"bärde",B:"burde",C:"bar",D:"bärade"},correct:"C"},
  {id:"v4_21",type:"two_stage",word:"skär",context:"Hon ___ sig på kniven.",groupType:"verb_1234",correctGroup:"4",stageQ:"Välj rätt preteritumform:",options:{A:"skärde",B:"skar",C:"skurade",D:"skärade"},correct:"B"},
  {id:"v4_22",type:"two_stage",word:"stjäl",context:"Tjuven ___ plånboken.",groupType:"verb_1234",correctGroup:"4",stageQ:"Välj rätt preteritumform:",options:{A:"stjälde",B:"stulade",C:"stal",D:"stjälte"},correct:"C"},
  {id:"v4_23",type:"two_stage",word:"gråt",context:"Barnet ___ hela natten.",groupType:"verb_1234",correctGroup:"4",stageQ:"Välj rätt preteritumform:",options:{A:"gråtade",B:"grät",C:"gråtte",D:"grätade"},correct:"B"},
  {id:"v4_24",type:"two_stage",word:"låt",context:"Det ___ konstigt.",groupType:"verb_1234",correctGroup:"4",stageQ:"Välj rätt preteritumform:",options:{A:"låtade",B:"lät",C:"låtte",D:"lättade"},correct:"B"},
  {id:"v4_25",type:"two_stage",word:"fall",context:"Han ___ och slog sig.",groupType:"verb_1234",correctGroup:"4",stageQ:"Välj rätt preteritumform:",options:{A:"fallade",B:"föll",C:"fäll",D:"fallde"},correct:"B"},
  {id:"v4_26",type:"two_stage",word:"håll",context:"Hon ___ i räcket hela vägen.",groupType:"verb_1234",correctGroup:"4",stageQ:"Välj rätt preteritumform:",options:{A:"hållade",B:"höll",C:"hull",D:"hållde"},correct:"B"},
  {id:"v4_27",type:"two_stage",word:"kom",context:"De ___ för sent.",groupType:"verb_1234",correctGroup:"4",stageQ:"Välj rätt preteritumform:",options:{A:"kommade",B:"kömde",C:"kom",D:"komde"},correct:"C"},
  {id:"v4_28",type:"two_stage",word:"var",context:"Det ___ kallt igår.",groupType:"verb_1234",correctGroup:"4",stageQ:"Välj rätt preteritumform:",options:{A:"varade",B:"var",C:"varde",D:"vare"},correct:"B"},
  {id:"v4_29",type:"two_stage",word:"se",context:"Jag ___ honom på stan.",groupType:"verb_1234",correctGroup:"4",stageQ:"Välj rätt preteritumform:",options:{A:"seade",B:"sedde",C:"såg",D:"säg"},correct:"C"},
  {id:"v4_30",type:"two_stage",word:"gå",context:"Vi ___ hem tidigt.",groupType:"verb_1234",correctGroup:"4",stageQ:"Välj rätt preteritumform:",options:{A:"gåde",B:"gick",C:"gångde",D:"ginge"},correct:"B"},
  {id:"v4_31",type:"two_stage",word:"få",context:"Han ___ ett nytt jobb.",groupType:"verb_1234",correctGroup:"4",stageQ:"Välj rätt preteritumform:",options:{A:"fådde",B:"finge",C:"fick",D:"fåde"},correct:"C"},
  {id:"v4_32",type:"two_stage",word:"ha",context:"De ___ inte råd.",groupType:"verb_1234",correctGroup:"4",stageQ:"Välj rätt preteritumform:",options:{A:"havde",B:"hade",C:"haft",D:"har"},correct:"B"},
  {id:"v4_33",type:"two_stage",word:"vet",context:"Ingen ___ svaret.",groupType:"verb_1234",correctGroup:"4",stageQ:"Välj rätt preteritumform:",options:{A:"vetade",B:"vet",C:"visste",D:"vetde"},correct:"C"},
  {id:"v4_34",type:"two_stage",word:"stå",context:"Han ___ och väntade länge.",groupType:"verb_1234",correctGroup:"4",stageQ:"Välj rätt preteritumform:",options:{A:"stodde",B:"stod",C:"stådde",D:"stode"},correct:"B"},
  {id:"v4_35",type:"two_stage",word:"ge",context:"Hon ___ honom en present.",groupType:"verb_1234",correctGroup:"4",stageQ:"Välj rätt preteritumform:",options:{A:"gede",B:"givde",C:"gav",D:"gäv"},correct:"C"},
  {id:"v4_36",type:"two_stage",word:"sjung",context:"Kören ___ vackert.",groupType:"verb_1234",correctGroup:"4",stageQ:"Välj rätt preteritumform:",options:{A:"sjungade",B:"sjöng",C:"sjungde",D:"sjängde"},correct:"B"},
  {id:"v4_37",type:"two_stage",word:"sjunk",context:"Skeppet ___ snabbt.",groupType:"verb_1234",correctGroup:"4",stageQ:"Välj rätt preteritumform:",options:{A:"sjunkade",B:"sjunkde",C:"sjönk",D:"sjunkte"},correct:"C"},
  {id:"v4_38",type:"two_stage",word:"skjut",context:"Han ___ prick.",groupType:"verb_1234",correctGroup:"4",stageQ:"Välj rätt preteritumform:",options:{A:"skjutade",B:"sköt",C:"skjöt",D:"skjutte"},correct:"B"},
  {id:"v4_39",type:"two_stage",word:"knyt",context:"Hon ___ ihop paketet.",groupType:"verb_1234",correctGroup:"4",stageQ:"Välj rätt preteritumform:",options:{A:"knytte",B:"knytade",C:"knöt",D:"knutte"},correct:"C"},
  {id:"v4_40",type:"two_stage",word:"ät",context:"Vi ___ middag tidigt.",groupType:"verb_1234",correctGroup:"4",stageQ:"Välj rätt preteritumform:",options:{A:"åt",B:"ätade",C:"ät",D:"åtade"},correct:"A"},
];

// Genuint blandad ordning – varje test innehåller alla grupper
const IDX1=[21,0,11,16,29,5,33,2,23,13,37,8,41,18,25,35,27,31,43,39];
const IDX2=[22,1,12,6,30,17,44,3,24,14,34,9,20,48,26,40,28,32,46,38];

export const BUILT_IN_TESTS_VERB = [
  {id:"verb-uppg1",title:"Verb, uppgift 1",category:"Verb – grupper",source:"",locked:true,questions:IDX1.map(i=>ALL_VERB[i])},
  {id:"verb-uppg2",title:"Verb, uppgift 2",category:"Verb – grupper",source:"",locked:true,questions:IDX2.map(i=>ALL_VERB[i])},
];

export const VERB_CATEGORIES = ["Verb – grupper"];
