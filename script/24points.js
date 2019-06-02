function plus_minus_multi_divide(array) {
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
            variable = Math.abs(array[i] - array[j]);
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

function sub_analysis(x, y, reason, number) {
    let symbols = new Array("+", "-", "*", "/");
    let this_line;
    if (x != 4 && x != 1) {
        this_line =
            "(" + String(reason[number[y][0]])
            + symbols[x] + String(reason[number[y][1]]) + ")";
    }
    else if (x == 1) {
        if (reason[number[y][0]] >= reason[number[y][1]]) {
            this_line =
                "(" + String(reason[number[y][0]])
                + "-" + String(reason[number[y][1]]) + ")";
        }
        else {
            this_line =
                "(" + String(reason[number[y][1]])
                + "-" + String(reason[number[y][0]]) + ")";
        }
    }
    else {
        this_line =
            "(" + String(reason[number[y][1]])
            + "/" + String(reason[number[y][0]]) + ")";
    }
    return this_line;

}
function analysis_back(k, m, n, initial, first_round, second_round, target) {
    let numbers1 = new Array([0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]);
    let numbers2 = new Array([0, 1], [0, 2], [1, 2]);
    let numbers3 = new Array([0, 1]);
    let not_inserted = false;
    let x = k % 5;
    let y = (k - x) / 5;
    let first_line = sub_analysis(x,y,initial,numbers1);
    x = m % 5;
    y = (m - x) / 5;
    let second_line = sub_analysis(x,y,first_round[k],numbers2);
    if(y != 0){
        second_line = second_line.replace(String(first_round[k][2]),first_line);
    }
    else{
        not_inserted = true;
    }
    x = n % 5;
    y = (n - x) / 5;
    let third_line = sub_analysis(x,y,second_round[m],numbers3);
    if(not_inserted){
        third_line = third_line.replace(String(first_round[k][2]),first_line);
        third_line = third_line.replace(String(second_round[m][1]),second_line);
    }
    else{
        third_line = third_line.replace(String(second_round[m][1]),second_line);
    }
    let complete_string = "<br/>" + third_line +"=" + target;
    return complete_string;
}

function calculate_result() {
    let count = 0;
    let bool_stop;
    let result_all = new Array();
    let initial = new Array();
    let input = document.getElementById("first").value;
    initial.push(Number(input));
    input = document.getElementById("second").value;
    initial.push(Number(input));
    input = document.getElementById("third").value;
    initial.push(Number(input));
    input = document.getElementById("fourth").value;
    initial.push(Number(input));
    target = document.getElementById("target").value;
    let oaArr = document.all('one_or_all');
    let first_round = plus_minus_multi_divide(initial);
    for (let k = 0; k < first_round.length; k++) {
        let second_round = plus_minus_multi_divide(first_round[k]);
        for (let m = 0; m < second_round.length; m++) {
            let final = plus_minus_multi_divide(second_round[m]);
            for (let n = 0; n < final.length; n++) {
                if (final[n][0] == Number(target)) {
                    let result = analysis_back(k, m, n, initial, first_round, second_round, target);
                    if (oaArr[0].checked) {
                        document.getElementById("answer").innerHTML = String(initial) + " can have a result of " + target + "." + result
                        bool_stop = true;
                        break;
                    }
                    else {
                        count = count + 1;
                        result_all.push(result);
                    }

                }
            }
            if (bool_stop) { break };
        }
        if (bool_stop) { break };
    }
    if (oaArr[0].checked && !bool_stop) { document.getElementById("answer").innerHTML = String(initial) + " can never have a result of " + target + "." }
    else if (oaArr[1].checked) { document.getElementById("answer").innerHTML = String(initial) + " can have a result of " + target + "."+ result_all + "<br/>"+ String(count) };
}