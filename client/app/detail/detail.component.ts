import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatService } from '../services/cat.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../shared/methods/shared.service';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html'
})
export class DetailComponent {

    private item: any;
    private isLoading = true;
    private filePath = './../../assets/images/upload';
    constructor(private catService: CatService, private route: ActivatedRoute, private sharedService: SharedService) { }

    ngOnInit() {
        let productID = this.route.snapshot.params['id'];
        console.log(productID);
        this.getDetail(productID);
    }

    getDetail(productId) {
        this.catService.getCatById(productId).subscribe(
            data => {
                this.item = data;
                console.log(data);
            },
            error => console.log(error),
            () => this.isLoading = false
        );
    }

    addtoCart(item) {
        this.sharedService.setValue('addedItem',item._id);
    }

}
