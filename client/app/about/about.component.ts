import { Component } from '@angular/core';
import { CatService } from '../services/cat.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent {

  private items: any;
  private isLoading = true;
  private  filePath = './../../assets/images/upload';
  constructor(private catService: CatService) { }

  ngOnInit(){
    this.getItems();
  }

  getItems() {
    this.catService.getCats().subscribe(
      data => this.items = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

}
