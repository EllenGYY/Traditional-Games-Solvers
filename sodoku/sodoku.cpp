#include <iostream>
#include <vector>
#include <map> 
#include <algorithm>
#include <iterator>
using namespace std;

int initial_sodoku[9][9] = {
		{0,7,0,2,0,0,0,8,0},{0,0,0,0,5,0,0,0,0},{0,0,3,6,0,0,0,0,2},
		{0,0,0,0,0,0,6,0,9},{0,0,0,3,0,0,0,0,0},{3,0,7,0,0,6,0,0,0},
		{5,0,0,0,0,4,7,0,0},{0,0,0,0,9,0,0,0,0},{0,3,0,0,0,1,0,9,0}
	};
map<int,vector<int> > record;


void del_impossi(int element, vector<int> *par){
	vector<int>::iterator it = find((*par).begin(), (*par).end(), element);
    if (it != (*par).end()) {
    	(*par).erase(it);
    }
}

vector<int> find_related(int coor){
	vector<int> related;
	int y = coor % 10;
	int x = (coor - y) / 10;
	for(int i = 0; i < 9; i ++){
		if(i != x){
			related.push_back(10 * i + y);
		}
		if(i != y){
			related.push_back(10 * x + i);
		}
	}
	for (int m = x - x % 3; m < x - x % 3 + 3; m ++){
        for(int n = y - y % 3; n < y - y % 3 + 3; n ++){
            if(m != x || n != y){
            	related.push_back(10 * m + n);
            }
        }
    }
	return related;
}

void check_before(int coor){
	vector<int> related = find_related(coor);
	for(vector<int>::iterator it = related.begin(); it != related.end(); it ++){
		if(initial_sodoku[((*it) - (*it) % 10) / 10][(*it) % 10] == 0){
			del_impossi(initial_sodoku[(coor - coor % 10) / 10][coor % 10], &record[*it]);
			if(record[*it].size() == 1){
				initial_sodoku[((*it) - (*it) % 10) / 10][(*it) % 10] = record[*it][0];
				check_before(*it);
			}
		}
	}
}

void possible_choice(int coor){
	vector<int> possi;
	vector<int> related = find_related(coor);
	for(int i = 1; i < 10; i ++){
		possi.push_back(i);
	}
	for(vector<int>::iterator it = related.begin(); it != related.end(); it ++){
		if(initial_sodoku[((*it) - (*it) % 10) / 10][(*it) % 10] != 0){
			del_impossi(initial_sodoku[((*it) - (*it) % 10) / 10][(*it) % 10], &possi);
		}
	}
    if(possi.size() == 1){
    	initial_sodoku[(coor - coor % 10) / 10][coor % 10] = possi[0];
    	check_before(coor);
    }
    else{
    	record[coor] = possi;
    }
}

void horizon_check_unique(int coor){
	int x = (coor - coor % 10) / 10;
	map<int,vector<int> > record_times;
	for(int i = 0; i < 9; i ++){
		if(initial_sodoku[x][i] == 0){
			for(vector<int>::iterator it = record[10 * x + i].begin(); it != record[10 * x + i].end(); it ++){
				if(record_times.find(*it) == record_times.end()){
					vector<int> temp;
					temp.push_back(10 * x + i);
					record_times[*it] = temp;
				}
				else{
					record_times[*it].push_back(10 * x + i);
				}
			}
		}
	}
	for(map<int,vector<int> >::const_iterator it = record_times.begin(); it != record_times.end(); it ++){
		if((it -> second).size() == 1){
			int coor_t = (it -> second)[0];
			initial_sodoku[(coor_t - coor_t % 10) / 10][coor_t % 10] = (it -> first);
			check_before(coor_t);
		}
	}
}

void vertical_check_unique(int coor){
	int y = coor % 10;
	map<int,vector<int> > record_times;
	for(int i = 0; i < 9; i ++){
		if(initial_sodoku[i][y] == 0){
			for(vector<int>::iterator it = record[10 * i + y].begin(); it != record[10 * i + y].end(); it ++){
				if(record_times.find(*it) == record_times.end()){
					vector<int> temp;
					temp.push_back(10 * i + y);
					record_times[*it] = temp;
				}
				else{
					record_times[*it].push_back(10 * i + y);
				}
			}
		}
	}
	for(map<int,vector<int> >::const_iterator it = record_times.begin(); it != record_times.end(); it ++){
		if((it -> second).size() == 1){
			int coor_t = (it -> second)[0];
			initial_sodoku[(coor_t - coor_t % 10) / 10][coor_t % 10] = (it -> first);
			check_before(coor_t);
		}
	}
}

void grid_check_unique(int coor){
	int y = coor % 10;
	int x = (coor - y) / 10;
	map<int,vector<int> > record_times;
	for (int m = x - x % 3; m < x - x % 3 + 3; m ++){
        for(int n = y - y % 3; n < y - y % 3 + 3; n ++){
            if(initial_sodoku[m][n] == 0){
            	for(vector<int>::iterator it = record[10 * m + n].begin(); it != record[10 * m + n].end(); it ++){
					if(record_times.find(*it) == record_times.end()){
						vector<int> temp;
						temp.push_back(10 * m + n);
						record_times[*it] = temp;
					}
					else{
						record_times[*it].push_back(10 * m + n);
					}
				}
            }
        }
        for(map<int,vector<int> >::const_iterator it = record_times.begin(); it != record_times.end(); it ++){
			if((it -> second).size() == 1){
				int coor_t = (it -> second)[0];
				initial_sodoku[(coor_t - coor_t % 10) / 10][coor_t % 10] = (it -> first);
				check_before(coor_t);
			}
		}
    }
}

void check_unique(int coor){
	horizon_check_unique(coor);
	vertical_check_unique(coor);
	grid_check_unique(coor);
}

int main()
{
	for(int i = 0; i < 9; i ++){
		for(int j = 0; j < 9; j ++){
			if(initial_sodoku[i][j] == 0){
				possible_choice(10 * i + j);
			}
		}
	}
	for(int i = 0; i <= 88; i += 11){
		horizon_check_unique(i);
		vertical_check_unique(i);
	}
	for(int i = 0; i <= 60; i += 30){
		for(int j = 0; j <= 6; j += 3){
			grid_check_unique(i + j);
		}
	}
	for (int i = 0; i < 9; i ++){
		for( int j = 0; j < 9; j ++){
			cout << initial_sodoku[i][j] << ", ";
		}
		cout << "\n";
	}
	for(map<int,vector<int> >::const_iterator it = record.begin(); it != record.end(); it ++)
	{
	    cout << it -> first << " ";
	    vector<int> temp = it -> second;
	    for (vector<int>::const_iterator i = temp.begin(); i != temp.end(); i ++){
    		cout << *i << " ";
	    }
	    cout << "\n";
	}
}