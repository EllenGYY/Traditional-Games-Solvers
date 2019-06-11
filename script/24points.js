function sortNumber(a, b) {
    return b - a
}

function in_array(search, array) {
    for (var i in array) {
        if (array[i] == search) {
            return true;
        }
    }
    return false;
}

function toString(array) {
    let answer = "";
    for (let i = 0; i < array.length; i++) {
        answer = answer.concat(array[i]);
    }
    return answer;
}

function super_splice(reason, result, loc) {
    result.splice(loc, 1, reason[0]);
    for (let i = 1; i < reason.length; i++) {
        result.splice(loc + i, 0, reason[i]);
    }
}

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
    let this_line = new Array(5);
    if (x != 4 && x != 1) {
        this_line[0] = "(";
        this_line[1] = String(reason[number[y][0]]);
        this_line[2] = symbols[x];
        this_line[3] = String(reason[number[y][1]]);
        this_line[4] = ")";
    }
    else if (x == 1) {
        if (reason[number[y][0]] >= reason[number[y][1]]) {
            this_line[0] = "(";
            this_line[1] = String(reason[number[y][0]]);
            this_line[2] = "-";
            this_line[3] = String(reason[number[y][1]]);
            this_line[4] = ")";
        }
        else {
            this_line[0] = "(";
            this_line[1] = String(reason[number[y][1]]);
            this_line[2] = "-";
            this_line[3] = String(reason[number[y][0]]);
            this_line[4] = ")";
        }
    }
    else {
        this_line[0] = "(";
        this_line[1] = String(reason[number[y][1]]);
        this_line[2] = "/";
        this_line[3] = String(reason[number[y][0]]);
        this_line[4] = ")";
    }
    return this_line;
}

function analysis_back(k, m, n, initial, first_round, second_round) {
    let numbers1 = new Array([0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]);
    let numbers2 = new Array([0, 1], [0, 2], [1, 2]);
    let numbers3 = new Array([0, 1]);
    let not_inserted = false;
    let x = k % 5;
    let y = (k - x) / 5;
    let first_line = sub_analysis(x, y, initial, numbers1);
    x = m % 5;
    y = (m - x) / 5;
    let second_line = sub_analysis(x, y, first_round[k], numbers2);
    if (y != 0) {
        if (second_line[1] == String(first_round[k][2])) {
            super_splice(first_line, second_line, 1);
        }
        else {
            super_splice(first_line, second_line, 3);
        }
    }
    else {
        not_inserted = true;
    }
    x = n % 5;
    y = (n - x) / 5;
    let third_line = sub_analysis(x, y, second_round[m], numbers3);
    if (not_inserted) {
        if (third_line[1] == String(first_round[k][2])) {
            super_splice(first_line, third_line, 1);
            super_splice(second_line, third_line, 7);
        }
        else {
            super_splice(second_line, third_line, 1);
            super_splice(first_line, third_line, 7);
        }
    }
    else {
        if (third_line[1] == String(second_round[m][1])) {
            super_splice(second_line, third_line, 1);
        }
        else {
            super_splice(second_line, third_line, 3);
        }
    }
    return third_line;
}

function levelize(result) {
    result.pop();
    result.shift();
    let para_list = new Array();
    for (let i = 0; i < result.length; i++) {
        if (result[i] == "(" || result[i] == ")") {
            para_list.push(i);
        }
    }
    if (result[para_list[1]] == ")") {
        result[para_list[2]] = "[";
        result[para_list[3]] = "]";
    }
    else {
        result[para_list[0]] = "[";
        result[para_list[3]] = "]";
    }
    return result;
}

function on_the_same_level(result, before, after) {
    let x = result.indexOf(before);
    let symbol_one;
    let symbol_two;
    let begin;
    if (x != 0 && (before == "[" || result[x - 1] != "[")) {
        begin = true;
        symbol_one = x - 1;
        if (result[x + 1] == "(") {
            symbol_two = result.indexOf(")") + 1;
        } else { symbol_two = x + 2; }
    } else {
        begin = false;
        x = result.indexOf(after);
        symbol_two = x + 1;
        if (result[x - 1] == ")") {
            symbol_one = result.indexOf("(") - 1;
        } else { symbol_one = x - 2; }
    }
    if (result[symbol_one] == "*" || result[symbol_one] == "/") {
        if (result[symbol_two] == "*" || result[symbol_two] == "/") {
            if (begin && result[symbol_one] == "/") {
                if (result[symbol_two] == "/") { result[symbol_two] = "*"; }
                else { result[symbol_two] = "/"; }
                if (result.indexOf("(") == -1) {
                    if (result[symbol_two + 2] == "/") { result[symbol_two + 2] = "*"; }
                    else { result[symbol_two + 2] = "/"; }
                }
            }
            result.splice(x, 1);
            if (begin) { result.splice(result.indexOf(after), 1); }
            else { result.splice(result.indexOf(before), 1); }
        }
        else {
            if (begin) { result.splice(result.indexOf(before) + 1, 0, "+"); }
            else { result.splice(result.indexOf(before) + 1, 0, "*"); }
        }
    }
    else {
        if (result[symbol_two] == "+" || result[symbol_two] == "-") {
            if (begin && result[symbol_one] == "-") {
                if (result[symbol_two] == "-") { result[symbol_two] = "+"; }
                else { result[symbol_two] = "-"; }
                if (result.indexOf("(") == -1) {
                    if (result[symbol_two + 2] == "-") { result[symbol_two + 2] = "+"; }
                    else { result[symbol_two + 2] = "-"; }
                }
            }
            result.splice(x, 1);
            if (begin) { result.splice(result.indexOf(after), 1); }
            else { result.splice(result.indexOf(before), 1); }
        }
        else {
            if (begin) { result.splice(result.indexOf(before) + 1, 0, "*"); }
            else { result.splice(result.indexOf(before) + 1, 0, "+"); }
        }
    }
    return result;
}

function sub_sequence(start, end, result) {
    let quantity = end - start + 1;
    let number_array = new Array(quantity / 2);
    let new_sequence = new Array(quantity);
    let j_array = new Array();
    for (let x = 0; x < quantity / 2; x++) {
        number_array[x] = Number(result[start + 2 * x + 1]);
    }
    number_array = number_array.sort(sortNumber);
    for (let i = 0; i < quantity / 2; i++) {
        for (let j = 1; j < quantity; j = j + 2) {
            if (number_array[i] == result[start + j] && !(in_array(j, j_array))) {
                new_sequence[2 * i] = result[start + j - 1];
                new_sequence[2 * i + 1] = result[start + j];
                j_array.push(j);
                break;
            }
        }
    }
    for (let _ = 0; _ < quantity / 2 - 1; _++) {
        if (new_sequence[2 * _ + 1] == new_sequence[2 * _ + 3]) {
            if (new_sequence[2 * _] != new_sequence[2 * _ + 2]) {
                if (new_sequence[2 * _ + 2] == "+") {
                    new_sequence[2 * _] = "+";
                    new_sequence[2 * _ + 2] = "-";
                }
                if (new_sequence[2 * _ + 2] == "*") {
                    new_sequence[2 * _] = "*";
                    new_sequence[2 * _ + 2] = "/";
                }
            }
        }
    }
    return new_sequence;
}

function sequence(result) {
    if (result.indexOf("[") != -1) {
        if (result.indexOf("[") - result.indexOf("]") == -5) {
            result[result.indexOf("[")] = "(";
            result[result.indexOf("]")] = ")";
        }
    }
    if (result[result.indexOf(")") + 2] == "(") {
        result.splice(1, 6, "(" + toString(sub_sequence(2, 5, result)) + ")");
        result.splice(3, 6, "(" + toString(sub_sequence(4, 7, result)) + ")");
        if (result[1] > result[3]) {
            let temp = result[3];
            result[3] = result[1];
            result[1] = temp;
        }
        return result;
    }
    if (result.indexOf("(") != -1 && result.indexOf("[") == -1) {
        let t = result.indexOf("(");
        result.splice(t, 6, "(" + toString(sub_sequence(t + 1, t + 4, result)) + ")");
        if(t != 1){
        let temp1 = result[0];
        let temp2 = result[1];
        result[0] = result[t-1];
        result[1] = result[t];
        result[t-1] = temp1;
        result[t] = temp2;
        }
        let new_ = new Array(result[0],result[1]);
        new_ = new_.concat(sub_sequence(2,5,result));
        return new_;
    }
    if (result.indexOf("(") != -1 && result.indexOf("[") != -1) {
        let t = result.indexOf("(");
        let k = result.indexOf("[");
        result.splice(t, 6, "(" + toString(sub_sequence(t + 1, t + 4, result)) + ")");
        if (result[k + 2] > result[k + 4]) {
            let temp1 = result[k + 3];
            let temp2 = result[k + 4];
            result[k + 3] = result[k + 1];
            result[k + 4] = result[k + 2];
            result[k + 1] = temp1;
            result[k + 2] = temp2;
        }
        let answer = "";
        for (let i = k; i < k + 6; i++) {
            answer = answer.concat(result[i]);
        }
        result.splice(k,6,answer);
        if (result[1] > result[3]) {
            let temp3 = result[2];
            let temp4 = result[3];
            result[2] = result[0];
            result[3] = result[1];
            result[0] = temp3;
            result[1] = temp4;
        }
        return result;

    }
    if (result.indexOf("(") == -1 && result.indexOf("[") != -1) {
        let k = result.indexOf("[");
        result.splice(k, 8, "[" + toString(sub_sequence(k + 1, k + 6, result)) + "]");
        if (result[1] > result[3]) {
            let temp1 = result[2];
            let temp2 = result[3];
            result[2] = result[0];
            result[3] = result[1];
            result[0] = temp1;
            result[1] = temp2;
        }
        return result;
    }
    if (result.indexOf("(") == -1 && result.indexOf("[") == -1) {
        result = sub_sequence(0, 7, result);
        return result;
    }
    return result;
}

function format(result_all, target) {
    let most_outside_symbol;
    for (let i = 0; i < result_all.length; i++) {
        let result = result_all[i];
        if (result.indexOf("[") != 0) {
            most_outside_symbol = result[result.indexOf("[") - 1];
        }
        else { most_outside_symbol = result[result.indexOf("]") + 1]; }
        result = on_the_same_level(result, "(", ")");
        result = on_the_same_level(result, "[", "]");
        if (most_outside_symbol == "*" || most_outside_symbol == "/") {
            result.splice(0, 0, "*");
        } else { result.splice(0, 0, "+"); }
        result = sequence(result);
        result_all[i] = "<br>" + toString(result) + "=" + target;
    }
    return result_all
}

function delete_same(result_all) {
    let result_deleted = new Array();
    result_all = result_all.sort();
    result_deleted.push(result_all[0]);
    for (let i = 1; i < result_all.length; i++) {
        if (result_all[i] != result_deleted[result_deleted.length - 1]) {
            result_deleted.push(result_all[i]);
        }
    }
    return result_deleted
}

function calculate_result() {
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
                    let result = analysis_back(k, m, n, initial, first_round, second_round);
                    result = levelize(result);
                    let result_string = "";
                    for (let j = 0; j < result.length; j++) {
                        result_string = result_string.concat(result[j]);
                    }
                    if (oaArr[0].checked) {
                        document.getElementById("answer").innerHTML = String(initial) + " can have a result of " + target + "." + "<br>" + result_string + "=" + target;
                        bool_stop = true;
                        break;
                    }
                    else {
                        result_all.push(result);
                    }
                }
            }
            if (bool_stop) { break };
        }
        if (bool_stop) { break };
    }
    if (oaArr[0].checked && !bool_stop) { document.getElementById("answer").innerHTML = String(initial) + " can never have a result of " + target + "." }
    else if (oaArr[1].checked) {
        let result_ultimate = delete_same(format(result_all, target));
        document.getElementById("answer").innerHTML = String(initial) + " can have a result of " + target + "." + result_ultimate;
    };
}