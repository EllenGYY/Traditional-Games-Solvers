#include <vector>
#include <algorithm>
#include <iostream>
#include <map>
#include <cstdio>
#include <ctime>
using namespace std;

bool findInFirst(map<int,int> (*record), int element){
    for(map<int,int>::const_iterator it = (*record).begin(); it != (*record).end(); it ++)
    {
        if((it -> first) == element){
            return true;
        }
    }
    return false;
}

bool findInSecond(map<int,int> (*record), int element){
    for(map<int,int>::const_iterator it = (*record).begin(); it != (*record).end(); it ++)
    {
        if((*record)[it -> first]== element){
            return true;
        }
    }
    return false;
}

void queensFunc(map<int, int> &queens, map<int, int> &grids, vector<vector<int> > *ans, vector<vector<int> > &sodoku, int row){
    if(queens.size() == 9){
        vector<int> temp_board;
        for(int i = 0; i < 9; i ++){
            temp_board.push_back(queens[i]);
        }
        (*ans).push_back(temp_board);
        return;
    }
    map<int, int> gridsn(grids);
    map<int, int> queensn(queens);
    if(!findInFirst(&queens, row)){
        for(int i = 0; i < 9; i ++){
            if(sodoku[row][i] == 0){
                int grid = row / 3 * 3 + i / 3;
                if(findInSecond(&queens, i) || findInSecond(&grids, grid)){
                    continue;
                }
                gridsn[row] = grid;
                queensn[row] = i;
                queensFunc(queensn, gridsn, ans, sodoku, ++row);
                row --;
            }
        }
        return;
    }
    row ++;
    queensFunc(queensn, gridsn, ans, sodoku, row);     
}

vector<vector<int> > solveNumber(int num, vector<vector<int> > &sodoku) {
    vector<vector<int> > ans;
    map<int,int> queens;
    map<int,int> grids;
    for(int i = 0; i < 9; i ++){
        for(int j = 0; j < 9; j ++){
            if(sodoku[i][j] == num){
                grids[i] = i / 3 * 3 + j / 3;
                queens[i] = j;
            }
        }
    }
    queensFunc(queens, grids, &ans, sodoku, 0);
    return ans;
}

void solveWhole(int num, vector<vector<int> > &sodoku, vector<vector<vector<int> > > *whole_ans){
	if( (*whole_ans).size() > 0){
		return;
	}
    if(num == 10){
    	(*whole_ans).push_back(sodoku);
    	return;
    }
    vector<vector<int> > possis = solveNumber(num, sodoku);
    if(possis.size() == 0){
    	return;
    }
    for(vector<vector<int> >::const_iterator it = possis.begin(); it != possis.end(); it ++){
    	vector<vector<int> > sodokun(sodoku);
    	for(int i = 0; i < 9; i ++){
    		sodokun[i][(*it)[i]] = num;
    	}
    	solveWhole(++num, sodokun, whole_ans);
    	num --;
	}
}

int main(){
	vector<vector<vector<int> > > whole_ans;
    vector<vector<int> > initial_sodoku;
    initial_sodoku.resize(9);
    for(int i = 0; i < 81; i ++){
    	int a;
    	cin >> a;
    	initial_sodoku[i / 9].push_back(a);
    }
    clock_t start = clock();
    solveWhole(1, initial_sodoku, &whole_ans);
    double duration = ( clock() - start ) / (double) CLOCKS_PER_SEC;
    cout << duration << endl;
    for(vector<vector<vector<int> > >::const_iterator ite = whole_ans.begin(); ite != whole_ans.end(); ite ++){
    	for(vector<vector<int> >::const_iterator it = (*ite).begin(); it != (*ite).end(); it ++){
	        for (vector<int>::const_iterator i = (*it).begin(); i != (*it).end(); i ++){
	            cout << *i << " ";
	        }
        	cout << "\n";
    	}
    	cout << "\n";	
    }
    return 0;
}
