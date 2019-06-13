function sortNumber(a, b) {
    return b - a
}

function in_array(search, array) {
    for (let i in array) {
        if (array[i] == search) {
            return i;
        }
    }
    return -1;
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

function substitute(result, first, second) {
    let temp1 = result[first - 1];
    let temp2 = result[first];
    result[first - 1] = result[second - 1];
    result[first] = result[second];
    result[second - 1] = temp1;
    result[second] = temp2;
    return result;
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
            if (number_array[i] == result[start + j] && in_array(j, j_array) == -1) {
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
            substitute(result, 1, 3);
        }
    }
    else if (result.indexOf("(") != -1 && result.indexOf("[") == -1) {
        let t = result.indexOf("(");
        result.splice(t, 6, "(" + toString(sub_sequence(t + 1, t + 4, result)) + ")");
        if (t != 1) {
            result = substitute(result, 1, t);
        }
        let new_ = new Array(result[0], result[1]);
        new_ = new_.concat(sub_sequence(2, 5, result));
        result = new_;
    }
    else if (result.indexOf("(") != -1 && result.indexOf("[") != -1) {
        let t = result.indexOf("(");
        let k = result.indexOf("[");
        result.splice(t, 6, "(" + toString(sub_sequence(t + 1, t + 4, result)) + ")");
        if (result[k + 2] > result[k + 4]) {
            result = substitute(result, k + 2, k + 4);
        }
        let answer = "";
        for (let i = k; i < k + 6; i++) {
            answer = answer.concat(result[i]);
        }
        result.splice(k, 6, answer);
        if (result[1] > result[3]) {
            result = substitute(result, 1, 3);
        }
    }
    else if (result.indexOf("(") == -1 && result.indexOf("[") != -1) {
        let k = result.indexOf("[");
        result.splice(k, 8, "[" + toString(sub_sequence(k + 1, k + 6, result)) + "]");
        if (result[1] > result[3]) {
            result = substitute(result, 1, 3);
        }
    }
    else if (result.indexOf("(") == -1 && result.indexOf("[") == -1) {
        result = sub_sequence(0, 7, result);
    }
    return result;
}

function sub_beautiful(result_slice) {
    while (true) {
        if (result_slice[0] == "+" || result_slice[0] == "*") {
            result_slice = result_slice.slice(1);
            break;
        } else {
            if (result_slice[1] == "(") {
                result_slice = (result_slice.slice(result_slice.indexOf(")") + 1)).concat(result_slice.slice(0, result_slice.indexOf(")") + 1));
            }
            else if (result_slice[1] == "[") {
                result_slice = (result_slice.slice(result_slice.indexOf("]") + 1)).concat(result_slice.slice(0, result_slice.indexOf("]") + 1));
            }
            else {
                for (let i = 1; i < 100; i++) {
                    if (isNaN(Number(result_slice[i]))) {
                        result_slice = (result_slice.slice(i)).concat(result_slice.slice(0, i));
                        break;
                    }
                }
            }
        }
    }
    return result_slice;
}

function make_it_beautiful(result) {
    result = sub_beautiful(result);
    if (result.indexOf("(") != -1) {
        if (result[result.indexOf("(") + 1] == "+" || result[result.indexOf("(") + 1] == "*") {
            result = (result.slice(0, result.indexOf("(") + 1)).concat(result.slice(result.indexOf("(") + 2));
        }
        else {
            result = result.slice(0, result.indexOf("(") + 1) + sub_beautiful(result.slice(result.indexOf("(") + 1, result.indexOf(")"))) + result.slice(result.indexOf(")"));
        }
        if (result[result.indexOf(")") + 2] == "(") {
            if (result[result.indexOf(")") + 3] == "+" || result[result.indexOf(")") + 3] == "*") {
                result = (result.slice(0, result.indexOf(")") + 3)).concat(result.slice(result.indexOf(")") + 4));
            }
            else {
                result = result.slice(0, result.indexOf(")") + 3) + sub_beautiful(result.slice(result.indexOf(")") + 3, -1)) + ")";
            }
        }
    }
    if (result.indexOf("[") != -1) {
        if (result[result.indexOf("[") + 1] == "+" || result[result.indexOf("[") + 1] == "*") {
            result = (result.slice(0, result.indexOf("[") + 1)).concat(result.slice(result.indexOf("[") + 2));
        }
        else {
            result = result.slice(0, result.indexOf("[") + 1) + sub_beautiful(result.slice(result.indexOf("[") + 1, result.indexOf("]"))) + result.slice(result.indexOf("]"));
        }
        if (result.indexOf("(") == -1) {
            result = (result.slice(0, result.indexOf("["))).concat("(" + result.slice(result.indexOf("[") + 1));
            result = (result.slice(0, result.indexOf("]"))).concat(")" + result.slice(result.indexOf("]") + 1));
        }
    }
    return result;
}

function format(result_all, target) {
    let most_outside_symbol;
    let result_string;
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
        result_string = toString(result);
        result_string = make_it_beautiful(result_string);
        result_all[i] = "<br>" + result_string + "=" + target;
    }
    return result_all
}

function delete_same(result_all) {
    let result_deleted = new Array();
    result_all.sort();
    result_deleted.push(result_all[0]);
    for (let i = 1; i < result_all.length; i++) {
        if (result_all[i] != result_deleted[result_deleted.length - 1]) {
            result_deleted.push(result_all[i]);
        }
    }
    return result_deleted;
}

function calculate_result() {
    let bool_success = false;
    let result_all = new Array();
    let initial = new Array();
    let inputall = document.getElementById("first").value;
    let the_last_comma = 0;
    for (let i = 0; i < inputall.length; i++) {
        if (inputall[i] == ",") {
            initial.push(Number(inputall.slice(the_last_comma, i)));
            the_last_comma = i + 1;
        }
    }
    initial.push(Number(inputall.slice(the_last_comma)));
    if (isNaN(initial[0]) || isNaN(initial[1]) || isNaN(initial[2]) || isNaN(initial[3]) || !isNaN(initial[4])) {
        alert("INVAILD INPUT! PLEASE REINPUT!")
        cleanup();
    }
    else {
        let target = document.getElementById("target").value;
        let first_round = plus_minus_multi_divide(initial);
        for (let k = 0; k < first_round.length; k++) {
            let second_round = plus_minus_multi_divide(first_round[k]);
            for (let m = 0; m < second_round.length; m++) {
                let final = plus_minus_multi_divide(second_round[m]);
                for (let n = 0; n < final.length; n++) {
                    if (final[n][0] == Number(target)) {
                        let result = analysis_back(k, m, n, initial, first_round, second_round);
                        result = levelize(result);
                        result_all.push(result);
                        bool_success = true;
                    }
                }
            }
        }
        if (!bool_success) { document.getElementById("answer").innerHTML = String(initial) + " can never have a result of " + target + "." }
        else {
            let result_ultimate = delete_same(format(result_all, target));
            document.getElementById("answer").innerHTML = String(initial) + " can have a result of " + target + "." + result_ultimate + ".";
        }
    }
}

function cleanup() {
    document.getElementById("first").value = "";
    document.getElementById("answer").innerHTML = "";
}