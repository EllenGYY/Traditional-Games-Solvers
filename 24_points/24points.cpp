#include <vector>
#include <stack>
#include <algorithm>
#include <iostream>
#include <sstream>

int SymPos(char i){
	char symbols[4] = { '+', '-', '*', '/' };
	for (int k = 0; k < 4; k++) {
		if (i == symbols[k]) {
			return k;
		}
	}
}

double Dijk2Stack(std::string eval) {
	eval = eval + ")";
	char notNum[6] = { '+', '-', '*', '/', '(', ')' };
	std::stack<double> nums;
	std::stack<char> syms;
	bool lastIsNum = false;

	for (int i = 0; i < eval.length(); i++) { 
		char now = eval[i];
		bool isSym = false;
		for (int k = 0; k < 6; k++) {
			if (now == notNum[k]) {
				isSym = true;
			}
		}

		if (isSym) {
			lastIsNum = false;
			if (now == ')') {
				double a = nums.top();
				nums.pop();
				double b = nums.top();
				nums.pop();
				char s = syms.top();
				syms.pop();
				if (s == '+') {
					nums.push(b + a);
				}
				else if (s == '-') {
					nums.push(b - a);
				}
				else if (s == '*') {
					nums.push(b * a);
				}
				else if (s == '/') {
					nums.push(b / a);
				}
			}
			else if (now != '(') {
				syms.push(now);
			}
		}
		else {
			std::stringstream str;
			str << now; double x; str >> x;
			if (lastIsNum) {
				double old = nums.top();
				nums.pop();
				nums.push(10 * old + x);
			}
			else {
				nums.push(x);
			}
			lastIsNum = true;
		}
	}
	return nums.top();
}

void check24(std::string eval, std::vector<std::string>(*ans), int (*num)) {
	if (Dijk2Stack(eval) == 24.0) {
		std::cout << eval + "=24" << std::endl;
		//(*ans).push_back(eval + "=24");
	}
	(*num)++;
}

int main() {
	int number = 0;
	int a, b, c, d;
	char symbols[4] = { '+', '-', '*', '/' };
	std::vector<std::string> answers;

	std::cin >> a >> b >> c >> d;
	std::cout << "You choose " << a << ", " << b << ", " << c << ", " << d << " for 24 points." << std::endl;
	int numsarray[4] = { a, b, c, d };
	std::vector<int> numbers(numsarray, numsarray + 4);
	std::sort(numbers.begin(), numbers.end());
	do{
		std::cout << numbers[0] << numbers[1] << numbers[2] << numbers[3] << std::endl;
		char sym_chosen[3];
		for (int i = 0; i < 64; i++) {
			sym_chosen[0] = symbols[i / 16];
			sym_chosen[1] = symbols[(i - i / 16 * 16) / 4];
			sym_chosen[2] = symbols[(i - i / 4 * 4)];
			std::string eval = "((" + std::to_string(numbers[0]) + sym_chosen[0] + std::to_string(numbers[1]) + ")" + sym_chosen[1] + std::to_string(numbers[2]) + ")" + sym_chosen[2] + std::to_string(numbers[3]);
			check24(eval, &answers, &number);
			if(SymPos(sym_chosen[0]) / 2 == SymPos(sym_chosen[1]) / 2 && SymPos(sym_chosen[1]) / 2 == SymPos(sym_chosen[2]) / 2){
				continue;
			}
			if(SymPos(sym_chosen[0]) / 2 != SymPos(sym_chosen[1]) / 2){
				eval = "(" + std::to_string(numbers[0]) + sym_chosen[0] + "(" + std::to_string(numbers[1]) + sym_chosen[1] + std::to_string(numbers[2]) + "))" + sym_chosen[2] + std::to_string(numbers[3]);
				check24(eval, &answers, &number);
			}
			if(SymPos(sym_chosen[0]) / 2 != SymPos(sym_chosen[2]) / 2) {
				eval = std::to_string(numbers[0]) + sym_chosen[0] + "((" + std::to_string(numbers[1]) + sym_chosen[1] + std::to_string(numbers[2]) + ")" + sym_chosen[2] + std::to_string(numbers[3]) + ")";
				check24(eval, &answers, &number);
			}
			if(SymPos(sym_chosen[1]) / 2 != SymPos(sym_chosen[2]) / 2){
				eval = std::to_string(numbers[0]) + sym_chosen[0] + "(" + std::to_string(numbers[1]) + sym_chosen[1] + "(" + std::to_string(numbers[2]) + sym_chosen[2] + std::to_string(numbers[3]) + "))";
				check24(eval, &answers, &number);
			}
			if(SymPos(sym_chosen[0]) / 2 != SymPos(sym_chosen[1]) / 2 && SymPos(sym_chosen[1]) / 2 != SymPos(sym_chosen[2]) / 2){
				eval = "(" + std::to_string(numbers[0]) + sym_chosen[0] + std::to_string(numbers[1]) + ")" + sym_chosen[1] + "(" + std::to_string(numbers[2]) + sym_chosen[2] + std::to_string(numbers[3]) + ")";
				check24(eval, &answers, &number);
			}
		}
	} while (std::next_permutation(numbers.begin(), numbers.end()));
	std::cout << number << "\n";
	std::cout << answers.size() << "\n";

	for (std::vector<std::string>::const_iterator it = answers.begin(); it != answers.end(); it++) {
		std::cout << *it << "\n";
	}
	std::cout << "\n";

	return 0;
}
