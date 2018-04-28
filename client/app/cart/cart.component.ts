import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatService } from '../services/cat.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../shared/methods/shared.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html'
})
export class CartComponent {

    private itemsInCart: any;
    private isLoading = true;
    private filePath = './../../assets/images/upload';
    constructor(private catService: CatService, private route: ActivatedRoute, private sharedService: SharedService) { }

    ngOnInit() {
        let itemId = this.sharedService.getValue('addedItem');
        this.catService.getCatById(itemId).subscribe(
            data => {
                this.itemsInCart = data;
                console.log(data);
            },
            error => console.log(error),
            () => this.isLoading = false
        );

    }


}
