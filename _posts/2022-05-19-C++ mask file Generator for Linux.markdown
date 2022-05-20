---
layout: post
title:  C++ mask file Generator for Linux
date:   2022-05-19 23:46:05 +0200
categories: Dev
---
C++ mask file Generator for Linux
```
#include <iostream>
#include <string>
#include <fstream>
#include <sstream>
#include <vector>
#include <cstring>
#include <algorithm>
#include <typeinfo>
#include <unistd.h>
using namespace std;
int main(){
	string action;
	int error=0;
    char mychar[1];
    char mychar2[1];
    fstream fout2;
    fout2.open("temp.bin", ios::out |ios::app);
	ifstream urandom;
	urandom.open("/dev/urandom", ios::in | ios::binary);
	//ss << getline(urandom, byte, length);
        string s;
    const string maskName="temp.bin";
    while(error!=1){
	while(!(cin.get(mychar[0]) && urandom.get(mychar2[0]))){
		error = 1;
		break;

	}
        if(error == 0){
		cout << (char)(mychar[0] ^ (char)mychar2[0]);
		fout2 << (char)mychar2[0];
	}
    }
    fout2.close();
    const string s2="mv temp.bin $(shasum temp.bin | awk '{print $1}')";
    //rename (maskName.c_str(), s3.c_str());
    system(s2.c_str());

}

```