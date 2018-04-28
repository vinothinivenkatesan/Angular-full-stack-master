/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {

    constructor() {
    }

    public getValue(key: any) {
       return localStorage.getItem(key);
    }

    public setValue(key: any, value: any) {
        localStorage.setItem(key, value);
    }
}