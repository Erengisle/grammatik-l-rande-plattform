// Tvåstegsformat: stage 1 = identifiera grupp, stage 2 = välj rätt adjektivform
// word = adjektivet (visas stort)
// context = hela frasen med ___ som blank (t.ex. "en ___ bil")
// Grupp A: en/ett/några/ingen/vilket/varje/sådan osv + OBESTÄMD form
// Grupp B: den/det/de (här/där) + BESTÄMD form
// Grupp C: min/mitt/mina, Evas (genitiv), samma/nästa/följande + BESTÄMD form

export const ADJ_GROUP_ABC = [
  // ── GRUPP A ──────────────────────────────────────────────────────────────
  {id:"adjg01",type:"two_stage",word:"fin",context:"en ___ bil",
   groupType:"adj_abc",correctGroup:"A",stageQ:"Välj rätt form av adjektivet:",
   options:{A:"fin",B:"fint",C:"fina",D:"fine"},correct:"A"},

  {id:"adjg02",type:"two_stage",word:"fin",context:"ett ___ hus",
   groupType:"adj_abc",correctGroup:"A",stageQ:"Välj rätt form av adjektivet:",
   options:{A:"fin",B:"fint",C:"fina",D:"fine"},correct:"B"},

  {id:"adjg03",type:"two_stage",word:"rolig",context:"några ___ filmer",
   groupType:"adj_abc",correctGroup:"A",stageQ:"Välj rätt form av adjektivet:",
   options:{A:"rolig",B:"roligt",C:"roliga",D:"rolige"},correct:"C"},

  {id:"adjg04",type:"two_stage",word:"gammal",context:"ingen ___ man",
   groupType:"adj_abc",correctGroup:"A",stageQ:"Välj rätt form av adjektivet:",
   options:{A:"gammal",B:"gammalt",C:"gamla",D:"gammel"},correct:"A"},

  {id:"adjg05",type:"two_stage",word:"ny",context:"vilket ___ jobb",
   groupType:"adj_abc",correctGroup:"A",stageQ:"Välj rätt form av adjektivet:",
   options:{A:"ny",B:"nytt",C:"nya",D:"nye"},correct:"B"},

  // ── GRUPP B ──────────────────────────────────────────────────────────────
  {id:"adjg06",type:"two_stage",word:"fin",context:"den ___ bilen",
   groupType:"adj_abc",correctGroup:"B",stageQ:"Välj rätt form av adjektivet:",
   options:{A:"fin",B:"fint",C:"fina",D:"fine"},correct:"C"},

  {id:"adjg07",type:"two_stage",word:"stor",context:"det ___ huset",
   groupType:"adj_abc",correctGroup:"B",stageQ:"Välj rätt form av adjektivet:",
   options:{A:"stor",B:"stort",C:"stora",D:"store"},correct:"C"},

  {id:"adjg08",type:"two_stage",word:"ny",context:"de ___ kläderna",
   groupType:"adj_abc",correctGroup:"B",stageQ:"Välj rätt form av adjektivet:",
   options:{A:"ny",B:"nytt",C:"nya",D:"nye"},correct:"C"},

  {id:"adjg09",type:"two_stage",word:"gammal",context:"den här ___ boken",
   groupType:"adj_abc",correctGroup:"B",stageQ:"Välj rätt form av adjektivet:",
   options:{A:"gammal",B:"gammalt",C:"gamla",D:"gammel"},correct:"C"},

  {id:"adjg10",type:"two_stage",word:"liten",context:"det där ___ barnet",
   groupType:"adj_abc",correctGroup:"B",stageQ:"Välj rätt form av adjektivet:",
   options:{A:"liten",B:"litet",C:"lilla",D:"lite"},correct:"C"},

  // ── GRUPP C ──────────────────────────────────────────────────────────────
  {id:"adjg11",type:"two_stage",word:"fin",context:"min ___ bil",
   groupType:"adj_abc",correctGroup:"C",stageQ:"Välj rätt form av adjektivet:",
   options:{A:"fin",B:"fint",C:"fina",D:"fine"},correct:"C"},

  {id:"adjg12",type:"two_stage",word:"rolig",context:"mitt ___ jobb",
   groupType:"adj_abc",correctGroup:"C",stageQ:"Välj rätt form av adjektivet:",
   options:{A:"rolig",B:"roligt",C:"roliga",D:"rolige"},correct:"C"},

  {id:"adjg13",type:"two_stage",word:"gammal",context:"Evas ___ cykel",
   groupType:"adj_abc",correctGroup:"C",stageQ:"Välj rätt form av adjektivet:",
   options:{A:"gammal",B:"gammalt",C:"gamla",D:"gammel"},correct:"C"},

  {id:"adjg14",type:"two_stage",word:"lång",context:"nästa ___ semester",
   groupType:"adj_abc",correctGroup:"C",stageQ:"Välj rätt form av adjektivet:",
   options:{A:"lång",B:"långt",C:"långa",D:"länge"},correct:"C"},

  {id:"adjg15",type:"two_stage",word:"ny",context:"samma ___ regler",
   groupType:"adj_abc",correctGroup:"C",stageQ:"Välj rätt form av adjektivet:",
   options:{A:"ny",B:"nytt",C:"nya",D:"nye"},correct:"C"},
];

// Komparationsgrupper:
// Grupp 1: –are, –ast  (de flesta adjektiv: rolig→roligare, roligast)
// Grupp 2: –re, –st med omljud  (hög, ung, tung, låg, lång, stor, grov)
// Grupp 3: oregelbundna  (gammal/äldre, liten/mindre, bra/bättre, dålig/sämre)
// Grupp 4: mer / mest  (adjektiv på –isk, perfekt particip, presens particip)

export const ADJ_KOMP = [
  {
    id:"komp01", type:"two_stage",
    word:"rolig",
    context:"",
    groupType:"comp_1234", correctGroup:"1",
    stageQ:"Välj komparativ form:",
    options:{A:"roligare",B:"roligre",C:"mer rolig",D:"roligaste"},
    correct:"A"
  },
  {
    id:"komp02", type:"two_stage",
    word:"gammal",
    context:"",
    groupType:"comp_1234", correctGroup:"3",
    stageQ:"Välj komparativ form:",
    options:{A:"gammaldare",B:"äldre",C:"gammalare",D:"gammare"},
    correct:"B"
  },
  {
    id:"komp03", type:"two_stage",
    word:"ung",
    context:"",
    groupType:"comp_1234", correctGroup:"2",
    stageQ:"Välj komparativ form:",
    options:{A:"ungare",B:"ungre",C:"yngre",D:"unge"},
    correct:"C"
  },
  {
    id:"komp04", type:"two_stage",
    word:"praktisk",
    context:"",
    groupType:"comp_1234", correctGroup:"4",
    stageQ:"Välj komparativ form:",
    options:{A:"praktiskare",B:"praktiskre",C:"mer praktisk",D:"mest praktisk"},
    correct:"C"
  },
  {
    id:"komp05", type:"two_stage",
    word:"bra",
    context:"",
    groupType:"comp_1234", correctGroup:"3",
    stageQ:"Välj komparativ form:",
    options:{A:"braare",B:"bättra",C:"bättre",D:"mer bra"},
    correct:"C"
  },
  {
    id:"komp06", type:"two_stage",
    word:"hög",
    context:"",
    groupType:"comp_1234", correctGroup:"2",
    stageQ:"Välj superlativ, obestämd form:",
    options:{A:"högast",B:"högre",C:"högst",D:"högest"},
    correct:"C"
  },
  {
    id:"komp07", type:"two_stage",
    word:"intresserad",
    context:"",
    groupType:"comp_1234", correctGroup:"4",
    stageQ:"Välj komparativ form:",
    options:{A:"intresseradare",B:"mer intresserad",C:"intresseradre",D:"intresseradast"},
    correct:"B"
  },
  {
    id:"komp08", type:"two_stage",
    word:"liten",
    context:"",
    groupType:"comp_1234", correctGroup:"3",
    stageQ:"Välj komparativ form:",
    options:{A:"litenare",B:"litnare",C:"mindres",D:"mindre"},
    correct:"D"
  },
  {
    id:"komp09", type:"two_stage",
    word:"snabb",
    context:"",
    groupType:"comp_1234", correctGroup:"1",
    stageQ:"Välj superlativ, obestämd form:",
    options:{A:"snabbast",B:"snabbest",C:"mest snabb",D:"snabbaste"},
    correct:"A"
  },
  {
    id:"komp10", type:"two_stage",
    word:"stor",
    context:"",
    groupType:"comp_1234", correctGroup:"2",
    stageQ:"Välj komparativ form:",
    options:{A:"storare",B:"störe",C:"större",D:"storar"},
    correct:"C"
  },
  {
    id:"komp11", type:"two_stage",
    word:"dålig",
    context:"",
    groupType:"comp_1234", correctGroup:"3",
    stageQ:"Välj komparativ form:",
    options:{A:"dåligare",B:"sämre",C:"dåligre",D:"mer dålig"},
    correct:"B"
  },
  {
    id:"komp12", type:"two_stage",
    word:"musikalisk",
    context:"",
    groupType:"comp_1234", correctGroup:"4",
    stageQ:"Välj superlativ, obestämd form:",
    options:{A:"musikaliskast",B:"mest musikalisk",C:"musikaliskest",D:"musikaliskre"},
    correct:"B"
  },
  {
    id:"komp13", type:"two_stage",
    word:"lång",
    context:"",
    groupType:"comp_1234", correctGroup:"2",
    stageQ:"Välj superlativ, obestämd form:",
    options:{A:"längast",B:"längest",C:"längst",D:"mest lång"},
    correct:"C"
  },
  {
    id:"komp14", type:"two_stage",
    word:"nyfiken",
    context:"",
    groupType:"comp_1234", correctGroup:"1",
    stageQ:"Välj komparativ form:",
    options:{A:"nyfiknare",B:"nyfikenare",C:"mer nyfiken",D:"nyfikare"},
    correct:"A"
  },
  {
    id:"komp15", type:"two_stage",
    word:"spännande",
    context:"",
    groupType:"comp_1234", correctGroup:"4",
    stageQ:"Välj komparativ form:",
    options:{A:"spännandemare",B:"mer spännande",C:"spännandeaste",D:"spännanst"},
    correct:"B"
  },
  // ── Bestämd form superlativ (den/det/de + -aste) ──────────────────────────
  {
    id:"komp16", type:"two_stage",
    word:"duktig",
    context:"den ___",
    groupType:"comp_1234", correctGroup:"1",
    stageQ:"Välj superlativ, bestämd form:",
    options:{A:"duktigast",B:"duktigaste",C:"mer duktig",D:"duktigare"},
    correct:"B"
  },
  {
    id:"komp17", type:"two_stage",
    word:"hög",
    context:"det ___",
    groupType:"comp_1234", correctGroup:"2",
    stageQ:"Välj superlativ, bestämd form:",
    options:{A:"högst",B:"högre",C:"högsta",D:"höge"},
    correct:"C"
  },
  {
    id:"komp18", type:"two_stage",
    word:"gammal",
    context:"de ___",
    groupType:"comp_1234", correctGroup:"3",
    stageQ:"Välj superlativ, bestämd form:",
    options:{A:"äldst",B:"äldsta",C:"äldre",D:"gammaldaste"},
    correct:"B"
  },
  {
    id:"komp19", type:"two_stage",
    word:"praktisk",
    context:"den ___",
    groupType:"comp_1234", correctGroup:"4",
    stageQ:"Välj superlativ, bestämd form:",
    options:{A:"mest praktisk",B:"mest praktiska",C:"praktiskast",D:"mer praktisk"},
    correct:"B"
  },
  {
    id:"komp20", type:"two_stage",
    word:"snabb",
    context:"de ___",
    groupType:"comp_1234", correctGroup:"1",
    stageQ:"Välj superlativ, bestämd form:",
    options:{A:"snabbast",B:"snabbaste",C:"snabbast",D:"mest snabba"},
    correct:"B"
  },
];

export const BUILT_IN_TESTS_ADJ = [
  {
    id:"adj-abc",
    title:"Adjektiv, uppgift 1 – böjningsgrupp A, B eller C",
    category:"Adjektiv – grupper",
    source:"",
    locked:true,
    questions:ADJ_GROUP_ABC
  },
  {
    id:"adj-komp",
    title:"Adjektiv, uppgift 2 – komparationsgrupp 1–4",
    category:"Adjektiv – komparering",
    source:"",
    locked:true,
    questions:ADJ_KOMP
  },
];

export const ADJ_CATEGORIES = [
  "Adjektiv – grupper",
  "Adjektiv – komparering",
];
