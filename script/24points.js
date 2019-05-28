function sortNumber(a, b) {
    return b - a
}

function plus_minus_multi_divide(array) {
    array = array.sort(sortNumber);
    let x = array.length;
    let sequence = new Array();
    for (let i = 0; i < x - 1; i++) {
        for (let j = i + 1; j < x; j++) {
            var [...temp] = array;
            temp.splice(i, 1);
            temp.splice(j - 1, 1);
            let variable = array[i] + array[j];
            temp.push(variable);
            sequence.push([...temp]);
            variable = array[i] - array[j];
            temp.pop();
            temp.push(variable);
            sequence.push([...temp]);
            variable = array[i] * array[j];
            temp.pop();
            temp.push(variable);
            sequence.push([...temp]);
            variable = array[i] / array[j];
            temp.pop();
            temp.push(variable);
            sequence.push([...temp]);
            variable = array[j] / array[i];
            temp.pop();
            temp.push(variable);
            sequence.push([...temp]);
        }
    }
    return sequence;
}

function analysis_back(x, m, n, initial, first_round, second_round, first_round_backup, second_round_backup, inistr, target) {
    let numbers1 = new Array([0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]);
    let numbers2 = new Array([0, 1], [0, 2], [1, 2]);
    let numbers3 = new Array([0, 1]);
    let symbols = new Array("+", "-", "*", "/");
    let y = x % 5;
    let z = (x - y) / 5;
    let first_line;
    let second_line;
    let third_line;
    if (y != 4) {
        first_line =
            String(initial[numbers1[z][0]])
            + symbols[y] + String(initial[numbers1[z][1]])
            + "=" + String(first_round_backup[2]);
    }
    else {
        first_line =
            String(initial[numbers1[z][1]])
            + "/" + String(initial[numbers1[z][0]])
            + "=" + String(first_round_backup[2]);
    }
    y = m % 5;
    z = (m - y) / 5;
    if (y != 4) {
        second_line =
            String(first_round[x][numbers2[z][0]])
            + symbols[y] + String(first_round[x].sort(sortNumber)[numbers2[z][1]])
            + "=" + String(second_round_backup[1]);
    }
    else {
        second_line =
            String(first_round[x][numbers2[z][1]])
            + "/" + String(first_round[x].sort(sortNumber)[numbers2[z][0]])
            + "=" + String(second_round_backup[1]);
    }
    y = n % 5;
    z = (n - y) / 5;
    if (y != 4) {
        third_line =
            String(second_round[m][numbers3[z][0]])
            + symbols[y] + String(second_round[m][numbers3[z][1]])
            + "=" + target;
    }
    else {
        third_line =
            String(second_round[m][numbers3[z][1]])
            + "/" + String(second_round[m][numbers3[z][0]])
            + "=" + target;
    }
    let complete_string = inistr + " can have a result of " + target + "." + "<br/>" + first_line + "<br/>" + second_line + "<br/>" + third_line + "<br/>" + "<br/>";
    return complete_string;
}

function calculate_result() {
    let count = 0;
    let bool_stop;
    let result_all = "";
    let initial = new Array();
    let input = document.getElementById("first").value;
    let inistr = "".concat(input);
    initial.push(Number(input));
    input = document.getElementById("second").value;
    inistr = inistr.concat("," + input);
    initial.push(Number(input));
    input = document.getElementById("third").value;
    inistr = inistr.concat("," + input);
    initial.push(Number(input));
    input = document.getElementById("fourth").value;
    inistr = inistr.concat("," + input);
    initial.push(Number(input));
    target = document.getElementById("target").value;
    let oaArr = document.all('one_or_all');
    let first_round = plus_minus_multi_divide(initial);
    for (let x = 0; x < first_round.length; x++) {
        [...first_round_backup] = first_round[x]
        let second_round = plus_minus_multi_divide(first_round[x]);
        for (let m = 0; m < second_round.length; m++) {
            [...second_round_backup] = second_round[m]
            let final = plus_minus_multi_divide(second_round[m]);
            for (let n = 0; n < final.length; n++) {
                if (final[n][0] == Number(target)) {
                    let result = analysis_back(x, m, n, initial, first_round, second_round, first_round_backup, second_round_backup, inistr, target);
                    if (oaArr[0].checked) {
                        document.getElementById("answer").innerHTML = result
                        bool_stop = true;
                        break;
                    }
                    else {
                        count = count + 1;
                        result_all = result_all.concat(result);
                    }

                }
            }
            if (bool_stop) { break };
        }
        if (bool_stop) { break };
    }
    if (oaArr[0].checked && !bool_stop) { document.getElementById("answer").innerHTML = inistr + " can never have a result of " + target + "." }
    else if (oaArr[1].checked) { document.getElementById("answer").innerHTML = result_all + String(count) };
}
