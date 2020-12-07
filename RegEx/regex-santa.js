function solve(input) {
    let key = Number(input.shift());
    let line = input.shift();
    let pattern = /[@]([A-Za-z]+)[^@\-!:>]*[!]([GN])[!]/g;
    while (line != "end") {
        let kid = "";
        for (let index = 0; index < line.length; index++) {
            const char = line[index];
            kid += String.fromCharCode(char.charCodeAt(0) - key);
        }
        let result = pattern.exec(kid);

        if( result == null){
            result = pattern.exec(kid);
        }
        // console.log(`${kid} ${result}`);

        if (result != null) {
            let name = result[1];
            let flag = result[2];
            if (flag == "G") {
                console.log(`${name}`);
            }
        }

        line = input.shift();
    }

}
// solve([
//     '3',
//     'CNdwhamigyenumje$J$',
//     'CEreelh-nmguuejn$J$',
//     'CVwdq&gnmjkvng$Q$',
//     'end'
// ]);
solve([
    '4',
    '~lwzjkl~jenlymfDFsffmiCwozwlzjln%K%',
    '0zfjrl}xnrlDWeqqmi/wnznlwzjnn%K%onhfhnf',
    ';:<lyiljz{onzDPere=;=9<;8=rhknlf%K%',
    "Wonvfkmwzkmpwvzkm'lhjnlDWeqerxle0wlnzj{nz%K%nohwn",
    'DReh}e=<4lhzj1%K%',
    'end'
]);
// solve([
//     '3',
//     "N}eideidmk$'(mnyenmCNlpamnin$J$",
//     'ddddkkkkmvkvmCFrqqru-nvevek$J$nmgievnge',
//     'ppqmkkkmnolmnnCEhq/vkievk$Q$',
//     'yyegiivoguCYdohqwlqh/kguimhk$J$',
//     'end'
// ]);