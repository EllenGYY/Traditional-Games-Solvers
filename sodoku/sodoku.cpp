#include <iostream>
#include <vector>
#include <map> 
#include <algorithm>
#include <iterator>
using namespace std;

int initial_sodoku[9][9] = {
		{1,0,7,6,0,0,0,0,9},{0,9,6,1,8,0,0,4,0},{0,0,5,0,7,0,0,6,0},
		{0,0,0,0,0,0,5,0,4},{0,6,0,5,1,7,0,9,0},{7,0,8,0,0,0,0,0,0},
		{0,7,0,0,4,0,8,0,0},{0,1,0,0,3,6,9,2,0},{3,0,0,0,0,2,4,0,6}
	};
map<int,vector<int> > record;


void del_impossi(int element, vector<int> *par){
	vector<int>::iterator it = find((*par).begin(), (*par).end(), element);
    if (it != (*par).end()) {
    	(*par).erase(it);
    }
}

void check_before(int pos[]){
	for(int i = 0; i < pos[0]; i ++){
		if(initial_sodoku[i][pos[1]] == 0){
			del_impossi(initial_sodoku[pos[0]][pos[1]], &record[i * 10 + pos[1]]);
			if(record[i * 10 + pos[1]].size() == 1){
				initial_sodoku[i][pos[1]] = record[i * 10 + pos[1]][0];
				int next[2] = {i, pos[1]};
				check_before(next);
			}
		}
	}
	for(int i = 0; i < pos[1]; i ++){
		if(initial_sodoku[pos[0]][i] == 0){
			del_impossi(initial_sodoku[pos[0]][pos[1]], &record[pos[0] * 10 + i]);
			if(record[pos[0] * 10 + i].size() == 1){
				initial_sodoku[pos[0]][i] = record[pos[0] * 10 + i][0];
				int next[2] = {pos[0], i};
				check_before(next);
			}
		}
	}
	bool break_twice = false;
	for (int m = pos[0] + 1; m < pos[0] - pos[0] % 3 + 3; m ++){
        for(int n = pos[1] - pos[1] % 3; n < pos[1] - pos[1] % 3 + 3; n ++){
            if(m != pos[0] && n != pos[1]){
                if(initial_sodoku[m][n] == 0){
                	map<int,vector<int> >::iterator it = record.find(m * 10 + n);
   					if(it != record.end()){
   						del_impossi(initial_sodoku[pos[0]][pos[1]], &record[m * 10 + n]);
   						if(record[m * 10 + n].size() == 1){
						initial_sodoku[m][n] = record[m * 10 + n][0];
						int next[2] = {m, n};
						check_before(next);
	   					}else{
	   						break_twice = true;
	   						break;
	   					}
	   				}
                }
            }
        }
        if(break_twice){break;}
    }
}

void related_left(int pos[]){
	vector<int> possi;
	for(int i = 1; i < 10; i ++){
		possi.push_back(i);
	}
	for(int i = 0; i < 9; i ++){
		if(i != pos[0]){
			if(initial_sodoku[i][pos[1]] != 0){
				del_impossi(initial_sodoku[i][pos[1]], &possi);
			}
		}
	}
	for(int i = 0; i < 9; i ++){
		if(i != pos[1]){
			if(initial_sodoku[pos[0]][i] != 0){
				del_impossi(initial_sodoku[pos[0]][i], &possi);
			}
		}
	}
    for (int m = pos[0] + 1; m < pos[0] - pos[0] % 3 + 3; m ++){
        for(int n = pos[1] - pos[1] % 3; n < pos[1] - pos[1] % 3 + 3; n ++){
            if(m != pos[0] && n != pos[1]){
                if(initial_sodoku[m][n] != 0){
                    del_impossi(initial_sodoku[m][n], &possi);
                }
            }
        }
    }
    if(possi.size() == 1){
    	initial_sodoku[pos[0]][pos[1]] = possi[0];
    	check_before(pos);
    }
    else{
    	record[pos[0] * 10 + pos[1]] = possi;
    }
}

int main()
{
	for(int i = 0; i < 9; i ++){
		for(int j = 0; j < 9; j ++){
			if(initial_sodoku[i][j] == 0){
				int coor[2] = {i, j};
				related_left(coor);
			}
		}
	}
	for (int i = 0; i < 9; i ++){
		for( int j = 0; j < 9; j ++){
			cout << initial_sodoku[i][j] << ", ";
		}
	}
}